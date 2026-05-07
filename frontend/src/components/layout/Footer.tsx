type FooterProps = {
    address: string
    phone: string
  }
  
  export default function Footer({ address, phone }: FooterProps) {
    return (
      <footer className="w-full bg-(--solid-black) text-(--solid-white) px-8 py-6">
        <div className="max-w-screen-md mx-auto flex flex-col gap-2 text-sm">
          <p>Adresse: {address}</p>
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="hover:text-(--brand-green-dark-bg) transition-colors duration-150 ease-in"
          >
            Tlf: {phone}
          </a>
        </div>
      </footer>
    )
  }