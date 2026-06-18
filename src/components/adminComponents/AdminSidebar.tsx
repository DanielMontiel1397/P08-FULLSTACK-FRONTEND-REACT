import type { Dispatch, SetStateAction } from 'react'
import { MdMenuOpen, MdLogout } from "react-icons/md"
import { FaUserCircle } from "react-icons/fa"
import { MdStorefront } from 'react-icons/md'
import { RiAdminLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { IoClose } from "react-icons/io5"
import { useAppStore } from '../../stores/useAppStore'
import { useState } from 'react'

const menuItems = [
  {
    icon: <RiAdminLine size={26} />,
    label: 'Inicio',
    url: '/admin'
  },
  {
    icon: <MdStorefront size={26} />,
    label: 'Perfil',
    url: '/admin/perfil'
  },
  {
    icon: <MdStorefront size={26} />,
    label: 'Sucursales',
    url: '/admin/sucursales'
  },
  {
    icon: <MdStorefront size={26} />,
    label: 'Clientes',
    url: '/admin/clientes'
  }
]

type AdminSidebarProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function AdminSidebar({ open, setOpen }: AdminSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const cerrarSesion = useAppStore(state => state.logOutAdministrador);
  const navigate = useNavigate();

  const handleLogout = () => {
    cerrarSesion();
    navigate('/');
  }

  const handleLinkClick = () => {
    setMobileOpen(false)
  }

  return (
    <>
      {/* Hamburger button - visible solo en mobile */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className={`md:hidden fixed top-4 left-4 p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 hover:cursor-pointer ${mobileOpen ? 'z-20' : 'z-40'} transition-all duration-300`}
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
        className={`fixed md:sticky md:top-0  left-0 md:left-auto h-screen flex flex-col justify-between bg-zinc-900 text-zinc-100 shadow-lg transition-all duration-300 z-30 ${open ? 'w-64 md:w-64' : 'w-20'} md:translate-x-0 transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >

        {/* HEADER */}
        <div
          className="h-20 flex items-center justify-between px-4 border-b border-zinc-800"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <img className={`w-10 ${!open && 'md:hidden'}`} src="./Logo.png" alt="Logo" />
          </div>

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

        {/* MENU ITEMS */}
        <ul className="flex-1 flex flex-col gap-1 px-2 py-4">
          {menuItems.map((item, index) => (
            <Link
              to={item.url}
              onClick={handleLinkClick}
              key={index}
              className="group relative flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <div className="text-zinc-300">{item.icon}</div>
              <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 opacity-100 md:${open ? 'opacity-100' : 'opacity-0 md:w-0 md:overflow-hidden'}`}>
                {item.label}
              </span>
              {!open && <span className="absolute left-20 z-50 bg-zinc-800 text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-md">{item.label}</span>}
            </Link>
          ))}
        </ul>

        {/* FOOTER */}
        <div className="border-t border-zinc-800 p-4 flex flex-col gap-4">
          {/* USER */}
          <div className="flex items-center gap-3">
            <FaUserCircle size={40} className="text-zinc-400" />
            <div className={`transition-all duration-300 overflow-hidden ${open ? 'opacity-100' : 'opacity-0 w-0'}`}>
              <p className="text-sm font-medium truncate">Sostenes Daniel</p>
              <span className="text-xs text-zinc-400 truncate block">danielponce1397@gmail.com</span>
            </div>
          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="group flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors hover:cursor-pointer"
          >
            <MdLogout size={22} />
            <span className={`text-sm font-medium transition-all duration-300 opacity-100 md:${open ? 'opacity-100' : 'opacity-0 md:w-0 md:overflow-hidden'}`}>
  Cerrar sesión
</span>
          </button>
        </div>
      </nav>
    </>
  )
}