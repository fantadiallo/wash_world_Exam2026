import { ButtonProps } from "./button"
import { ReactNode } from "react"

export type CardProps =
{
    id?: string,
    text: string
    children: ReactNode,
    icon?: string,
    link?: CardLink,
    className: string,
    variant: 'default' | 'location_card',
}

// Location Card
export type LocationCardProps =
{
    street: string,
    city: string,
    distance: string,
    lat: string,
    long: string,
}


// Card Contents //
type CardLink =
{
    href: string,
    text?: string,
    onClick: () => void,
}