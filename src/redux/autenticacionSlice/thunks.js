import Swal from 'sweetalert2';
import { login, logout, setError } from './autenticacionSlice';
import axios from 'axios';


export const fetchLoginThunk = (email, password) => {
    return async (dispatch) => {
        try {
            const resp = await fetch(`${process.env.REACT_APP_API}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const body = await resp.json();
            if(body.ok) {
                localStorage.setItem('usuario', JSON.stringify(body));
                dispatch(login(body));
                //redirecciona a home
                window.location.href = '/home';
            } else {
                Swal.fire('Error', body.msg, 'error');
                dispatch(setError(body.msg));
            }
        } catch (error) {
            console.log(error);
        }
    }
};

export const logoutAction = (id) => async (dispatch) => {
    try {
        await axios.post(`/auth/logout`, {id});
        dispatch(logout());
        // const channel = new BroadcastChannel('auth');
        // channel.postMessage({ type: 'logout' });
        localStorage.removeItem('usuario');
        window.location.href = '/';
        return
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};

export const logoutAction2 = (id) => async (dispatch) => {
    try {
        await axios.post(`/auth/logout`, {id});
        dispatch(logout());
        return
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};

export const logoutAuxAction = async (sesion) => {
    try {
        await axios.post(`/auth/logoutAux`, sesion);
        const channel = new BroadcastChannel('auth');
        channel.postMessage({ type: 'logout' });
        localStorage.removeItem('usuario');
        localStorage.removeItem('channel');
        Swal.fire({
            icon: 'success',
            title: 'Sesión cerrada',
            text: 'Inicia sesión nuevamente',
            backdrop: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonText: 'Cerrar sesión',
        });
        return
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.response.data.msg}`,
        });
    }
}

