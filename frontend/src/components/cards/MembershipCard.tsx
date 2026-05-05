import Card from "./Card";
import type { Membership } from "../../types/membership";
import Button from "../buttons/Button";

type MembershipCardProps = {
  membership: Membership;
};

export default function MembershipCard({ membership }: MembershipCardProps) {
  return (
    <Card className="bg-white text-black text-center">
      <h3 className="text-[#06c167] text-xl font-bold uppercase">
        {membership.name}
      </h3>

      <p className="text-sm font-bold mt-1">
        {membership.price} kr./md.
      </p>

      <p className="text-sm font-bold mt-2">
        {membership.description}
      </p>

      {/* 
<ul className="bg-gray-300 min-h-32 my-6 flex flex-col items-center justify-center gap-2 font-bold text-sm">
  {membership.features?.map((feature) => (
    <li key={feature}>{feature}</li>
  ))}
</ul>
*/}
<div className="bg-gray-300 min-h-32 my-6 flex items-center justify-center font-bold text-sm">
  Items go here
</div>

      <Button text="Bliv medlem" variant="primary" className="mx-auto" />
    </Card>
  );
}