import React from 'react'
import style from './recaudacionOrden.module.css'
import { Input, Label } from 'reactstrap'
import { numberWithDots } from '../../../helpers/numberWithDot'

const RecaudacionOrden = ({ novaOrdenById }) => {
    return (
        <div className={style.container}>
            <div className={style.containerInfo}>
                <Label className={style.texto2}>Recaudacion Total</Label> 
                <Input
                    type="number"
                    name="total"
                    placeholder={
                        novaOrdenById?.contabilidadRecarga?.totalRecaudacion ? numberWithDots(novaOrdenById?.contabilidadRecarga?.totalRecaudacion) : 0
                    }
                    disabled 
                    className={style.input2}
                />               
            </div>
            <div className={style.containerInfo2}>
                <Label className={style.texto2}>Tarros vendidos</Label>
                <Input
                    type="number"
                    name="totalTarros"
                    placeholder={
                        novaOrdenById?.contabilidadRecarga?.totalCantidad ? numberWithDots(novaOrdenById?.contabilidadRecarga?.totalCantidad) : 0
                    }
                    disabled
                    className={style.input2}
                />
            </div>
            <div className={style.containerInfo2}>
                <Label className={style.texto2}>Faltante</Label>
                <Input
                    type="number"
                    name="Faltante"
                    placeholder={
                        novaOrdenById?.faltante ? numberWithDots(novaOrdenById?.faltante) : 0
                    }
                    disabled
                    className={style.input2}
                />
            </div>
            <div className={style.containerInfo2}>
                <Label className={style.texto2}>Sobrante</Label>
                <Input
                    type="number"
                    name="Sobrante"
                    placeholder={
                        novaOrdenById?.sobrante ? numberWithDots(novaOrdenById?.sobrante) : 0
                    }
                    disabled
                    className={style.input2}
                />
            </div>
        </div>
    )
}

export default RecaudacionOrden
