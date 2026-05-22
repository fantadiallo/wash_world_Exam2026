'use client';

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "../buttons/Button";
import Card from "../cards/Card";
import Heading from "../headings/Heading";
import Paragraph from "../paragraphs/Paragraph";
import { memberships } from "@/src/services/memberships";
import { StoredSubscription, StoredUser, SubscriptionFormState } from "@/src/types/subscription";

function addOneMonth(date: Date) {
  const nextDate = new Date(date);
  nextDate.setMonth(nextDate.getMonth() + 1);
  return nextDate;
}

export default function SubscriptionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const membershipId = searchParams.get("membership");

  const [user, setUser] = useState<StoredUser | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [success, setSuccess] = useState(false);
  const [formState, setFormState] = useState<SubscriptionFormState>({
    acceptTerms: false,
  });

  const membership = useMemo(() => {
    return memberships.find((item) => item.id === membershipId) || null;
  }, [membershipId]);

  useEffect(() => {
    const storedUser = localStorage.getItem("washworld_user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoadingUser(false);
  }, []);

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({
      acceptTerms: event.target.checked,
    });
  }

  function handleConfirmSubscription() {
    if (!membership) {
      alert("Medlemskab blev ikke fundet.");
      return;
    }

    if (!user) {
      alert("Du skal oprette en bruger først.");
      return;
    }

    if (!formState.acceptTerms) {
      alert("Du skal acceptere betingelserne.");
      return;
    }

    const now = new Date();
    const renewalDate = addOneMonth(now);

    const subscriptionPayload: StoredSubscription = {
      subscriptionId: crypto.randomUUID(),
      userName: user.name,
      userEmail: user.email,
      subscriptionTypeId: membership.id,
      subscriptionTypeName: membership.name,
      subscriptionPrice: membership.price,
      subscriptionStatus: "active",
      createdAt: now.toISOString(),
      startDate: now.toISOString(),
      renewalDate: renewalDate.toISOString(),
    };

    localStorage.setItem("washworld_subscription", JSON.stringify(subscriptionPayload));
    setSuccess(true);
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

  if (loadingUser) {
    return (
      <Card className="bg-(--solid-white) text-(--solid-black) px-6 py-8">
        <Heading variant="form_heading">Indlæser...</Heading>
      </Card>
    );
  }

  if (success) {
    return (
      <Card className="bg-(--solid-white) text-(--solid-black) px-6 py-8">
        <Heading variant="form_heading">Medlemskab bekræftet</Heading>

        <Paragraph variant="opening_hours" className="mt-3">
          Dit medlemskab er nu gemt i frontend som mock-data og er klar til backend-integration.
        </Paragraph>

        <div className="mt-6 space-y-2 text-(--gray-eighty)">
          <p><strong>Medlemskab:</strong> {membership.name}</p>
          <p><strong>Pris:</strong> {membership.price} kr./md.</p>
        </div>

        <div className="mt-6">
          <Button
            as="link"
            href="/profile"
            text="Gå til profil"
            variant="membership_card"
          />
        </div>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="bg-(--solid-white) text-(--solid-black) px-6 py-8">
        <Heading variant="form_heading">Opret bruger først</Heading>

        <Paragraph variant="opening_hours" className="mt-3">
          Du skal oprette en bruger, før du kan bekræfte dit medlemskab.
        </Paragraph>

        <div className="mt-6 space-y-3">
          <p className="text-(--gray-eighty)">
            <strong>Valgt medlemskab:</strong> {membership.name}
          </p>
          <p className="text-(--gray-eighty)">
            <strong>Pris:</strong> {membership.price} kr./md.
          </p>
        </div>

        <div className="mt-6">
          <Button
            as="link"
            href={`/register?membership=${membership.id}`}
            text="Opret bruger og fortsæt"
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
        Gennemgå dine oplysninger og bekræft det medlemskab, du har valgt.
      </Paragraph>

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
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-bold text-(--brand-green-white-bg)">Fulde navn</label>
        <input
          type="text"
          value={user.name}
          readOnly
          className="rounded-md w-full bg-(--gray-ten) p-4 text-(--gray-eighty)"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-bold text-(--brand-green-white-bg)">E-mail</label>
        <input
          type="email"
          value={user.email}
          readOnly
          className="rounded-md w-full bg-(--gray-ten) p-4 text-(--gray-eighty)"
        />
      </div>

      <div className="mb-8">
        <label className="flex items-start gap-3 text-(--gray-eighty)">
          <input
            type="checkbox"
            checked={formState.acceptTerms}
            onChange={handleCheckboxChange}
            className="mt-1"
          />
          <span>Jeg accepterer medlemskabets betingelser og månedlig betaling.</span>
        </label>
      </div>

      <Button
        onClick={handleConfirmSubscription}
        text="Bekræft medlemskab"
        variant="submit"
      />
    </Card>
  );
}