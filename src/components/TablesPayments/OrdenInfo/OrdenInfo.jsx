import React from 'react'
import { useSelector } from 'react-redux'
import style from './ordenInfo.module.css'

const OrdenInfo = ({ novaOrdenById }) => {

    const { administradores } = useSelector(state => state.Nova)
    const adminQueCuadro = administradores?.find(admin => admin.id === Number(novaOrdenById?.cuadradoPor))

    return (
        <div className={style.container}>
            <div className={style.textContainer}>
                <p className={style.texto}>Informacion de la orden</p>
                {
                    adminQueCuadro ? <p>Orden cuadrada por: {adminQueCuadro?.personal?.name + " " + adminQueCuadro?.personal?.lastname}</p> : <p>Orden cuadrada por: No cuadrada</p>
                }
                { novaOrdenById ? <p>Orden creada por: {novaOrdenById?.administrador?.personal?.name + " " + novaOrdenById?.administrador?.personal?.lastname }</p> : <p>Orden creada por: No asignado</p> }
                <p>Fecha de creacion: {novaOrdenById?.fecha}</p>
                <p>Lista de precios: {novaOrdenById?.listaDePrecio?.name}</p>
                { novaOrdenById?.chofer?.personal?.name ? <p>Chofer: {novaOrdenById?.chofer?.personal?.name + " " + novaOrdenById?.chofer?.personal?.lastname}</p> : <p>Chofer: No asignado</p> }
                { novaOrdenById?.ayudante?.personal?.name ? <p>Peoneta: {novaOrdenById?.ayudante?.personal?.name + " " + novaOrdenById?.ayudante?.personal?.lastname}</p> : <p>Peoneta: No asignado</p> }
            </div>
        </div>
    )
}

export default OrdenInfo
