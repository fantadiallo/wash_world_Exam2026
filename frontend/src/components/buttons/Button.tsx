'use client'

import Link from 'next/link'
import { ButtonProps } from '@/src/types/button'

const variants = {
    primary: 'flex items-center gap-2 bg-(--brand-green-dark-bg) text-(--solid-white) px-3 py-2 rounded-sm transition cursor-pointer duration-150 ease-in hover:bg-transparent hover:outline-2 hover:outline-white',
    secondary: 'flex items-center gap-2 outline-2 outline-(--solid-white) text-(--solid-white) px-3 py-2 rounded-sm cursor-pointer transition duration-150 ease-in hover:bg-(--brand-green-dark-bg) hover:outline-none',
    slide_control: 'text-xl text-(--solid-white) cursor-pointer outline-2 outline-(--solid-white) rounded-full h-[30px] w-[30px] cursor-pointer transition duration-150 ease-in hover:bg-(--brand-green-dark-bg) hover:outline-0',
    location_card: 'font-regular text-(--brand-green-dark-bg) hover:border-b-1 hover:border-(--brand-green-dark-bg) whitespace-nowrap cursor-pointer',
    auth: 'text-(--solid-white) border-b-2 border-(--splash-orange) cursor-pointer transition-text duration-150 ease-in hover:text-(--splash-orange)'
}

export default function Button({
    onClick,
    id,
    text,
    children,
    className = '',
    variant = '',
    as = 'button',
    href,
    target,
}: ButtonProps)
{
    const styles = `${variants[variant]} ${className}`

    // LINK VERSION
    if (as === 'link' && href) {
        return (
            <Link id={id} href={href} target={target} className={styles}>
                {children}
                {text}
            </Link>
        )
    }

    // BUTTON VERSION
    return (
        <button id={id} onClick={onClick} className={styles}>
            {children}
            {text}
        </button>
    )
}