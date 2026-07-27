import { whatsappUrl } from "@/lib/config";

/** Realistic WhatsApp outline: stroked chat bubble + solid handset. */
function WhatsAppOutlineIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 2.4C6.7 2.4 2.4 6.62 2.4 11.8c0 1.64.45 3.22 1.3 4.6L2.2 21.8l5.55-1.45A9.5 9.5 0 0 0 12 21.2c5.3 0 9.6-4.22 9.6-9.4S17.3 2.4 12 2.4Z"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
      <path
        fill="currentColor"
        d="M16.55 14.35c-.26-.13-1.52-.75-1.76-.84-.23-.08-.4-.13-.57.13-.17.25-.65.83-.8 1-.14.17-.3.19-.55.06-.26-.12-1.08-.4-2.06-1.27-.76-.68-1.27-1.51-1.42-1.76-.15-.26-.01-.4.11-.53.12-.12.25-.3.38-.45.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.57-1.37-.78-1.87-.2-.5-.41-.43-.57-.44h-.47c-.17 0-.43.06-.66.31s-.86.84-.86 2.05c0 1.2.88 2.37 1 2.53.12.17 1.74 2.79 4.3 3.8 2.14.84 2.58.67 3.05.63.47-.04 1.5-.61 1.71-1.2.21-.59.21-1.1.15-1.2-.06-.1-.24-.16-.5-.29Z"
      />
    </svg>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppOutlineIcon className="whatsapp-float-icon" />
    </a>
  );
}
