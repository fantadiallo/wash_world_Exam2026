import { ButtonProps } from "@/src/types/button"


export default function Button({ onClick, text, className, children }: ButtonProps)
{
    return (
        <button onClick={onClick} className={className}>
            {children}
            {text}
        </button>
    )
}