import React from 'react'
import { numberWithDots } from '../../../helpers/numberWithDot'
import style from './tableEfectivo.module.css'

const TableEfectivo = ({ novaOrdenById, tabla2Ref }) => {
    const efectivo = novaOrdenById?.metodoPagos?.map((metodoPago) => metodoPago.efectivo)
    const efectivoObj = efectivo ? Object.assign({}, ...efectivo) : null

    return (
        <div className={style.tabla}>
            <table
                className="table-md table table-bordered table-hover"
                ref={tabla2Ref}
            >
                <thead>
                    <tr>
                        <th>Efectivo</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Billete 20
                        </td>
                        <td>
                            {efectivoObj?.totalBilletes20 ? numberWithDots(efectivoObj?.totalBilletes20) : 0}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Billete 10
                        </td>
                        <td>
                        {efectivoObj?.totalBilletes10 ? numberWithDots(efectivoObj?.totalBilletes10) : 0}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Billete 5
                        </td>
                        <td>
                        {efectivoObj?.totalBilletes5 ? numberWithDots(efectivoObj?.totalBilletes5) : 0}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Billete 2
                        </td>
                        <td>
                        {efectivoObj?.totalBilletes2 ? numberWithDots(efectivoObj?.totalBilletes2) : 0}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Billete 1
                        </td>
                        <td>
                        {efectivoObj?.totalBilletes1 ? numberWithDots(efectivoObj?.totalBilletes1) : 0}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Monedas
                        </td>
                        <td>
                            {efectivoObj?.monedas ? numberWithDots(efectivoObj?.monedas) : 0}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Total
                        </th>
                        <td>
                            {efectivoObj?.totalGeneral ? numberWithDots(efectivoObj?.totalGeneral) : 0}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableEfectivo
