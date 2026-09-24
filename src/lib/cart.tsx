import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/lib/jippi-products";

export type CartItem = {
  slug: string;
  name: string;
  quantityKg: number;
  image?: string | undefined;
};

type CartContextValue = {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantityKg: number) => void;
  increaseItem: (slug: string) => void;
  decreaseItem: (slug: string) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;
  totalQuantity: number;
  totalItemCount: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "jippi-seafoods-cart";

function clampQuantity(quantity: number) {
  return Math.min(10, Math.max(1, Math.round(quantity)));
}

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => products.some((product) => product.slug === item.slug))
      .map((item) => ({ ...item, quantityKg: clampQuantity(item.quantityKg) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const addItem = useCallback((product: Product, quantityKg: number) => {
    setItems((current) => {
      const existing = current.find((item) => item.slug === product.slug);
      if (!existing) {
        return [
          ...current,
          {
            slug: product.slug,
            name: product.name,
            image: product.image,
            quantityKg: clampQuantity(quantityKg),
          },
        ];
      }
      return current.map((item) =>
        item.slug === product.slug
          ? { ...item, quantityKg: clampQuantity(item.quantityKg + quantityKg) }
          : item,
      );
    });
  }, []);

  const increaseItem = useCallback((slug: string) => {
    setItems((current) =>
      current.map((item) =>
        item.slug === slug ? { ...item, quantityKg: clampQuantity(item.quantityKg + 1) } : item,
      ),
    );
  }, []);

  const decreaseItem = useCallback((slug: string) => {
    setItems((current) =>
      current.map((item) =>
        item.slug === slug ? { ...item, quantityKg: clampQuantity(item.quantityKg - 1) } : item,
      ),
    );
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((current) => current.filter((item) => item.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantityKg, 0);
    return {
      items,
      isCartOpen,
      openCart,
      closeCart,
      addItem,
      increaseItem,
      decreaseItem,
      removeItem,
      clearCart,
      setCartOpen,
      totalQuantity,
      totalItemCount: items.length,
    };
  }, [
    addItem,
    clearCart,
    closeCart,
    decreaseItem,
    increaseItem,
    isCartOpen,
    items,
    openCart,
    removeItem,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
