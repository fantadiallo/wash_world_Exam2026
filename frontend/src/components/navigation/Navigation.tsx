'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { NavLink } from '@/src/types/navLinks'
import Link from 'next/link'

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

        <button
          className="text-white cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Close' : 'Open'}
        </button>

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