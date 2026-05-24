"use client";

import { useEffect } from "react";
import Image from "next/image";

import profileImage from "../../../public/images/profile_test_images/profile_test_image.jpg";

import Card from "@/src/components/cards/Card";
import Button from "@/src/components/buttons/Button";
import Heading from "@/src/components/headings/Heading";
import Section from "@/src/components/sections/Section";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

import { formatDate, formatTimestamp } from "@/src/app/utils/formatters";

import { useAuthGuard } from "@/src/hooks/useAuthGuard";
import { useProfile } from "@/src/hooks/useProfile";

export default function ProfileClient() {
  useAuthGuard();

  const { user, getProfile, isLoading } = useProfile();

  const latestWashDate = new Date();

  useEffect(() => {
    async function loadProfile() {
      try {
        await getProfile();

      } catch (error) {
        console.error(error);

        window.location.href = "/login";
      }
    }

    loadProfile();
  }, []);

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  }

  if (isLoading) {
    return (
      <p className="text-white text-center mt-20">
        Loading profile...
      </p>
    );
  }

  if (!user) {
    return null;
  }

  const fullName = `${user.user_first_name} ${user.user_last_name}`;

  return (
    <>
      <Section variant="profile_hero">
        <Image
          className="profile-image h-[90px] w-[90px] object-cover rounded-full"
          height={100}
          width={100}
          src={profileImage}
          alt={`${fullName} profile image`}
        />

        <div>
          <Heading>
            <h1 className="text-2xl">
              Velkommen, {fullName}
            </h1>

            <p className="text-sm">
              {user.user_email}
            </p>
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
              Guld
            </Heading>

            <p className="text-(--solid-white) mt-4 text-sm">
              Ubegrænset bilvask
            </p>
          </div>

          <FontAwesomeIcon
            icon={faCrown}
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
                date: latestWashDate,
                dateTimeFormat: "da-DK",
                dayFormat: "numeric",
                monthFormat: "long",
              })}
            </Heading>

            <p className="text-sm mt-2">
              Klokken{" "}
              <span>
                {formatTimestamp({
                  time: latestWashDate,
                  dateTimeFormat: "da-DK",
                  hourFormat: "2-digit",
                  minuteFormat: "2-digit",
                })}
              </span>
            </p>
          </div>

          <FontAwesomeIcon
            icon={faCalendar}
            className="text-[50px] text-(--splash-orange)"
          />
        </Card>
      </Section>

      <Button
        variant="auth"
        text="Log ud"
        onClick={handleLogout}
      />
    </>
  );
}