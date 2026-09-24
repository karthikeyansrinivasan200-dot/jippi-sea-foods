import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buildWhatsAppOrderMessage, DISPLAY_PHONE } from "@/lib/jippi-products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | JIPPI SEA FOODS Chennai" },
      {
        name: "description",
        content:
          "Complete a JIPPI SEA FOODS order request for fish, prawns, squid and wholesale seafood from Zam Bazaar, Chennai.",
      },
      { property: "og:title", content: "Checkout | JIPPI SEA FOODS Chennai" },
      {
        property: "og:description",
        content: "Complete a JIPPI SEA FOODS order request for seafood from Zam Bazaar, Chennai.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/checkout" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: CheckoutPage,
});

type OrderType = "Pickup" | "Delivery";

type SubmittedOrder = {
  fullName: string;
  phone: string;
  businessName: string;
  email: string;
  orderType: OrderType;
  address: string;
  city: string;
  pincode: string;
  notes: string;
};

function CheckoutPage() {
  const { items, totalQuantity, clearCart, openCart } = useCart();
  const [orderType, setOrderType] = useState<OrderType>("Pickup");
  const [submittedOrder, setSubmittedOrder] = useState<SubmittedOrder | null>(null);
  const [form, setForm] = useState<SubmittedOrder>({
    fullName: "",
    phone: "",
    businessName: "",
    email: "",
    orderType: "Pickup",
    address: "",
    city: "",
    pincode: "",
    notes: "",
  });

  const whatsappUrl = useMemo(
    () =>
      buildWhatsAppOrderMessage({
        customerName: submittedOrder?.fullName ?? form.fullName,
        phone: submittedOrder?.phone ?? form.phone,
        businessName: submittedOrder?.businessName ?? form.businessName,
        email: submittedOrder?.email ?? form.email,
        orderType: submittedOrder?.orderType ?? orderType,
        address: submittedOrder?.address ?? form.address,
        city: submittedOrder?.city ?? form.city,
        pincode: submittedOrder?.pincode ?? form.pincode,
        notes: submittedOrder?.notes ?? form.notes,
        items,
      }),
    [form, items, orderType, submittedOrder],
  );

  const updateField = (field: keyof SubmittedOrder, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextOrder = { ...form, orderType };
    setSubmittedOrder(nextOrder);
  };

  if (submittedOrder) {
    return (
      <main className="min-h-screen bg-background pt-28 text-foreground">
        <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="border border-border bg-secondary/35 p-6 sm:p-10">
            <CheckCircle2 className="text-accent" size={42} aria-hidden="true" />
            <p className="mt-8 text-xs uppercase tracking-[0.38em] text-accent">
              Order request submitted
            </p>
            <h1 className="mt-4 font-display text-5xl uppercase leading-none sm:text-7xl">
              Order received
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Thank you for ordering from JIPPI SEA FOODS.
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-sm uppercase tracking-[0.28em] text-foreground">
                  Order summary
                </h2>
                <div className="mt-4 divide-y divide-border border-y border-border">
                  {items.map((item) => (
                    <div
                      key={item.slug}
                      className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 py-4 text-sm uppercase tracking-[0.18em]"
                    >
                      <span>{item.name}</span>
                      <span>{item.quantityKg} KG</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-4 text-sm uppercase tracking-[0.18em]">
                  <span className="text-muted-foreground">Total quantity</span>
                  <strong>{totalQuantity} KG</strong>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Order status: Request received. Price confirmation is based on current
                  availability.
                </p>
              </div>
              <div>
                <h2 className="text-sm uppercase tracking-[0.28em] text-foreground">
                  Customer details
                </h2>
                <dl className="mt-4 grid gap-3 text-sm">
                  <Detail label="Full name" value={submittedOrder.fullName} />
                  <Detail label="Phone" value={submittedOrder.phone} />
                  <Detail label="Business" value={submittedOrder.businessName || "Not provided"} />
                  <Detail label="Email" value={submittedOrder.email || "Not provided"} />
                  <Detail label="Order type" value={submittedOrder.orderType} />
                  {submittedOrder.orderType === "Delivery" ? (
                    <Detail
                      label="Address"
                      value={`${submittedOrder.address}, ${submittedOrder.city} ${submittedOrder.pincode}`}
                    />
                  ) : null}
                  <Detail label="Instructions" value={submittedOrder.notes || "Not provided"} />
                </dl>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <Button asChild variant="cinematic">
                    <a href={whatsappUrl} target="_blank" rel="noreferrer">
                      <MessageCircle aria-hidden="true" /> Send on WhatsApp
                    </a>
                  </Button>
                  <Button type="button" variant="outlineOcean" onClick={clearCart}>
                    Clear cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-28 text-foreground">
      <section className="mx-auto grid max-w-[94rem] gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.65fr)] lg:px-8">
        <form
          onSubmit={submitOrder}
          className="space-y-8 border border-border bg-secondary/25 p-5 sm:p-8"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.38em] text-accent">Checkout</p>
            <h1 className="mt-4 font-display text-5xl uppercase leading-none sm:text-7xl">
              Complete your order
            </h1>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Full name"
              required
              value={form.fullName}
              onChange={(value) => updateField("fullName", value)}
            />
            <Field
              label="Phone number"
              required
              value={form.phone}
              onChange={(value) => updateField("phone", value)}
              type="tel"
            />
            <Field
              label="Business name"
              value={form.businessName}
              onChange={(value) => updateField("businessName", value)}
            />
            <Field
              label="Email — optional"
              value={form.email}
              onChange={(value) => updateField("email", value)}
              type="email"
            />
          </div>

          <fieldset className="space-y-3">
            <legend className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
              Order type
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {(["Pickup", "Delivery"] as OrderType[]).map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={orderType === type ? "cinematic" : "outlineOcean"}
                  onClick={() => setOrderType(type)}
                  aria-pressed={orderType === type}
                >
                  {type}
                </Button>
              ))}
            </div>
          </fieldset>

          {orderType === "Delivery" ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field
                  label="Address"
                  required
                  value={form.address}
                  onChange={(value) => updateField("address", value)}
                />
              </div>
              <Field
                label="City"
                required
                value={form.city}
                onChange={(value) => updateField("city", value)}
              />
              <Field
                label="Pincode"
                required
                value={form.pincode}
                onChange={(value) => updateField("pincode", value)}
              />
            </div>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="notes" className="uppercase tracking-[0.2em] text-muted-foreground">
              Special instructions
            </Label>
            <Textarea
              id="notes"
              value={form.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              rows={5}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button type="submit" variant="cinematic" disabled={items.length === 0}>
              Place order
            </Button>
            <Button asChild variant="outlineOcean">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" /> WhatsApp order
              </a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            WhatsApp order support: {DISPLAY_PHONE}. No payment is collected here.
          </p>
        </form>

        <aside className="h-fit border border-border bg-secondary/35 p-5 sm:p-8 lg:sticky lg:top-28">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <h2 className="font-display text-3xl uppercase">Order summary</h2>
            <Button type="button" variant="ghost" onClick={openCart}>
              Edit
            </Button>
          </div>
          {items.length === 0 ? (
            <div className="mt-8 space-y-4 text-muted-foreground">
              <p>Your cart is empty.</p>
              <Button asChild variant="cinematic">
                <a href="/#our-catch">Shop seafood</a>
              </Button>
            </div>
          ) : (
            <div className="mt-6 divide-y divide-border border-y border-border">
              {items.map((item) => (
                <div
                  key={item.slug}
                  className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 py-4 text-sm uppercase tracking-[0.18em]"
                >
                  <span>{item.name}</span>
                  <span>{item.quantityKg} KG</span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] gap-4 text-sm uppercase tracking-[0.18em]">
            <span className="text-muted-foreground">Total quantity</span>
            <strong>{totalQuantity} KG</strong>
            <span className="text-muted-foreground">Price confirmation</span>
            <strong className="text-right">Based on current availability</strong>
          </div>
        </aside>
      </section>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  required = false,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[9rem_minmax(0,1fr)] gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="min-w-0 break-words text-foreground">{value}</dd>
    </div>
  );
}
