import logoAsset from "@/assets/jippi/logo.png.asset.json";
import vendorMarketAsset from "@/assets/jippi/vendor-market.jpeg.asset.json";
import wholeVanjaramAsset from "@/assets/jippi/whole-vanjaram.jpeg.asset.json";
import vanjaramCutsWideAsset from "@/assets/jippi/vanjaram-cuts-wide.jpeg.asset.json";
import vanjaramCutsCloseAsset from "@/assets/jippi/vanjaram-cuts-close.jpeg.asset.json";
import mainCuttingVideoAsset from "@/assets/jippi/main-cutting.mp4.asset.json";
import marketHandlingVideoAsset from "@/assets/jippi/market-handling.mp4.asset.json";
import cleaningVideoAsset from "@/assets/jippi/cleaning.mp4.asset.json";
import cuttingWideVideoAsset from "@/assets/jippi/cutting-wide.mp4.asset.json";
import officialLogoAsset from "@/assets/jippi/official-logo.png.asset.json";
import marketStoryAsset from "@/assets/jippi/market-story.jpeg.asset.json";
import wholeVanjaramRealAsset from "@/assets/jippi/whole-vanjaram-real.jpeg.asset.json";
import vanjaramCutsWideRealAsset from "@/assets/jippi/vanjaram-cuts-wide-real.jpeg.asset.json";
import vanjaramCutsCloseRealAsset from "@/assets/jippi/vanjaram-cuts-close-real.jpeg.asset.json";
import heroRealAsset from "@/assets/jippi/hero-real.mp4.asset.json";
import marketHandlingRealAsset from "@/assets/jippi/market-handling-real.mp4.asset.json";
import fishCuttingRealAsset from "@/assets/jippi/fish-cutting-real.mp4.asset.json";
import businessRealAsset from "@/assets/jippi/business-real.mp4.asset.json";
import paraiAsset from "@/assets/jippi/parai.jpeg.asset.json";
import parlaAsset from "@/assets/jippi/parla.jpeg.asset.json";
import kolaAsset from "@/assets/jippi/kola.jpeg.asset.json";
import prawnAsset from "@/assets/jippi/prawn.png.asset.json";
import baashaAsset from "@/assets/jippi/basha.avif.asset.json";
import tilapiaAsset from "@/assets/jippi/tilapia-whole.jpg.asset.json";
import squidAsset from "@/assets/jippi/squid.png.asset.json";
import frozenItemsAsset from "@/assets/jippi/frozenitems.jpeg.asset.json";

export const WHATSAPP_NUMBER = "919841341773";
export const DISPLAY_PHONE = "98413 41773";

export const brandAssets = {
  logo: officialLogoAsset.url || logoAsset.url,
  vendorMarket: marketStoryAsset.url || vendorMarketAsset.url,
  wholeVanjaram: wholeVanjaramRealAsset.url || wholeVanjaramAsset.url,
  vanjaramCutsWide: vanjaramCutsWideRealAsset.url || vanjaramCutsWideAsset.url,
  vanjaramCutsClose: vanjaramCutsCloseRealAsset.url || vanjaramCutsCloseAsset.url,
  videos: {
    mainCutting: heroRealAsset.url || mainCuttingVideoAsset.url,
    marketHandling: marketHandlingRealAsset.url || marketHandlingVideoAsset.url,
    cleaning: cleaningVideoAsset.url,
    cuttingWide: cuttingWideVideoAsset.url,
    steakCutting: fishCuttingRealAsset.url,
    business: businessRealAsset.url,
  },
};

export type ProductFormat = "Whole / Cut" | "Fresh seafood" | "Frozen / Packed" | "Boneless cuts";

export type Product = {
  slug: string;
  name: string;
  descriptor: string;
  format: ProductFormat;
  image?: string;
  gallery?: string[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "vanjaram",
    name: "Vanjaram",
    descriptor: "Big fish. Real seafood.",
    format: "Whole / Cut",
    image: brandAssets.wholeVanjaram,
    gallery: [
      brandAssets.wholeVanjaram,
      brandAssets.vanjaramCutsWide,
      brandAssets.vanjaramCutsClose,
    ],
    featured: true,
  },
  {
    slug: "parai",
    name: "Parai",
    descriptor: "Fresh seafood",
    format: "Fresh seafood",
    image: paraiAsset.url,
  },
  {
    slug: "parla",
    name: "Parla",
    descriptor: "Fresh seafood",
    format: "Fresh seafood",
    image: parlaAsset.url,
  },
  {
    slug: "kola",
    name: "Kola",
    descriptor: "Fresh seafood",
    format: "Fresh seafood",
    image: kolaAsset.url,
  },
  {
    slug: "prawn",
    name: "Prawn",
    descriptor: "Fresh seafood",
    format: "Fresh seafood",
    image: prawnAsset.url,
  },
  {
    slug: "baasha",
    name: "Baasha",
    descriptor: "Fresh seafood",
    format: "Fresh seafood",
    image: baashaAsset.url,
  },
  {
    slug: "tilapia",
    name: "Tilapia",
    descriptor: "Fresh seafood",
    format: "Fresh seafood",
    image: tilapiaAsset.url,
  },
  {
    slug: "squid",
    name: "Squid",
    descriptor: "Fresh seafood",
    format: "Fresh seafood",
    image: squidAsset.url,
  },
  {
    slug: "frozen-items",
    name: "Frozen Items",
    descriptor: "Subject to availability",
    format: "Frozen / Packed",
    image: frozenItemsAsset.url,
  },
  {
    slug: "boneless-fish",
    name: "Boneless Fish",
    descriptor: "Cut for your kitchen",
    format: "Boneless cuts",
    image: brandAssets.vanjaramCutsClose,
    gallery: [brandAssets.vanjaramCutsClose, brandAssets.vanjaramCutsWide],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function buildWhatsAppOrderMessage(args: {
  customerName?: string;
  phone?: string;
  businessName?: string;
  email?: string;
  orderType?: string;
  address?: string;
  city?: string;
  pincode?: string;
  notes?: string;
  items: Array<{ name: string; quantityKg: number }>;
}) {
  const lines = [
    "Hello JIPPI SEA FOODS,",
    "",
    "I would like to order/enquire about:",
    "",
    ...args.items.map((item) => `• ${item.name} — ${item.quantityKg} KG`),
    "",
    `Total Quantity: ${args.items.reduce((sum, item) => sum + item.quantityKg, 0)} KG`,
    "",
    `Name: ${args.customerName ?? ""}`,
    `Business Name: ${args.businessName ?? ""}`,
    `Pickup / Delivery: ${args.orderType ?? ""}`,
    `Address: ${[args.address, args.city, args.pincode].filter(Boolean).join(", ")}`,
    `Order Notes: ${args.notes ?? ""}`,
    "",
    "Please confirm current availability and pricing.",
  ];

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
