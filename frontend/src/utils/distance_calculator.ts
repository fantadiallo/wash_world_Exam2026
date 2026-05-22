import { DistanceBetweenUserAndLocationProps, DegreesToRadiantsProps, AngleBetweenUserAndLocationProps, CentralAngleBetweenUserAndLocationInRadiantsProps} from "../types/distance_calculator"

export function calculateDistanceBetweenUserAndLocation({userLat, userLng, locationLat, locationLng}: DistanceBetweenUserAndLocationProps)
{
     if (!userLat || !userLng || !locationLat || !locationLng)
     {
        return null
     }

    const earthRadiusInKm = 6371
    const degreesLat = convertDegreesToRadiants({degrees: locationLat - userLat})
    const degreesLng = convertDegreesToRadiants({degrees: locationLng - userLng})
    const angleBetweenUserAndLocation = caluculateAngleBetweenUserAndLocation({userLat, locationLat, degreesLat, degreesLng})
    const centralAngle = calculateCentralAngleBetweenUserAndLocationInRadiants({angleBetweenUserAndLocation})
    
    return earthRadiusInKm * centralAngle
}


// HELPER FUNCTIONS //
const convertDegreesToRadiants = ({degrees}: DegreesToRadiantsProps) =>
{
    return degrees * Math.PI / 180
}


const caluculateAngleBetweenUserAndLocation = ({userLat, locationLat, degreesLat, degreesLng}: AngleBetweenUserAndLocationProps) =>
{
    const angle =
        Math.sin(degreesLat / 2) ** 2 +
        Math.cos(convertDegreesToRadiants({ degrees: userLat })) *
        Math.cos(convertDegreesToRadiants({ degrees: locationLat })) *
        Math.sin(degreesLng / 2) ** 2 
    return angle
}

const calculateCentralAngleBetweenUserAndLocationInRadiants = ({angleBetweenUserAndLocation}: CentralAngleBetweenUserAndLocationInRadiantsProps) =>
{
    const angle = 2 * Math.atan2(Math.sqrt(angleBetweenUserAndLocation), Math.sqrt(1 - angleBetweenUserAndLocation))
    return angle
}