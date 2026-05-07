import { MapPopUpProps } from "@/src/types/map"

export default function MapPopup({children, className}: MapPopUpProps)
{
    return (
        <article className={className}>
            {children}
        </article>
    )
}