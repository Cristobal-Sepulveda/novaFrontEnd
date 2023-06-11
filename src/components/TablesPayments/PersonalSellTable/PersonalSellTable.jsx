import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'reactstrap'
import DatePicker, { registerLocale } from 'react-datepicker';
import { ordenesRendicionBetween } from '../../../redux/novaSlice/thunks'
import es from 'date-fns/locale/es';
import { numberWithDots } from '../../../helpers/numberWithDot';
import { RiFileExcel2Fill } from 'react-icons/ri';
import JorgeGas from '../../../assetsOficial/jorgegas.svg';
import vectorDerecho from '../../../assetsOficial/vectorDerecho2.svg';
import 'react-datepicker/dist/react-datepicker.css';
import style from './personalSellTable.module.css'
import InfiniteScroll from 'react-infinite-scroller';
import * as XLSXPopulate from 'xlsx-populate/browser/xlsx-populate';

registerLocale('es', es);

const PersonalSellTable = ({id}) => {

    const { usuario } = JSON.parse(localStorage.getItem('usuario'));
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const soloFecha = startDate.toLocaleDateString('es-CL', { timeZone: 'America/Santiago' }).split('-').reverse().join('-');
    const soloFechaFin = endDate?.toLocaleDateString('es-CL', { timeZone: 'America/Santiago' }).split('-').reverse().join('-');
    
    const onChangeDate = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }

    useEffect(() => {
        dispatch(ordenesRendicionBetween(soloFecha, soloFechaFin))
    }, [dispatch, soloFecha, soloFechaFin])

    const { ordenesRendidasDisponibles } = useSelector(state => state.Nova)

    const width = window.innerWidth;
    const [paginaActual, setPaginaActual] = useState(1)
    const [porPagina, setPorPagina] = useState(width > 1800 ? 18 : 12)
    const [hasMore, setHasMore] = useState(true)
    const maximo = ordenesRendidasDisponibles?.length / porPagina
    const primerIndice = (paginaActual - 1) * porPagina
    const ultimoIndice = (paginaActual - 1) * porPagina + porPagina
    const currentPosts = ordenesRendidasDisponibles?.slice(primerIndice, ultimoIndice)

    const loadMore = () => {
        if (paginaActual >= maximo) {
            setHasMore(false)
            return
        }
        setPorPagina(
            porPagina + 9
        )
    }

    const handleExportExcelPopulate = async () => {
        const data = ordenesRendidasDisponibles?.map((post) => {
            return {
                'Numero de orden': post.id,
                'Fecha': post.fecha,
                'chofer': post?.chofer?.personal?.name + ' ' + post.chofer?.personal?.lastname,
                'peoneta': post?.ayudante?.personal?.name && post?.ayudante?.personal?.lastname ? 
                post?.ayudante?.personal?.name + ' ' + post?.ayudante?.personal?.lastname : 
                'Sin peoneta',
                '5kg': post.contabilidadRecarga.ventas5kg,
                '11kg': post.contabilidadRecarga.ventas11kg,
                '15kg': post.contabilidadRecarga.ventas15kg,
                '45kg': post.contabilidadRecarga.ventas45kg,
                'Cilindros': post.contabilidadRecarga.totalCantidad,
                'Total': post.contabilidadRecarga.totalRecaudacion,
            };
        });
        const saveAs = function (blob, fileName) {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
        }

        const wb = await XLSXPopulate.fromBlankAsync();
        const ws = wb.sheet(0);
        ws.name('Rendicion de personal');

        //dejo la fila 1 en blanco
        ws.row(2).height(20);

        //le agrego width a las columnas 

        ws.column(1).width(20);
        ws.column(2).width(10);
        ws.column(3).width(20);
        ws.column(4).width(15);
        ws.column(5).width(20);
        ws.column(6).width(20);
        ws.column(7).width(15);
        ws.column(8).width(15);

        ws.row(2).cell(1).value('Numero de orden').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(2).value('Fecha').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(3).value('Chofer').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(4).value('Peoneta').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(5).value('5kg').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(6).value('11kg').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(7).value('15kg').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(8).value('45kg').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(9).value('Cilindros').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(10).value('Total').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        
        for(let i = 0; i < data.length; i++) {
            ws.row(i + 3).cell(1).value(data[i]['Numero de orden']);
            ws.row(i + 3).cell(2).value(data[i]['Fecha']);
            ws.row(i + 3).cell(3).value(data[i]['chofer']);
            ws.row(i + 3).cell(4).value(data[i]['peoneta']);
            ws.row(i + 3).cell(5).value(data[i]['5kg']);
            ws.row(i + 3).cell(6).value(data[i]['11kg']);
            ws.row(i + 3).cell(7).value(data[i]['15kg']);
            ws.row(i + 3).cell(8).value(data[i]['45kg']);
            ws.row(i + 3).cell(9).value(data[i]['Cilindros']);
            ws.row(i + 3).cell(10).value(data[i]['Total']);
        }

        wb.outputAsync().then(function (blob) {
            saveAs(blob, `Rendicion de personal ${usuario.name} ${usuario.lastname} ${soloFecha} ${soloFechaFin ? "- " + soloFechaFin: "" }.xlsx`);
        });

    };

    return (
        <div>
            <p className={style.text}>Rendicion del personal</p>
            <img src={JorgeGas} alt="logo" className={style.logo} />
            <div className={style.container}>
                <div className={style.datePicker}>
                    <p className={style.textDatePicker}>
                        Seleccione una fecha
                    </p>
                    <DatePicker
                        selected={startDate}
                        onChange={onChangeDate}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        locale="es"
                        dateFormat="dd/MM/yyyy"
                        className={style.classDatePicker}
                        maxDate={new Date()}
                    />
                </div>
                <Link to="/rendicionGeneral">
                    <button className={style.button}>
                        <img src={vectorDerecho} alt="vector" className={style.vectorDerecho} />
                        Rendicion General
                    </button>
                </Link>
                <button onClick={handleExportExcelPopulate} className={style.excel}>
                    <RiFileExcel2Fill className={style.icon3} />
                    <p>Exportar a excel</p>
                </button>
                <div className={style.tableContainer}>
                    <InfiniteScroll
                        pageStart={0}
                        hasMore={hasMore}
                    >
                        <Table
                            bordered
                            hover
                            responsive
                            className="table"
                            id={id}
                        >
                            <thead>
                                <tr>
                                    <th>Numero de orden</th>
                                    <th>Fecha</th>
                                    <th>Chofer</th>
                                    <th>Peoneta</th>
                                    <th>5kg</th>
                                    <th>11kg</th>
                                    <th>15kg</th>
                                    <th>45kg</th>
                                    <th>Cilindros</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody
                                style={{
                                    overflowY: 'scroll',
                                }}
                            >
                                {currentPosts?.map((orden, index) => (
                                    <tr key={index}>
                                        <td>{orden.id}</td>
                                        <td>{orden.fecha}</td>
                                        <td>{orden.chofer.personal.name + " " + orden.chofer.personal.lastname}</td>
                                        <td>{orden.ayudante ? orden.ayudante.personal.name + " " + orden.ayudante.personal.lastname : "Sin peoneta"}</td>
                                        <td>{orden.contabilidadRecarga.ventas5kg}</td>
                                        <td>{orden.contabilidadRecarga.ventas11kg}</td>
                                        <td>{orden.contabilidadRecarga.ventas15kg}</td>
                                        <td>{orden.contabilidadRecarga.ventas45kg}</td>
                                        <td>{orden.contabilidadRecarga.totalCantidad}</td>
                                        <td>{orden.contabilidadRecarga.totalRecaudacion ? numberWithDots(orden.contabilidadRecarga.totalRecaudacion) : 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </InfiniteScroll>
                </div>
                <button onClick={loadMore} className={style.boton}>
                    Cargar mas
                </button>
            </div>
        </div>
    )
}

export default PersonalSellTable
