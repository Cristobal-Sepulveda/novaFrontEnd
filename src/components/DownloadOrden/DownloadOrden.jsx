import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './downloadOrden.module.css';
import descargar from '../../assetsOficial/descargar.svg';
import { ordenesActivas, bringOrdenById, cleanOrden, finalizeOrden, switchLoading } from '../../redux/novaSlice/thunks';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Form, Label, Table }  from 'reactstrap';
import Select from 'react-select';
import { handleKeydown } from '../../helpers/KeyDown';
import { numberWithDots } from '../../helpers/numberWithDot';
import 'bootstrap/dist/css/bootstrap.css';

const DownloadOrden = ({ fecha }) => {
    
    const dispatch = useDispatch();

    const { ordenesDisponibles, novaOrdenById, listaDePrecios } = useSelector((state) => state.Nova);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [idOrden, setIdOrden] = useState(0);
    const [disabled, setDisabled] = useState(false);

    const [llenos, setLlenos] = useState({
        llenos5kg: "",
        llenos11kg: "",
        llenos15kg: "",
        llenos45kg: ""
    });

    const [ventas, setVentas] = useState({
        ventas5kg: "",
        ventas11kg: "",
        ventas15kg: "",
        ventas45kg: ""
    });

    const [recaudacion, setRecaudacion] = useState({
        recaudacion5kg: "",
        recaudacion11kg: "",
        recaudacion15kg: "",
        recaudacion45kg: ""
    });

    const [totalCantidad, setTotalCantidad] = useState(0);
    const [totalRecaudacion, setTotalRecaudacion] = useState(0);

    useEffect(() => {
        dispatch(bringOrdenById(idOrden));
        dispatch(cleanOrden());
    }, [idOrden, dispatch]);

    useEffect(() => {
        setRecaudacion({
            ...recaudacion,
            recaudacion5kg: ventas.ventas5kg * Number(listaDePrecios?.precio5kg),
            recaudacion11kg: ventas.ventas11kg * Number(listaDePrecios?.precio11kg),
            recaudacion15kg: ventas.ventas15kg * Number(listaDePrecios?.precio15kg),
            recaudacion45kg: ventas.ventas45kg * Number(listaDePrecios?.precio45kg)
        })
        setTotalCantidad(
            Number(ventas.ventas5kg) + Number(ventas.ventas11kg) + Number(ventas.ventas15kg) + Number(ventas.ventas45kg)
        )
        setTotalRecaudacion(
            Number(recaudacion.recaudacion5kg) + Number(recaudacion.recaudacion11kg) + Number(recaudacion.recaudacion15kg) + Number(recaudacion.recaudacion45kg)
        )
    }, [
        ventas.ventas5kg,
        ventas.ventas11kg,
        ventas.ventas15kg,
        ventas.ventas45kg,
        recaudacion.recaudacion5kg,
        recaudacion.recaudacion11kg,
        recaudacion.recaudacion15kg,
        recaudacion.recaudacion45kg,
        listaDePrecios.precio5kg,
        listaDePrecios.precio11kg,
        listaDePrecios.precio15kg,
        listaDePrecios.precio45kg
    ])

    useEffect(() => {
        if( idOrden === 0 ||
            llenos.llenos5kg === "" ||
            Number(llenos.llenos5kg) > Number(novaOrdenById.contabilidadRecarga?.total5kg) ||
            llenos.llenos11kg === "" ||
            Number(llenos.llenos11kg) > Number(novaOrdenById.contabilidadRecarga?.total11kg) ||
            llenos.llenos15kg === "" ||
            Number(llenos.llenos15kg) > Number(novaOrdenById.contabilidadRecarga?.total15kg) ||
            llenos.llenos45kg === "" ||
            Number(llenos.llenos45kg) > Number(novaOrdenById.contabilidadRecarga?.total45kg)
        ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [idOrden, llenos])

    const handleChange = (e) => {
        //seteo los llenos
        setLlenos({
            ...llenos,
            [e.target.name]: e.target.value
        })

        //seteo las ventas con los actuales menos los llenos
        if(e.target.name === "llenos5kg") {
            setVentas({
                ...ventas,
                ventas5kg: novaOrdenById.contabilidadRecarga?.total5kg - Number(e.target.value)
            })
        } else if(e.target.name === "llenos11kg") {
            setVentas({
                ...ventas,
                ventas11kg: novaOrdenById.contabilidadRecarga?.total11kg - e.target.value
            })
        } else if(e.target.name === "llenos15kg") {
            setVentas({
                ...ventas,
                ventas15kg: novaOrdenById.contabilidadRecarga?.total15kg - e.target.value
            })
        }
        else if(e.target.name === "llenos45kg") {
            setVentas({
                ...ventas,
                ventas45kg: novaOrdenById.contabilidadRecarga?.total45kg - e.target.value
            })
            
        }
    }

    const cleanStates = () => {
        setIdOrden(0);
        setLlenos({
            llenos5kg: "",
            llenos11kg: "",
            llenos15kg: "",
            llenos45kg: ""
        })
        setVentas({
            ventas5kg: "",
            ventas11kg: "",
            ventas15kg: "",
            ventas45kg: ""
        })
        setRecaudacion({
            recaudacion5kg: "",
            recaudacion11kg: "",
            recaudacion15kg: "",
            recaudacion45kg: ""
        })
        setTotalCantidad(0);
        setTotalRecaudacion(0);
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const onMenuOpen = () => setIsMenuOpen(true);
    const onMenuClose = () => setIsMenuOpen(false);

    const optionsOrdenes = ordenesDisponibles?.map((orden) => {
        return {
            value: orden.id,
            label: 
                `#${orden.id} 
                Patente: ${orden.patente.name} 
                Cuadrante: ${orden.cuadrante.name} 
                ${orden.chofer.personal.name} 
                ${orden.chofer.personal.lastname}` + 
                `${orden.ayudante? " y " + orden?.ayudante?.personal?.name + orden?.ayudante?.personal?.lastname : ""} `
        }
    })

    const handleChangeOptions = (e) => {
        setIdOrden(e.value);
    }

    const handleKeyDown2 = (event) => {
        if (event.keyCode === 38 || event.keyCode === 40) {
            event.preventDefault();
        }
    };


    const modalStyles = {
        position: 'relative',
        left: '15%',
        top: '3%',
        transform: 'translate(-32%, -2%)',
        fontFamily: 'Roboto, sans-serif',
        "--bs-modal-bg": "#F5F5F5",
        "--bs-modal-width": "580px",
    };

    return (    
        <div>
            <div className={style.iconContainer}>
                <button onClick={
                    () => {
                        dispatch(ordenesActivas());
                        toggle();
                    }} className={style.botonsito}>
                    <img src={descargar} alt="descargar" className={style.icon} />
                    <p>Descargar</p>
                </button>
            </div>
            <Modal isOpen={modal} toggle={toggle} style={modalStyles} size="md" backdrop="static" onKeyDown={handleKeydown}>
                <ModalHeader toggle={toggle}>Descargar orden</ModalHeader>
                <Form onSubmit={(e) =>{
                    e.preventDefault()
                    dispatch(finalizeOrden(idOrden, llenos,fecha))
                    cleanStates();
                    dispatch(switchLoading())
                }}>
                    <ModalBody>
                            <FormGroup>
                                <Label for="exampleSelect" style={{
                                    fontWeight: '700'
                                }}>Seleccione una orden</Label>
                                <Select 
                                    name='idOrden'
                                    onChange={handleChangeOptions}
                                    options={optionsOrdenes}
                                    isMenuOpen={isMenuOpen}
                                    onMenuOpen={onMenuOpen}
                                    onMenuClose={onMenuClose}
                                    placeholder="Ordenes"
                                />
                                <div className={style.tabla}>
                                <Table
                                    bordered
                                    hover
                                    size="lg"
                                    className="
                                        table-md
                                        table-responsive
                                        mt-3
                                    "
                                >
                                    <thead>
                                        <tr style={{
                                            textAlign: 'center'
                                        }}>
                                            <th>Productos</th>
                                            <th>Actuales</th>
                                            <th>Llenos</th>
                                            <th>Ventas</th>
                                            <th>Precio</th>
                                            <th>Recaudacion</th>
                                        </tr>                        
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{
                                                textAlign: 'center',
                                                verticalAlign: 'middle'
                                            }}>
                                                <p>Gas 5 kilos</p>
                                            </td>
                                            <td style={{
                                                textAlign: 'center',
                                                verticalAlign: 'middle'
                                            }}>
                                                <p>{novaOrdenById?.contabilidadRecarga?.total5kg}</p>
                                            </td>
                                            <td className={style.inputContainer}>
                                                <FormGroup>
                                                        <Input
                                                            type="number"
                                                            name="llenos5kg"
                                                            value={llenos.llenos5kg}
                                                            onChange={handleChange}
                                                            className={style.inputs}
                                                            min={0}
                                                            onKeyDown={handleKeyDown2}
                                                            onWheel={(e) => e.target.blur()}
                                                            disabled={
                                                                novaOrdenById ? false : true
                                                            }
                                                        />
                                                </FormGroup>
                                            </td>
                                            <td>
                                                <p className={style.inputContainer2}>
                                                    <Input
                                                        type="number"
                                                        name="ventas5kg"
                                                        value={ventas.ventas5kg}
                                                        onChange={handleChange}
                                                        className={style.inputs}
                                                        disabled
                                                        min={0}
                                                    />
                                                </p>
                                            </td>
                                            <td style={{
                                                textAlign: 'center',
                                                verticalAlign: 'middle'
                                            }}>
                                                {
                                                    listaDePrecios ? <p>{listaDePrecios.precio5kg ? numberWithDots(listaDePrecios.precio5kg) : 0}</p> : null
                                                }
                                            </td>
                                            <td>
                                                <td className={style.inputContainer2}>
                                                    <Input
                                                        type="text"
                                                        name="recaudacion5kg"
                                                        value={recaudacion.recaudacion5kg ? numberWithDots(recaudacion.recaudacion5kg) : 0}
                                                        onChange={handleChange}
                                                        className={style.inputs2}
                                                        min={0}
                                                        disabled
                                                    />
                                                </td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{
                                                textAlign: 'center',
                                                verticalAlign: 'middle'
                                            }}>
                                                <p>Gas 11 kilos</p>
                                            </td>
                                            <td style={{
                                                textAlign: 'center',
                                                verticalAlign: 'middle'
                                            }}>
                                                <p>{novaOrdenById?.contabilidadRecarga?.total11kg}</p>
                                            </td>
                                            <td className={style.inputContainer}>
                                                <FormGroup>
                                                        <Input
                                                            type="number"
                                                            name="llenos11kg"
                                                            value={llenos.llenos11kg}
                                                            onChange={handleChange}
                                                            className={style.inputs}
                                                            min={0}
                                                            onKeyDown={handleKeyDown2}
                                                            onWheel={(e) => e.target.blur()}
                                                            disabled={
                                                                novaOrdenById ? false : true
                                                            }
                                                        />
                                                </FormGroup>
                                            </td>
                                            <td>
                                                <td className={style.inputContainer2}>
                                                    <Input
                                                        type="number"
                                                        name="ventas11kg"
                                                        value={ventas.ventas11kg}
                                                        onChange={handleChange}
                                                        className={style.inputs}
                                                        disabled
                                                        min={0}
                                                    />
                                                </td>
                                            </td>
                                            <td style={{
                                                textAlign: 'center',
                                                verticalAlign: 'middle'
                                            }}>
                                                <p>
                                                    {
                                                        listaDePrecios ? <p>{listaDePrecios.precio11kg ? numberWithDots(listaDePrecios.precio11kg) : 0}</p> : null
                                                    }
                                                </p>
                                            </td>
                                            <td>
                                                <td className={style.inputContainer2}>
                                                    <Input
                                                        type="text"
                                                        name="recaudacion11kg"
                                                        value={recaudacion.recaudacion11kg ? numberWithDots(recaudacion.recaudacion11kg) : 0}
                                                        onChange={handleChange}
                                                        className={style.inputs2}
                                                        min={0}
                                                        disabled
                                                    />
                                                </td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{
                                                textAlign: 'center',
                                                verticalAlign: 'middle'
                                            }}>
                                                <p>Gas 15 kilos</p>
                                            </td>
                                            <td style={{
                                                textAlign: 'center',
                                                verticalAlign: 'middle'
                                            }}>
                                                <p>{novaOrdenById?.contabilidadRecarga?.total15kg}</p>
                                            </td>
                                            <td className={style.inputContainer}>
                                                <FormGroup>
                                                        <Input
                                                            type="number"
                                                            name="llenos15kg"
                                                            value={llenos.llenos15kg}
                                                            onChange={handleChange}
                                                            className={style.inputs}
                                                            min={0}
                                                            onKeyDown={handleKeyDown2}
                                                            onWheel={(e) => e.target.blur()}
                                                            disabled={
                                                                novaOrdenById ? false : true
                                                            }
                                                        />
                                                </FormGroup>
                                            </td>
                                            <td>
                                                <td className={style.inputContainer2}>
                                                    <Input
                                                        type="number"
                                                        name="ventas15kg"
                                                        value={ventas.ventas15kg}
                                                        onChange={handleChange}
                                                        className={style.inputs}
                                                        disabled
                                                        min={0}
                                                    />
                                                </td>
                                            </td>
                                            <td style={{
                                                textAlign: 'center',
                                                verticalAlign: 'middle'
                                            }}>
                                                <p>
                                                    {
                                                        listaDePrecios ? <p>{listaDePrecios.precio15kg ? numberWithDots(listaDePrecios.precio15kg) : 0}</p> : null
                                                    }
                                                </p>
                                            </td>
                                            <td>
                                                <td className={style.inputContainer2}>
                                                    <Input
                                                        type="text"
                                                        name="recaudacion15kg"
                                                        value={recaudacion.recaudacion15kg ? numberWithDots(recaudacion.recaudacion15kg) : 0}
                                                        onChange={handleChange}
                                                        className={style.inputs2}
                                                        min={0}
                                                        disabled
                                                    />
                                                </td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{
                                                textAlign: 'center',
                                                verticalAlign: 'middle'
                                            }}>
                                                <p>Gas 45 kilos</p>
                                            </td>
                                            <td style={{
                                                textAlign: 'center',
                                                verticalAlign: 'middle'
                                            }}>
                                                <p>{novaOrdenById?.contabilidadRecarga?.total45kg}</p>
                                            </td>
                                            <td className={style.inputContainer}>
                                                <FormGroup>
                                                        <Input
                                                            type="number"
                                                            name="llenos45kg"
                                                            value={llenos.llenos45kg}
                                                            onChange={handleChange}
                                                            className={style.inputs}
                                                            min={0}
                                                            onKeyDown={handleKeyDown2}
                                                            onWheel={(e) => e.target.blur()}
                                                            disabled={
                                                                novaOrdenById ? false : true
                                                            }
                                                        />
                                                </FormGroup>
                                            </td>
                                            <td>
                                                <td className={style.inputContainer2}>
                                                    <Input
                                                        type="number"
                                                        name="ventas45kg"
                                                        value={ventas.ventas45kg}
                                                        onChange={handleChange}
                                                        className={style.inputs}
                                                        disabled
                                                        min={0}
                                                    />
                                                </td>
                                            </td>
                                            <td style={{
                                                textAlign: 'center',
                                                verticalAlign: 'middle'
                                            }}>
                                                <p>
                                                    {
                                                        listaDePrecios ? <p>{listaDePrecios.precio45kg ? numberWithDots(listaDePrecios.precio45kg) : 0}</p> : null
                                                    }
                                                </p>
                                            </td>
                                            <td>
                                                <td className={style.inputContainer2}>
                                                    <Input
                                                        type="text"
                                                        name="recaudacion45kg"
                                                        value={recaudacion.recaudacion45kg ? numberWithDots(recaudacion.recaudacion45kg) : 0}
                                                        onChange={handleChange}
                                                        className={style.inputs2}
                                                        min={0}
                                                        disabled
                                                    />
                                                </td>
                                            </td>
                                        </tr>               
                                    </tbody>
                                </Table>
                                </div>
                                {
                                    Number(llenos?.llenos5kg) > Number(novaOrdenById?.contabilidadRecarga?.total5kg) ||
                                    Number(llenos?.llenos11kg) > Number(novaOrdenById?.contabilidadRecarga?.total11kg) ||
                                    Number(llenos?.llenos15kg) > Number(novaOrdenById?.contabilidadRecarga?.total15kg) ||
                                    Number(llenos?.llenos45kg) > Number(novaOrdenById?.contabilidadRecarga?.total45kg) ?
                                    <div className="danger">
                                            <h4 className="alert-heading">¡Atención!</h4>
                                            <p>
                                                La cantidad de tarros llenos no puede ser mayor a la cantidad de tarros actuales
                                            </p>
                                    </div>
                                    :
                                    null
                                }
                                <div className={style.grid3}>
                                    <FormGroup>
                                        <Input
                                            type="number"
                                            name="totalCantidad"
                                            value={totalCantidad}
                                            onChange={handleChange}
                                            disabled
                                            className={style.inputs3}
                                        />
                                        <Label>Cantidad total tarros</Label>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            type="text"
                                            name="totalRecaudacion"
                                            value={totalRecaudacion ? numberWithDots(totalRecaudacion) : 0}
                                            onChange={handleChange}
                                            disabled
                                            className={style.inputs3}
                                        />
                                        <Label>Recaudacion Total</Label>
                                    </FormGroup> 
                                </div>
                            </FormGroup>
                            <ModalFooter>
                                <Button type='submit' color="primary" disabled={disabled} onClick={
                                    () => {
                                        toggle();
                                    }
                                }>Descargar</Button>
                                <Button color="secondary" onClick={
                                    () => {
                                        toggle();
                                        cleanStates();
                                        dispatch(cleanOrden());
                                    }
                                }>Cancelar</Button>
                            </ModalFooter>
                    </ModalBody>
                </Form>
            </Modal>
        </div> 
    )
}

export default DownloadOrden
