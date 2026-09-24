import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/jippi-products";

export function FloatingWhatsApp() {
  const message = encodeURIComponent(
    "Hello JIPPI SEA FOODS, I would like to enquire about today's fresh seafood availability.",
  );

  return (
    <Button
      asChild
      variant="whatsapp"
      size="iconLg"
      className="fixed bottom-5 right-4 z-40 sm:bottom-7 sm:right-7"
      aria-label="Contact JIPPI SEA FOODS on WhatsApp"
    >
      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`} target="_blank" rel="noreferrer">
        <MessageCircle aria-hidden="true" />
      </a>
    </Button>
  );
}
