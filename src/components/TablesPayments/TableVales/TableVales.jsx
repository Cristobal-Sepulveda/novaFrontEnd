import React from 'react'
import style from './tableVales.module.css'
import { numberWithDots } from '../../../helpers/numberWithDot'

const TableVales = ({ novaOrdenById, tabla3Ref }) => {
    return (
        <div className={style.tabla}>
            <table
                className="table-md table table-bordered table-hover"
                ref={tabla3Ref}
            >
                <thead>
                    <tr>
                        <th style={{
                            verticalAlign: 'middle',
                        }}
                        >
                            Producto
                        </th>
                        <th>Vales Digitales</th>
                        <th
                            style={{
                                verticalAlign: 'middle',
                            }}
                        >
                            Subtotal
                        </th>
                        <th>Vales Fisicos</th>
                        <th
                            style={{
                                verticalAlign: 'middle',
                            }}
                        >
                            Subtotal
                        </th>
                        <th style={{
                            verticalAlign: 'middle',
                        }}>
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{
                            verticalAlign: 'middle',
                        }}>
                            Gas 5 kilos
                        </td>
                        {novaOrdenById?.metodoPagos?.map((metodo) => {
                            return (
                                <React.Fragment key={metodo.id}>
                                    <td key={metodo.vale.id} style={{
                                        verticalAlign: "middle"
                                    }}>
                                        {metodo.vale.digital5kg}
                                    </td>
                                    <td style={{
                                            verticalAlign: "middle"
                                        }}>
                                            {
                                                metodo.vale.totalDigital5kg ? numberWithDots(metodo.vale.totalDigital5kg) : 0
                                            }
                                    </td>
                                    <td>
                                        {metodo.vale.fisico5kg}
                                    </td>
                                    <td>
                                        {
                                            metodo.vale.totalFisico5kg ? numberWithDots(metodo.vale.totalFisico5kg) : 0
                                        }
                                    </td>
                                    <td>
                                        {
                                            metodo.vale.sumaTotalDigitalYFisico5kg ? numberWithDots(metodo.vale.sumaTotalDigitalYFisico5kg) : 0
                                        }
                                    </td>
                                </React.Fragment>
                            )
                        })}
                    </tr>
                    <tr>
                        <td style={{
                            verticalAlign: 'middle',
                        }}>
                            Gas 11 kilos
                        </td>
                        {novaOrdenById?.metodoPagos?.map((metodo) => {
                            return (
                                <React.Fragment key={metodo.id}>
                                    <td key={metodo.vale.id} style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {metodo.vale.digital11kg}
                                    </td>
                                    <td style={{
                                            verticalAlign: 'middle'
                                        }}>
                                            {
                                                metodo.vale.totalDigital11kg ? numberWithDots(metodo.vale.totalDigital11kg) : 0
                                            }
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {metodo.vale.fisico11kg}
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle' 
                                    }}>
                                        {
                                            metodo.vale.totalFisico11kg ? numberWithDots(metodo.vale.totalFisico11kg) : 0
                                        }
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {
                                            metodo.vale.sumaTotalDigitalYFisico11kg ? numberWithDots(metodo.vale.sumaTotalDigitalYFisico11kg) : 0
                                        }
                                    </td>
                                </React.Fragment>
                            )
                        })}
                    </tr>
                    <tr>
                        <td style={{
                            verticalAlign: 'middle',
                        }}>
                            Gas 15 kilos
                        </td>
                        {novaOrdenById?.metodoPagos?.map((metodo) => {
                            return (
                                <React.Fragment key={metodo.id}>
                                    <td key={metodo.vale.id} style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {metodo.vale.digital15kg}
                                    </td>
                                    <td style={{
                                            verticalAlign: 'middle'
                                        }}>
                                            {
                                                metodo.vale.totalDigital15kg ? numberWithDots(metodo.vale.totalDigital15kg) : 0
                                            }
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {metodo.vale.fisico15kg}
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {
                                            metodo.vale.totalFisico15kg ? numberWithDots(metodo.vale.totalFisico15kg) : 0
                                        }
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {
                                            metodo.vale.sumaTotalDigitalYFisico15kg ? numberWithDots(metodo.vale.sumaTotalDigitalYFisico15kg) : 0
                                        }
                                    </td>
                                </React.Fragment>
                            )
                        })}
                    </tr>
                    <tr>
                        <td style={{
                            verticalAlign: 'middle',
                        }}>
                            Gas 45 kilos
                        </td>
                        {novaOrdenById?.metodoPagos?.map((metodo) => {
                            return (
                                <React.Fragment key={metodo.id}>
                                    <td key={metodo.vale.id} style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {metodo.vale.digital45kg}
                                    </td>
                                    <td style={{
                                            verticalAlign: 'middle'
                                        }}>
                                            {
                                                metodo.vale.totalDigital45kg ? numberWithDots(metodo.vale.totalDigital45kg) : 0
                                            }
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {metodo.vale.fisico45kg}
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {
                                            metodo.vale.totalFisico45kg ? numberWithDots(metodo.vale.totalFisico45kg) : 0
                                        }
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {
                                            metodo.vale.sumaTotalDigitalYFisico45kg ? numberWithDots(metodo.vale.sumaTotalDigitalYFisico45kg) : 0
                                        }
                                    </td>
                                </React.Fragment>
                            )
                        })}
                    </tr>
                    <tr>
                        <th style={{
                            verticalAlign: 'middle',
                        }}>
                            Total
                        </th>
                        {novaOrdenById?.metodoPagos?.map((metodo) => {
                            return (
                                <React.Fragment key={metodo.id}>
                                    <td key={metodo.vale.id} style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {null}
                                    </td>
                                    <td style={{
                                            verticalAlign: 'middle'
                                        }}>
                                            {null}
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {null}
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {null}
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {
                                            metodo.vale.totalSumaVales ? numberWithDots(metodo.vale.totalSumaVales) : 0
                                        }
                                    </td>
                                </React.Fragment>
                            )
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableVales
