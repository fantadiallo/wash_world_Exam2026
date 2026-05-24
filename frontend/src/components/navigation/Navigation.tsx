"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavLink } from "@/src/types/navLinks";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_BASE_URL } from "@/src/lib/api";

import {
  faHouse,
  faIdCard,
  faLocationDot,
  faUserPlus,
  faCircleUser,
  faXmark,
  faBars,
  faRightToBracket,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

type LoggedInUser = {
  user_id: string;
  user_first_name: string;
  user_last_name: string;
  user_email: string;
};

const publicLinks: NavLink[] = [
  { text: "Hjem", href: "/", icon: faHouse },
  { text: "Medlemskab", href: "/memberships", icon: faIdCard },
  { text: "Find Vaskehal", href: "/locations", icon: faLocationDot },
];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    async function checkLoggedInUser() {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          setLoggedInUser(null);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
          setLoggedInUser(null);
          return;
        }

        setLoggedInUser(data.user);
      } catch (error) {
        console.error(error);
        setLoggedInUser(null);
      } finally {
        setCheckingLogin(false);
      }
    }

    checkLoggedInUser();
  }, []);

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    setLoggedInUser(null);
    setIsOpen(false);

    router.push("/");
  }

  const isLoggedIn = loggedInUser !== null;

  return (
    <nav
      className={`w-full z-[100000] ${
        isOpen ? "fixed inset-0 z-50 bg-(--gray-eighty)" : "bg-(--gray-eighty)"
      }`}
    >
      <div className="bg-(--solid-black) flex justify-between items-center px-8 py-6 h-16">
        {pathname !== "/" ? (
          <Link href="/">
            <span className="font-bold text-xl text-(--brand-green-dark-bg)">
              W
            </span>
            <span className="font-bold text-xl text-(--solid-white)">
              ash{" "}
            </span>
            <span className="font-bold text-xl text-(--brand-green-dark-bg)">
              W
            </span>
            <span className="font-bold text-xl text-(--solid-white)">
              orld
            </span>
          </Link>
        ) : (
          <span className="cursor-default">
            <span className="font-bold text-xl text-(--brand-green-dark-bg)">
              W
            </span>
            <span className="font-bold text-xl text-(--solid-white)">
              ash{" "}
            </span>
            <span className="font-bold text-xl text-(--brand-green-dark-bg)">
              W
            </span>
            <span className="font-bold text-xl text-(--solid-white)">
              orld
            </span>
          </span>
        )}

        <button
          className="text-white cursor-pointer text-2xl w-8 flex justify-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Luk menu" : "Åbn menu"}
        >
          <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
        </button>
      </div>

      {isOpen && (
        <div className="flex items-center justify-center w-full h-[calc(100vh-4rem)]">
          <div className="flex flex-col items-center gap-8">
            {!checkingLogin && isLoggedIn && loggedInUser && (
              <div className="text-center">
                <p className="text-(--gray-ten) text-sm">
                  Logget ind som
                </p>

                <p className="text-(--brand-green-dark-bg) text-xl font-bold">
                  {loggedInUser.user_first_name} {loggedInUser.user_last_name}
                </p>
              </div>
            )}

            <ul className="flex flex-col gap-8 w-fit">
              {publicLinks.map((link) => {
                const isActive = link.href === pathname;

                return (
                  <li className="font-gilroy text-2xl" key={link.href}>
                    <Link
                      className={`flex items-center gap-4 transition-colors duration-150 ease-in hover:text-(--brand-green-dark-bg) ${
                        isActive
                          ? "text-(--brand-green-dark-bg)"
                          : "text-(--solid-white)"
                      }`}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="w-7 flex justify-center">
                        {link.icon && <FontAwesomeIcon icon={link.icon} />}
                      </span>

                      <span
                        className={
                          isActive
                            ? "border-b-2 border-(--brand-green-dark-bg)"
                            : ""
                        }
                      >
                        {link.text}
                      </span>
                    </Link>
                  </li>
                );
              })}

              {!isLoggedIn && (
                <li className="font-gilroy text-2xl">
                  <Link
                    className={`flex items-center gap-4 transition-colors duration-150 ease-in hover:text-(--brand-green-dark-bg) ${
                      pathname === "/register"
                        ? "text-(--brand-green-dark-bg)"
                        : "text-(--solid-white)"
                    }`}
                    href="/register"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="w-7 flex justify-center">
                      <FontAwesomeIcon icon={faUserPlus} />
                    </span>

                    <span
                      className={
                        pathname === "/register"
                          ? "border-b-2 border-(--brand-green-dark-bg)"
                          : ""
                      }
                    >
                      Opret bruger
                    </span>
                  </Link>
                </li>
              )}

              {isLoggedIn && (
                <li className="font-gilroy text-2xl">
                  <Link
                    className={`flex items-center gap-4 transition-colors duration-150 ease-in hover:text-(--brand-green-dark-bg) ${
                      pathname === "/profile"
                        ? "text-(--brand-green-dark-bg)"
                        : "text-(--solid-white)"
                    }`}
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="w-7 flex justify-center">
                      <FontAwesomeIcon icon={faCircleUser} />
                    </span>

                    <span
                      className={
                        pathname === "/profile"
                          ? "border-b-2 border-(--brand-green-dark-bg)"
                          : ""
                      }
                    >
                      Min Profil
                    </span>
                  </Link>
                </li>
              )}

              {!isLoggedIn ? (
                <li className="font-gilroy text-2xl">
                  <Link
                    className={`flex items-center gap-4 transition-colors duration-150 ease-in hover:text-(--brand-green-dark-bg) ${
                      pathname === "/login"
                        ? "text-(--brand-green-dark-bg)"
                        : "text-(--solid-white)"
                    }`}
                    href="/login"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="w-7 flex justify-center">
                      <FontAwesomeIcon icon={faRightToBracket} />
                    </span>

                    <span
                      className={
                        pathname === "/login"
                          ? "border-b-2 border-(--brand-green-dark-bg)"
                          : ""
                      }
                    >
                      Log ind
                    </span>
                  </Link>
                </li>
              ) : (
                <li className="font-gilroy text-2xl">
                  <button
                    className="flex items-center gap-4 text-(--solid-white) transition-colors duration-150 ease-in hover:text-(--brand-green-dark-bg)"
                    onClick={handleLogout}
                  >
                    <span className="w-7 flex justify-center">
                      <FontAwesomeIcon icon={faRightFromBracket} />
                    </span>

                    <span>
                      Log ud
                    </span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}