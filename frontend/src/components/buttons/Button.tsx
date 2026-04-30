'use client'

import Link from 'next/link'
import { ButtonProps } from '@/src/types/button'

const variants = {
    primary: 'flex items-center gap-2 bg-(--brand-green-dark-bg) text-(--solid-white) px-3 py-2 rounded-sm transition duration-150 ease-in hover:bg-transparent hover:outline-2 hover:outline-white',
    secondary: 'flex items-center gap-2 outline-2 outline-(--solid-white) text-(--solid-white) px-3 py-2 rounded-sm transition duration-150 ease-in hover:bg-(--brand-green-dark-bg) hover:outline-none',
    slide_control: 'text-xl text-(--solid-white) cursor-pointer outline-2 outline-(--solid-white) rounded-full h-[30px] w-[30px] transition duration-150 ease-in hover:bg-(--brand-green-dark-bg) hover:outline-0'
}

export default function Button({
    onClick,
    id,
    text,
    children,
    className = '',
    variant = '',
    as = 'button',
    href
}: ButtonProps)
{
    const styles = `${variants[variant]} ${className}`

    // LINK VERSION
    if (as === 'link' && href) {
        return (
            <Link id={id} href={href} className={styles}>
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