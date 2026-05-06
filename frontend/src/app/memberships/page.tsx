import MembershipCard from "@/src/components/cards/MembershipCard";
import Navigation from "@/src/components/navigation/Navigation";

const membership = {
  id: "1",
  name: "GULD",
  price: 139,
  description: "God og effektiv",
  features: [
    "Unlimited washes",
    "Priority booking",
    "Free vacuum",
    "Discount on detailing",
  ],
};

export default function Memberships() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-(--gray-eighty)">

        {/* HERO */}
        <section className="relative h-[70vh] overflow-hidden">

          <img
            src="/images/heroImg.png"
            alt="Car wash"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 flex h-full items-center px-6 md:px-12">
            <div className="max-w-2xl">

              <h1 className="text-(--solid-white) text-5xl md:text-7xl leading-none">
                Ubegrænset
                <br />
                bilvask for
              </h1>

              <p className="text-(--brand-green-white-bg) text-5xl md:text-7xl mt-4">
                139 kr./md.
              </p>

              <button className="mt-8 text-(--solid-white) border-b border-(--solid-white) pb-1 hover:text-(--brand-green-white-bg) hover:border-(--brand-green-white-bg) transition">
                Bliv medlem
              </button>

            </div>
          </div>
        </section>

        {/* INFO HEADER */}
        <section className="bg-(--gray-eighty) px-6 pt-16">
          <div className="max-w-4xl mx-auto">

            <h2 className="text-(--brand-green-white-bg) text-4xl md:text-6xl leading-tight">
              Vælg dit
              <br />
              medlemskab
            </h2>

            <p className="text-(--solid-white) mt-6 text-lg max-w-2xl">
              Over 100.000 medlemmer vasker allerede til en fast,
              lav pris med løbende betaling i over 140 vaskehaller
              på tværs af Danmark.
            </p>

            <p className="text-(--solid-white) mt-6 font-bold">
              Bliv medlem på kun 2 minutter i dag.
            </p>

          </div>
        </section>

        {/* INFO BOX */}
        <section className="bg-(--gray-eighty) px-6 py-10">
          <div className="mx-auto max-w-4xl border-l-4 border-r-4 border-(--brand-green-white-bg) px-6 py-8 text-(--solid-white)">

            <h3 className="font-bold underline">
              Ubegrænset bilvask
            </h3>

            <div className="mt-8 space-y-8">

              <div>
                <h4 className="text-(--brand-green-white-bg) font-bold underline">
                  Opret medlemskab
                </h4>

                <p className="mt-2">
                  Vælg det medlemskab, som passer til dit behov
                  og vask med det samme.
                </p>
              </div>

              <div>
                <h4 className="text-(--brand-green-white-bg) font-bold underline">
                  Nummerpladegenkendelse
                </h4>

                <p className="mt-2">
                  Vi scanner automatisk din nummerplade,
                  som dit medlemskab er registreret på.
                </p>
              </div>

              <div>
                <h4 className="text-(--brand-green-white-bg) font-bold underline">
                  Bliv siddende i bilen
                </h4>

                <p className="mt-2">
                  Læn dig godt tilbage i sædet
                  og nyd din bilvask.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* MEMBERSHIP CARD */}
        <section className="bg-(--gray-eighty) px-6 pb-20 flex justify-center">
          <MembershipCard membership={membership} />
        </section>

      </main>
    </>
  );
}