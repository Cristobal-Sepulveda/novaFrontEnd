import React from 'react'
import { numberWithDots } from '../../../helpers/numberWithDot'
import style from './metodosTable.module.css'

const MetodosTable = ({ cuadratura, tablaRef }) => {
    return (
        <div className={style.columna}>
            <p className={style.text}>
                Rendicion Metodos Opcionales
            </p>
            <div className={style.tabla}>
                <table
                    className="table-lg table table-bordered table-hover" 
                    ref={tablaRef}
                >
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Transferencias</td>
                            <td>{cuadratura?.totalTransferencia ? numberWithDots(cuadratura?.totalTransferencia) : 0}</td>
                        </tr>
                        <tr>
                            <td>Descuento Rut</td>
                            <td>{cuadratura?.totalDescuentosRut ? numberWithDots(cuadratura?.totalDescuentosRut) : 0}</td>
                        </tr>
                        <tr>
                            <td>Descuentos</td>
                            <td>{cuadratura?.totalDescuentos ? numberWithDots(cuadratura?.totalDescuentos) : 0}</td>
                        </tr>
                        <tr>
                            <td>Transbank</td>
                            <td>{cuadratura?.totalTransbank ? numberWithDots(cuadratura?.totalTransbank) : 0}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MetodosTable
