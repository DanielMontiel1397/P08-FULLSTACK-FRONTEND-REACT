import { useState } from 'react'
import { MdMenuOpen } from "react-icons/md"
import { FaUserCircle } from "react-icons/fa"
import { MdStorefront } from 'react-icons/md'
import { RiAdminLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { IoClose } from "react-icons/io5"

const menuItems = [
  {
    icon: <RiAdminLine size={26} />,
    label: 'Login Administrador',
    url: '/auth/loginAdmin'
  },
  {
    icon: <MdStorefront size={26} />,
    label: 'Login Sucursal',
    url: '/auth/loginSucursal'
  }
]

export default function AuthSidebar() {
  const [open, setOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLinkClick = () => {
    setMobileOpen(false)
  }

  return (
    <>
      {/* Hamburger button - visible solo en mobile */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className={`md:hidden fixed top-4 left-4 p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 hover:cursor-pointer transition-all duration-300 ${mobileOpen ? 'z-20' : 'z-40'}`}
      >
        <MdMenuOpen size={24} />
      </button>

      {/* Overlay - visible solo en mobile cuando está abierto */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`md:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Sidebar - Desktop normal, Mobile drawer */}
      <nav
        className={`fixed md:relative min-h-screen flex flex-col justify-between bg-zinc-900 text-zinc-100 shadow-lg z-30 transition-transform duration-300 ${open ? 'w-64' : 'w-20'} ${!mobileOpen && 'md:flex'} md:translate-x-0 md:static ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-20 flex items-center justify-between px-4 border-b border-zinc-800">
          <Link to="/" onClick={handleLinkClick} className="flex items-center gap-2 overflow-hidden">
            <img className={`w-10 ${!open && 'md:hidden'}`} src=".././Logo.png" alt="Logo" />
          </Link>

          {/* Toggle en desktop, Close en mobile */}
          <MdMenuOpen
            size={28}
            className={`cursor-pointer transition-transform duration-300 hidden md:block ${!open && 'rotate-180'}`}
            onClick={() => setOpen(!open)}
          />

          <IoClose
            size={28}
            className="cursor-pointer md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        </div>

        <ul className="flex-1 flex flex-col gap-1 px-2 py-4">
          {menuItems.map((item, index) => (
            <Link
              to={item.url}
              onClick={handleLinkClick}
              key={index}
              className="group relative flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors"
            >
              <div className="text-zinc-300">{item.icon}</div>
              <span
                className={`whitespace-nowrap text-sm font-medium transition-all duration-300 ${open ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}
              >
                {item.label}
              </span>
              {!open && (
                <span
                  className="absolute left-20 z-50 bg-zinc-800 text-zinc-100 text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md"
                >
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </ul>

        <div className="border-t border-zinc-800 p-4 flex items-center gap-3">
          <FaUserCircle size={40} className="text-zinc-400" />
          <div
            className={`
              overflow-hidden transition-all duration-300
              ${open ? 'opacity-100' : 'opacity-0 w-0'}
            `}
          >
            <p className="text-sm font-medium truncate max-w-160px">
              Sostenes Daniel
            </p>
            <span className="text-xs text-zinc-400 truncate max-w-160px block">
              danielponce1397@gmail.com
            </span>
          </div>
        </div>
      </nav>
    </>
  )
}