import React from 'react'
import { numberWithDots } from '../../../helpers/numberWithDot'
import style from './valesTable.module.css'

const ValesTable = ({ cuadratura, tablaRef }) => {
    return (
        <div className={style.columna}>
            <p className={style.text}>
                Rendicion de vales
            </p>
            <div className={style.tabla}>
                <table
                    className="table-lg table table-bordered table-hover" 
                    ref={tablaRef}
                >
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Fisico</th>
                            <th>Digital</th>
                            <th>Total</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>5kg</td>
                            <td>{cuadratura?.totalVales?.fisico5kg}</td>
                            <td>{cuadratura?.totalVales?.digital5kg}</td>
                            <td>{cuadratura?.totalVales?.totalCantidadFisicoYDigital5kg}</td>
                            <td>{cuadratura?.totalVales?.sumaTotalDigitalYFisico5kg ? numberWithDots(cuadratura?.totalVales?.sumaTotalDigitalYFisico5kg) : 0 }</td>
                        </tr>
                        <tr>
                            <td>11kg</td>
                            <td>{cuadratura?.totalVales?.fisico11kg}</td>
                            <td>{cuadratura?.totalVales?.digital11kg}</td>
                            <td>{cuadratura?.totalVales?.totalCantidadFisicoYDigital11kg}</td>
                            <td>{cuadratura?.totalVales?.sumaTotalDigitalYFisico11kg ? numberWithDots(cuadratura?.totalVales?.sumaTotalDigitalYFisico11kg) : 0 }</td>
                        </tr>
                        <tr>
                            <td>15kg</td>
                            <td>{cuadratura?.totalVales?.fisico15kg}</td>
                            <td>{cuadratura?.totalVales?.digital15kg}</td>
                            <td>{cuadratura?.totalVales?.totalCantidadFisicoYDigital15kg}</td>
                            <td>{cuadratura?.totalVales?.sumaTotalDigitalYFisico15kg ? numberWithDots(cuadratura?.totalVales?.sumaTotalDigitalYFisico15kg) : 0 }</td>
                        </tr>
                        <tr>
                            <td>45kg</td>
                            <td>{cuadratura?.totalVales?.fisico45kg}</td>
                            <td>{cuadratura?.totalVales?.digital45kg}</td>
                            <td>{cuadratura?.totalVales?.totalCantidadFisicoYDigital45kg}</td>
                            <td>{cuadratura?.totalVales?.sumaTotalDigitalYFisico45kg ? numberWithDots(cuadratura?.totalVales?.sumaTotalDigitalYFisico45kg) : 0 }</td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <th>{cuadratura?.totalVales?.totalFisico}</th>
                            <th>{cuadratura?.totalVales?.totalDigital}</th>
                            <th>{cuadratura?.totalVales?.totalVales}</th>
                            <th>{cuadratura?.totalVales?.totalSumaVales ? numberWithDots(cuadratura?.totalVales?.totalSumaVales) : 0 }</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ValesTable
