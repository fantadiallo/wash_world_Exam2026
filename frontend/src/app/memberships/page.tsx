import MembershipCard from "@/src/components/cards/MembershipCard";
import Navigation from "@/src/components/navigation/Navigation";

const membership = {
  id: "1",
  name: "Premium",
  price: 299,
  description: "Unlimited washes and discounts",
};

export default function Memberships() {
  return (
    <>
      <Navigation />

      <MembershipCard membership={membership} />
    </>
  );
}