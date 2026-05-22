import { ReactNode } from "react"

export type ParagraphProps =
{
    text: string,
    children?: ReactNode,
    variants?: 'default' | 'opening_hours',
    className?: string,
}