import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPersonals } from '../../redux/novaSlice/thunks';
import JorgeGas from '../../assetsOficial/jorgegas.svg';
import style from './mainPage.module.css';
import CreatePersonal from '../CreatePersonal/CreatePersonal';
import ModifyPersonal from '../ModififyPersonal/ModifyPersonal';
import { RiFileExcel2Fill } from 'react-icons/ri';
import XLSX from 'xlsx';
import InfiniteScroll from 'react-infinite-scroller';
import SinAcceso from '../SinAcceso/SinAcceso';

const MainPage = () => {

    const width = window.innerWidth;
    const personal = useSelector((state) => state.Nova.novaPersonals)
    const dispatch = useDispatch()

    const { usuario } = JSON.parse(localStorage.getItem('usuario'));
    const [paginaActual, setPaginaActual] = useState(1)
    const [porPagina, setPorPagina] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const maximo = personal?.length / porPagina
    const primerIndice = (paginaActual - 1) * porPagina
    const ultimoIndice = (paginaActual - 1) * porPagina + porPagina
    const currentPosts = personal?.slice(primerIndice, ultimoIndice)

    const loadMore = () => {
        if (paginaActual >= maximo) {
            setHasMore(false)
            return
        }
        setPorPagina(
            porPagina + 9
        )
    }

    /////// EXCEL ///////
    const tablaRef = useRef(null);

    const handleExportExcel = () => {

        const tabla = tablaRef.current;
        const ws = XLSX.utils.table_to_sheet(tabla);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Personal");
        XLSX.writeFile(wb, `Personal.xlsx`);
        
    }

    useEffect(() => {
        dispatch(getPersonals())
        setPorPagina(width > 1800 ? 12 : 9)
    }, [dispatch, width])

    if(usuario.administrador === null ) return <SinAcceso />

    return (
        <div className={style.margin}>
            <p className={style.text}>Lista de personal</p>
            <img src={JorgeGas} alt="logo" className={style.logo} />
            <div className={style.container}>
                <CreatePersonal />
                <ModifyPersonal />
                <button onClick={handleExportExcel} className={style.excel}>
                    <RiFileExcel2Fill className={style.icon3} />
                    <p>Exportar a excel</p>
                </button>
                <div className={style.tableContainer}>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={loadMore}
                        hasMore={hasMore}
                    >
                        <table
                            className="table-sm table table-bordered table-hover responsive"
                            ref={tablaRef}
                        >
                            <thead>
                                <tr>
                                    <th className="px-4 py-3">Nombre</th>
                                    <th className="px-4 py-3">Apellido</th>
                                    <th className="px-4 py-3">Rut</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Rol</th>
                                </tr>
                            </thead>
                            <tbody >
                                {currentPosts?.map((personal) => (
                                    <tr key={personal.id}>
                                        <td className="px-4 py-3">{personal?.name}</td>
                                        <td className="px-4 py-3">{personal?.lastname}</td>
                                        <td className="px-4 py-3">{personal?.rut}</td>
                                        <td className="px-4 py-3">{personal?.email}</td>
                                        <td className="px-4 py-3">{personal?.rols[0]?.name === "Ayudante" ? "Peoneta" : personal?.rols[0]?.name}</td>
                                    </tr>
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

export default MainPage
