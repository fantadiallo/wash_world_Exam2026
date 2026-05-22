export type DistanceBetweenUserAndLocationProps =
{
    userLat: number,
    userLng: number,
    locationLat: number,
    locationLng: number,
}

export type DegreesToRadiantsProps =
{
    degrees: number
}

export type AngleBetweenUserAndLocationProps =
{
    userLat: number,
    locationLat: number,
    degreesLat: number,
    degreesLng: number,
}

export type CentralAngleBetweenUserAndLocationInRadiantsProps =
{
    angleBetweenUserAndLocation: number,
}