import { ParagraphProps } from "@/src/types/paragraph"

const variants = {
    default: 'text-(--solid-white) text-md mt-1',
    opening_hours: 'text-(--solid-black)'
}

export default function Paragraph({text, children, variant, className}: ParagraphProps)
{
    const styles = `${variants[variant]} ${className}`

    return (
        <p className={styles}>
            {children}
            {text}
        </p>
    )   
}