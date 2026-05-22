export type ButtonProps = {
    onClick?: () => void
    id?: string
    text?: string
    children?: React.ReactNode
    className?: string
    variant?: 'default' | 'primary' | 'secondary' | 'slide_control' | 'location_card' | 'auth' | 'membership_card' | 'hero' | 'text' | 'submit',
    as?: 'button' | 'link'
    href?: string
    target?: string,
    rel?: string
    type?: string
}

export type Filter =
{
    text: string,
    id: string,
}

export type FilterLocationButtonProps = ButtonProps & 
{
    onFilterChange: (value: string) => void
    filterValue: string,
    isActive?: boolean
}