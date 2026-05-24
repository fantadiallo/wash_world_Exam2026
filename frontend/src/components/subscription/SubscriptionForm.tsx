"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "../buttons/Button";
import Card from "../cards/Card";
import Heading from "../headings/Heading";
import Paragraph from "../paragraphs/Paragraph";
import { API_BASE_URL } from "@/src/lib/api";

type BackendMembership = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
};

type BackendUser = {
  user_id: string;
  user_first_name: string;
  user_last_name: string;
  user_email: string;
};

export default function SubscriptionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const membershipId = searchParams.get("membership");

  const [memberships, setMemberships] = useState<BackendMembership[]>([]);
  const [user, setUser] = useState<BackendUser | null>(null);

  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [toast, setToast] = useState("");

  const [acceptTerms, setAcceptTerms] = useState(false);

  const membership = useMemo(() => {
    return memberships.find((item) => item.id === membershipId) || null;
  }, [memberships, membershipId]);

  useEffect(() => {
    async function loadSubscriptionPageData() {
      try {
        setLoading(true);
        setToast("");

        const token = localStorage.getItem("access_token");

        if (!token) {
          router.push(membershipId ? `/login?membership=${membershipId}` : "/login");
          return;
        }

        const membershipsResponse = await fetch(`${API_BASE_URL}/subscription-types`);
        const membershipsData = await membershipsResponse.json();

        if (!membershipsResponse.ok) {
          throw new Error(membershipsData.message || "Kunne ikke hente medlemskaber");
        }

        setMemberships(membershipsData.data || []);

        const profileResponse = await fetch(`${API_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profileData = await profileResponse.json();

        if (!profileResponse.ok) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
          router.push(membershipId ? `/login?membership=${membershipId}` : "/login");
          return;
        }

        setUser(profileData.user);

      } catch (error) {
        setToast(error instanceof Error ? error.message : "Noget gik galt");
      } finally {
        setLoading(false);
      }
    }

    loadSubscriptionPageData();
  }, [membershipId, router]);

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAcceptTerms(event.target.checked);
  }

  async function handleConfirmSubscription() {
    try {
      setToast("");

      if (!membership) {
        setToast("Medlemskab blev ikke fundet.");
        return;
      }

      if (!user) {
        setToast("Du skal være logget ind for at oprette medlemskab.");
        return;
      }

      if (!acceptTerms) {
        setToast("Du skal acceptere betingelserne.");
        return;
      }

      const token = localStorage.getItem("access_token");

      if (!token) {
        router.push(`/login?membership=${membership.id}`);
        return;
      }

      setConfirming(true);

      const response = await fetch(`${API_BASE_URL}/subscriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subscription_type_id: membership.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Kunne ikke oprette medlemskab");
      }

      router.push("/profile");

    } catch (error) {
      setToast(error instanceof Error ? error.message : "Noget gik galt");
    } finally {
      setConfirming(false);
    }
  }

  function handleCancelSubscription() {
    router.push("/profile");
  }

  if (loading) {
    return (
      <Card className="bg-(--solid-white) text-(--solid-black) px-6 py-8">
        <Heading variant="form_heading">Indlæser...</Heading>
      </Card>
    );
  }

  if (!membershipId) {
    return (
      <Card className="bg-(--solid-white) text-(--solid-black) px-6 py-8">
        <Heading variant="form_heading">Intet medlemskab valgt</Heading>

        <Paragraph variant="opening_hours" className="mt-3">
          Du skal vælge et medlemskab, før du kan fortsætte.
        </Paragraph>

        <div className="mt-6">
          <Button
            as="link"
            href="/memberships"
            text="Tilbage til medlemskaber"
            variant="membership_card"
          />
        </div>
      </Card>
    );
  }

  if (!membership) {
    return (
      <Card className="bg-(--solid-white) text-(--solid-black) px-6 py-8">
        <Heading variant="form_heading">Medlemskab ikke fundet</Heading>

        <Paragraph variant="opening_hours" className="mt-3">
          Det valgte medlemskab findes ikke. Gå tilbage og vælg et medlemskab igen.
        </Paragraph>

        <div className="mt-6">
          <Button
            as="link"
            href="/memberships"
            text="Tilbage til medlemskaber"
            variant="membership_card"
          />
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-(--solid-white) text-(--solid-black) px-6 py-8">
      <Heading variant="form_heading">Bekræft medlemskab</Heading>

      <Paragraph variant="opening_hours" className="mb-6">
        Gennemgå dit valgte medlemskab, før du bekræfter.
      </Paragraph>

      {toast && (
        <p className="mb-4 rounded-xl bg-red-100 px-4 py-3 text-red-700">
          {toast}
        </p>
      )}

      <div className="mb-6">
        <Heading variant="membership_card_heading" className="text-(--brand-green-white-bg)">
          {membership.name}
        </Heading>

        <p className="text-md font-bold mt-2 text-(--gray-eighty)">
          {membership.price} kr./md.
        </p>

        <p className="text-sm font-bold mt-2 text-(--gray-sixty)">
          {membership.description}
        </p>

        <ul className="bg-(--gray-ten) min-h-32 my-6 p-4 flex flex-col justify-center gap-3 text-sm text-(--gray-eighty)">
          {membership.features.map((feature) => (
            <li key={feature}>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {user && (
        <>
          <div className="mb-6">
            <label className="block mb-2 font-bold text-(--brand-green-white-bg)">
              Fulde navn
            </label>

            <input
              type="text"
              value={`${user.user_first_name} ${user.user_last_name}`}
              readOnly
              className="rounded-md w-full bg-(--gray-ten) p-4 text-(--gray-eighty)"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-bold text-(--brand-green-white-bg)">
              E-mail
            </label>

            <input
              type="email"
              value={user.user_email}
              readOnly
              className="rounded-md w-full bg-(--gray-ten) p-4 text-(--gray-eighty)"
            />
          </div>
        </>
      )}

      <div className="mb-8">
        <label className="flex items-start gap-3 text-(--gray-eighty)">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={handleCheckboxChange}
            className="mt-1"
          />
          <span>
            Jeg accepterer medlemskabets betingelser og månedlig betaling.
          </span>
        </label>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          onClick={handleConfirmSubscription}
          text={confirming ? "Bekræfter..." : "Bekræft medlemskab"}
          variant="submit"
          disabled={confirming}
        />

        <Button
          onClick={handleCancelSubscription}
          text="Annullér"
          variant="membership_card"
          disabled={confirming}
        />
      </div>
    </Card>
  );
}