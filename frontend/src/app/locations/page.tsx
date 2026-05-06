import locations from '@/src/app/map_frontend_test_data/locations'
import Navigation from "@/src/components/navigation/Navigation";
import CardsContainer from "@/src/components/containers/CardsContainer";
import LocationCard from "@/src/components/cards/LocationCard";
import Layout from '../layout';
import PageContainer from '@/src/components/containers/PageContainer';


export default function Locations()
{
    return (
        <Layout>
            <Navigation />
            <PageContainer>
                    <div className="container nearest-wash-worlds-container">
                        <header className="text-(--brand-green-dark-bg) uppercase text-lg mb-2">
                            <h3>Vaskehaller nær dig</h3>
                        </header>
                        <CardsContainer>
                            {
                                locations.length > 0 ?
                                    locations.map((location, index) => (
                                        <LocationCard key={index} {...location} />
                                    )) : (
                                        ''
                                    )
                            }
                        </CardsContainer>
                    </div>
            </PageContainer>
        </Layout>
    )
}