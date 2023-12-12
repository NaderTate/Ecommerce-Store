import { ComponentProps, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
// I don't have to use the above package "class-variance-authority" as I don't have variants for this component, but just in case I want to add variants in the future.
import Link from "next/link";
import { cn } from "@/lib/utils";
const buttonVariants = cva(
  "ml-2 my-1 text-default-500 hover:text-default-400 transition-colors focus:outline-none block"
);
interface Props
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  href?: string;
}
const FilterButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, children, href, ...props }, ref) => {
    if (href) {
      return (
        <Link href={href} className={cn(buttonVariants({ className }))}>
          {children}
        </Link>
      );
    }
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ className }))}
        {...props}
      >
        {children}
      </button>
    );
  }
);
FilterButton.displayName = "FilterButton";
export default FilterButton;
