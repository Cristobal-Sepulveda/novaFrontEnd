import React from 'react'
import { numberWithDots } from '../../../helpers/numberWithDot'
import style from './resumenTable.module.css'

const ResumenTable = ({ cuadratura, faltantes, tablaRef }) => {

    const sumaDeTodo =  Number(cuadratura?.totalVales?.totalSumaVales) + 
                        Number(cuadratura?.totalEfectivo?.totalGeneral) + 
                        Number(cuadratura?.totalTransferencia) + 
                        Number(cuadratura?.totalDescuentosRut) + 
                        Number(cuadratura?.totalDescuentos) + 
                        Number(cuadratura?.totalTransbank) +
                        Number(cuadratura?.sobrante) + 
                        Number(faltantes) +
                        Number(cuadratura?.gastos)
                        

    return (
        <div className={style.columna}>
            <p className={style.text}>
                Resumen
            </p>
            <div className={style.tabla}>
                <table
                    className="table-lg table table-bordered table-hover" 
                    ref={tablaRef}
                    style={{
                        width: '100%',
                    }}
                >
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Vales</td>
                            <th>{cuadratura?.totalVales?.totalSumaVales ? numberWithDots(cuadratura?.totalVales?.totalSumaVales) : 0 }</th>
                        </tr>
                        <tr>
                            <td>Efectivo</td>
                            <th>{cuadratura?.totalEfectivo?.totalGeneral ? numberWithDots(cuadratura?.totalEfectivo?.totalGeneral) : 0}</th>
                        </tr>
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
                            <td>Trasnbank</td>
                            <td>{cuadratura?.totalTransbank ? numberWithDots(cuadratura?.totalTransbank) : 0}</td>
                        </tr>
                        <tr>
                            <th>Anticipos</th>
                            <th>{faltantes ? numberWithDots(faltantes) : 0}</th>
                        </tr>
                        <tr>
                            <td>Sobrantes</td>
                            <td>{cuadratura?.sobrante ? numberWithDots(cuadratura?.sobrante) : 0}</td>
                        </tr>
                        <tr>
                            <td>Gastos</td>
                            <td>{cuadratura?.gastos ? numberWithDots(cuadratura?.gastos) : 0}</td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <th>{sumaDeTodo ? numberWithDots(sumaDeTodo) : 0}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ResumenTable
