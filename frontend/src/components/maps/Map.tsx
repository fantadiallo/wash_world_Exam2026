'use client'
import MapLocationsContainer from './MapLocationsContainer'
import mapLocations from '../../../src/app/map_data/locations'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapProps } from '../../types/map'
import Button from '../buttons/Button'
import { mapMarkers } from '@/src/map_data/map_icon';
import MarkerClusterGroup from 'react-leaflet-cluster'
import CenterMap from './CenterMap';



export default function Map({ view, location, locations = mapLocations, currentUserLocation}: MapProps)
{
    return (
        <MapContainer
            className="max-w-full"
            zoom={13}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Center Map to User Location */}
            {
                currentUserLocation && <CenterMap lat={currentUserLocation.lat} lng={currentUserLocation.lng}/>
            }

            <MapLocationsContainer>
                <MarkerClusterGroup chunkedLoading>
                    {
                        locations.length > 0 ?
                            locations.map((mapLocation, index) => (
                                <Marker
                                    key={`${mapLocation.id}-${mapLocation.distance}`}
                                    position={[mapLocation.lat, mapLocation.lng]}
                                    icon={mapMarkers}
                                >
                                    <Popup className="rounded-md w-fit">
                                        <div
                                            className="relative flex justify-between bg-(--solid-white) border-2 border-(--brand-green-white-bg) h-fit w-fit min-w-[300px] px-4 py-8 mb-3 rounded-md"
                                            data-id={mapLocation.id}
                                        >
                                            <div className="flex flex-col justify-between h-full min-h-[80px]">

                                                <div className="popup-address-container flex flex-col gap-1">
                                                    <header className="address-header">
                                                        <h2 className="text-(--brand-green-white-bg)">
                                                            {mapLocation.street}
                                                        </h2>
                                                    </header>

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
                                                    <header>
                                                        <h3 className="font-bold text-(--brand-green-white-bg)">Åbningstider:</h3>
                                                    </header>
                                                    <p>{mapLocation.opening_hours}</p>
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