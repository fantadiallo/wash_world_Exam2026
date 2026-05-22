import Image from 'next/image'
import Overlay from '../overlay/Overlay'
import Heading from '../headings/Heading'

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
                <div className="mt-10 mx-12">
                    <Heading variant="slide_topic_heading">
                        {slideTopicText}
                    </Heading>

                    <Heading variant="slide_main_heading">
                        {slideHeaderText}
                    </Heading>

                    <small className="text-[15px] text-(--solid-white)">
                        {slideSubheaderText}
                    </small>
                </div>
                    

                {/* CHILDREN WRAPPER */}
                <div className="mx-10 flex flex-1 relative top-[50%] -translate-y-[50%]">
                    {children}
                </div>

            </div>

        </article>
    )
}