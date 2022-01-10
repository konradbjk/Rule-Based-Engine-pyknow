/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HamburgerMenu, CloseMenu } from "@/components/SVGs";
import { useState, useRef, useEffect } from "react";

const links = require("@/data/headerLinks.json");

export default function NavigationBar() {
  const [navbarState, setNavbarState] = useState(false);
  const menuRef = useRef(null);

  function handleClose() {
    setNavbarState(false);
  }

  function handleOpen() {
    setNavbarState(true);
  }

  const handleHideDropdown = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [menuRef]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="lg:absolute lg:inset-y-0 lg:right-0" />
      <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <div>
          <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
            <nav
              className="relative flex items-center justify-between sm:h-10 lg:justify-start"
              aria-label="Global"
            >
              <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  {/* logo */}
                  <a href="/">
                    <span className="sr-only">Kompas NGO</span>
                    <img
                      alt="logo"
                      width="165"
                      heigh="51"
                      src="/assets/icons/logo-kompas-ngo.jpg"
                    />
                  </a>
                  {/* Opening mobile menu */}
                  <div className="-mr-2 flex items-center md:hidden">
                    <button
                      onClick={handleOpen}
                      type="button"
                      className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-kompas-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-kompas-orange"
                      aria-expanded="false"
                    >
                      <span className="sr-only">Open main menu</span>
                      <HamburgerMenu className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-4 text-kompas-blue text-l justify-end">
                {links.map((link, i) => (
                  <Link key={i} href={link.href}>
                    {link["pl"]}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
          {/*Mobile menu, show/hide based on menu open state.*/}
          {navbarState && (
            <div
              className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              id="mobile-menu"
              ref={menuRef}
            >
              <div className="rounded-lg shadow-md bg-gray-100 ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div className="-mr-2">
                    <button
                      onClick={handleClose}
                      type="button"
                      className="bg-gray-100 rounded-md p-2 inline-flex items-center justify-center text-gray-700 hover:text-kompas-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-kompas-orange"
                    >
                      <span className="sr-only">Close main menu</span>
                      <CloseMenu />
                    </button>
                  </div>
                </div>
                <div
                  className="px-2 pt-2 pb-3 space-y-1"
                  onBlur={handleClose}
                  onFocus={handleOpen}
                >
                  {links.map((l, i) => (
                    <Link key={i} href={l.href}>
                      <a
                        onClick={handleClose}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-kompas-blue hover:bg-gray-200"
                      >
                        {l["pl"]}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
