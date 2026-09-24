import { Link } from "@tanstack/react-router";
import { MessageCircle, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { QuantitySelector } from "@/components/jippi/QuantitySelector";
import { useCart } from "@/lib/cart";
import { buildWhatsAppOrderMessage } from "@/lib/jippi-products";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setCartOpen,
    totalQuantity,
    increaseItem,
    decreaseItem,
    removeItem,
    closeCart,
  } = useCart();
  const whatsappUrl = buildWhatsAppOrderMessage({ items });

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent
        className="flex w-full flex-col overflow-y-auto border-border bg-background p-0 sm:max-w-xl"
        side="right"
      >
        <SheetHeader className="border-b border-border px-5 py-6 text-left sm:px-8">
          <p className="text-xs uppercase tracking-[0.38em] text-accent">JIPPI SEA FOODS</p>
          <SheetTitle className="font-display text-3xl uppercase tracking-normal text-foreground">
            Your cart
          </SheetTitle>
          <SheetDescription>Quantity and availability subject to current stock.</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="grid flex-1 place-items-center px-6 py-16 text-center">
            <div className="max-w-sm space-y-5">
              <div className="mx-auto grid size-16 place-items-center border border-border text-accent">
                <ShoppingBag aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-2xl uppercase text-foreground">Cart is empty</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Choose seafood from Our Catch to begin your order.
                </p>
              </div>
              <Button type="button" variant="cinematic" onClick={closeCart}>
                Continue shopping
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-border px-5 pb-4 sm:px-8">
              {items.map((item) => (
                <article
                  key={item.slug}
                  className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-4 py-7 sm:grid-cols-[5.5rem_minmax(0,1fr)]"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-muted">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={`${item.name} from JIPPI SEA FOODS`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-2 text-center text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                        Photo coming soon
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 space-y-4">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-display text-xl uppercase text-foreground">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{item.quantityKg} KG</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.slug)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 aria-hidden="true" />
                      </Button>
                    </div>
                    <QuantitySelector
                      label={item.name}
                      quantity={item.quantityKg}
                      onChange={(next) => {
                        if (next > item.quantityKg) increaseItem(item.slug);
                        if (next < item.quantityKg) decreaseItem(item.slug);
                      }}
                    />
                  </div>
                </article>
              ))}
            </div>
            <div className="space-y-5 border-t border-border bg-secondary/35 px-5 py-6 sm:px-8">
              <div className="grid grid-cols-2 gap-4 text-sm uppercase tracking-[0.2em]">
                <span className="text-muted-foreground">Total quantity</span>
                <strong className="text-right text-foreground">{totalQuantity} KG</strong>
                <span className="text-muted-foreground">Price confirmation</span>
                <strong className="text-right text-foreground">
                  Based on current availability
                </strong>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button type="button" variant="outlineOcean" onClick={closeCart}>
                  Continue shopping
                </Button>
                <Button asChild variant="cinematic" onClick={closeCart}>
                  <Link to="/checkout">Proceed to checkout</Link>
                </Button>
                <Button asChild variant="whatsapp" className="sm:col-span-2">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">
                    <MessageCircle aria-hidden="true" /> Order on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
