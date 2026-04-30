export type ButtonProps = {
    onClick?: () => void
    id?: string
    text?: string
    children?: React.ReactNode
    className?: string
    variant?: 'default' | 'primary' | 'secondary' | 'slide_control'
    as?: 'button' | 'link'
    href?: string
}