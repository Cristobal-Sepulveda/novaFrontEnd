import React from 'react'
import style from './tableGeneral.module.css'
import { numberWithDots } from '../../../helpers/numberWithDot'

const TableGeneral = ({ novaOrdenById, tabla4Ref }) => {

    return (
        <div className={style.tabla}>
            <table 
                className="table-md table table-bordered table-hover"
                ref={tabla4Ref}
            >
                <thead>
                    <tr>
                        <th>Transbank</th>
                        <th>Transferencias</th>
                        <th>Descuento rut</th>
                        <th>Descuento</th>
                        <th>Abonos</th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        novaOrdenById?.metodoPagos?.map((metodoPago) => (
                            <tr key={metodoPago.id}>
                                <td>
                                    {
                                        metodoPago.transbank.monto ? numberWithDots(metodoPago.transbank.monto) : 0
                                    }
                                </td>
                                <td>
                                    {
                                        metodoPago.transferencia.monto ? numberWithDots(metodoPago.transferencia.monto) : 0
                                    }
                                </td>
                                <td>
                                    {
                                        metodoPago.descuentoRut.monto ? numberWithDots(metodoPago.descuentoRut.monto) : 0
                                    }
                                </td>
                                <td>
                                    {
                                        metodoPago.descuento.monto ? numberWithDots(metodoPago.descuento.monto) : 0
                                    }
                                </td>
                                <td>
                                    {
                                        metodoPago.abono.monto ? numberWithDots(metodoPago.abono.monto) : 0
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableGeneral
