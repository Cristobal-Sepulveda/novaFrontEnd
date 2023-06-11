import React, { useState } from 'react';
import style from './ordenList.module.css';
import OrdenDetail from '../OrdenDetail/OrdenDetail';

const OrdenList = ({
        id, 
        fecha,
        patente, 
        chofer, 
        ayudante, 
        cuadrante, 
        estado, 
        recargas,
        contabilidadRecarga,
        metodoPagos
    }) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    let totalCantidad =  0
    
    recargas?.forEach((recarga) => {
        totalCantidad += Number(recarga.cantidad5kg) + Number(recarga.cantidad11kg) + Number(recarga.cantidad15kg) + Number(recarga.cantidad45kg)
    })

    return (
        <>
            <tr key={id} onClick={toggle} className={style.tabla}>
                <td>#{id}</td>
                <td>{fecha}</td>
                <td>{totalCantidad}</td>
                <td>{patente}</td>
                <td>{chofer}</td>
                <td>{ayudante}</td>
                <td>{cuadrante}</td>
                <td style={{
                    color: estado === 'Activa' ? '#00FF0C' : '#FF0000'
                }}>
                    <span >{estado}</span>
                    </td>
            </tr>
            <OrdenDetail 
                modal={modal} 
                toggle={toggle} 
                id={id} 
                fecha={fecha}
                patente={patente}
                chofer={chofer}
                ayudante={ayudante}
                cuadrante={cuadrante}
                estado={estado}
                recargas={recargas}
                contabilidadRecarga={contabilidadRecarga}
                metodoPagos={metodoPagos}
            />
        </>
    )
}

export default OrdenList
