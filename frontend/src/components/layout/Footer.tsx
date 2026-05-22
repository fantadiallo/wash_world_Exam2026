import Paragraph from "../paragraphs/Paragraph"
import { FooterProps } from "@/src/types/footer"



  
  export default function Footer({ address, phone }: FooterProps) {
    return (
      <footer className="w-full bg-(--solid-black) text-(--solid-white) px-8 py-6">
        <div className="max-w-screen-md mx-auto flex flex-col gap-2 text-sm">
          <Paragraph variant="default">Adresse: {address}</Paragraph>
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