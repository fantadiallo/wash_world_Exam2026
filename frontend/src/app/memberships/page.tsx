import MembershipCard from "@/src/components/cards/MembershipCard";
import Navigation from "@/src/components/navigation/Navigation";
import Layout from "../layout";
import PageContainer from "@/src/components/containers/PageContainer";
import Image from "next/image";
import Overlay from "@/src/components/overlay/Overlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faCreditCard, faVideo } from "@fortawesome/free-solid-svg-icons";
import Heading from "@/src/components/headings/Heading";
import Button from "@/src/components/buttons/Button";
import Section from "@/src/components/sections/Section";
import Paragraph from "@/src/components/paragraphs/Paragraph";
import { API_BASE_URL } from "@/src/lib/api";
import type { Membership } from "@/src/types/membership";

async function getMemberships(): Promise<Membership[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/subscription-types`, {
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not fetch memberships");
    }

    return data.data || [];
  } catch (error) {
    console.error("Could not load memberships:", error);
    return [];
  }
}

export default async function Memberships() {
  const memberships = await getMemberships();

  return (
    <Layout>
      <Navigation />

      {/* HERO - full bleed, no PageContainer */}
      <Section variant="hero">
        <Image
          src="/images/heroImg.png"
          alt="car wash"
          height={100}
          width={100}
          className="absolute inset-0 object-cover h-full w-full z-0"
        />

        <Overlay />

        <PageContainer className="h-full justify-center">
          <div className="relative z-[10000] flex items-center h-full">
            <div>
              <Heading variant="hero_heading_white">
                Vælg dit
                <br />
                medlemskab

                <Heading className="mt-2" variant="hero_heading_green">
                  fra 99 kr./md.
                </Heading>
              </Heading>

            </div>
          </div>
        </PageContainer>
      </Section>

      <PageContainer>
        {/* INFO HEADER */}
        <Section variant="page">
          <Heading variant="section_main_heading_green">
            Tilmeld dig
            <br />
            på kun 2 min!

            <p className="text-(--solid-white) mt-2 text-lg max-w-2xl">
              Over 100.000 medlemmer vasker allerede til en fast,
              lav pris med løbende betaling i over 140 vaskehaller
              på tværs af Danmark.
            </p>
          </Heading>

          <p className="text-(--solid-white) mt-6 font-bold">
          </p>
        </Section>

        {/* INFO BOX */}
        <Section variant="page">
          <div>

            <div className="mt-3 space-y-8">
              <div>
                <Heading variant="section_sub_heading_white">
                  <FontAwesomeIcon icon={faCreditCard} /> Opret medlemskab
                </Heading>

                <Paragraph variant="default">
                  Vælg det medlemskab, som passer til dit behov, og vask med det samme.
                </Paragraph>
              </div>

              <div>
                <Heading variant="section_sub_heading_white">
                  <FontAwesomeIcon icon={faVideo} /> Nummerpladegenkendelse
                </Heading>

                <Paragraph variant="default">
                  Vi scanner automatisk din nummerplade, som dit medlemskab er registreret på.
                </Paragraph>
              </div>

              <div>
                <Heading variant="section_sub_heading_white">
                  <FontAwesomeIcon icon={faCar} /> Bliv siddende i bilen
                </Heading>

                <Paragraph variant="default">
                  Læn dig godt tilbage i sædet og nyd din bilvask.
                </Paragraph>
              </div>
            </div>
          </div>
        </Section>

        {/* MEMBERSHIP CARD */}
        <Section variant="page">
       
          <div className="flex flex-col gap-4">
            {memberships.length > 0 ? (
              memberships.map((membership) => (
                <MembershipCard
                  key={membership.id}
                  membership={membership}
                />
              ))
            ) : (
              <p className="text-(--solid-white)">
                Ingen medlemskaber fundet.
              </p>
            )}
          </div>
        </Section>
      </PageContainer>
    </Layout>
  );
}