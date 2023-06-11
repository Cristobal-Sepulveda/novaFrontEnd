import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RealImg from '../../assetsOficial/benjanova.svg';
import './loginPage.css';
import Monito from '../../assetsOficial/jorgito.svg';
import { fetchLoginThunk } from '../../redux/autenticacionSlice/thunks';
import CierreDeSesion from '../CierreDeSesion/CierreDeSesion';

const LoginPage = () => {

    const { status } = useSelector((state) => state.Autenticacion.autBack);
    const { error } = useSelector((state) => state.Autenticacion.autBack);
    const channel = new BroadcastChannel('auth');
    localStorage.setItem('channel', JSON.stringify(channel));

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(fetchLoginThunk(email, password))
        setEmail('')
        setPassword('')
        e.target.reset()
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const isDisabled = useMemo(() => status === 'checking', [status])

    return (
        <div> 
            <div> 
                <img
                className="margin-image-1"
                src={RealImg} alt="RealImg" />
            </div>
            <div className="input-container">
                <form onSubmit={handleLogin} id='formulario'>
                    
                    <img className="monito" src={Monito} alt="Monito" />
                    <h1 className="texto-1">Iniciar sesión</h1>
                    <input className="cajita-1" type="text" placeholder="Nombre de usuario" onChange={handleEmail} />
                    <input className="cajita-2" type="password" placeholder="Contraseña" onChange={handlePassword}/>
                    {error && <p className="error-texto">{error}</p>}
                    <button className="boton-1" type="submit" 
                    disabled={isDisabled}>Entrar</button>
                </form>
                <CierreDeSesion className={"texto-auxiliar"}/>
            </div>
        </div>
    )
}

export default LoginPage
