import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import carrito from '../../assetsOficial/carrito.svg';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Input, Form } from 'reactstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import Select from 'react-select';
import { bringPatentes, bringCuadrantesActive, bringChoferes, bringAyudantes, createOrden, bringListaDePreciosActive, switchLoading } from '../../redux/novaSlice/thunks';
import cinco from '../../assets/5n.ico';
import once from '../../assets/11n.ico';
import quince from '../../assets/15n.ico';
import cuarenta from '../../assets/45n.ico';
import style from './createOrden.module.css';
import Loading from '../Loading/Loading';
import { handleKeydown } from '../../helpers/KeyDown';
import { numberWithDots } from '../../helpers/numberWithDot';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-datepicker/dist/react-datepicker.css';
registerLocale('es', es);

const CreateOrden = () => {

    const { patentes, cuadrantes, choferes, ayudantes, listaDePrecios, loading } = useSelector(state => state.Nova);
    const { usuario } = JSON.parse(localStorage.getItem('usuario'));
    const onlyDate = new Date().toLocaleDateString('es-CL', { timeZone: 'America/Santiago' }).split('-').reverse().join('-');
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const dispatch = useDispatch();

    const [disabled, setDisabled] = useState(false);

    const [productos, setProductos] = useState([
        {
            name: "GAS NORMAL 5 KILOS",
            price : 0,
            quantity: 0
        },
        {
            name: "GAS NORMAL 11 KILOS",
            price: 0,
            quantity: 0
        },
        {
            name: "GAS NORMAL 15 KILOS",
            price: 0,
            quantity: 0
        },
        {
            name: "GAS NORMAL 45 KILOS",
            price: 0,
            quantity: 0
        }
    ]);

    const [orden, setOrden] = useState({
        fecha: onlyDate,
        totalCantidad: 0,
        totalRecaudacion: 0,
        patente: '',
        cuadranteId: '',
        idChofer: 0,
        idPeoneta: 0,
        idAdmin: usuario?.administrador?.id,
    });

    useEffect(() => {
        dispatch(bringPatentes());
        dispatch(bringCuadrantesActive());
        dispatch(bringChoferes());
        dispatch(bringAyudantes());
        dispatch(bringListaDePreciosActive());
    }, [ dispatch ]);

    useEffect(() => {
        setProductos([
            {
                name: "GAS NORMAL 5 KILOS",
                price: listaDePrecios?.precio5kg,
                quantity: 0
            },
            {
                name: "GAS NORMAL 11 KILOS",
                price: listaDePrecios?.precio11kg,
                quantity: 0
            },
            {
                name: "GAS NORMAL 15 KILOS",
                price: listaDePrecios?.precio15kg,
                quantity: 0
            },
            {
                name: "GAS NORMAL 45 KILOS",
                price: listaDePrecios?.precio45kg,
                quantity: 0
            }
        ]);
    }, [
        listaDePrecios?.precio5kg,
        listaDePrecios?.precio11kg,
        listaDePrecios?.precio15kg,
        listaDePrecios?.precio45kg,
    ]);

    useEffect(() => {
        if( orden.patente !== '' &&
            orden.cuadranteId !== '' && 
            orden.idChofer !== 0
        ){
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [
        orden.patente,
        orden.cuadranteId,
        orden.idChofer,
    ]);

    const handleProductsChange = (e, index) => {
        e.preventDefault();
        const value = Number(e.target.value);
        const list = [...productos];
        list[index].quantity = value;
        setProductos(list);

        let total = 0;
        let total2 = 0;
        list.forEach((item) => {
            total += item.quantity * Number(item.price);
            total2 += Number(item.quantity);
        });

        setOrden({
            ...orden,
            totalCantidad: total2,
            totalRecaudacion: total,
        })
    };

    const cleanState = (productos) => {
        productos.forEach((item) => {
            item.quantity = 0;
        });
        setOrden({
            ...orden,
            totalCantidad: 0,
            totalRecaudacion: 0,
            patente: '',
            cuadranteId: '',
            idChofer:0,
            idPeoneta: 0,
            idAdmin: usuario?.administrador?.id,
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createOrden({
            ...orden,
            productos
        }));
        cleanState(productos);
        toggle();
        dispatch(switchLoading());
    };

    /////////// SELECT BUSCADOR ///////////
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const onMenuOpen = () => setIsMenuOpen(true);
    const onMenuClose = () => setIsMenuOpen(false);

    const optionsPatentes = patentes?.map((patente) => {
        return {
            value: patente?.name,
            label: patente?.name
        }
    });

    const optionsCuadrantes = cuadrantes?.map((cuadrante) => {
        return {
            value: cuadrante?.id,
            label: cuadrante?.name
        }
    });

    const optionsChoferes = choferes?.map((chofer) => {
        return {
            value: chofer?.chofer?.id,
            label: `${chofer?.name} ${chofer?.lastname}`
        }
    });

    const optionsAyudantes = ayudantes?.map((ayudante) => {
        return {
            value: ayudante?.ayudante?.id,
            label: `${ayudante?.name} ${ayudante?.lastname}`
        }
    });

    const optionDefaultAyudante = {
        value: 0,
        label: 'Sin peoneta'
    };

    const modalStyles = {
        position: 'relative',
        left: '15%',
        top: '3%',
        transform: 'translate(-50%, -2%)',
        "--bs-modal-bg": "#F5F5F5",
        fontFamily: 'Roboto'
    };

    return (
        <div>
            {
                loading ? <Loading /> : null
            }
            <div className={style.iconContainer2}>
                <button onClick={toggle} className={style.botonsito}>
                    <img src={carrito} alt="carrito" className={style.icon}/>
                    <p>Crear orden</p>
                </button>
                
            </div>
            <Modal isOpen={modal} toggle={toggle} style={modalStyles} backdrop="static" onKeyDown={handleKeydown}>
                <ModalHeader toggle={toggle}>Crear Orden</ModalHeader>
                <Form onSubmit={handleSubmit}>
                    <ModalBody >
                            <div className={style.containerFecha}>
                                <label>Fecha</label>
                                <DatePicker
                                    selected={new Date}
                                    dateFormat="dd/MM/yyyy"
                                    className={style.datePicker}
                                    locale="es"
                                />
                            </div>
                                <div className={style.containerForm}>
                                    <Select
                                        name="patente"
                                        className={style.inpusitos}
                                        options={optionsPatentes}
                                        placeholder="Patente"
                                        isMenuOpen={isMenuOpen}
                                        onMenuOpen={onMenuOpen}
                                        onMenuClose={onMenuClose}
                                        onChange={(e) => setOrden({ ...orden, patente: e.value })}
                                    />
                                    <Select
                                        name="cuadrante"
                                        className={style.inpusitos}
                                        options={optionsCuadrantes}
                                        placeholder="Cuadrante"
                                        isMenuOpen={isMenuOpen}
                                        onMenuOpen={onMenuOpen}
                                        onMenuClose={onMenuClose}
                                        onChange={(e) => setOrden({ ...orden, cuadranteId: Number(e.value) })}
                                    />
                                    <Select
                                        name="chofer"
                                        className={style.inpusitos}
                                        options={optionsChoferes}
                                        placeholder="Chofer"
                                        isMenuOpen={isMenuOpen}
                                        onMenuOpen={onMenuOpen}
                                        onMenuClose={onMenuClose}
                                        onChange={(e) => setOrden({ ...orden, idChofer: Number(e.value) })}
                                    />
                                    <Select
                                        name="ayudante"
                                        className={style.inpusitos}
                                        options={[optionDefaultAyudante, ...optionsAyudantes]}
                                        placeholder="Peoneta"
                                        isMenuOpen={isMenuOpen}
                                        onMenuOpen={onMenuOpen}
                                        onMenuClose={onMenuClose}
                                        onChange={(e) => setOrden({ ...orden, idPeoneta: Number(e.value) })}
                                    />
                                </div>
                                <div className={style.containerProductos}>
                                        <img src={cinco} alt="cinco" className={style.iconGas} />
                                        <Input
                                            type="number"
                                            name="GAS NORMAL 5 KILOS"
                                            onChange={ (e) => handleProductsChange(e, 0)}
                                            placeholder="Cantidad" 
                                            className={style.inpusitos3}
                                            min={0}
                                        />
                                        <img src={once} alt="once" className={style.iconGas} />
                                        <Input
                                            type="number"
                                            name="GAS NORMAL 11 KILOS"
                                            onChange={(e) => handleProductsChange(e, 1)}
                                            placeholder="Cantidad"
                                            className={style.inpusitos3}
                                            min={0}
                                        />
                                        <img src={quince} alt="quince" className={style.iconGas} />
                                        <Input
                                            type="number"
                                            name="GAS NORMAL 15 KILOS"
                                            onChange={(e) => handleProductsChange(e, 2)}
                                            placeholder="Cantidad"
                                            className={style.inpusitos3}
                                            min={0}
                                        />
                                        <img src={cuarenta} alt="cuarenta" className={style.iconGas} />
                                        <Input
                                            type="number"
                                            name="GAS NORMAL 45 KILOS"
                                            onChange={(e) => handleProductsChange(e, 3)}
                                            placeholder="Cantidad"
                                            className={style.inpusitos3}
                                            min={0}
                                        />
                                </div>
                                <div className={style.cantidadContainer}>
                                    <div>
                                        <Input
                                            type="number"
                                            name="cantidadTotal"
                                            placeholder="Cantidad Total"
                                            className={style.inpusitos2}
                                            disabled={true}
                                            value={orden.totalCantidad}
                                        />
                                        <p style={{
                                            marginLeft : "19px"
                                        }}>Cantidad Total</p>
                                    </div>
                                    <div>
                                        <Input
                                            type="text"
                                            name="precioTotal"
                                            value={orden.totalRecaudacion ? numberWithDots(orden?.totalRecaudacion) : 0}
                                            placeholder="Precio Total"
                                            className={style.inpusitos2}
                                            disabled={true}
                                        />
                                        <p style={{
                                            marginLeft : "19px"
                                        }}>Precio Total</p>
                                    </div>
                                </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type='submit' disabled={disabled}>
                            Crear
                        </Button>
                        <Button color="secondary" onClick={
                            () => {
                                toggle();
                                cleanState(productos);
                            }
                        }>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}

export default CreateOrden
