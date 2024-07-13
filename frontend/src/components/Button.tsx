import { ComponentProps, ReactNode } from "react"

import { tv, VariantProps } from "tailwind-variants"


const buttonVariants = tv({
    base: 'max-w-full min-w-fit rounded-lg py-2 px-5 font-medium flex items-center justify-center gap-2 flex-no-wrap overflow-hidden',
    variants: {
        variant: {
            primary: 'bg-lime-300 text-lime-950 hover:bg-lime-400',
            secondary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700',
        },

        size: {
            default: '',
            full: 'w-full',
        }
    },

    defaultVariants: {
        variant: 'primary',
        size: 'default',
    }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
    children: ReactNode,
}

export default function Button({children, variant, size, ...props}: ButtonProps) {
    return (
        <button 
            className={buttonVariants({ variant, size })}
            {...props}
        >
            {children}
        </button>
    )
}
