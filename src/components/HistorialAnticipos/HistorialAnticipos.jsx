import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'reactstrap'
import { bringOrdenesAyudanteById, bringOrdenesChoferById, bringOrdenesChofer, bringOrdenesAyudante } from '../../redux/novaSlice/thunks'
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import style from './historialAnticipos.module.css'
import JorgeGas from '../../assetsOficial/jorgegas.svg';
import SinAcceso from '../SinAcceso/SinAcceso';
import { numberWithDots } from '../../helpers/numberWithDot';
import InfiniteScroll from 'react-infinite-scroller';

registerLocale('es', es)

const HistorialAnticipos = () => {

    const dispatch = useDispatch()

    const { usuario } = JSON.parse(localStorage.getItem('usuario'));
    const { ordenesChoferById, ordenesAyudanteById, ordenesChofer, ordenesAyudante } = useSelector(state => state.Nova)
    const [paginaActual, setPaginaActual] = useState(1)
    const [porPagina, setPorPagina] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const maximo = ordenesChofer?.length / porPagina
    const primerIndice = (paginaActual - 1) * porPagina
    const ultimoIndice = (paginaActual - 1) * porPagina + porPagina
    const currentPosts = ordenesChofer?.slice(primerIndice, ultimoIndice)
    const currentPostsAyudante = ordenesAyudante?.slice(primerIndice, ultimoIndice)

    const loadMore = () => {
        if (paginaActual >= maximo) {
            setHasMore(false)
            return
        }
        setPorPagina(
            porPagina + 5
        )
    }

    const [startDate , setStartDate] = useState(new Date())
    const [endDate , setEndDate] = useState(null)
    const [selected, setSelected] = useState({
        id: '',
        rol: ''
    })

    const onChangeDate = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }
    
    const fechaInicio = startDate.toLocaleDateString('es-CL', { timeZone: 'America/Santiago' }).split('-').reverse().join('-');
    const fechaFin = endDate?.toLocaleDateString('es-CL', { timeZone: 'America/Santiago' }).split('-').reverse().join('-');
    
    useEffect(() => {
        dispatch(bringOrdenesChofer(fechaInicio, fechaFin))
        dispatch(bringOrdenesAyudante(fechaInicio, fechaFin))
    }, [
        dispatch,
        fechaInicio,
        fechaFin
    ])

    if(usuario.administrador === null) return <SinAcceso />

    return (
        <div>
            <p className={style.text}>Historial de anticipos</p>
            <img src={JorgeGas} alt="jorgeGas" className={style.logo} />
            <div className={style.container}>
                <div className={style.datePicker}>
                    <p className={style.textDatePicker}>
                        Seleccione un rango de fechas
                    </p>
                    <DatePicker
                        selected={startDate}
                        onChange={onChangeDate}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                        locale="es"
                        dateFormat="dd/MM/yyyy"
                        className={style.classDatePicker}
                        maxDate={new Date()}
                        onInputClick={() => {
                            dispatch(bringOrdenesChofer(fechaInicio, fechaFin))
                            dispatch(bringOrdenesAyudante(fechaInicio, fechaFin))
                        }}
                    />
                </div>
                <p className={style.text1}>
                    Lista de Personal
                </p>
                <p className={style.text2}
                >
                    Historial de Anticipos
                </p>
                <div className={style.tabla}>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={loadMore}
                        hasMore={hasMore}
                    >
                        <table
                            className='table table-striped table-bordered table-hover table-sm'
                        >
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Rol</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentPosts?.map((chofer, index) => (
                                        <tr key={index} onClick={
                                            () => {
                                                setSelected({
                                                    id: chofer?.faltantes[0]?.chofer?.id,
                                                    rol: 'Chofer'
                                                })
                                                dispatch(bringOrdenesChoferById(chofer?.faltantes[0]?.chofer?.id, fechaInicio, fechaFin))
                                            }
                                        } className={
                                            selected?.id === chofer?.faltantes[0]?.chofer?.id && selected?.rol === 'Chofer' ? style.selected : style.notSelected
                                        }>
                                            <td>
                                                {
                                                    chofer?.name
                                                }
                                            </td>
                                            <td>
                                                {
                                                    chofer?.lastname
                                                }
                                            </td>
                                            <td>
                                                Chofer
                                            </td>
                                            <td>
                                                {
                                                    chofer?.totalFaltantes ? numberWithDots(chofer?.totalFaltantes) : 0
                                                }
                                            </td>
                                        </tr>
                                        
                                    ))
                                }
                                {
                                    currentPostsAyudante?.map((ayudante, index) => (
                                        <tr key={index} onClick={
                                            () => {
                                                setSelected({
                                                    id: ayudante?.faltantes[0]?.ayudante?.id,
                                                    rol: 'ayudante'
                                                })
                                                dispatch(bringOrdenesAyudanteById(ayudante?.faltantes[0]?.ayudante?.id, fechaInicio, fechaFin))
                                            }
                                        } className={
                                            selected?.id === ayudante?.faltantes[0]?.ayudante?.id && selected?.rol === 'ayudante' ? style.selected : style.notSelected
                                        }>
                                            <td>
                                                {
                                                    ayudante?.name
                                                }
                                            </td>
                                            <td>
                                                {
                                                    ayudante?.lastname
                                                }
                                            </td>
                                            <td>
                                                Peoneta
                                            </td>
                                            <td>
                                                {
                                                    ayudante?.totalFaltantes ? numberWithDots(ayudante?.totalFaltantes) : 0
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </InfiniteScroll>
                </div>
                <button onClick={loadMore} className={style.boton}>
                    Cargar mas
                </button>
                <div className={style.tabla2}>
                    <Table
                        bordered
                        hover
                        responsive
                        className='table'
                    >
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Orden</th>
                                <th>Recaudacion</th>
                                <th>Anticipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                selected?.rol === "Chofer" ? ordenesChoferById?.ordenesDeRepartoChofer?.map((orden) => (
                                    <tr key={orden.id}>
                                        <td>{orden.fecha}</td>
                                        <td>{orden.id}</td>
                                        <td>{orden.PrecioTotal ? numberWithDots(orden.PrecioTotal) : 0}</td>
                                        <td>{orden.faltanteChofer ? numberWithDots(orden.faltanteChofer) : 0}</td>
                                    </tr>
                                )) : ordenesAyudanteById?.ordenesDeRepartoAyudante?.map((orden) => (
                                    <tr key={orden.id}>
                                        <td>{orden.fecha}</td>
                                        <td>{orden.id}</td>
                                        <td>{orden.PrecioTotal ? numberWithDots(orden.PrecioTotal) : 0}</td>
                                        <td>{orden.faltantePeoneta ? numberWithDots(orden.faltantePeoneta) : 0}</td>
                                    </tr>
                                ))
                            }
                            {
                                selected?.rol === "Chofer" ? (
                                    <tr>
                                        <th>
                                            Total
                                        </th>
                                        <th></th>
                                        <th></th>
                                        <th>
                                            {ordenesChoferById?.faltanteChofer ? numberWithDots(ordenesChoferById?.faltanteChofer) : 0}
                                        </th>
                                    </tr>
                                ) : (
                                    <tr>
                                        <th>
                                            Total
                                        </th>
                                        <th></th>
                                        <th></th>
                                        <th>
                                            {ordenesAyudanteById?.faltantePeoneta ? numberWithDots(ordenesAyudanteById?.faltantePeoneta) : 0}
                                        </th>
                                    </tr>
                                ) 
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default HistorialAnticipos
