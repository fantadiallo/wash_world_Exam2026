"use client";

import { useRouter } from "next/navigation";
import Card from "./Card";
import type { Membership } from "../../types/membership";
import Button from "../buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Heading from "../headings/Heading";

type MembershipCardProps = {
  membership: Membership;
};

export default function MembershipCard({ membership }: MembershipCardProps) {
  const router = useRouter();

  function handleMembershipClick() {
    const token = localStorage.getItem("access_token");

    if (token) {
      router.push(`/subscription?membership=${membership.id}`);
      return;
    }

    router.push(`/login?membership=${membership.id}`);
  }

  return (
    <Card className="min-w-full max-w-[300px] bg-(--solid-white) text-(--solid-black) text-center px-6 py-8 mx-auto">
      <Heading variant="membership_card_heading">
        {membership.name}
      </Heading>

      <p className="text-md font-bold mt-1">
        {membership.price} kr./md.
      </p>

      <p className="text-sm font-bold mt-2">
        {membership.description}
      </p>

      <ul className="bg-(--gray-ten) min-h-32 my-6 p-4 flex flex-col justify-center gap-3 text-sm">
        {membership.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faCheck}
              className="text-(--brand-green-white-bg)"
            />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        text="Bliv medlem"
        variant="membership_card"
        className="mx-auto justify-center"
        onClick={handleMembershipClick}
      />
    </Card>
  );
}