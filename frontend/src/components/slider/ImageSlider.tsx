'use client'
import { useEffect } from 'react'
import locationsData from '@/src/app/map_data/locations'
import { useState } from 'react'
import Button from '../buttons/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faMapMarkerAlt, faCrown, faPumpSoap, faCreditCard, faLinkSlash} from '@fortawesome/free-solid-svg-icons'
import { SlideProps } from '@/src/types/slide'
import CardsContainer from '../containers/CardsContainer'
import LocationCard from '../cards/LocationCard'
import Slide from './Slide'
import SlideCounter from './SlideCounter'
import useLocationsWithDistance from '@/src/hooks/useLocationsWithDistance'




export default function ImageSlider()
{
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [locations, setLocations] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await fetch('http://127.0.0.1/locations')
                const data = await res.json()

                setLocations(data)
            } catch (err) {
                console.error('Failed to fetch locations:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchLocations()
    }, [])

    const locationsWithDistance = useLocationsWithDistance(locations ?? [])

    const closestFourLocations = [...locationsWithDistance]
        .sort((a, b) => Number(a.distance) - Number(b.distance))
        .slice(0, 4)

    const slides: SlideProps[] = [
    {
        id: '1',
        slideTopicText: 'BILVASK',
        slideHeaderText: 'Hurtig bilvask på 10 minutter',
        slideSubheaderText: '140+ lokationer i Danmark',
        imageSrc: '/images/slider_images/washworld.jpg',
        imageAlt: 'washworld',
        children: (
            <div className="flex flex-col gap-4">
            <Button as="link" href="/locations" variant="primary">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> <span>Find vaskehaller</span>
            </Button>
                <Button as="link" href="/locations" variant="secondary">
                <FontAwesomeIcon icon={faCrown} /> <span>Se medlemskaber</span>
            </Button>
        </div>
        )
    },
    {
        id: '2',
        slideTopicText: 'Medlemskaber',
        slideHeaderText: 'Fleksibel bilvask, der passer til dine behov',
        slideSubheaderText: '140+ lokationer i Danmark',
        imageSrc: '/images/slider_images/washworld.jpg',
        imageAlt: 'washworld',
        children: (
            <ul className="flex flex-col gap-6">
                <li className="font-medium whitespace-nowrap">
                    <FontAwesomeIcon icon={faPumpSoap} className="text-2xl text-(--brand-green-dark-bg)" /> <span className="text-(--solid-white)">Fri adgang til alle vaskehaller</span>
                </li>
                <li className="font-medium whitespace-nowrap">
                    <FontAwesomeIcon icon={faCreditCard} className="text-2xl text-(--brand-green-dark-bg)" /> <span className="text-(--solid-white)">Fri adgang til alle vaskehaller</span>
                </li>
                <li className="font-medium whitespace-nowrap">
                    <FontAwesomeIcon icon={faLinkSlash} className="text-2xl text-(--brand-green-dark-bg)" /> <span className="text-(--solid-white)">Fri adgang til alle vaskehaller</span>
                </li>
            </ul>
        )
    },
    {
        id: '3',
        slideTopicText: 'Vaskehal',
        slideHeaderText: 'Altid en ren bil indenfor rækkevidde',
        slideSubheaderText: 'Abonnementer fra 99 kr./md.',
        imageSrc: '/images/slider_images/washworld.jpg',
        imageAlt: 'washworld',
        children: (
            <CardsContainer>
                {loading ? (
                    <p>Loading...</p>
                ) : locations.length > 0 ? (
                    closestFourLocations.map((location, index) => (
                        <LocationCard key={location.id ?? index} {...location} />
                    ))
                ) : (
                    <p>Ingen lokationer</p>
                )}
            </CardsContainer>
        )
    },
    ]

    return (
        <div className="relative slides-container h-[calc(100vh-4rem)] w-screen overflow-hidden">

            <div
                className="flex h-full w-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
            >
                {
                    slides.length > 0 ?
                        slides.map((slide, index) => (
                            <div key={index} className="flex-shrink-0 w-screen h-full">
                                <Slide {...slide}></Slide>
                            </div>
                        )) : (
                            <p className="text-[var(--solid-black)]">No slides</p>
                        )
                }
            </div>

            {/* Buttons */}
            <div className="control-buttons-container flex gap-4 items-center absolute bottom-6 mx-12">

                <Button
                    onClick={() =>
                        setCurrentSlideIndex(prev =>
                            prev === 0 ? slides.length - 1 : prev - 1
                        )
                    }
                    variant="slide_control"
                    
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Button>
                
                <SlideCounter currentSlideNumber={currentSlideIndex + 1} totalSlidesAmount={slides.length}/>

                <Button
                    onClick={() =>
                        setCurrentSlideIndex(prev =>
                            prev === slides.length - 1 ? 0 : prev + 1
                        )
                    }
                    variant="slide_control"
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </Button>

            </div>
        </div>
    )
}