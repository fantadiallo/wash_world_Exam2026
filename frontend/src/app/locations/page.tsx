"use client";

import { useState, useEffect } from "react";

import Navigation from "@/src/components/navigation/Navigation";
import CardsContainer from "@/src/components/containers/CardsContainer";
import LocationCard from "@/src/components/cards/LocationCard";
import PageContainer from "@/src/components/containers/PageContainer";
import Map from "@/src/components/maps/Map";
import useLocationsWithDistance from "@/src/hooks/useLocationsWithDistance";
import Heading from "@/src/components/headings/Heading";
import Footer from "@/src/components/layout/Footer";
import Section from "@/src/components/sections/Section";
import { API_BASE_URL } from "@/src/lib/api";

export default function Locations() {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentUserLocation, setCurrentUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await fetch(`${API_BASE_URL}/locations`);
        const data = await res.json();

        setLocations(data);
      } catch (err) {
        console.error("Failed to fetch locations:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLocations();
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setCurrentUserLocation({
        lat: latitude,
        lng: longitude,
      });
    });
  }, []);

  const locationsWithDistance = useLocationsWithDistance(locations ?? []);

  const closestFourLocations = [...locationsWithDistance]
    .sort((a, b) => Number(a.distance) - Number(b.distance))
    .slice(0, 4);

  return (
    <>
      <Navigation />

      <PageContainer>
        <Section variant="page">
          <Heading variant="section_main_heading_white">
            Find din nærmeste
            <br />
            <span className="text-(--brand-green-dark-bg)">
              Wash World
            </span>
          </Heading>

          <div className="container nearest-wash-worlds-container mt-4">
            <Heading variant="section_sub_heading_green">
              Vaskehaller nær dig
            </Heading>

            <CardsContainer>
              {loading ? (
                <p>Loading...</p>
              ) : closestFourLocations.length > 0 ? (
                closestFourLocations.map((location, index) => (
                  <LocationCard
                    key={location.id ?? index}
                    {...location}
                  />
                ))
              ) : (
                <p>Ingen lokationer</p>
              )}
            </CardsContainer>
          </div>
        </Section>

        <Section variant="page">
          <div className="w-full min-h-[520px] mb-32">
            <Heading variant="section_sub_heading_green">
              Oversigt over vaskehaller
            </Heading>

            <div className="w-full h-[450px] mt-4 rounded-xl overflow-hidden">
              <Map
                locations={locationsWithDistance}
                currentUserLocation={currentUserLocation}
              />
            </div>
          </div>
        </Section>
      </PageContainer>

      <Footer phone="+4570707070" />
    </>
  );
}