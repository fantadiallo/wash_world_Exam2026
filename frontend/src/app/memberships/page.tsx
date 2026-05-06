import MembershipCard from "@/src/components/cards/MembershipCard"
import Navigation from "@/src/components/navigation/Navigation";

const membership =
{
    id: '1',
    name: 'What the fuck',
    price: 100,
    description: 'Where the hell is Sandra?'
}

export default function Memberships()
{
    return (
        <>
            <Navigation />
            <MembershipCard membership={membership} />
        </>
    )
}