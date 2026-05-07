'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Button from '../buttons/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse,
  faIdCard,
  faLocationDot,
  faUserPlus,
  faCircleUser,
  faXmark,
  faBars,
  faPhone,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from '@/src/types/navLinks'

const links: NavLink[] = [
  { text: 'Hjem', href: '/', icon: faHouse },
  { text: 'Medlemskab', href: '/memberships', icon: faIdCard },
  { text: 'Find Vaskehal', href: '/locations', icon: faLocationDot },
  { text: 'Opret bruger', href: '/register', icon: faUserPlus },
  { text: 'Min Profil', href: '/profile', icon: faCircleUser },
]

export default function Navigation2() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isProfilePage = pathname === '/profile'

  if (isProfilePage) {
    return (
      <nav className="w-full bg-(--solid-black) px-8 py-6 h-16 flex items-center">
        <Button
          className="text-(--solid-white) transition-colors duration-150 ease-in hover:text-(--brand-green-dark-bg)"
          as="link"
          href="/locations"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
      </nav>
    )
  }

  return (
    <nav
      className={`w-full ${
        isOpen ? 'fixed inset-0 z-50 bg-(--gray-eighty)' : 'bg-(--gray-eighty)'
      }`}
    >
      <div className="bg-(--solid-black) flex justify-between items-center px-8 py-6 h-16">
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

        <button
          type="button"
          className="text-white cursor-pointer text-2xl w-8 flex justify-center"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Luk menu' : 'Åbn menu'}
        >
          <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-4rem)] px-8">
          <ul className="flex flex-col gap-8 w-fit">
            {links.map((link) => {
              const isActive = link.href === pathname

              return (
                <li className="font-gilroy text-2xl" key={link.href}>
                  <Link
                    className={`flex items-center gap-4 transition-colors duration-150 ease-in hover:text-(--brand-green-dark-bg) ${
                      isActive ? 'text-(--brand-green-dark-bg)' : 'text-(--solid-white)'
                    }`}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="w-7 flex justify-center">
                      {link.icon && <FontAwesomeIcon icon={link.icon} />}
                    </span>

                    <span
                      className={isActive ? 'border-b-2 border-(--brand-green-dark-bg)' : ''}
                    >
                      {link.text}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="mt-12 w-full max-w-[260px]">
            <Button
              as="link"
              href="tel:+4570707070"
              className="w-full border border-(--brand-green-dark-bg) text-(--solid-white) hover:text-(--brand-green-dark-bg) transition-colors duration-150 ease-in flex items-center justify-center gap-3 px-6 py-4"
            >
              <FontAwesomeIcon icon={faPhone} />
              <span>Kundeservice</span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}