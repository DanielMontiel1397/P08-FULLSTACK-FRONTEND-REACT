import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../pages/auth/AuthLayout";
import LoginAdminPage from "../pages/auth/LoginAdminPage";
import LoginSucursalPage from "../pages/auth/LoginSucursalPage";
import AdminLayout from "../pages/admin/AdminLayout";
import DashboardAdminPage from "../pages/admin/DashboardAdminPage";
import PerfilAdminPage from "../pages/admin/PerfilAdminPage";
import SucursalesPage from "../pages/admin/sucursales/SucursalesPage";
import SucursalDetallePage from "../pages/admin/sucursales/SucursalDetallePage";
import TodosClientesPage from "../pages/admin/clientes/TodosClientesPage";
import ClienteSucursalPage from "../pages/admin/clientes/ClienteSucursalPage";
import ConfirmarCorreo from "../pages/confirm/ConfirmarCorreo";
import ConfirmarLayout from "../pages/confirm/ConfirmLayout";
import NotFoundView from "../pages/404";
import CrearPasswordSucursal from "../pages/auth/CrearPasswordSucursal";
import SucursalLayout from "../pages/sucursal/SucursalLayout";
import DashboardSucursalPage from "../pages/sucursal/DashboardSucursalPage";
import PerfilSucursalPage from "../pages/sucursal/PerfilSucursalPage";
import ClientesSucursal from "../pages/sucursal/clients/ClientesSucursal";
import AuthHomeLayout from "../pages/AuthHomeLayout";
import Inicio from "../pages/Inicio";


export const router = createBrowserRouter([
    {
        path: '*',
        element: <NotFoundView/>
    },
    {
        path: '/',
        element: <AuthHomeLayout/>,
        children: [
            {
                index: true,
                element: <Inicio/>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [

            {
                
                path: 'loginAdmin',
                element: <LoginAdminPage />
            },
            {
                path: 'loginSucursal',
                element: <LoginSucursalPage />
            }
        ]
    },

    {
        path: '/confirmar-cuenta',
        element: <ConfirmarLayout />,
        children: [
            {
                path: 'verificar-email/:token',
                element: <ConfirmarCorreo />
            },
            {
                path: 'crear-password/:token',
                element: <CrearPasswordSucursal/>
            }
        ]
    },

    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <DashboardAdminPage />
            },
            {
                path: 'perfil',
                element: <PerfilAdminPage />
            },
            {
                path: 'sucursales',
                element: <SucursalesPage />
            },
            {
                path: 'sucursales/:id',
                element: <SucursalDetallePage />
            },
            {
                path: 'clientes',
                element: <TodosClientesPage />
            },
            {
                path: 'sucursales/:idSucursal/clientes',
                element: <ClienteSucursalPage />
            }
        ]
    },

    /////RUTAS PARA SUCURSAL
    {
        path: '/sucursal',
        element: <SucursalLayout/>,
        children: [
            {
                index: true,
                element: <DashboardSucursalPage/>
            },
            {
                path: 'perfil',
                element: <PerfilSucursalPage/>
            },
            {
                path: 'clientes',
                element: <ClientesSucursal/>
            }
        ]
    }
])