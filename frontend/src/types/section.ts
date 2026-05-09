import { ReactNode } from "react"

export type SectionProps =
{
    children?: ReactNode,
    className?: string,
    variants?: 'hero' | 'page_section' | 'profile_hero' | 'profile_information',
}