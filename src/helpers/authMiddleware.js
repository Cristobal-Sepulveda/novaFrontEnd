import { logoutAction2 } from '../redux/autenticacionSlice/thunks';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

const authMiddleware = (store) => {

    return (next) => async (action) => {

        const usuario = JSON.parse(localStorage.getItem('usuario'));
        let token = usuario?.token;
        
        if(token){
            try {
                const channel = new BroadcastChannel('auth');
                const { exp, id } = jwt_decode(token)
                const currentTime = Date.now() / 1000;
                channel.addEventListener('message', async (event) => {
                    if (event.data.type === 'logout') { 
                        Swal.fire({
                            icon: 'error',
                            title: 'Tu sesion ha expirado',
                            text: 'Inicia sesion nuevamente',
                            backdrop: true,
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            allowEnterKey: false,
                            confirmButtonText: 'Cerrar sesión',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = '/';
                            }
                        });
                    }
                });
                if (exp < currentTime) {
                    channel.postMessage({ type: 'logout' });
                    store.dispatch(logoutAction2(id));
                    localStorage.removeItem('usuario');
                    localStorage.removeItem('channel');
                }
            } catch (error) {
                console.log(error);
            }
        } 
        next(action);
    };
};

export default authMiddleware;