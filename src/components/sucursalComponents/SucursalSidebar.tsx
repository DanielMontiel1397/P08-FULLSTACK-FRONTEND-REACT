import type { Dispatch, SetStateAction } from 'react'
// Icons
import { MdMenuOpen, MdLogout } from "react-icons/md"
import { FaUserCircle } from "react-icons/fa"
import { MdStorefront } from 'react-icons/md'
import { RiAdminLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { useAppStore } from '../../stores/useAppStore'

const menuItems = [
  {
    icon: <RiAdminLine size={26} />,
    label: 'Inicio',
    url: '/sucursal'
  },
  {
    icon: <MdStorefront size={26} />,
    label: 'Perfil',
    url: '/sucursal/perfil'
  },
  {
    icon: <MdStorefront size={26} />,
    label: 'clientes',
    url: '/sucursal/clientes'
  }
]

type AdminSidebarProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function SucursalSidebar({ open, setOpen }: AdminSidebarProps) {

  const cerrarSesion = useAppStore(state => state.logOutSucursal);
  const navigate = useNavigate();

  const handleLogout = () => {
    cerrarSesion();
    navigate('/auth')  ;
  }

  return (
    <nav
  className={`
    fixed top-0 left-0
    h-screen flex flex-col justify-between
    bg-zinc-900 text-zinc-100
    shadow-lg transition-all duration-300
    ${open ? 'w-64' : 'w-20'}
  `}
>

      {/* HEADER */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-zinc-800">
        <div className="flex items-center gap-2 overflow-hidden">
          <img className={`w-10 ${!open && 'hidden'}`} src="./Logo.png" alt="" />
        </div>

        <MdMenuOpen
          size={28}
          className={`
            cursor-pointer transition-transform duration-300
            ${!open && 'rotate-180'}
          `}
          onClick={() => setOpen(!open)}
        />
      </div>

      
      <ul className="flex-1 flex flex-col gap-1 px-2 py-4">
        {menuItems.map((item, index) => (
          <Link
            to={item.url}
            key={index}
            className="
              group relative flex items-center gap-3
              px-3 py-3 rounded-lg
              hover:bg-zinc-800
              transition-colors
            "
          >
            <div className="text-zinc-300">{item.icon}</div>

            <span
              className={`
                text-sm font-medium whitespace-nowrap
                transition-all duration-300
                ${open ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}
              `}
            >
              {item.label}
            </span>

            {!open && (
              <span className="
                absolute left-20 z-50
                bg-zinc-800 text-xs px-3 py-1 rounded-md
                opacity-0 group-hover:opacity-100
                transition-opacity shadow-md
              ">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </ul>

      {/* FOOTER */}
      <div className="border-t border-zinc-800 p-4 flex flex-col gap-4">
        {/* USER */}
        <div className="flex items-center gap-3">
          <FaUserCircle size={40} className="text-zinc-400" />

          <div
            className={`
              transition-all duration-300 overflow-hidden
              ${open ? 'opacity-100' : 'opacity-0 w-0'}
            `}
          >
            <p className="text-sm font-medium truncate">
              Sostenes Daniel
            </p>
            <span className="text-xs text-zinc-400 truncate block">
              danielponce1397@gmail.com
            </span>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            group flex items-center gap-3
            px-3 py-2 rounded-lg
            text-red-400 hover:bg-red-500/10
            transition-colors hover:cursor-pointer
          "
        >
          <MdLogout size={22} />

          <span
            className={`
              text-sm font-medium
              transition-all duration-300
              ${open ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}
            `}
          >
            Cerrar sesión
          </span>
        </button>
      </div>
    </nav>
  )
}
