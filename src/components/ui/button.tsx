import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { forwardRef, type ButtonHTMLAttributes } from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Apple's signature blue pill button
        default:
          "bg-accent text-accent-foreground hover:brightness-110 active:scale-[0.98]",
        // Outlined pill
        outline:
          "border border-accent text-accent hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
        // Ghost text link style
        ghost:
          "text-accent hover:text-accent/80 active:scale-[0.98]",
        // Dark solid (for inverted sections)
        inverted:
          "bg-white text-[#1d1d1f] hover:bg-white/90 active:scale-[0.98]",
        // Secondary muted
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]",
      },
      size: {
        sm: "text-[13px] px-4 py-2 rounded-full",
        default: "text-[15px] px-6 py-2.5 rounded-full",
        lg: "text-[17px] px-8 py-3.5 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
