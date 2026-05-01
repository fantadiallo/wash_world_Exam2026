'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { NavLink } from '@/src/types/navLinks'
import Button from '../buttons/Button'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import {
  faHouse,
  faIdCard,
  faLocationDot,
  faUserPlus,
  faCircleUser,
  faXmark,
  faBars,
} from '@fortawesome/free-solid-svg-icons'

const links: NavLink[] = [
  { text: 'Hjem', href: '/', icon: faHouse },
  { text: 'Medlemskab', href: '/memberships', icon: faIdCard },
  { text: 'Find Vaskehal', href: '/locations', icon: faLocationDot },
  { text: 'Opret bruger', href: '/register', icon: faUserPlus },
  { text: 'Min Profil', href: '/profile', icon: faCircleUser },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  if(pathname !== '/profile')
  {
    return (
        <nav className={`w-full ${isOpen ? 'fixed inset-0 z-50 bg-(--gray-eighty)' : 'bg-(--gray-eighty)'}`}>
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
              className="text-white cursor-pointer text-2xl w-8 flex justify-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
            </button>
          </div>
          {isOpen && (
            <div className="flex items-center justify-center w-full h-[calc(100vh-4rem)]">
                <ul className="flex flex-col gap-8 w-fit">
                  {links.map((link) => {
                    const isActive = link.href === pathname
                    return (
                      <li className="font-gilroy text-2xl" key={link.href}>
                        <Link
                          className={`flex items-center gap-4 transition-colors duration-150 ease-in hover:text-(--brand-green-dark-bg) ${isActive ? 'text-(--brand-green-dark-bg)' : 'text-(--solid-white)'}`}
                          href={link.href}
                        >
                          <span className="w-7 flex justify-center">
                            {link.icon && <FontAwesomeIcon icon={link.icon} />}
                          </span>
                          <span className={isActive ? 'border-b-2 border-(--brand-green-dark-bg)' : ''}>
                            {link.text}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            </div>
          )}
        </nav>
      )
  }
  
  else
  {
    return (
      <Button className="text-(--solid-white) transition-text duration-150 ease-in hover:text-(--brand-green-dark-bg)" as="link" href="/locations">
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
    )
  }
}