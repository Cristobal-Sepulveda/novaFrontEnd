import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/autenticacionSlice/autenticacionSlice.js';

export const useCheckAuthBack = () => {

    const storeAuthBack = useSelector(state => state.Autenticacion.autBack.status);
    const usuarioStorage = JSON.parse(localStorage.getItem('usuario')) ? JSON.parse(localStorage.getItem('usuario')) : null;
    const dispatch = useDispatch();

    if(!usuarioStorage) return dispatch(logout());

    dispatch(login(usuarioStorage));

    return storeAuthBack;
}
