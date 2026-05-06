import { ContainerProps } from "@/src/types/container"

export default function CardsContainer({children, className}: ContainerProps)
{
    return (
        <div className={`${className ?? ''} flex flex-col gap-4 w-full`}>
            
            {children}
        </div>
    )
}