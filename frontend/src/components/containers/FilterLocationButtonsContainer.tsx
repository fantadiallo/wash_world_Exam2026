import { FilterButtonsContainerProps } from "@/src/types/containers";

export default function FilterLocationButtonsContainer({children}: FilterButtonsContainerProps)
{
    return (
        <div className="flex gap-3 absolute top-4 right-4 z-[1000]">
            {children}    
        </div>
    )
}
