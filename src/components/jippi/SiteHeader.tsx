import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandAssets, WHATSAPP_NUMBER } from "@/lib/jippi-products";
import { useCart } from "@/lib/cart";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Our Catch", href: "/#our-catch" },
  { label: "Wholesale", href: "/#wholesale" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItemCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header ${scrolled || menuOpen ? "site-header-solid" : "site-header-clear"}`}
    >
      <div className="mx-auto grid max-w-[94rem] grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="JIPPI SEA FOODS home">
          <img
            src={brandAssets.logo}
            alt="JIPPI SEA FOODS official logo"
            className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
          />
          <div className="min-w-0 leading-none">
            <p className="truncate font-display text-lg uppercase text-foreground sm:text-xl">
              JIPPI
            </p>
            <p className="truncate text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
              Sea Foods
            </p>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground lg:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="nav"
            onClick={openCart}
            aria-label={`Open cart with ${totalItemCount} items`}
          >
            <ShoppingBag aria-hidden="true" /> Cart ({totalItemCount})
          </Button>
          <Button asChild variant="outlineOcean" size="icon" className="hidden sm:inline-flex">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Contact JIPPI on WhatsApp"
            >
              <MessageCircle aria-hidden="true" />
            </a>
          </Button>
          <Button
            type="button"
            variant="nav"
            size="icon"
            className="lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-border bg-background px-4 pb-5 lg:hidden">
          <nav
            className="grid gap-1 py-4 text-sm font-semibold uppercase tracking-[0.22em]"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-3 text-muted-foreground"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button asChild variant="whatsapp" className="w-full" onClick={() => setMenuOpen(false)}>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" /> WhatsApp
            </a>
          </Button>
        </div>
      ) : null}
    </header>
  );
}
