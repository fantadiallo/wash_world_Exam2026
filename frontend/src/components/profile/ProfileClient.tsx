"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import profileImage from "../../../public/images/profile_test_images/profile_test_image.jpg";

import Card from "@/src/components/cards/Card";
import Button from "@/src/components/buttons/Button";
import Heading from "@/src/components/headings/Heading";
import Section from "@/src/components/sections/Section";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faCrown,
  faTrophy,
  faMedal,
} from "@fortawesome/free-solid-svg-icons";

import { formatDate, formatTimestamp } from "@/src/app/utils/formatters";
import { API_BASE_URL } from "@/src/lib/api";

type ProfileUser = {
  user_id: string;
  user_first_name: string;
  user_last_name: string;
  user_email: string;
};

type ActiveSubscription = {
  subscription_id: string;
  user_id: string;
  subscription_type_id: string;
  subscription_name: string;
  subscription_price: number;
  subscription_description: string;
  subscription_icon: string | null;
  subscription_status: string;
  subscription_created_at: string;
  subscription_start_date: string;
  subscription_renewal_date: string;
  features: string[];
};

const subscriptionIconMap = {
  faCrown: faCrown,
  faTrophy: faTrophy,
  faMedal: faMedal,
};

export default function ProfileClient() {
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [activeSubscription, setActiveSubscription] =
    useState<ActiveSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfileData() {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Not logged in");
        }

        const profileResponse = await fetch(`${API_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profileData = await profileResponse.json();

        if (!profileResponse.ok) {
          throw new Error(profileData.message || "Not logged in");
        }

        const profileUser = profileData.user;
        setUser(profileUser);

        const subscriptionResponse = await fetch(
          `${API_BASE_URL}/subscriptions/user/${profileUser.user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const subscriptionData = await subscriptionResponse.json();

        if (!subscriptionResponse.ok) {
          throw new Error(
            subscriptionData.message || "Could not fetch subscription"
          );
        }

        setActiveSubscription(subscriptionData.active_subscription);
      } catch (error) {
        console.error(error);
        setUser(null);
        setActiveSubscription(null);
      } finally {
        setLoading(false);
      }
    }

    loadProfileData();
  }, []);

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    window.location.href = "/";
  }

  const backButton = (
    <Link
      href="/"
      className="text-(--solid-white) text-2xl transition-colors duration-150 ease-in hover:text-(--brand-green-dark-bg)"
      aria-label="Tilbage til forsiden"
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </Link>
  );

  if (loading) {
    return (
      <>
        {backButton}

        <p className="text-white text-center mt-20">
          Loading profile...
        </p>
      </>
    );
  }

  if (!user) {
    return (
      <>
        {backButton}

        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <Heading variant="section_sub_heading_green">
            Du er ikke logget ind
          </Heading>

          <p className="text-(--solid-white) mt-3">
            Log ind for at se din profil og dit medlemskab.
          </p>

          <div className="mt-6">
            <Button
              as="link"
              href="/login"
              text="Gå til login"
              variant="membership_card"
            />
          </div>
        </div>
      </>
    );
  }

  const fullName = `${user.user_first_name} ${user.user_last_name}`;
  const latestWashDate = new Date();
  const latestWashDay = latestWashDate.getDate();

  const subscriptionIcon =
    activeSubscription?.subscription_icon &&
    activeSubscription.subscription_icon in subscriptionIconMap
      ? subscriptionIconMap[
          activeSubscription.subscription_icon as keyof typeof subscriptionIconMap
        ]
      : faCrown;

  return (
    <>
      {backButton}

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
            <h1 className="text-2xl text-(--solid-white)">
              Velkommen, {fullName}
            </h1>

            <p className="text-sm text-(--solid-white)">
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

            {activeSubscription ? (
              <>
                <Heading variant="membership_status_and_date_heading">
                  {activeSubscription.subscription_name}
                </Heading>

                <p className="text-sm mt-2 text-(--solid-white)">
                  {activeSubscription.subscription_price} kr./md.
                </p>

                <p className="text-sm mt-2 text-(--solid-white)">
                  Status: {activeSubscription.subscription_status}
                </p>

                <ul className="text-(--solid-white) mt-4 space-y-1 text-sm">
                  <Heading>
                    <h4>Fordele:</h4>
                  </Heading>

                  {activeSubscription.features.map((feature, index) => (
                    <li key={index}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <Heading variant="membership_status_and_date_heading">
                  Intet aktivt medlemskab
                </Heading>

                <p className="text-sm mt-2 text-(--solid-white)">
                  Du har ikke valgt et medlemskab endnu.
                </p>

                <div className="mt-4">
                  <Button
                    as="link"
                    href="/memberships"
                    text="Vælg medlemskab"
                    variant="membership_card"
                  />
                </div>
              </>
            )}
          </div>

          {activeSubscription && (
            <FontAwesomeIcon
              icon={subscriptionIcon}
              className="text-5xl text-(--splash-orange)"
            />
          )}
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

            <p className="text-sm mt-2 text-(--solid-white)">
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

          <div className="relative">
            <div className="absolute top-[62%] left-[50%] -translate-[50%]">
              <p className="text-xs text-center">
                <span className="text-(--splash-orange)">
                  {latestWashDay}
                </span>
              </p>
            </div>

            <FontAwesomeIcon
              icon={faCalendar}
              className="text-[50px] text-(--splash-orange)"
            />
          </div>
        </Card>
      </Section>

      <div className="mt-8 mb-16">
        <Button
          variant="auth"
          text="Log ud"
          onClick={handleLogout}
        />
      </div>
    </>
  );
}