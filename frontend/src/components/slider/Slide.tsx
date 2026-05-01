import Image from 'next/image'
import Overlay from '../overlay/Overlay'

export default function Slide({
    id,
    slideTopicText,
    slideHeaderText,
    slideSubheaderText,
    imageSrc,
    imageAlt,
    children
})
{
    return (
        <article
            className="relative flex-shrink-0 h-full w-screen overflow-hidden bg-black"
            id={id}
        >

            {/* BACKGROUND IMAGE */}
            <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
            />

            {/* DARK OVERLAY */}
            <Overlay />

            {/* CONTENT */}
            <div className="relative h-full flex flex-col">

                <header className="mx-10 mt-12">
                    <p className="font-bold slide-topic text-lg text-(--brand-green-dark-bg) tracking-widest uppercase">
                        {slideTopicText}
                    </p>

                    <h1 className="text-(--solid-white) text-2xl leading-tight mb-2">
                        {slideHeaderText}
                    </h1>

                    <small className="text-sm font-normal text-(--solid-white)">
                        {slideSubheaderText}
                    </small>
                </header>

                {/* CHILDREN WRAPPER */}
                <div className="mx-10 flex flex-1 relative top-[50%] -translate-y-[50%]">
                    {children}
                </div>

            </div>

        </article>
    )
}