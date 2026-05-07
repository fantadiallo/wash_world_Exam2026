'use client'
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { MapCenterProps } from '@/src/types/map';

export default function CenterMap({lat, lng}: MapCenterProps)
{
    const map = useMap()    

    useEffect(() => {
        map.setView([lat, lng], 13)
    }, [lat, lng, map])
}
