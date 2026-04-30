import { SlideCounterProps } from "@/src/types/slideCounter"


export default function SlideCounter({currentSlideNumber, totalSlidesAmount}: SlideCounterProps)
{
    return (
        <div className="slide-counter-container">
            <span className="current-slide-number text-(--solid-white)">{currentSlideNumber}</span> <span className="text-(--solid-white)">/</span> <span className="total-slide-number text-(--solid-white)">{totalSlidesAmount}</span>
        </div>
    )   
}
