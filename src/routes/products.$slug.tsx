import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/jippi/QuantitySelector";
import { buildWhatsAppOrderMessage, getProduct } from "@/lib/jippi-products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => {
    const name = loaderData?.name ?? "Fresh catch";
    const slug = loaderData?.slug ?? "";
    return {
      meta: [
        {
          title: `${name} | JIPPI SEA FOODS Chennai`,
        },
        {
          name: "description",
          content: `${name} ordering from JIPPI SEA FOODS at Zam Bazaar Fish Market, Chennai. Quantity and availability subject to current stock.`,
        },
        { property: "og:title", content: `${name} | JIPPI SEA FOODS Chennai` },
        {
          property: "og:description",
          content: `${name} ordering from JIPPI SEA FOODS at Zam Bazaar Fish Market, Chennai.`,
        },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/products/${slug}` }],
    };
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const product = Route.useLoaderData();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCart();
  const gallery = product.gallery ?? (product.image ? [product.image] : []);
  const whatsappUrl = buildWhatsAppOrderMessage({
    items: [{ name: product.name, quantityKg: quantity }],
  });

  const addProduct = () => {
    addItem(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <main className="min-h-screen bg-background pt-28 text-foreground">
      <section className="mx-auto grid max-w-[94rem] gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.72fr)] lg:px-8">
        <div className="space-y-4">
          <Button asChild variant="ghost" className="mb-2 px-0">
            <Link to="/">
              <ArrowLeft aria-hidden="true" /> Back to Our Catch
            </Link>
          </Button>
          {gallery.length > 0 ? (
            <div className="grid gap-4">
              <img
                src={gallery[0]}
                alt={`${product.name} from JIPPI SEA FOODS`}
                className="aspect-[4/5] w-full object-cover sm:aspect-[16/10]"
              />
              {gallery.length > 1 ? (
                <div className="grid grid-cols-2 gap-4">
                  {gallery.slice(1).map((image) => (
                    <img
                      key={image}
                      src={image}
                      alt={`${product.name} detail from JIPPI SEA FOODS`}
                      className="aspect-[4/3] w-full object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="grid aspect-[4/5] place-items-center border border-border bg-secondary text-center sm:aspect-[16/10]">
              <div>
                <p className="font-display text-4xl uppercase text-foreground">{product.name}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.32em] text-muted-foreground">
                  Photo coming soon
                </p>
              </div>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs uppercase tracking-[0.38em] text-accent">Product</p>
          <h1 className="mt-4 font-display text-6xl uppercase leading-none text-foreground sm:text-7xl">
            {product.name}
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">{product.descriptor}</p>
          <dl className="mt-8 grid gap-4 border-y border-border py-6 text-sm uppercase tracking-[0.2em]">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
              <dt className="text-muted-foreground">Available format</dt>
              <dd className="text-right text-foreground">{product.format}</dd>
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
              <dt className="text-muted-foreground">Quantity</dt>
              <dd className="text-right text-foreground">1–10 KG</dd>
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
              <dt className="text-muted-foreground">Availability</dt>
              <dd className="text-right text-foreground">Subject to stock</dd>
            </div>
          </dl>
          <div className="mt-8 space-y-6">
            <QuantitySelector quantity={quantity} onChange={setQuantity} label={product.name} />
            <div className="grid gap-3">
              <Button type="button" variant="cinematic" onClick={addProduct}>
                {added ? <Check aria-hidden="true" /> : null}
                {added ? "Added to cart" : "Add to cart"}
              </Button>
              <Button type="button" variant="outlineOcean" onClick={openCart}>
                View cart
              </Button>
              <Button asChild variant="whatsapp">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  <MessageCircle aria-hidden="true" /> Order on WhatsApp
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Quantity and availability subject to current stock.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
