// app/dashboard/ProfileClient.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import profileImage from "../../../public/images/profile_test_images/profile_test_image.jpg";

import Navigation from "@/src/components/navigation/Navigation";
import PageContainer from "@/src/components/containers/PageContainer";
import Card from "@/src/components/cards/Card";
import Button from "@/src/components/buttons/Button";
import Heading from "@/src/components/headings/Heading";
import Section from "@/src/components/sections/Section";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memberships } from "@/src/services/memberships";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { formatDate, formatTimestamp } from "@/src/app/utils/formatters";
// import { formatDate, formatTimestamp } from "../utils/formatters";

export default function ProfileClient() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const res = await fetch("http://127.0.0.1/dashboard", {
          credentials: "include",
        });

        if (!res.ok) 
        {
throw new Error("Not logged in")
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Not logged in</p>;

  const membershipId = "premium";
  const membership = memberships.find(
    (m) => m.id === membershipId.toLowerCase()
  );

  const dateObj = new Date();
  const date = dateObj.getDate();

  return (
    <PageContainer>
      <Navigation />

      <Section variant="profile_hero">
        <Image
          className="profile-image h-[90px] w-[90px] object-cover rounded-full"
          height={100}
          width={100}
          src={profileImage}
          alt="profile image"
        />

        <div>
          <Heading>
            <h1 className="text-2xl">
              Velkommen, {user?.first_name}
            </h1>
            <p className="text-sm">{user?.email}</p>
          </Heading>
        </div>
      </Section>

      <Section variant="profile_information">
        <Card className="flex justify-between items-center">
          <div>
            <Heading variant="dashboard_card_topic_heading">
              Dit medlemskab
            </Heading>

            <Heading variant="membership_status_and_date_heading">
              {membership?.name}
            </Heading>

            <ul className="text-(--solid-white) mt-4 space-y-1 text-sm">
              <Heading>
                <h4>Fordele:</h4>
              </Heading>

              {membership?.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <FontAwesomeIcon
            icon={membership?.icon}
            className="text-5xl text-(--splash-orange)"
          />
        </Card>

        <Card className="flex justify-between items-center">
          <div>
            <Heading variant="dashboard_card_topic_heading">
              Seneste vask
            </Heading>

            <Heading variant="membership_status_and_date_heading">
              {formatDate({
                date: dateObj,
                dateTimeFormat: "da-DK",
                dayFormat: "numeric",
                monthFormat: "long",
              })}
            </Heading>

            <p className="text-sm mt-2">
              Klokken{" "}
              <span>
                {formatTimestamp({
                  time: dateObj,
                  dateTimeFormat: "da-DK",
                  hourFormat: "2-digit",
                  minuteFormat: "2-digit",
                })}
              </span>
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-[62%] left-[50%] -translate-[50%]">
              <p className="text-xs text-center">
                <span className="text-(--splash-orange)">{date}</span>
              </p>
            </div>

            <FontAwesomeIcon
              icon={faCalendar}
              className="text-[50px] text-(--splash-orange)"
            />
          </div>
        </Card>
      </Section>

      <Button variant="auth">Log ud</Button>
    </PageContainer>
  );
}