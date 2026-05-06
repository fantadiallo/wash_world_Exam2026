import Card from "./Card";
import type { Membership } from "../../types/membership";
import Button from "../buttons/Button";

type MembershipCardProps = {
  membership: Membership;
};

export default function MembershipCard({ membership }: MembershipCardProps) {
  return (
    <Card className="w-full max-w-[280px] bg-(--solid-white) text-(--solid-black) text-center px-6 py-8 mx-auto">
      <h3 className="text-(--brand-green-white-bg) text-xl font-bold uppercase">
        {membership.name}
      </h3>

      <p className="text-sm font-bold mt-1">
        {membership.price} kr./md.
      </p>

      <p className="text-sm font-bold mt-2">
        {membership.description}
      </p>

       <ul className="bg-(--gray-ten) min-h-32 my-6 p-4 flex flex-col justify-center gap-3 text-sm text-left">
         {membership.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <span className="text-(--brand-green-white-bg)">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <Button
        text="Bliv medlem"
        variant="primary"
        className="mx-auto"
      />
    </Card>
  );
}