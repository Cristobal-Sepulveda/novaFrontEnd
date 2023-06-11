import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cuadrarOrden, bringListaDePreciosActive } from '../../redux/novaSlice/thunks';
import style from './cuadratura.module.css';
import cuadratura from '../../assetsOficial/cuadratura.svg';
import CambioDePersonal from '../CambioDePersonal/CambioDePersonal';
import Gastos from '../Gastos/Gastos';
import validateBilletes from '../../helpers/validateBilletes';
import { handleKeydown } from '../../helpers/KeyDown';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label } from 'reactstrap';
import { numberWithDots } from '../../helpers/numberWithDot';
import 'bootstrap/dist/css/bootstrap.css';

const Cuadratura = ({ novaOrdenById, fecha }) => {

    const { usuario } = JSON.parse(localStorage.getItem('usuario'));
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState({});
    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);

    const toggle = () => setModal(!modal);
    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
    }

    const [idDeDecuadre, setIdDeDecuadre] = useState({
        idDeDecuadre : 0,
    })

    const [faltanteChofer, setFaltanteChofer] = useState({
        faltanteChofer : "",
    })

    const [faltanteChoferNumber, setFaltanteChoferNumber] = useState({
        faltanteChofer : 0,
    })

    const [faltantePeoneta, setFaltantePeoneta] = useState({
        faltantePeoneta : "",
    })

    const [faltantePeonetaNumber, setFaltantePeonetaNumber] = useState({
        faltantePeoneta : 0,
    })

    const [efectivo, setEfectivo] = useState({
        totalBilletes1: "",
        totalBilletes2 : "",
        totalBilletes5 : "",
        totalBilletes10 : "",
        totalBilletes20 : "",
        monedas : "",
        totalGeneral : ""
    })

    const [efectivoNumber, setEfectivoNumber] = useState({
        totalBilletes1: 0,
        totalBilletes2 : 0,
        totalBilletes5 : 0,
        totalBilletes10 : 0,
        totalBilletes20 : 0,
        monedas : 0,
        totalGeneral: 0
    })

    const [vales, setVales] = useState({
        fisico5kg : 0,
        totalFisico5kg : 0,
        fisico11kg : 0,
        totalFisico11kg : 0,
        fisico15kg : 0,
        totalFisico15kg : 0,
        fisico45kg : 0,
        totalFisico45kg : 0,
        digital5kg : 0,
        totalDigital5kg : 0,
        digital11kg : 0,
        totalDigital11kg : 0,
        digital15kg : 0,
        totalDigital15kg : 0,
        digital45kg : 0,
        totalDigital45kg : 0,
        sumaTotalDigitalYFisico5kg : 0,
        sumaTotalDigitalYFisico11kg : 0,
        sumaTotalDigitalYFisico15kg : 0,
        sumaTotalDigitalYFisico45kg : 0,
        totalVales : 0,
        totalSumaVales : 0
    })

    const [metodoPagos, setMetodoPagos] = useState({
        montoTransbank : "",
        montoTransferencias : "",
        porcentajeDescuentoRut : "",
        porcentajeDescuento : "",
    })

    const [metodoPagosNumber, setMetodoPagosNumber] = useState({
        montoTransbank : 0,
        montoTransferencias : 0,
        porcentajeDescuentoRut : 0,
        porcentajeDescuento : 0,
    })

    const [faltante, setFaltante] = useState({
        faltante : 0,
    })

    const [totalRecaudacion, setTotalRecaudacion] = useState({
        totalRecaudacion : 0,
    })

    const [sobrante, setSobrante] = useState({
        sobrante : 0,
    })

    ///////// GASTOS /////////

    const [gastos, setGastos] = useState({
        montoGastos: '',
        DescripcionGastos: ''
    })

    const [gastosNumber, setGastosNumber] = useState({
        montoGastos: 0,
        DescripcionGastos: ''
    })

    useEffect(() => {
        dispatch(bringListaDePreciosActive());
    }, [dispatch])

    useEffect(() => {
        
        setEfectivo({
            ...efectivo,
            totalGeneral : efectivoNumber.totalGeneral.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(/\./g, ',')
        })

        setEfectivoNumber({
            ...efectivoNumber,
            totalGeneral : (efectivoNumber.totalBilletes1 + efectivoNumber.totalBilletes2 + efectivoNumber.totalBilletes5 + efectivoNumber.totalBilletes10 + efectivoNumber.totalBilletes20 + efectivoNumber.monedas)
        })

        setVales({
            ...vales,
            totalFisico5kg : (vales.fisico5kg * Number(novaOrdenById?.listaDePrecio?.precio5kg)),
            totalFisico11kg : (vales.fisico11kg * Number(novaOrdenById?.listaDePrecio?.precio11kg)),
            totalFisico15kg : (vales.fisico15kg * Number(novaOrdenById?.listaDePrecio?.precio15kg)),
            totalFisico45kg : (vales.fisico45kg * Number(novaOrdenById?.listaDePrecio?.precio45kg)),
            totalDigital5kg : (vales.digital5kg * Number(novaOrdenById?.listaDePrecio?.precio5kg)),
            totalDigital11kg : (vales.digital11kg * Number(novaOrdenById?.listaDePrecio?.precio11kg)),
            totalDigital15kg : (vales.digital15kg * Number(novaOrdenById?.listaDePrecio?.precio15kg)),
            totalDigital45kg : (vales.digital45kg * Number(novaOrdenById?.listaDePrecio?.precio45kg)),
            sumaTotalDigitalYFisico5kg : (vales.totalFisico5kg + vales.totalDigital5kg),
            sumaTotalDigitalYFisico11kg : (vales.totalFisico11kg + vales.totalDigital11kg),
            sumaTotalDigitalYFisico15kg : (vales.totalFisico15kg + vales.totalDigital15kg),
            sumaTotalDigitalYFisico45kg : (vales.totalFisico45kg + vales.totalDigital45kg),
            totalVales : (vales.fisico5kg + vales.fisico11kg + vales.fisico15kg + vales.fisico45kg + vales.digital5kg + vales.digital11kg + vales.digital15kg + vales.digital45kg),
            totalSumaVales : (vales.sumaTotalDigitalYFisico5kg + vales.sumaTotalDigitalYFisico11kg + vales.sumaTotalDigitalYFisico15kg + vales.sumaTotalDigitalYFisico45kg)
        })
        
        // se setea el faltante con cada billete y moneda
        setFaltante({
            ...faltante,
            faltante : Number(novaOrdenById?.contabilidadRecarga?.totalRecaudacion) - 
            (   Number(efectivoNumber.totalGeneral) +
                Number(vales.totalSumaVales) 
            ) - (
                Number(metodoPagosNumber.montoTransbank)
            ) - (
                Number(metodoPagosNumber.montoTransferencias) 
            ) - (
                Number(metodoPagosNumber.porcentajeDescuentoRut) 
            ) - (
                Number(metodoPagosNumber.porcentajeDescuento)
            ) - (
                Number(novaOrdenById?.metodoPagos[0]?.abono?.monto)
            ) - (
                Number(faltanteChoferNumber.faltanteChofer) 
            ) - (
                Number(faltantePeonetaNumber.faltantePeoneta)
            ) - (
                Number(gastosNumber.montoGastos)
            ) + (
                Number(sobrante.sobrante)
            )
        })

        setIdDeDecuadre({
            ...idDeDecuadre,
            idDeDecuadre : usuario.administrador.id
        })

    }, [
        efectivoNumber.totalBilletes1,
        efectivoNumber.totalBilletes2,
        efectivoNumber.totalBilletes5,
        efectivoNumber.totalBilletes10,
        efectivoNumber.totalBilletes20,
        efectivoNumber.monedas,
        efectivoNumber.totalGeneral,
        vales.fisico5kg,
        vales.totalFisico5kg,
        vales.fisico11kg,
        vales.totalFisico11kg,
        vales.fisico15kg,
        vales.totalFisico15kg,
        vales.fisico45kg,
        vales.totalFisico45kg,
        vales.digital5kg,
        vales.totalDigital5kg,
        vales.digital11kg,
        vales.totalDigital11kg,
        vales.digital15kg,
        vales.totalDigital15kg,
        vales.digital45kg,
        vales.totalDigital45kg,
        vales.sumaTotalDigitalYFisico5kg,
        vales.sumaTotalDigitalYFisico11kg,
        vales.sumaTotalDigitalYFisico15kg,
        vales.sumaTotalDigitalYFisico45kg,
        vales.totalVales,
        vales.totalSumaVales,
        metodoPagos.montoTransbank,
        metodoPagos.montoTransferencias,
        metodoPagos.porcentajeDescuentoRut,
        metodoPagos.porcentajeDescuento,
        totalRecaudacion.totalRecaudacion,
        novaOrdenById?.contabilidadRecarga?.totalRecaudacion,
        novaOrdenById?.metodoPagos[0]?.abono?.monto,
        disabled,
        faltanteChoferNumber.faltanteChofer,
        faltantePeonetaNumber.faltantePeoneta,
        novaOrdenById?.listaDePrecio?.precio5kg,
        novaOrdenById?.listaDePrecio?.precio11kg,
        novaOrdenById?.listaDePrecio?.precio15kg,
        novaOrdenById?.listaDePrecio?.precio45kg,
        usuario.administrador.id,
        sobrante.sobrante,
        gastosNumber.montoGastos
    ])

    useEffect(() => {
        if(
            !error.hasOwnProperty('totalBilletes1') &&
            !error.hasOwnProperty('totalBilletes2') &&
            !error.hasOwnProperty('totalBilletes5') &&
            !error.hasOwnProperty('totalBilletes10') &&
            !error.hasOwnProperty('totalBilletes20') &&
            faltante.faltante < 1 && faltante.faltante > -1
        ) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [error, faltante.faltante,])
    

    const handleEfectivoChange = (e) => {

        const inputValue = e.target.value
        const formatted = inputValue.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(/\./g, ',')

        setError(
            validateBilletes({
                ...efectivoNumber,
                [e.target.name] : formatted ? parseInt(formatted.replace(/,/g, '')) : 0
            })
        )
        setEfectivo({
            ...efectivo,
            [e.target.name] : formatted
        })

        setEfectivoNumber({
            ...efectivoNumber,
            [e.target.name] : formatted ? parseInt(formatted.replace(/,/g, '')) : 0
        })
    }

    const handleValesChange = (e) => {
        setVales({
            ...vales,
            [e.target.name] : Number(e.target.value)
        })
    }

    const handleMetodoPagosChange = (e) => {
        const inputValue = e.target.value
        const formatted = inputValue.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(/\./g, ',')
        setMetodoPagos({
            ...metodoPagos,
            [e.target.name] : formatted
        })
        setMetodoPagosNumber({
            ...metodoPagosNumber,
            [e.target.name] : formatted ? parseInt(formatted.replace(/,/g, '')) : 0
        })
    }

    const handleFaltanteChoferChange = (e) => {
        
        const inputValue = e.target.value
        const formatted = inputValue.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(/\./g, ',')

        setFaltanteChofer({
            ...faltanteChofer,
            [e.target.name] : formatted
        })
        setFaltanteChoferNumber({
            ...faltanteChoferNumber,
            [e.target.name] : formatted ? parseInt(formatted.replace(/,/g, '')) : 0
        })
    }

    const handleFaltantePeonetaChange = (e) => {
        const inputValue = e.target.value
        const formatted = inputValue.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(/\./g, ',')

        setFaltantePeoneta({
            ...faltantePeoneta,
            [e.target.name] : formatted
        })
        setFaltantePeonetaNumber({
            ...faltantePeonetaNumber,
            [e.target.name] : formatted ? parseInt(formatted.replace(/,/g, '')) : 0
        })
    }

    const handleSobranteChange = (e) => {
        setSobrante({
            ...sobrante,
            [e.target.name] : Number(e.target.value)
        })
    }

    const handleGastosChange = (e) => {
        const inputValue = e.target.value
        const formatted = inputValue.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(/\./g, ',')
        
        if(e.target.name === 'DescripcionGastos') {
            setGastos({
                ...gastos,
                [e.target.name] : e.target.value
            })
            
            setGastosNumber({
                ...gastosNumber,
                [e.target.name] : e.target.value
            })
        } else {
            setGastos({
                ...gastos,
                [e.target.name] : formatted
            })
            
            setGastosNumber({
                ...gastosNumber,
                [e.target.name] : formatted ? parseInt(formatted.replace(/,/g, '')) : 0
            })
        }
    }


    const cleanStates = () => {
        setEfectivo({
            totalBilletes1 : "",
            totalBilletes2 : "",
            totalBilletes5 : "",
            totalBilletes10 : "",
            totalBilletes20 : "",
            monedas : "",
            totalGeneral : "",
        })
        setEfectivoNumber({
            totalBilletes1 : 0,
            totalBilletes2 : 0,
            totalBilletes5 : 0,
            totalBilletes10 : 0,
            totalBilletes20 : 0,
            monedas : 0,
            totalGeneral : 0,
        })
        setVales({
            fisico5kg : 0,
            totalFisico5kg : 0,
            fisico11kg : 0,
            totalFisico11kg : 0,
            fisico15kg : 0,
            totalFisico15kg : 0,
            fisico45kg : 0,
            totalFisico45kg : 0,
            digital5kg : 0,
            totalDigital5kg : 0,
            digital11kg : 0,
            totalDigital11kg : 0,
            digital15kg : 0,
            totalDigital15kg : 0,
            digital45kg : 0,
            totalDigital45kg : 0,
            sumaTotalDigitalYFisico5kg : 0,
            sumaTotalDigitalYFisico11kg : 0,
            sumaTotalDigitalYFisico15kg : 0,
            sumaTotalDigitalYFisico45kg : 0,
        })
        setMetodoPagos({
            montoTransbank : "",
            montoTransferencias : "",
            porcentajeDescuentoRut : "",
            porcentajeDescuento : "",
        })
        setMetodoPagosNumber({
            montoTransbank : 0,
            montoTransferencias : 0,
            porcentajeDescuentoRut : 0,
            porcentajeDescuento : 0,
        })
        setTotalRecaudacion({
            totalRecaudacion : novaOrdenById?.contabilidadRecarga?.totalRecaudacion,
        })

        setFaltanteChofer({
            faltanteChofer : ""
        })

        setFaltantePeoneta({
            faltantePeoneta : ""
        })

        setFaltanteChoferNumber({
            faltanteChofer : 0
        })
        
        setFaltantePeonetaNumber({
            faltantePeoneta : 0
        })

        setSobrante({
            sobrante : 0
        })

        setGastos({
            montoGastos : "",
            DescripcionGastos : ""
        })

        setGastosNumber({
            montoGastos : 0,
            DescripcionGastos : ""
        })

        setDisabled(true)
    }

    const cleanFaltantes = () => {
        setFaltanteChofer({
            faltanteChofer : "",
        })

        setFaltanteChoferNumber({
            faltanteChofer : 0,
        })

        setFaltantePeoneta({
            faltantePeoneta : "",
        })

        setFaltantePeonetaNumber({
            faltantePeoneta : 0,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(cuadrarOrden(novaOrdenById.id, {
            ...efectivoNumber,
            ...vales,
            ...metodoPagosNumber,
            ...faltante,
            ...faltanteChoferNumber,
            ...faltantePeonetaNumber,
            ...sobrante,
            ...idDeDecuadre,
            ...gastosNumber,
        }))
        cleanStates();
        cleanFaltantes();
    }

    const modalStyles = {
        position: 'relative',
        left: '15%',
        top: '3%',
        transform: 'translate(-28%, -3%)',
        "--bs-modal-padding": "1.5rem"
    };

    return (
        <div style={{
            position: 'absolute',
            top: '28%',
            left: '11%',
            width: '50%',
            height: '50%',
        }}>
            <Button onClick={() => {
                toggle()
                setTotalRecaudacion({
                    totalRecaudacion: novaOrdenById?.contabilidadRecarga?.totalRecaudacion
                })
            }} className={style.boton}>
                <p>Cuadratura</p>
                <img src={cuadratura} alt="cuadratura" className={style.icono} />
            </Button> 
            <Modal isOpen={modal} toggle={toggle} style={modalStyles} size="lg" backdrop="static" onKeyDown={handleKeydown}>
                <Form onSubmit={(e) => {
                    handleSubmit(e)
                    toggle()
                }}>
                    <ModalHeader toggle={toggle}>Cuadratura de {" "}  
                        {
                            novaOrdenById?.chofer?.personal?.name + " " + 
                            novaOrdenById?.chofer?.personal?.lastname
                        }
                        {
                            novaOrdenById?.ayudante ? " y " + novaOrdenById?.ayudante?.personal?.name + " " + novaOrdenById?.ayudante?.personal?.lastname : ""
                        }
                    </ModalHeader>
                    <ModalBody>
                        <div className={style.containerGeneral}>
                            <div className={style.containerEfectivo}>
                                <p style={{
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                    fontSize: '1.2rem',
                                    textAlign: 'center',
                                }}>
                                    EFECTIVO
                                </p>
                                <div className={style.grid1}>
                                    <p>B. 20.000</p>
                                    <Input
                                        type='text'
                                        name="totalBilletes20"
                                        id="totalBilletes20"
                                        value={efectivo.totalBilletes20 === 0 ? "" : efectivo.totalBilletes20}
                                        className={style.inputs}
                                        onChange={(e) => handleEfectivoChange(e)}
                                        min={0}
                                        autoComplete="off"
                                    />
                                    <p>B. 10.000</p>
                                    <Input
                                        type="text"
                                        name="totalBilletes10"
                                        id="totalBilletes10"
                                        value={efectivo.totalBilletes10 === 0 ? "" : efectivo.totalBilletes10}
                                        className={style.inputs}
                                        onChange={(e) => handleEfectivoChange(e)}
                                        min={0}
                                        autoComplete="off"
                                    />
                                    <p>B. 5.000</p>
                                    <Input
                                        type="text"
                                        name="totalBilletes5"
                                        id="totalBilletes5"
                                        value={efectivo.totalBilletes5 === 0 ? "" : efectivo.totalBilletes5}
                                        className={style.inputs}
                                        onChange={(e) => handleEfectivoChange(e)}
                                        min={0}
                                        autoComplete="off"
                                    />
                                    <p>B. 2.000</p>
                                    <Input
                                        type="text"
                                        name="totalBilletes2"
                                        id="totalBilletes2"
                                        value={efectivo.totalBilletes2 === 0 ? "" : efectivo.totalBilletes2}
                                        className={style.inputs}
                                        onChange={(e) => handleEfectivoChange(e)}
                                        min={0}
                                        autoComplete="off"
                                    />
                                    <p>B. 1.000</p>
                                    <Input
                                        type="text"
                                        name="totalBilletes1"
                                        id="totalBilletes1"
                                        value={efectivo.totalBilletes1 === 0 ? "" : efectivo.totalBilletes1}
                                        className={style.inputs}
                                        onChange={(e) => handleEfectivoChange(e)}
                                        min={0}
                                        autoComplete="off"
                                    />
                                    <p>Monedas</p>
                                    <Input
                                        type="text"
                                        name="monedas"
                                        id="monedas"
                                        value={efectivo.monedas === 0 ? "" : efectivo.monedas}
                                        className={style.inputs}
                                        onChange={(e) => handleEfectivoChange(e)}
                                        min={0}
                                        autoComplete="off"
                                    />
                                    <p>Total</p>
                                    <Input
                                        type="text"
                                        name="totalGeneral"
                                        id="totalGeneral"
                                        value={efectivo.totalGeneral === 0 ? "" : efectivo.totalGeneral}
                                        className={style.inputs}
                                        onChange={(e) => handleEfectivoChange(e)}
                                        min={0}
                                        disabled={true}
                                        autoComplete="off"
                                    />
                                </div>
                                {   
                                    error.totalBilletes20 && <p className={style.error2}>{error.totalBilletes20}</p> ||
                                    error.totalBilletes10 && <p className={style.error2}>{error.totalBilletes10}</p> ||
                                    error.totalBilletes5 && <p className={style.error2}>{error.totalBilletes5}</p> ||
                                    error.totalBilletes2 && <p className={style.error2}>{error.totalBilletes2}</p> ||
                                    error.totalBilletes1 && <p className={style.error2}>{error.totalBilletes1}</p> 
                                }
                            </div>
                            <div className={style.containerVales}>
                                <p style={{
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                    fontSize: '1.2rem',
                                    textAlign: 'center',
                                    marginTop: '0.5rem',
                                }}>
                                    VALES
                                </p>
                                <div className={style.gridOne} >
                                    <div className={style.grid2}>
                                        <p style={{fontWeight: "bold", fontSize: "18px"}}>Fisicos</p>
                                        <div>
                                            <p>5kg</p>
                                            <Input
                                                type="number"
                                                name="fisico5kg"
                                                id="fisico5kg"
                                                value={vales.fisico5kg === 0 ? "" : vales.fisico5kg}
                                                className={style.inputs3}
                                                onChange={(e) => handleValesChange(e)}
                                                min={0}
                                            />
                                        </div>
                                        <div>
                                            <p>11kg</p>
                                            <Input
                                                type="number"
                                                name="fisico11kg"
                                                id="fisico11kg"
                                                value={vales.fisico11kg === 0 ? "" : vales.fisico11kg}
                                                className={style.inputs3}
                                                onChange={(e) => handleValesChange(e)}
                                                min={0}
                                            />
                                        </div>
                                        <div>
                                            <p>15kg</p>
                                            <Input
                                                type="number"
                                                name="fisico15kg"
                                                id="fisico15kg"
                                                value={vales.fisico15kg === 0 ? "" : vales.fisico15kg}
                                                className={style.inputs3}
                                                onChange={(e) => handleValesChange(e)}
                                                min={0}
                                            />
                                        </div>
                                        <div>
                                        <p>45kg</p>
                                            <Input
                                                type="number"
                                                name="fisico45kg"
                                                id="fisico45kg"
                                                value={vales.fisico45kg === 0 ? "" : vales.fisico45kg}
                                                className={style.inputs3}
                                                onChange={(e) => handleValesChange(e)}
                                                min={0}
                                            />
                                        </div>
                                    </div>
                                    <div className={style.gridx}>
                                        <p style={{fontWeight: "bold", fontSize: "18px"}}>Digitales</p>
                                        <div>
                                            <p>5kg</p>
                                            <Input
                                                type="number"
                                                name="digital5kg"
                                                id="digital5kg"
                                                value={vales.digital5kg === 0 ? "" : vales.digital5kg}
                                                className={style.inputs3}
                                                onChange={(e) => handleValesChange(e)}
                                                min={0}
                                            />
                                        </div>
                                        <div>
                                            <p>11kg</p>
                                            <Input
                                                type="number"
                                                name="digital11kg"
                                                id="digital11kg"
                                                value={vales.digital11kg === 0 ? "" : vales.digital11kg}
                                                className={style.inputs3}
                                                onChange={(e) => handleValesChange(e)}
                                                min={0}
                                            />
                                        </div>
                                        <div>
                                            <p>15kg</p>
                                            <Input
                                                type="number"
                                                name="digital15kg"
                                                id="digital15kg"
                                                value={vales.digital15kg === 0 ? "" : vales.digital15kg}
                                                className={style.inputs3}
                                                onChange={(e) => handleValesChange(e)}
                                                min={0}
                                            />
                                        </div>
                                        <div>
                                        <p>45kg</p>
                                            <Input
                                                type="number"
                                                name="digital45kg"
                                                id="digital45kg"
                                                value={vales.digital45kg === 0 ? "" : vales.digital45kg}
                                                className={style.inputs3}
                                                onChange={(e) => handleValesChange(e)}
                                                min={0}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.containerMetodoPagos}>
                            <p style={{
                                fontWeight: 'bold',
                                fontFamily: 'Roboto',
                                fontSize: '1.2rem',
                                textAlign: 'center',
                                marginTop: '-0.5rem',
                            }}>
                                OTROS
                            </p>
                            <div className={style.grid3}>
                                <div style={{
                                    paddingBlock: '0.5rem',
                                }}>
                                    <p style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Roboto',
                                    }}>
                                        Trasnbank
                                    </p>
                                    <Input
                                        type="text"
                                        name="montoTransbank"
                                        id="montoTransbank"
                                        value={metodoPagos.montoTransbank === 0 ? "" : metodoPagos.montoTransbank}
                                        className={style.inputs2}
                                        onChange={(e) => handleMetodoPagosChange(e)}
                                        min={0} 
                                        autoComplete="off"
                                    />
                                </div>
                                <div style={{
                                    paddingBlock: '0.5rem'
                                }}>
                                    <p style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Roboto',
                                    }}>
                                        Transferencias
                                    </p>
                                    <Input
                                        type="text"
                                        name="montoTransferencias"
                                        id="montoTransferencias"
                                        value={metodoPagos.montoTransferencias === 0 ? "" : metodoPagos.montoTransferencias}
                                        className={style.inputs2}
                                        onChange={(e) => handleMetodoPagosChange(e)}
                                        min={0}
                                        autoComplete="off"
                                    />
                                </div>
                                <div style={{
                                    paddingBlock: '0.5rem'
                                }}>
                                    <p style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Roboto',
                                    }}>
                                        Descuentos
                                    </p>
                                    <Input
                                        type="text"
                                        name="porcentajeDescuento"
                                        id="porcentajeDescuento"
                                        value={metodoPagos.porcentajeDescuento === 0 ? "" : metodoPagos.porcentajeDescuento}
                                        className={style.inputs2}
                                        onChange={(e) => handleMetodoPagosChange(e)}
                                        min={0}
                                        autoComplete="off"
                                    />
                                </div>
                                <div style={{
                                    paddingBlock: '0.5rem'
                                }}>
                                    <p style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Roboto',
                                    }}>
                                        Descuento Rut
                                    </p>
                                    <Input
                                        type="text"
                                        name="porcentajeDescuentoRut"
                                        id="porcentajeDescuentoRut"
                                        value={metodoPagos.porcentajeDescuentoRut === 0 ? "" : metodoPagos.porcentajeDescuentoRut}
                                        className={style.inputs2}
                                        onChange={(e) => handleMetodoPagosChange(e)}
                                        min={0}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={style.containerRecaudacion}>
                            <div className={style.grid4}>
                                <p style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                }}>
                                    Total Recaudado
                                </p>
                                <Input
                                    type="text"
                                    name="totalRecaudado"
                                    id="totalRecaudado"
                                    placeholder="Total Recaudado"
                                    value={totalRecaudacion.totalRecaudacion ? numberWithDots(totalRecaudacion.totalRecaudacion) : ""}
                                    className={style.inputs4}
                                    disabled
                                />
                                <p style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                }}>
                                    Faltante
                                </p>
                                <Input
                                    type="text"
                                    name="faltante"
                                    id="faltante"
                                    placeholder="Faltante"
                                    value={faltante.faltante ? numberWithDots(faltante.faltante) : "0"}
                                    className={style.inputs4}
                                    disabled
                                    min={0}
                                />
                                <p style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                }}>
                                    Abonos
                                </p>
                                <Input
                                    type="number"
                                    name="abonos"
                                    id="abonos"
                                    placeholder="abonos"
                                    value={novaOrdenById?.metodoPagos[0]?.abono?.monto}
                                    className={style.inputs4}
                                    disabled
                                />
                                {
                                    //si faltante es menor a 0, se habilita el input de sobrante
                                    faltante?.faltante < 0 ? (
                                        <>
                                            <p style={{
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                fontFamily: 'Roboto',
                                            }}>
                                                Sobrante
                                            </p>
                                            <Input
                                                type="number"
                                                name="sobrante"
                                                id="sobrante"
                                                placeholder="Sobrante"
                                                value={sobrante.sobrante === 0 ? "" : sobrante.sobrante}
                                                className={style.inputs4}
                                                min={0}
                                                onChange={(e) => handleSobranteChange(e)}
                                            />
                                        </>
                                    ) : null
                                }
                                
                            </div>
                        </div>
                        {
                            faltante?.faltante < 0 ?
                            <p className={style.error}>
                                El faltante no puede ser negativo, por favor ingrese el sobrante al campo de sobrante
                            </p>
                            :
                            null
                        }
                        <Gastos novaOrdenById={novaOrdenById} handleGastosChange={handleGastosChange} gastos={gastos} setGastos={setGastos} setGastosNumber={setGastosNumber}/>
                        <CambioDePersonal novaOrdenById={novaOrdenById} />
                        <Button color='success' onClick={toggleNested} className={style.boton2}>Asignar Faltante</Button>
                        <Modal
                            isOpen={nestedModal}
                            toggle={toggleNested}
                            onClosed={closeAll ? toggle : undefined}
                            style={modalStyles}
                            backdrop="static"
                            onKeyDown={handleKeydown}
                        >
                            <ModalHeader>Asignar Faltante</ModalHeader>
                            <ModalBody>
                                    <FormGroup>
                                        <Label>Chofer: { novaOrdenById?.chofer?.personal?.name + " " + novaOrdenById?.chofer?.personal?.lastname }</Label>
                                        <Input
                                            type="text"
                                            name="faltanteChofer"
                                            id="faltanteChofer"
                                            value={faltanteChofer.faltanteChofer === 0 ? "" : faltanteChofer.faltanteChofer}
                                            className={style.inputs4}
                                            onChange={(e) => handleFaltanteChoferChange(e)}
                                        />
                                    </FormGroup>
                                    {
                                        novaOrdenById?.ayudante ? (
                                            <FormGroup>
                                                <Label>Peoneta: { novaOrdenById?.ayudante?.personal?.name + " " + novaOrdenById?.ayudante?.personal?.lastname }</Label>
                                                <Input
                                                    type='text'
                                                    name="faltantePeoneta"
                                                    id="faltantePeoneta"
                                                    value={faltantePeoneta.faltantePeoneta === 0 ? "" : faltantePeoneta.faltantePeoneta}
                                                    className={style.inputs4}
                                                    onChange={(e) => handleFaltantePeonetaChange(e)}
                                                />
                                            </FormGroup>
                                        ) :
                                        null
                                    }
                                    
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={toggleNested}>Aceptar</Button>
                                <Button color="secondary" onClick={() => {
                                    toggleNested();
                                    cleanFaltantes();
                                }}>Cancelar</Button>
                            </ModalFooter>
                        </Modal>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type='submit' disabled={disabled}>Aceptar</Button>
                        <Button color="secondary" onClick={() => {
                            toggle();
                            cleanStates();
                        }}>Cancelar</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}

export default Cuadratura
