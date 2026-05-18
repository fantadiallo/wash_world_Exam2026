'use client'
import { useState, useEffect } from 'react';

import MapLocationsContainer from './MapLocationsContainer'
import mapLocations from '../../../src/app/map_data/locations'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapProps } from '../../types/map'
import Button from '../buttons/Button'
import { mapMarkers } from '@/src/map_data/map_icon';
import MarkerClusterGroup from 'react-leaflet-cluster'
import CenterMap from './CenterMap';
import FilterLocationsButton from '../buttons/FilterLocationsButton'
import FilterLocationButtonsContainer from '../containers/FilterLocationButtonsContainer';
import Heading from '@/src/components/headings/Heading'
import Paragraph from '../paragraphs/Paragraph';

const filters: Filter[] = [
    {id: 'car_wash', text: 'Vaskehaller'},
    {id: 'self_car_wash', text: 'Vask selv'},
]


export default function Map({ view, location, currentUserLocation }: MapProps)
{
    const [loading, setLoading] = useState(true)
    const [locations, setLocations] = useState<MapLocation[]>([])

    useEffect(() =>
        {
            const fetchLocationsData = async () =>
            {
                try
                {
                    const res = await fetch('http://127.0.0.1/locations')
                    const data = await res.json()
                    console.log(data)
                    setLocations(data)
                }
                catch (err)
                {
                    console.error('Failed to fetch locations: ', err)
                }
                finally
                {
                    setLoading(false)
                }
            }
            
            fetchLocationsData()
        },
    [])

    const [activeFilter, setActiveFilter] = useState("car_wash")

    const filteredLocations = locations.filter((location) => {
        if(activeFilter === 'self_car_wash')
        {
            return location.hasSelfCarWash === true
        }

        return true
    })

    return (
        <MapContainer
            className="max-w-full h-full"
            center={currentUserLocation}
            zoom={13}
        >
        
        <FilterLocationButtonsContainer>
            {
                filters.length > 0 ?
                    filters.map((filter) => (
                        <FilterLocationsButton
                            key={filter.id}
                            filterValue={filter.id}
                            isActive={activeFilter === filter.id}
                            onFilterChange={setActiveFilter}
                            
                        >
                            {filter.text}
                        </FilterLocationsButton>
                    )) : (
                        <p className="text-(--solid-black)">Ingen filtre tilgængelige</p>
                    )
            }
            
        </FilterLocationButtonsContainer>
        
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Center Map to User Location */}
            {
                currentUserLocation && <CenterMap lat={currentUserLocation.lat} lng={currentUserLocation.lng}/>
            }

            <MapLocationsContainer>
                <MarkerClusterGroup chunkedLoading>
                    {
                        filteredLocations.length > 0 ?
                            filteredLocations.map((mapLocation, index) => (
                                <Marker
                                    key={`${mapLocation.id}-${mapLocation.distance}`}
                                    position={[mapLocation.lat, mapLocation.lng]}
                                    icon={mapMarkers}
                                    data-has-self-car-wash={mapLocation.hasSelfCarWash}
                                >
                                    <Popup className="rounded-md w-fit">
                                        <div
                                            className="relative flex justify-between bg-(--solid-white) border-2 border-(--brand-green-white-bg) h-fit w-fit min-w-[300px] px-4 py-8 mb-3 rounded-md"
                                            data-id={mapLocation.id}
                                        >
                                            <div className="flex flex-col justify-between h-full min-h-[80px]">

                                                <div className="popup-address-container flex flex-col gap-1">
                                                    <Heading variant="address_heading">
                                                        {mapLocation.street}
                                                    </Heading>
                                                  

                                                    <p className="flex gap-1">
                                                        <span className="zip-code">{mapLocation.zip_code}</span>
                                                        <span>{mapLocation.city}</span>
                                                    </p>

                                                    <p className="text-sm text-(--gray-eighty)">
                                                        Distance: <span>{mapLocation.distance}</span> km
                                                    </p>
                                                </div>

                                                <Button
                                                    as="link"
                                                    href={`https://www.google.com/maps/dir/?api=1&destination=${mapLocation.lat},${mapLocation.lng}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-(--brand-green-white-bg) w-fit px-3 py-2 text-(--solid-white) rounded-sm mt-6"
                                                >
                                                    <span className="text-(--solid-white)">Find vej</span>
                                                </Button>
                                            </div>

                                            <div className="bg-gray-400 w-[1px] h-[80px]"></div>

                                            <div className="popup-opening-hours-container flex flex-col items-start gap-4 whitespace-nowrap">
                                                <div>
                                                    <Heading variant="section_sub_heading_green">
                                                        Åbningstider:
                                                    </Heading>
                                                    <Paragraph variant="opening_hours">{mapLocation.opening_hours}</Paragraph>
                                                </div>

                                                <div>
                                                    <h4 className="flex flex-col text-(--brand-green-white-bg)">Vask selv:</h4>
                                                    <p className="text-(--solid-black)">
                                                        {mapLocation.self_carwash_amount === 0 ? 'Nej' : mapLocation.self_carwash_amount}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            )) : (
                                <p className="text-(--solid-black)">Vaskehaller lukket</p>
                            )
                    }
                </MarkerClusterGroup>
            </MapLocationsContainer>
        </MapContainer>
    )
}