import { Icon } from 'leaflet'
import { MapMarkerIcon } from '../types/map_props'

// Everything here is based on the size of the map marker's dimensions (38x38)
const icon: MapMarkerIcon = {iconSize: 38}

// Centering the popup directly over the map marker horizontally
const iconAnchor = icon.iconSize / 2

// Setting the distance between the bottom of the popup and the map marker to be the same as iconAnchor
const popUpOffsetBottom = iconAnchor

// Instantiating the Icon object
export const mapMarkers = new Icon({
    iconUrl: '/images/marker.png',
    iconSize: [icon.iconSize, icon.iconSize],
    iconAnchor: [iconAnchor, icon.iconSize],
    popupAnchor: [-iconAnchor, -popUpOffsetBottom]
})