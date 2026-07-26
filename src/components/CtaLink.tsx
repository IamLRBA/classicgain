import Link from "next/link";
import { ctaUrl } from "@/lib/config";

type CtaLinkProps = {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

/** All navigation leaves the landing page through this one destination. */
export function CtaLink({ children, className, ariaLabel }: CtaLinkProps) {
  return (
    <Link
      href={ctaUrl}
      className={className}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
}
