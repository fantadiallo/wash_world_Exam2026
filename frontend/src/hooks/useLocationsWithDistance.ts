'use client'

import { useEffect, useState } from "react"
import { calculateDistanceBetweenUserAndLocation } from "../utils/distance_calculator"


/*
    This is a generic, meaning that this custom hook can accept any type of object, as long as that object contains lat and lng of type number. 
    <T extends { lat: number lng: number }>
*/ 
export default function useLocationsWithDistance<
    T extends {
        lat: number
        lng: number
    }
>(locations: T[]) {

    const [locationsWithDistance, setLocationsWithDistance] = useState(locations)

    useEffect(() => {

        navigator.geolocation.getCurrentPosition((position) => {

            const { latitude, longitude } = position.coords

            const updatedLocations = locations.map((location) => ({
                ...location,

                distance: calculateDistanceBetweenUserAndLocation({
                    userLat: latitude,
                    userLng: longitude,
                    locationLat: parseFloat(location.lat),
                    locationLng: parseFloat(location.lng)
                })
                    .toFixed(1)
                    .replace('.', ','),
            }))

            updatedLocations.sort(
                (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
            )

            setLocationsWithDistance(updatedLocations)
        })

    })

    return locationsWithDistance
}