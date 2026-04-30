'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { NavLink } from '@/src/types/navLinks'
import Button from '@/src/components/buttons/Button.tsx'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const links: NavLink[] = [
  { text: 'Hjem', href: '/' },
  { text: 'Medlemskab', href: '/membership' },
  { text: 'Find Vaskehal', href: '/locations' },
]

export default function Navigation()
{
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-(--solid-black) w-full">
      <div className="flex justify-between items-center px-8 py-6 h-16">

        {pathname !== '/' ? (
          <Link href="/">
            <span className="font-bold text-xl text-(--brand-green-dark-bg)">W</span>
            <span className="font-bold text-xl text-(--solid-white)">ash </span>
            <span className="font-bold text-xl text-(--brand-green-dark-bg)">W</span>
            <span className="font-bold text-xl text-(--solid-white)">orld</span>
          </Link>
        ) : (
          <span className="cursor-default">
            <span className="font-bold text-xl text-(--brand-green-dark-bg)">W</span>
            <span className="font-bold text-xl text-(--solid-white)">ash </span>
            <span className="font-bold text-xl text-(--brand-green-dark-bg)">W</span>
            <span className="font-bold text-xl text-(--solid-white)">orld</span>
          </span>
        )}

        <Button className="text-white text-xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {!isOpen ? <FontAwesomeIcon className="transition-text duration-150 ease-in hover:text-(--brand-green-dark-bg)" icon={faBars} /> : <FontAwesomeIcon className="transition-text duration-150 ease-in hover:text-(--brand-green-dark-bg)" icon={faTimes} />}
        </Button>
      </div>

      {isOpen && (
        <div className="bg-(--solid-black) w-full">
          <ul className="flex flex-col justify-center gap-12 text-center w-full h-[calc(100vh-4rem)]">
            {links.length > 0 ? (
              links.map((link) =>
              {
                const isActive = link.href === pathname

                return (
                  <li className="font-gilroy text-2xl" key={link.href}>
                    <Link
                      className={`${isActive ? 'text-(--brand-green-dark-bg) border-b-4 border-(--brand-green-dark-bg)' : 'text-(--solid-white)'} transition-colors duration-150 ease-in hover:text-(--brand-green-dark-bg)`}
                      href={link.href}
                    >
                      {link.text}
                    </Link>
                  </li>
                )
              })
            ) : (
              <p className="text-(--solid-white)">No links</p>
            )}
          </ul>
        </div>
      )}
    </nav>
  )
}