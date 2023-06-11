import React from 'react'
import JorgitoMalo from '../../assetsOficial/sinAcceso.svg'
import style from './sinAcceso.module.css'

const SinAcceso = () => {
    return (
        <div>
            <img src={JorgitoMalo} alt="Jorgito Malo" className={style.sinAcceso}/>
        </div>
    )
}

export default SinAcceso
