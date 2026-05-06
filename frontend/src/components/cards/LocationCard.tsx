import Card from "./Card";
import Button from "../buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { LocationCardProps } from "@/src/types/card";

export default function LocationCard({address, city, distance, geoCode}: LocationCardProps)
{
    return (
        <Card variant="location_card">
             <div className="card-content-container flex items-center justify-between gap-4">
                <div className="location-container flex items-center gap-2">
                    <FontAwesomeIcon
                        className="text-[var(--brand-green-dark-bg)] text-2xl"
                        icon={faMapMarkerAlt}
                    />


                    <div className="flex flex-col">
                        <header className="text-[var(--brand-green-dark-bg)]">
                            <h2 className="text-xl">{address}</h2>
                        </header>
                        <p className="flex items-center gap-2 text-sm text-[var(--gray-ten)]">
                            <span className="city">{city}</span>
                            <span className="text-[var(--brand-green-dark-bg)]">•</span>
                            <span className="flex gap-1">
                                <span className="distance">{distance}</span>
                                <span>km</span>
                            </span>
                        </p>
                    </div>
                </div>

                 <Button
                    as="link"
                    variant="location_card"
                    href={`https://www.google.com/maps/dir/?api=1&destination=${geoCode[0]},${geoCode[1]}`}
                    target="_blank"
                >
                    Find vej
                </Button>
             </div>
        </Card>
    )   
}
