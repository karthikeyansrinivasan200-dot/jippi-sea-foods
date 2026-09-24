import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuantitySelector({
  quantity,
  onChange,
  label,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
  label: string;
}) {
  const decrease = () => onChange(Math.max(1, quantity - 1));
  const increase = () => onChange(Math.min(10, quantity + 1));

  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Quantity</p>
      <div className="grid max-w-56 grid-cols-[3rem_minmax(0,1fr)_3rem] items-center border border-border bg-secondary/55">
        <Button
          type="button"
          variant="quantity"
          size="icon"
          onClick={decrease}
          disabled={quantity <= 1}
          aria-label={`Decrease ${label} quantity`}
        >
          <Minus aria-hidden="true" />
        </Button>
        <output
          className="border-x border-border py-3 text-center text-sm font-semibold text-foreground"
          aria-live="polite"
        >
          {quantity} KG
        </output>
        <Button
          type="button"
          variant="quantity"
          size="icon"
          onClick={increase}
          disabled={quantity >= 10}
          aria-label={`Increase ${label} quantity`}
        >
          <Plus aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
