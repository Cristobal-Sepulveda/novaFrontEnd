import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import style from './metricas.module.css';
import JorgeGas from '../../assetsOficial/jorgegas.svg';
Chart.register(ArcElement, Tooltip, Legend);


const Metricas = () => {

    const data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };
    
    return (
        <div>
            <p className={style.text}>Metricas</p>
            <img src={JorgeGas} alt="jorgeGas" className={style.logo} />
            <div className={style.container}>
                {/* <Doughnut
                    data={data}
                    options={{
                        maintainAspectRatio: true,
                        responsive: true,
                        }}
                    className={style.grafica}
                /> */}
                
            </div>
            
        </div>
    )
}

export default Metricas
