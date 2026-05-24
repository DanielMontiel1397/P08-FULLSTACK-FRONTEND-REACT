import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
});

//Interceptar consulta
clienteAxios.interceptors.request.use(
    (config) => {
        const userType = localStorage.getItem('GYM_USER_TYPE');

        let token = null;

        if(userType === 'admin'){
            token = localStorage.getItem('AUTH_TOKEN_ADMIN_GYM');
        } else if(userType === 'sucursal'){
            token = localStorage.getItem('AUTH_TOKEN_SUCURSAL_GYM')
        }

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default clienteAxios;