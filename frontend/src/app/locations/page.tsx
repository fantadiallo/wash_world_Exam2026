'use client'
import { useState, useEffect } from 'react'
import locations from '@/src/app/map_data/locations'
import Navigation from "@/src/components/navigation/Navigation"
import CardsContainer from "@/src/components/containers/CardsContainer"
import LocationCard from "@/src/components/cards/LocationCard"
import PageContainer from '@/src/components/containers/PageContainer'
import Map from '@/src/components/maps/Map'
import { calculateDistanceBetweenUserAndLocation } from '@/src/utils/distance_calculator'

export default function Locations()
{
    const [locationsWithDistance, setLocationsWithDistance] = useState(locations)
    const [currentUserLocation, setCurrentUserLocation] = useState<{ lat: number, lng: number } | null>(null)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords
            setCurrentUserLocation({ lat: latitude, lng: longitude })
            const updated = locations.map((location) => ({
                ...location,
                distance: calculateDistanceBetweenUserAndLocation({
                    userLat: latitude,
                    userLng: longitude,
                    locationLat: parseFloat(location.lat),
                    locationLng: parseFloat(location.lng)
                }).toFixed(1).replace('.', ','),
            }))
            updated.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
            setLocationsWithDistance(updated)
        })
    }, [])

    return (
        <>
            <Navigation />
            <PageContainer>
                <header className="text-4xl leading-10">
                    <h1 className="text-(--solid-white)">
                        Find din nærmeste
                        <br />
                        <span className="text-(--brand-green-dark-bg)">Wash World</span>
                    </h1>
                </header>

                <div className="container nearest-wash-worlds-container">
                    <header className="text-(--brand-green-dark-bg) uppercase text-lg mb-2">
                        <h3>Vaskehaller nær dig</h3>
                    </header>
                    <CardsContainer>
                        {
                            locationsWithDistance.length > 0 ?
                                locationsWithDistance.map((location, index) => (
                                    <LocationCard key={index} {...location} />
                                )) : (
                                    ''
                                )
                        }
                    </CardsContainer>
                </div>

                <div className="w-full h-[500px]">
                    <Map locations={locationsWithDistance} currentUserLocation={currentUserLocation} />
                </div>
            </PageContainer>
        </>
    )
}