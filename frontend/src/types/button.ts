export type ButtonProps = {
    onClick?: () => void
    id?: string
    text?: string
    children?: React.ReactNode
    className?: string
    variant?: 'default' | 'primary' | 'secondary' | 'slide_control' | 'location_card',
    as?: 'button' | 'link'
    href?: string
    target?: string,
    rel?: string
}

export type Filter =
{
    text: string,
    id: string,
}

export type FilterLocationButtonProps = ButtonProps &
{
    filters: Filter[]
}