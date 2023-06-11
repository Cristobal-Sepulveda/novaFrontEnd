import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bringCodigoParaModificar, setAutorizacion, modifyRecargaOrdenQuantity2, modifyLlenos, setNoAutorizacion, limpiarCodigos } from '../../redux/novaSlice/thunks';
import style from './modifyOrden.module.css';
import { numberWithDots } from '../../helpers/numberWithDot';
import vectorDerecho from "../../assetsOficial/vectorDerecho.svg"
import { handleKeydown } from '../../helpers/KeyDown';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Form, Label, Table }  from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

const ModifyOrden = ({ novaOrdenById, ordenId }) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [codigo, setCodigo] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [disabled2, setDisabled2] = useState(false);
    const [disabled3, setDisabled3] = useState(false);
    const [disabled4, setDisabled4] = useState(false);
    const [disabled5, setDisabled5] = useState(false);
    const [idRecarga, setIdRecarga] = useState(null);
    const [isLleno, setIsLleno] = useState(false);

    const { usuario } = JSON.parse(localStorage.getItem('usuario'));
    const dispatch = useDispatch();
    const { codigoDeModificar, autorizado, listaDePrecios } = useSelector(state => state.Nova);

    const [info, setInfo] = useState({
        id: 0,
        name: "",
        lastname: "",
        email: "",
    });

    //////// ESTADO PARA MODIFICAR LLENOS ////////

    const [llenos, setLlenos] = useState({
        llenos5kg: "",
        llenos11kg: "",
        llenos15kg: "",
        llenos45kg: "",
    });

    const handleLlenos = (e) => {
        e.preventDefault();
        setLlenos({
            ...llenos,
            [e.target.name]: e.target.value
        });
    };

    const cleanLlenos = () => {
        setLlenos({
            llenos5kg: "",
            llenos11kg: "",
            llenos15kg: "",
            llenos45kg: "",
        });
    };

    const handleLlenosSubmit = (e) => {
        e.preventDefault();
        dispatch(modifyLlenos(ordenId, llenos));
        setIsLleno(false);
        cleanLlenos();
        toggle();
    };

    //////// ESTADO PARA MODIFICAR RECARGAS ////////

    const [recarga, setRecarga] = useState({
        actual5kg: "",
        actual11kg: "",
        actual15kg: "",
        actual45kg: "",
    });

    const handleRecarga = (e) => {
        e.preventDefault();
        setRecarga({
            ...recarga,
            [e.target.name]: e.target.value
        });
    };

    const cleanRecarga = () => {
        setRecarga({
            actual5kg: "",
            actual11kg: "",
            actual15kg: "",
            actual45kg: "",
        });
    };

    const handleRecargaSubmit = (e) => {
        e.preventDefault();
        dispatch(modifyRecargaOrdenQuantity2(novaOrdenById?.id, idRecarga, recarga, ordenId));
        setIdRecarga(null);
        cleanRecarga();
        toggle();
    };

    const cleanState = () => {
        setInfo({
            id: 0,
            name: "",
            lastname: "",
            email: "",
        });
    };

    useEffect(() => {
        if(codigoDeModificar?.code !== codigo ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }

        if( recarga.actual11kg === "" || 
            recarga.actual15kg === "" || 
            recarga.actual45kg === "" || 
            recarga.actual5kg === ""
        ) {
            setDisabled2(true);
        } else {
            setDisabled2(false);
        }

        if( ordenId === 0 ) {
            setDisabled3(true);
        } else {
            setDisabled3(false);
        }

        if( llenos.llenos11kg === "" ||
            llenos.llenos15kg === "" ||
            llenos.llenos45kg === "" ||
            llenos.llenos5kg === ""
        ) {
            setDisabled4(true);
        } else {
            setDisabled4(false);
        }

    }, [
        codigoDeModificar?.code,
        codigo,
        novaOrdenById?.id,
        recarga.actual5kg,
        recarga.actual11kg,
        recarga.actual15kg,
        recarga.actual45kg,
        ordenId,
        llenos.llenos5kg,
        llenos.llenos11kg,
        llenos.llenos15kg,
        llenos.llenos45kg,
    ]);

    useEffect(() => {
        if(info.email !== "") {
            setDisabled5(false);
        } else {
            setDisabled5(true);
        }
    }, [info.email, disabled5]);


    const modalStyles = {
        position: 'relative',
        left: '15%',
        top: '3%',
        transform: 'translate(-30%, -2%)',
        fontFamily: 'Roboto',
        "--bs-modal-bg": "#F5F5F5",
    };

    return (
        // <div>
        //     {
        //         novaOrdenById?.rendida === false ? (
        //             <Button onClick={
        //                 () => {
        //                     toggle();
        //                     setInfo({
        //                         ...info,
        //                         id: novaOrdenById?.id,
        //                         name: usuario?.name,
        //                         lastname: usuario?.lastname
        //                     });
        //                 }
        //             } className={style.boton} disabled={disabled3}>Modificar Orden</Button>
        //         ) : null
        //     }
        //     <Modal isOpen={modal} toggle={toggle} style={modalStyles} size="lg" backdrop="static" onKeyDown={handleKeydown}>
        //         {
        //             autorizado === "Autorizado"  ?  (
        //                 <>
        //                     <ModalHeader toggle={toggle}>Modifique las recargas</ModalHeader>
        //                     <Form onSubmit={
        //                         idRecarga ? handleRecargaSubmit : isLleno ? handleLlenosSubmit : null
        //                     }>
        //                         <ModalBody>
        //                             <Table 
        //                                 bordered
        //                                 hover   
        //                                 responsive
        //                                 className="table-md bg-white" 
        //                             >
        //                                 <thead>
        //                                     <tr>
        //                                         <th>Producto</th>
        //                                         <th>Recarga</th>
        //                                         <th>Total</th>
        //                                         <th>Llenos</th>
        //                                         <th>Venta</th>
        //                                         <th>Precio</th>
        //                                         <th>Recaudacion</th>
        //                                     </tr>
        //                                 </thead>
        //                                 <tbody>
        //                                     <tr>
        //                                         <td className="px-4 py-2" style={{
        //                                             textAlign: 'center',
        //                                             verticalAlign: 'middle'
        //                                             }}>
        //                                                 <p>Gas 5 kilos</p>
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 novaOrdenById?.recargas?.map((recarga) => (
        //                                                     idRecarga === recarga.id ? (
        //                                                         <td key={recarga.id}>
        //                                                             <Input
        //                                                                 type="number"
        //                                                                 name="actual5kg"
        //                                                                 id="actual5kg"
        //                                                                 onChange={(e) => handleRecarga(e)}
        //                                                                 value={recarga.actual5kg}
        //                                                                 className={style.inputs}
        //                                                                 min={0}
        //                                                                 autoComplete="off"
        //                                                             />
        //                                                         </td>
        //                                                     ) :
        //                                                     (
        //                                                         <th key={recarga.id} className={style.cuadrado}> 
        //                                                             {recarga.cantidad5kg}
        //                                                         </th>
        //                                                     )   
        //                                                 )).sort((a, b) => a.key - b.key)
        //                                             }
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 novaOrdenById?.contabilidadRecarga?.total5kg
        //                                             }
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 isLleno ? (
        //                                                     <td>
        //                                                         <Input
        //                                                             type="number"
        //                                                             name="llenos5kg"
        //                                                             id="llenos5kg"
        //                                                             onChange={(e) => handleLlenos(e)}
        //                                                             value={llenos.llenos5kg}
        //                                                             className={style.inputs}
        //                                                             min={0}
        //                                                             autoComplete="off"
        //                                                         />
        //                                                     </td>
        //                                                 ) : (
        //                                                     novaOrdenById?.contabilidadRecarga?.llenos5kg
        //                                                 )
        //                                             }
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 novaOrdenById?.contabilidadRecarga?.ventas5kg
        //                                             }
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 listaDePrecios?.precio5kg ? numberWithDots(listaDePrecios?.precio5kg) : 0
        //                                             }
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 novaOrdenById?.contabilidadRecarga?.recaudacion5kg ? numberWithDots(novaOrdenById?.contabilidadRecarga?.recaudacion5kg) : 0
        //                                             }
        //                                         </td>
        //                                     </tr>
        //                                     <tr>
        //                                         <td className="px-4 py-2" style={{
        //                                             textAlign: 'center',
        //                                             verticalAlign: 'middle'
        //                                             }}>
        //                                                 <p>Gas 11 kilos</p>
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 novaOrdenById?.recargas?.map((recarga) => (
        //                                                     idRecarga === recarga.id ? (
        //                                                         <td key={recarga.id}>
        //                                                             <Input
        //                                                                 type="number"
        //                                                                 name="actual11kg"
        //                                                                 id="actual11kg"
        //                                                                 onChange={(e) => handleRecarga(e)}
        //                                                                 value={recarga.actual11kg}
        //                                                                 className={style.inputs}
        //                                                                 min={0}
        //                                                                 autocomplete='off'
        //                                                             />
        //                                                         </td>
        //                                                     ) :
        //                                                     (
        //                                                         <th key={recarga.id} className={style.cuadrado}>
        //                                                             {recarga.cantidad11kg}
        //                                                         </th>
        //                                                     )
        //                                                 )).sort((a, b) => a.key - b.key)
        //                                             }
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 novaOrdenById?.contabilidadRecarga?.total11kg
        //                                             }
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 isLleno ? (
        //                                                     <td>
        //                                                         <Input
        //                                                             type="number"
        //                                                             name="llenos11kg"
        //                                                             id="llenos11kg"
        //                                                             onChange={(e) => handleLlenos(e)}
        //                                                             value={llenos.llenos11kg}
        //                                                             className={style.inputs}
        //                                                             min={0}
        //                                                             autoComplete="off"
        //                                                         />
        //                                                     </td>
        //                                                 ) : (
        //                                                     novaOrdenById?.contabilidadRecarga?.llenos11kg
        //                                                 )
        //                                             }
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 novaOrdenById?.contabilidadRecarga?.ventas11kg
        //                                             }
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 listaDePrecios ? numberWithDots(listaDePrecios.precio11kg) : 0
        //                                             }
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 novaOrdenById?.contabilidadRecarga?.recaudacion11kg ? numberWithDots(novaOrdenById?.contabilidadRecarga?.recaudacion11kg) : 0
        //                                             }
        //                                         </td>
        //                                     </tr>
        //                                     <tr>
        //                                         <td className="px-4 py-2" style={{
        //                                             textAlign: 'center',
        //                                             verticalAlign: 'middle'
        //                                             }}>
        //                                                 <p>Gas 15 kilos</p>
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 novaOrdenById?.recargas?.map((recarga) => (
        //                                                     idRecarga === recarga.id ? (
        //                                                         <td key={recarga.id}>
        //                                                             <Input
        //                                                                 type="number"
        //                                                                 name="actual15kg"
        //                                                                 id="actual15kg"
        //                                                                 onChange={(e) => handleRecarga(e)}
        //                                                                 value={recarga.actual15kg}
        //                                                                 className={style.inputs}
        //                                                                 min={0}
        //                                                                 autocomplete='off'
        //                                                             />
        //                                                         </td>
        //                                                     ) :
        //                                                     (
        //                                                         <th key={recarga.id} className={style.cuadrado}>
        //                                                             {recarga.cantidad15kg}
        //                                                         </th>
        //                                                     )
        //                                                 )).sort((a, b) => a.key - b.key)
        //                                             }
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 novaOrdenById?.contabilidadRecarga?.total15kg
        //                                             }
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 isLleno ? (
        //                                                     <td>
        //                                                         <Input
        //                                                             type="number"
        //                                                             name="llenos15kg"
        //                                                             id="llenos15kg"
        //                                                             onChange={(e) => handleLlenos(e)}
        //                                                             value={llenos.llenos15kg}
        //                                                             className={style.inputs}
        //                                                             min={0}
        //                                                             autoComplete="off"
        //                                                         />
        //                                                     </td>
        //                                                 ) : (
        //                                                     novaOrdenById?.contabilidadRecarga?.llenos15kg
        //                                                 )
        //                                             }
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 novaOrdenById?.contabilidadRecarga?.ventas15kg
        //                                             }
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 listaDePrecios ? numberWithDots(listaDePrecios.precio15kg) : 0
        //                                             }
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 novaOrdenById?.contabilidadRecarga?.recaudacion15kg ? numberWithDots(novaOrdenById?.contabilidadRecarga?.recaudacion15kg) : 0
        //                                             }
        //                                         </td>
        //                                     </tr>
        //                                     <tr>
        //                                         <td className="px-4 py-2" style={{
        //                                             textAlign: 'center',
        //                                             verticalAlign: 'middle'
        //                                             }}>
        //                                                 <p>Gas 45 kilos</p>
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 novaOrdenById?.recargas?.map((recarga) => (
        //                                                     idRecarga === recarga.id ? (
        //                                                         <td key={recarga.id}>
        //                                                             <Input
        //                                                                 type="number"
        //                                                                 name="actual45kg"
        //                                                                 id="actual45kg"
        //                                                                 onChange={(e) => handleRecarga(e)}
        //                                                                 value={recarga.actual45kg}
        //                                                                 className={style.inputs}
        //                                                                 min={0}
        //                                                                 autocomplete='off'
        //                                                             />
        //                                                         </td>
        //                                                     ) :
        //                                                     (
        //                                                         <th key={recarga.id} className={style.cuadrado}>
        //                                                             {recarga.cantidad45kg}
        //                                                         </th>
        //                                                     )
        //                                                 )).sort((a, b) => a.key - b.key)
        //                                             }
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 novaOrdenById?.contabilidadRecarga?.total45kg
        //                                             }
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 isLleno ? (
        //                                                     <td>
        //                                                         <Input
        //                                                             type="number"
        //                                                             name="llenos45kg"
        //                                                             id="llenos45kg"
        //                                                             onChange={(e) => handleLlenos(e)}
        //                                                             value={llenos.llenos45kg}
        //                                                             className={style.inputs}
        //                                                             min={0}
        //                                                             autoComplete="off"
        //                                                         />
        //                                                     </td>
        //                                                 ) : (
        //                                                     novaOrdenById?.contabilidadRecarga?.llenos45kg
        //                                                 )
        //                                             }
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 novaOrdenById?.contabilidadRecarga?.ventas45kg
        //                                             }
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 listaDePrecios ? numberWithDots(listaDePrecios.precio45kg) : 0
        //                                             }
        //                                         </td>
        //                                         <td>
        //                                             {
        //                                                 novaOrdenById?.contabilidadRecarga?.recaudacion45kg ? numberWithDots(novaOrdenById?.contabilidadRecarga?.recaudacion45kg) : 0
        //                                             }
        //                                         </td>
        //                                     </tr>
        //                                     <tr>
        //                                         <th className="px-4 py-2" style={{
        //                                             textAlign: 'center',
        //                                             verticalAlign: 'middle'
        //                                         }}>
        //                                             Seleccionar
        //                                         </th>
        //                                         <th>
        //                                             {
        //                                                 novaOrdenById?.recargas?.map((recarga) => (
        //                                                         <button key={recarga.id} style={{
        //                                                             cursor: 'pointer',
        //                                                         }} onClick={(e) => {
        //                                                             e.preventDefault()
        //                                                             setIdRecarga(recarga.id)
        //                                                         }}>
        //                                                             <img src={vectorDerecho} alt="flechita" className={style.flechita} />
        //                                                         </button>
        //                                                 )).sort((a, b) => a.key - b.key)
        //                                             }
        //                                         </th>
        //                                         <th>

        //                                         </th>
        //                                         <th>
        //                                             <button style={{
        //                                                     cursor: 'pointer',
        //                                                 }} onClick={(e) => {
        //                                                     e.preventDefault()
        //                                                     setIsLleno(true)
        //                                                 }}>
        //                                                     <img src={vectorDerecho} alt="flechita" className={style.flechita} />
        //                                             </button>
        //                                         </th>
        //                                     </tr>
        //                                 </tbody>
        //                             </Table>   
        //                         </ModalBody>
        //                         <ModalFooter>
        //                             {
        //                                 idRecarga ? (
        //                                     <Button color="primary" type="submit" disabled={disabled2} className={style.tamaño}>
        //                                         Actualizar recarga
        //                                     </Button>
        //                                 ) : null
        //                             }
        //                             {
        //                                 isLleno ? (
        //                                     <Button color="primary" type="submit" disabled={disabled4} className={style.tamaño}>
        //                                         Actualizar llenos
        //                                     </Button>
        //                                 ) : null
        //                             }
        //                             <Button color="secondary" onClick={() => {
        //                                 setIdRecarga(null);
        //                                 setIsLleno(false);
        //                                 cleanRecarga();
        //                                 cleanLlenos();
        //                                 toggle();
        //                             }} className={style.tamaño}>
        //                                 Cancelar
        //                             </Button>
        //                         </ModalFooter>
        //                     </Form>
        //                 </>
        //             ) : (
        //                 <>
        //                     <ModalHeader toggle={toggle}>Autorice con un superior</ModalHeader>
        //                     <ModalBody>
        //                         <Form>
        //                             <FormGroup className={style.margin}>
        //                                 <Label>Selecccione a un superior</Label>
        //                                 <Input type="select" name="select" id="exampleSelect" onChange={
        //                                     (e) => {
        //                                         setInfo({
        //                                             ...info,
        //                                             email: e.target.value
        //                                         })
        //                                     }
        //                                 } className={style.selects}>
        //                                     <option hidden>Seleccione</option>
        //                                     <option value="jhoskartoro@gmail.com">Jhoskar</option>
        //                                     <option value="maicol.nieto@jorgegas.cl">Maicol</option>
        //                                     <option value="jorgetalento@outlook.es">Jorge</option>
        //                                     <option value="benjaminsotoro@gmail.com">Benjamin</option>
        //                                 </Input>
        //                             </FormGroup>
        //                             {
        //                                 autorizado === "No autorizado" ? (
        //                                     <div className={style.margin2}>
        //                                         <Button color='primary' onClick={
        //                                             () => {
        //                                                 dispatch(bringCodigoParaModificar(info));
        //                                                 cleanState();
        //                                             }
        //                                         } className={style.tamaño} disabled={disabled5}>
        //                                             Enviar codigo
        //                                         </Button>
        //                                         &nbsp;
        //                                         <Button onClick={
        //                                             () => {
        //                                                 toggle();
        //                                                 cleanState();
        //                                             }
        //                                         } className={style.tamaño}>
        //                                             Cancelar
        //                                         </Button>
        //                                     </div>
        //                                 ) : (
        //                                     <div className={style.margin}>
        //                                         <FormGroup>
        //                                             <Label>Ingrese el codigo</Label>
        //                                             <Input type="text" name="codigo" id="codigo" onChange={
        //                                                 (e) => {
        //                                                     setCodigo(Number(e.target.value));
        //                                                 }
        //                                             } autoComplete="off" className={style.selects}/>
        //                                         </FormGroup>
        //                                         <Button color='primary' disabled={disabled} onClick={
        //                                             () => {
        //                                                 dispatch(setAutorizacion());
        //                                                 cleanState();
        //                                             }
        //                                         } className={style.tamaño}>
        //                                             Autorizar
        //                                         </Button>
        //                                         &nbsp;
        //                                         <Button onClick={
        //                                             () => {
        //                                                 toggle();
        //                                                 cleanState();
        //                                                 dispatch(limpiarCodigos());
        //                                                 dispatch(setNoAutorizacion());
        //                                                 setCodigo(null);
        //                                             }
        //                                         } className={style.tamaño}>
        //                                             Cancelar
        //                                         </Button>
        //                                     </div>
        //                                 )
        //                             }
        //                         </Form>
        //                     </ModalBody>
        //                 </>
        //             )
        //         }
        //     </Modal>
        // </div>
        <div>
            {
                novaOrdenById?.rendida === false ? (
                    <Button onClick={
                        () => {
                            toggle();
                            setInfo({
                                ...info,
                                id: novaOrdenById?.id,
                                name: usuario?.name,
                                lastname: usuario?.lastname
                            });
                        }
                    } className={style.boton} disabled={disabled3}>Modificar Orden</Button>
                ) : null
            }
            <Modal isOpen={modal} toggle={toggle} style={modalStyles} size="lg" backdrop="static" onKeyDown={handleKeydown}>
                <ModalHeader toggle={toggle}>Modifique las recargas</ModalHeader>
                <Form onSubmit={
                    idRecarga ? handleRecargaSubmit : isLleno ? handleLlenosSubmit : null
                }>
                <ModalBody>
                    <Table 
                        bordered
                        hover   
                        responsive
                        className="table-md bg-white" 
                    >
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Recarga</th>
                                <th>Total</th>
                                <th>Llenos</th>
                                <th>Venta</th>
                                <th>Precio</th>
                                <th>Recaudacion</th>
                            </tr>
                        </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-4 py-2" style={{
                                            textAlign: 'center',
                                            verticalAlign: 'middle'
                                            }}>
                                                <p>Gas 5 kilos</p>
                                        </td>
                                        <td>
                                            {
                                                novaOrdenById?.recargas?.map((recarga) => (
                                                    idRecarga === recarga.id ? (
                                                        <td key={recarga.id}>
                                                            <Input
                                                                type="number"
                                                                name="actual5kg"
                                                                id="actual5kg"
                                                                onChange={(e) => handleRecarga(e)}
                                                                value={recarga.actual5kg}
                                                                className={style.inputs}
                                                                min={0}
                                                                autoComplete="off"
                                                            />
                                                        </td>
                                                    ) :
                                                    (
                                                        <th key={recarga.id} className={style.cuadrado}> 
                                                            {recarga.cantidad5kg}
                                                        </th>
                                                    )   
                                                )).sort((a, b) => a.key - b.key)
                                            }
                                        </td>
                                        <td>
                                            {
                                                novaOrdenById?.contabilidadRecarga?.total5kg
                                            }
                                        </td>
                                        <td>
                                            {
                                                isLleno ? (
                                                    <td>
                                                        <Input
                                                            type="number"
                                                            name="llenos5kg"
                                                            id="llenos5kg"
                                                            onChange={(e) => handleLlenos(e)}
                                                            value={llenos.llenos5kg}
                                                            className={style.inputs}
                                                            min={0}
                                                            autoComplete="off"
                                                        />
                                                    </td>
                                                ) : (
                                                    novaOrdenById?.contabilidadRecarga?.llenos5kg
                                                )
                                            }
                                        </td>
                                        <td>
                                            {
                                                novaOrdenById?.contabilidadRecarga?.ventas5kg
                                            }
                                        </td>
                                        <td>
                                            {
                                                listaDePrecios?.precio5kg ? numberWithDots(listaDePrecios?.precio5kg) : 0
                                            }
                                        </td>
                                        <td>
                                            {
                                                novaOrdenById?.contabilidadRecarga?.recaudacion5kg ? numberWithDots(novaOrdenById?.contabilidadRecarga?.recaudacion5kg) : 0
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2" style={{
                                            textAlign: 'center',
                                            verticalAlign: 'middle'
                                            }}>
                                                <p>Gas 11 kilos</p>
                                        </td>
                                        <td>
                                            {
                                                novaOrdenById?.recargas?.map((recarga) => (
                                                    idRecarga === recarga.id ? (
                                                        <td key={recarga.id}>
                                                            <Input
                                                                type="number"
                                                                name="actual11kg"
                                                                id="actual11kg"
                                                                onChange={(e) => handleRecarga(e)}
                                                                value={recarga.actual11kg}
                                                                className={style.inputs}
                                                                min={0}
                                                                autocomplete='off'
                                                            />
                                                        </td>
                                                    ) :
                                                    (
                                                        <th key={recarga.id} className={style.cuadrado}>
                                                            {recarga.cantidad11kg}
                                                        </th>
                                                    )
                                                )).sort((a, b) => a.key - b.key)
                                            }
                                        </td>
                                        <td>
                                            {
                                                novaOrdenById?.contabilidadRecarga?.total11kg
                                            }
                                        </td>
                                        <td>
                                            {
                                                isLleno ? (
                                                    <td>
                                                        <Input
                                                            type="number"
                                                            name="llenos11kg"
                                                            id="llenos11kg"
                                                            onChange={(e) => handleLlenos(e)}
                                                            value={llenos.llenos11kg}
                                                            className={style.inputs}
                                                            min={0}
                                                            autoComplete="off"
                                                        />
                                                    </td>
                                                ) : (
                                                    novaOrdenById?.contabilidadRecarga?.llenos11kg
                                                )
                                            }
                                        </td>
                                        <td>
                                            {
                                                novaOrdenById?.contabilidadRecarga?.ventas11kg
                                            }
                                        </td>
                                        <td>
                                            {
                                                listaDePrecios ? numberWithDots(listaDePrecios.precio11kg) : 0
                                            }
                                        </td>
                                        <td>
                                            {
                                                novaOrdenById?.contabilidadRecarga?.recaudacion11kg ? numberWithDots(novaOrdenById?.contabilidadRecarga?.recaudacion11kg) : 0
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2" style={{
                                            textAlign: 'center',
                                            verticalAlign: 'middle'
                                            }}>
                                                <p>Gas 15 kilos</p>
                                        </td>
                                        <td>
                                            {
                                                novaOrdenById?.recargas?.map((recarga) => (
                                                    idRecarga === recarga.id ? (
                                                        <td key={recarga.id}>
                                                            <Input
                                                                type="number"
                                                                name="actual15kg"
                                                                id="actual15kg"
                                                                onChange={(e) => handleRecarga(e)}
                                                                value={recarga.actual15kg}
                                                                className={style.inputs}
                                                                min={0}
                                                                autocomplete='off'
                                                            />
                                                        </td>
                                                    ) :
                                                    (
                                                        <th key={recarga.id} className={style.cuadrado}>
                                                            {recarga.cantidad15kg}
                                                        </th>
                                                    )
                                                )).sort((a, b) => a.key - b.key)
                                            }
                                        </td>
                                        <td>
                                            {
                                                novaOrdenById?.contabilidadRecarga?.total15kg
                                            }
                                        </td>
                                        <td>
                                            {
                                                isLleno ? (
                                                    <td>
                                                        <Input
                                                            type="number"
                                                            name="llenos15kg"
                                                            id="llenos15kg"
                                                            onChange={(e) => handleLlenos(e)}
                                                            value={llenos.llenos15kg}
                                                            className={style.inputs}
                                                            min={0}
                                                            autoComplete="off"
                                                        />
                                                    </td>
                                                ) : (
                                                    novaOrdenById?.contabilidadRecarga?.llenos15kg
                                                )
                                            }
                                        </td>
                                        <td>
                                            {
                                                novaOrdenById?.contabilidadRecarga?.ventas15kg
                                            }
                                        </td>
                                        <td>
                                            {
                                                listaDePrecios ? numberWithDots(listaDePrecios.precio15kg) : 0
                                            }
                                        </td>
                                        <td>
                                            {
                                                novaOrdenById?.contabilidadRecarga?.recaudacion15kg ? numberWithDots(novaOrdenById?.contabilidadRecarga?.recaudacion15kg) : 0
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2" style={{
                                            textAlign: 'center',
                                            verticalAlign: 'middle'
                                            }}>
                                                <p>Gas 45 kilos</p>
                                        </td>
                                        <td>
                                            {
                                                novaOrdenById?.recargas?.map((recarga) => (
                                                    idRecarga === recarga.id ? (
                                                        <td key={recarga.id}>
                                                            <Input
                                                                type="number"
                                                                name="actual45kg"
                                                                id="actual45kg"
                                                                onChange={(e) => handleRecarga(e)}
                                                                value={recarga.actual45kg}
                                                                className={style.inputs}
                                                                min={0}
                                                                autocomplete='off'
                                                            />
                                                        </td>
                                                    ) :
                                                    (
                                                        <th key={recarga.id} className={style.cuadrado}>
                                                            {recarga.cantidad45kg}
                                                        </th>
                                                    )
                                                )).sort((a, b) => a.key - b.key)
                                            }
                                        </td>
                                        <td>
                                            {
                                                novaOrdenById?.contabilidadRecarga?.total45kg
                                            }
                                        </td>
                                        <td>
                                            {
                                                isLleno ? (
                                                    <td>
                                                        <Input
                                                            type="number"
                                                            name="llenos45kg"
                                                            id="llenos45kg"
                                                            onChange={(e) => handleLlenos(e)}
                                                            value={llenos.llenos45kg}
                                                            className={style.inputs}
                                                            min={0}
                                                            autoComplete="off"
                                                        />
                                                    </td>
                                                ) : (
                                                    novaOrdenById?.contabilidadRecarga?.llenos45kg
                                                )
                                            }
                                        </td>
                                        <td>
                                            {
                                                novaOrdenById?.contabilidadRecarga?.ventas45kg
                                            }
                                        </td>
                                        <td>
                                            {
                                                listaDePrecios ? numberWithDots(listaDePrecios.precio45kg) : 0
                                            }
                                        </td>
                                        <td>
                                            {
                                                novaOrdenById?.contabilidadRecarga?.recaudacion45kg ? numberWithDots(novaOrdenById?.contabilidadRecarga?.recaudacion45kg) : 0
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-2" style={{
                                            textAlign: 'center',
                                            verticalAlign: 'middle'
                                        }}>
                                            Seleccionar
                                        </th>
                                        <th>
                                            {
                                                novaOrdenById?.recargas?.map((recarga) => (
                                                        <button key={recarga.id} style={{
                                                            cursor: 'pointer',
                                                        }} onClick={(e) => {
                                                            e.preventDefault()
                                                            setIdRecarga(recarga.id)
                                                        }}>
                                                            <img src={vectorDerecho} alt="flechita" className={style.flechita} />
                                                        </button>
                                                )).sort((a, b) => a.key - b.key)
                                            }
                                        </th>
                                        <th></th>
                                        <th>
                                            <button style={{
                                                    cursor: 'pointer',
                                                }} onClick={(e) => {
                                                    e.preventDefault()
                                                    setIsLleno(true)
                                                }}>
                                                    <img src={vectorDerecho} alt="flechita" className={style.flechita} />
                                            </button>
                                        </th>
                                    </tr>
                                </tbody>
                            </Table>   
                        </ModalBody>
                        <ModalFooter>
                            {
                                idRecarga ? (
                                    <Button color="primary" type="submit" disabled={disabled2} className={style.tamaño}>
                                        Actualizar recarga
                                    </Button>
                                ) : null
                            }
                            {
                                isLleno ? (
                                    <Button color="primary" type="submit" disabled={disabled4} className={style.tamaño}>
                                        Actualizar llenos
                                    </Button>
                                ) : null
                            }
                            <Button color="secondary" onClick={() => {
                                setIdRecarga(null);
                                setIsLleno(false);
                                cleanRecarga();
                                cleanLlenos();
                                toggle();
                            }} className={style.tamaño}>
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </Form>
            </Modal>
        </div>
    )
}

export default ModifyOrden
