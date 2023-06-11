import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import { RiFileExcel2Fill } from 'react-icons/ri';
import moment from 'moment';
import 'moment-timezone';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { Input } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroller';
import * as XLSXPopulate from 'xlsx-populate/browser/xlsx-populate';
import { getAllOrdenes } from '../../redux/novaSlice/thunks';
import JorgeGas from '../../assetsOficial/jorgegas.svg';
import CreateOrden from '../CreateOrden/CreateOrden';
import OrdenList from '../OrdenList/OrdenList';
import DownloadOrden from '../DownloadOrden/DownloadOrden';
import ListaDePrecios from '../ListaDePrecios/ListaDePrecios';
import Patentes from '../Patentes/Patentes';
import Cuadrantes from '../Cuadrantes/Cuadrantes';
import style from './guidePage.module.css';
import SinAcceso from '../SinAcceso/SinAcceso';


registerLocale('es', es);
const GuidePage = () => {

    const dispatch = useDispatch();
    const { novaOrdenes } = useSelector((state) => state.Nova);
    const { email } = useSelector(state => state.Autenticacion.autBack)
    const { usuario } = JSON.parse(localStorage.getItem('usuario'));
    
    const [date, setDate] = useState(new Date());
    const soloFecha = moment(date).tz('America/Santiago').format('YYYY-MM-DD');

    const width = window.innerWidth;

    ///// PAGINADO /////
    const [paginaActual, setPaginaActual] = useState(1)
    const [porPagina, setPorPagina] = useState(width > 1800 ? 18 : 12)
    const [hasMore, setHasMore] = useState(true)
    const maximo = novaOrdenes?.ordenDeRepartos?.length / porPagina
    const primerIndice = (paginaActual - 1) * porPagina
    const ultimoIndice = (paginaActual - 1) * porPagina + porPagina
    const currentPosts = novaOrdenes?.ordenDeRepartos?.slice(primerIndice, ultimoIndice)

    const loadMore = () => {
        if (paginaActual >= maximo) {
            setHasMore(false)
            return
        }
        setPorPagina(
            porPagina + 9
        )
    }

    useEffect(() => {
            dispatch(getAllOrdenes(soloFecha));
    }, [dispatch, soloFecha]);
    
    /////// EXCEL ///////
    const tablaRef = useRef(null);

    const handleExportExcelPopulate = async () => {
        const data = currentPosts?.map((post) => {
            return {
                'Numero de orden': post.id,
                'Fecha': post.fecha,
                'Cantidad de tarros': post.contabilidadRecarga.totalCantidad,
                'Patente': post.patente.name,
                'chofer': post?.chofer?.personal?.name + ' ' + post.chofer?.personal?.lastname,
                'peoneta': post?.ayudante?.personal?.name && post?.ayudante?.personal?.lastname ? 
                post?.ayudante?.personal?.name + ' ' + post?.ayudante?.personal?.lastname : 
                'Sin peoneta',
                'comuna': post?.cuadrante?.name,
                'estado': post?.estado === true ? 'Activa' : 'Descargada',
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
        ws.name('Guia de reparto');

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
        ws.row(2).cell(3).value('Cantidad de tarros').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(4).value('Patente').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(5).value('Chofer').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(6).value('Peoneta').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(7).value('Comuna').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(8).value('Estado').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        
        for(let i = 0; i < data.length; i++) {
            ws.row(i + 3).cell(1).value(data[i]['Numero de orden']);
            ws.row(i + 3).cell(2).value(data[i]['Fecha']);
            ws.row(i + 3).cell(3).value(Number(data[i]['Cantidad de tarros']));
            ws.row(i + 3).cell(4).value(data[i]['Patente']);
            ws.row(i + 3).cell(5).value(data[i]['chofer']);
            ws.row(i + 3).cell(6).value(data[i]['peoneta']);
            ws.row(i + 3).cell(7).value(data[i]['comuna']);
            ws.row(i + 3).cell(8).value(data[i]['estado']);
        }

        wb.outputAsync().then(function (blob) {
            saveAs(blob, `Guia de reparto ${usuario.name} ${usuario.lastname} ${soloFecha}.xlsx`);
        });

    };

    if(usuario.administrador === null) {
        return <SinAcceso />
    }

    return (
        <div>
            <p className={style.text}>Guia de reparto</p>
            <img src={JorgeGas} alt="jorgeGas" className={style.icon}/>
            <div className={style.container}>
                <div className={style.datePicker}>
                    <p style={{
                        color: '#000000',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                    }}
                    >
                        Seleccione una fecha
                    </p>
                    <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        dateFormat="dd/MM/yyyy"
                        locale="es"
                        placeholderText="Seleccione una fecha"
                        maxDate={new Date()}
                        className={style.classDatePicker}
                    />
                    <div className={style.infoOrdenes}>
                        <p>Ordenes creadas</p>
                        <Input
                            type="number"
                            value={novaOrdenes?.ordenDeRepartos?.length}
                            disabled
                            className={style.inputOrdenes}
                        >
                        </Input>
                    </div>
                </div>
                <button onClick={handleExportExcelPopulate} className={style.excel}>
                    <RiFileExcel2Fill className={style.icon3} />
                    <p>Exportar a excel</p>
                </button>
                {
                    email === "maicol.nieto@jorgegas.cl" ||
                    email === "benjaminsotoro@gmail.com" ||
                    email === "jorgetalento@outlook.es" ? (
                        <>
                            <ListaDePrecios/>
                            <Patentes />
                            <Cuadrantes />
                        </>
                    ) : null
                }
                <CreateOrden/>
                <DownloadOrden fecha={soloFecha}/>
                <div className={style.tableContainer}>
                    <InfiniteScroll
                        pageStart={0}
                        hasMore={hasMore}
                    >
                        <table
                            className="table-md table table-bordered table-hover" 
                            ref={tablaRef}
                        >
                            <thead>
                                <tr>
                                    <th>Numero de orden</th>
                                    <th>Fecha</th>
                                    <th>Cantidad de tarros</th>
                                    <th>Patente</th>
                                    <th>Chofer</th>
                                    <th>Peoneta</th>
                                    <th>Comuna</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody
                                style={{
                                    overflowY: 'scroll',
                                }}
                            >
                                {currentPosts?.map((orden) => (
                                    <OrdenList
                                        key={orden?.id}
                                        id={orden?.id}
                                        fecha={orden?.fecha}
                                        patente={orden?.patente?.name}
                                        chofer={orden?.chofer?.personal?.name + ' ' + orden.chofer?.personal?.lastname }
                                        ayudante= {
                                            orden?.ayudante?.personal?.name && 
                                            orden?.ayudante?.personal?.lastname ? 
                                            orden?.ayudante?.personal?.name + ' ' + orden?.ayudante?.personal?.lastname : 
                                            'Sin peoneta'
                                        }
                                        cuadrante={orden?.cuadrante?.name}
                                        estado={orden?.estado === true ? 'Activa' : 'Descargada'}
                                        recargas={orden?.recargas}
                                        contabilidadRecarga={orden?.contabilidadRecarga}
                                        metodoPagos={orden?.metodoPagos}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </InfiniteScroll>
                </div>
                <button onClick={loadMore} className={style.boton}>
                    Cargar mas
                </button>
            </div>
        </div>
    )
}

export default GuidePage
