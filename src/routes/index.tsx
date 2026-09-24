import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, Check, Fish, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CinematicVideo } from "@/components/jippi/CinematicVideo";
import { QuantitySelector } from "@/components/jippi/QuantitySelector";
import {
  brandAssets,
  buildWhatsAppOrderMessage,
  products,
  DISPLAY_PHONE,
  WHATSAPP_NUMBER,
  type Product,
} from "@/lib/jippi-products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JIPPI SEA FOODS | Fresh Seafood Supply & Wholesale Chennai" },
      {
        name: "description",
        content:
          "Fresh fish and seafood supply from JIPPI SEA FOODS in Chennai. Vanjaram, prawns, squid and wholesale orders, cut and cleaned to request.",
      },
      {
        property: "og:title",
        content: "JIPPI SEA FOODS | Fresh Seafood Supply & Wholesale Chennai",
      },
      {
        property: "og:description",
        content: "Authentic fresh seafood, market preparation and wholesale supply in Chennai.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const whatsappUrl = buildWhatsAppOrderMessage({
    items: [{ name: product.name, quantityKg: quantity }],
  });
  return (
    <article className="overflow-hidden border border-border bg-card">
      {product.image ? (
        <img
          src={product.image}
          alt={`${product.name} from JIPPI SEA FOODS`}
          className="aspect-[4/3] w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="grid aspect-[4/3] place-items-center bg-secondary px-6 text-center">
          <div>
            <Fish aria-hidden="true" className="mx-auto size-9 text-accent" />
            <p className="mt-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Photo coming soon
            </p>
          </div>
        </div>
      )}
      <div className="space-y-6 p-6 sm:p-7">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">{product.format}</p>
          <h3 className="mt-2 font-display text-3xl uppercase">{product.name}</h3>
        </div>
        <QuantitySelector quantity={quantity} onChange={setQuantity} label={product.name} />
        <div className="grid gap-3">
          <Button
            type="button"
            variant="cinematic"
            onClick={() => {
              addItem(product, quantity);
              setAdded(true);
              window.setTimeout(() => setAdded(false), 1600);
            }}
          >
            {added ? <Check aria-hidden="true" /> : null}
            {added ? "Added to cart" : "Add to cart"}
          </Button>
          <Button asChild variant="outlineOcean">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" /> Order on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

function Index() {
  return (
    <main id="home" className="min-h-screen bg-background text-foreground">
      <section className="relative isolate min-h-[92svh] overflow-hidden">
        <CinematicVideo
          src={brandAssets.videos.mainCutting}
          poster={brandAssets.wholeVanjaram}
          label="JIPPI SEA FOODS preparing a fresh fish at the Chennai market"
          priority
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 overlay-deep" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[92svh] max-w-[94rem] flex-col items-center justify-center px-5 pb-20 pt-28 text-center sm:px-8">
          <h1 className="font-display text-6xl uppercase leading-[0.95] sm:text-8xl lg:text-9xl">
            JIPPI SEA FOODS
          </h1>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-foreground sm:text-base">
            Fresh seafood supply &amp; wholesale
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.35em] text-accent">Chennai</p>
          <Button asChild variant="cinematic" size="lg" className="mt-10">
            <a href="#our-catch">Explore our catch</a>
          </Button>
          <a
            href="#about"
            className="absolute bottom-7 flex flex-col items-center gap-2 text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground"
          >
            <span>Scroll to explore</span>
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </div>
      </section>
      <section id="about" className="scroll-mt-24 py-28 sm:py-36 lg:py-44">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <img
            src={brandAssets.vendorMarket}
            alt="JIPPI SEA FOODS preparing fresh fish at the Chennai market"
            className="max-h-[44rem] w-full object-cover"
            loading="lazy"
          />
          <div className="lg:pl-12">
            <p className="text-xs uppercase tracking-[0.32em] text-accent">Real JIPPI story</p>
            <h2 className="mt-5 font-display text-5xl uppercase leading-none sm:text-7xl">
              From our sea to your table
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
              Our work begins at the market, selecting the day’s catch and preparing each order by
              hand. JIPPI supplies homes, hotels, restaurants and seafood businesses across Chennai.
            </p>
          </div>
        </div>
      </section>
      <section className="border-y border-border bg-card py-28 sm:py-36 lg:py-44">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-accent">Vanjaram feature</p>
            <h2 className="mt-5 font-display text-5xl uppercase leading-none sm:text-7xl">
              Cut for your kitchen
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-8 text-muted-foreground">
              Whole vanjaram and substantial fresh cuts, prepared to your requested quantity.
              Availability and pricing are confirmed against the current catch.
            </p>
          </div>
          <img
            src={brandAssets.vanjaramCutsClose}
            alt="Fresh Vanjaram cuts prepared by JIPPI SEA FOODS"
            className="aspect-[16/10] w-full object-cover"
            loading="lazy"
          />
        </div>
      </section>
      <section className="py-28 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.32em] text-accent">Real preparation</p>
            <h2 className="mt-5 font-display text-5xl uppercase leading-none sm:text-7xl">
              Prepared at the market
            </h2>
          </div>
          <CinematicVideo
            src={brandAssets.videos.steakCutting}
            poster={brandAssets.vanjaramCutsWide}
            label="Fish cutting at JIPPI SEA FOODS"
            className="aspect-video w-full object-cover"
          />
        </div>
      </section>
      <section
        id="our-catch"
        className="scroll-mt-24 border-y border-border bg-card py-28 sm:py-36 lg:py-44"
      >
        <div className="mx-auto max-w-[94rem] px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.32em] text-accent">Our catch</p>
            <h2 className="mt-5 font-display text-5xl uppercase leading-none sm:text-7xl">
              Choose your seafood
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Select 1–10 KG. We confirm current availability and pricing before the order is final.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section id="wholesale" className="scroll-mt-24 py-28 sm:py-36 lg:py-44">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-accent">Wholesale</p>
            <h2 className="mt-5 font-display text-5xl uppercase leading-none sm:text-7xl">
              Reliable supply for busy kitchens
            </h2>
            <p className="mt-7 text-lg leading-8 text-muted-foreground">
              Tell us the seafood, daily volume and cut your kitchen needs. We prepare and pack
              orders for hotels, restaurants, caterers and retailers.
            </p>
            <Button asChild variant="whatsapp" size="lg" className="mt-9">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" /> Discuss wholesale
              </a>
            </Button>
          </div>
          <CinematicVideo
            src={brandAssets.videos.business}
            poster={brandAssets.vendorMarket}
            label="JIPPI seafood business at the Chennai market"
            className="mx-auto aspect-[9/14] max-h-[44rem] w-full object-cover lg:max-w-md"
          />
        </div>
      </section>
      <section id="contact" className="scroll-mt-24 border-y border-border bg-card py-28 sm:py-36">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <MapPin className="mx-auto size-8 text-accent" aria-hidden="true" />
          <p className="mt-6 text-xs uppercase tracking-[0.32em] text-accent">Location</p>
          <h2 className="mt-5 font-display text-5xl uppercase leading-none sm:text-7xl">Chennai</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Fresh seafood supply, pickup and delivery enquiries from JIPPI SEA FOODS.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="whatsapp" size="lg">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" /> WhatsApp us
              </a>
            </Button>
            <Button asChild variant="outlineOcean" size="lg">
              <a href={`tel:+${WHATSAPP_NUMBER}`}>Call {DISPLAY_PHONE}</a>
            </Button>
          </div>
        </div>
      </section>
      <footer className="px-5 py-24 text-center sm:px-8 sm:py-32">
        <img
          src={brandAssets.logo}
          alt="JIPPI SEA FOODS official logo"
          className="mx-auto w-full max-w-sm bg-foreground object-contain p-3"
        />
        <p className="mt-8 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Fresh seafood supply &amp; wholesale · Chennai
        </p>
      </footer>
    </main>
  );
}
