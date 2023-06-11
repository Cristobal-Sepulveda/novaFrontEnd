import React from 'react'
import { numberWithDots } from '../../../helpers/numberWithDot'
import style from './efectivoTable.module.css'

const EfectivoTable = ({ cuadratura, tablaRef }) => {
    return (
        <div className={style.columna}>
            <p className={style.text}>
                Rendicion de efectivo
            </p>
            <div className={style.tabla}>
                <table 
                    className="table-lg table table-bordered table-hover" 
                    ref={tablaRef}
                >
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> 20,000</td>
                            <td>{cuadratura?.totalEfectivo?.totalBilletes20 ? numberWithDots(cuadratura?.totalEfectivo?.totalBilletes20) : 0}</td>
                        </tr>
                        <tr>
                            <td> 10,000</td>
                            <td>{cuadratura?.totalEfectivo?.totalBilletes10 ? numberWithDots(cuadratura?.totalEfectivo?.totalBilletes10) : 0}</td>
                        </tr>
                        <tr>
                            <td> 5,000</td>
                            <td>{cuadratura?.totalEfectivo?.totalBilletes5 ? numberWithDots(cuadratura?.totalEfectivo?.totalBilletes5) : 0}</td>
                        </tr>
                        <tr>
                            <td> 2,000</td>
                            <td>{cuadratura?.totalEfectivo?.totalBilletes2 ? numberWithDots(cuadratura?.totalEfectivo?.totalBilletes2) : 0}</td>
                        </tr>
                        <tr>
                            <td> 1,000</td>
                            <td>{cuadratura?.totalEfectivo?.totalBilletes1 ? numberWithDots(cuadratura?.totalEfectivo?.totalBilletes1) : 0}</td>
                        </tr>
                        <tr>
                            <td> Monedas</td>
                            <td>{cuadratura?.totalEfectivo?.monedas ? numberWithDots(cuadratura?.totalEfectivo?.monedas) : 0}</td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <th>{cuadratura?.totalEfectivo?.totalGeneral ? numberWithDots(cuadratura?.totalEfectivo?.totalGeneral) : 0}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EfectivoTable
