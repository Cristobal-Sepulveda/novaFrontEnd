import React from 'react'
import JorgeGas from '../../assetsOficial/jorgegas.svg';
import style from './inventarioVales.module.css'

const InventarioVales = () => {
    return (
        <div className={style.margin}>
            <p className={style.text}>Inventario de vales</p>
            <img src={JorgeGas} alt="logo" className={style.logo} />
            <div className={style.container}>
            <p className={style.title}>Vales fisicos</p>
            <div className={style.tableContainer}>
                <table className="table-sm table table-bordered table-hover responsive">
                    <thead>
                        <tr>
                            <th className="px-4 py-3">Vales</th>
                            <th className="px-4 py-3">Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-3">Vale fisico 5kg</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3">Vale fisico 11kg</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3">Vale fisico 15kg</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3">Vale fisico 45kg</td>
                        </tr>
                    </tbody>
                </table>
            </div> 
            </div>
            <p className={style.title2}>Vales digitales</p>
            <div className={style.tableContainer2}>
                        <table className="table-sm table table-bordered table-hover responsive">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3">Vales</th>
                                    <th className="px-4 py-3">Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-3">Vale fisico 5kg</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3">Vale fisico 11kg</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3">Vale fisico 15kg</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3">Vale fisico 45kg</td>
                                </tr>
                            </tbody>
                        </table>
                </div> 
        </div>
    )
}

export default InventarioVales
