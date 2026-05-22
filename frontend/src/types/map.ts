
import type { ReactNode } from "react"

export type MapProps =
{
    view: MapViewProps,
    locations: MapLocation[]
}

// Used for setting the default center of the map
export type MapViewProps =
{
    // The current center of the map
    centerCoordinates: [number, number]
    zoom: number,
}

// Used for setting the location of the given Wash World
export type MapLocationProps =
{
  id: string
  city: string
  street: string
  zip_code: string
  opening_hours: string
  carwash_amount: number
  self_carwash_amount: number
  hasSelfCarWash: boolean
  image: string
  lat: string | number
  lng: string | number

  // keep this if you're using it elsewhere
  geoCode?: [number, number]
}

// Used for the popups
export type MapPopUpProps =
{
    children: ReactNode,
    className: string,
}

// Used for the icon
export type MapMarkerIconProps =
{
    iconSize: number
}

// Used for centering the map
export type MapCenterProps =
{
    lat: number,
    lng: number,
}

// Map Locations Container 
export type MapLocationsContainerProps =
{
    children: ReactNode,
}

