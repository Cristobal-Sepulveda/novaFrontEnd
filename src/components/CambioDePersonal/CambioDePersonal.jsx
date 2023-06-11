import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bringChoferes, bringAyudantes, changeChofer, changePeoneta } from '../../redux/novaSlice/thunks'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Label, FormGroup } from 'reactstrap';
import Select from 'react-select';
import style from './cambioDePersonal.module.css'

const CambioDePersonal = ({ novaOrdenById }) => {

    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [modalDesactive, setModalDesactive] = useState(false);
    const toggle = () => setModal(!modal);
    const toggleDesactive = () => setModalDesactive(!modalDesactive);
    const { choferes, ayudantes } = useSelector(state => state.Nova);

    const [idChofer, setIdChofer] = useState(null);
    const [idAyudante, setIdAyudante] = useState(null);

    const [cambiarChofer, setCambiarChofer] = useState(false);
    const [cambiarAyudante, setCambiarAyudante] = useState(false);

    

    const handleChangeChofer = (e) => {
        setIdChofer(e.value)
    }

    const handleChangeAyudante = (e) => {
        setIdAyudante(e.value)
    }

    useEffect(() => {
        if(choferes.length === 0) {
            dispatch(bringChoferes())
        }
        if(ayudantes.length === 0) {
            dispatch(bringAyudantes())
        }
    }, [
        choferes.length,
        ayudantes.length,
        dispatch
    ])

    const optiosChoferes = choferes?.map(chofer => {
        return {
            value: chofer?.chofer?.id,
            label: `${chofer?.name} ${chofer?.lastname}`
        }
    })

    const optiosAyudantes = ayudantes?.map(ayudante => {
        return {
            value: ayudante?.ayudante?.id,
            label: `${ayudante?.name} ${ayudante?.lastname}`
        }
    })

    return (
        <div>
            <Button color="danger" onClick={toggle} className={style.boton}>Cambio de Personal</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Cambio de Personal</ModalHeader>
                <ModalBody>
                    <h6>Personal actual</h6>
                    <p>Chofer: {novaOrdenById?.chofer?.personal?.name + " " + novaOrdenById?.chofer?.personal?.lastname}</p>
                    {
                        novaOrdenById?.ayudante ? (
                            <p>Peoneta: {novaOrdenById?.ayudante?.personal?.name + " " + novaOrdenById?.ayudante?.personal?.lastname}</p>
                        ) : null
                    }
                    <FormGroup>
                        <Button color='warning' onClick={
                            () => {
                                setCambiarChofer(!cambiarChofer)
                                setCambiarAyudante(false)
                                setIdAyudante(null)
                            }
                        }>
                            Cambiar Chofer
                        </Button>
                    </FormGroup>
                    {
                        cambiarChofer ? (
                            <FormGroup>
                                <Select
                                    id="chofer"
                                    name="chofer"
                                    options={optiosChoferes}
                                    placeholder="Seleccionar Chofer"
                                    onChange={handleChangeChofer}
                                />
                            </FormGroup>
                        ) : null
                    }
                    <FormGroup>
                        <Button color='warning' onClick={
                            () => {
                                setCambiarAyudante(!cambiarAyudante)
                                setCambiarChofer(false)
                                setIdChofer(null)
                            }
                        }>
                            Cambiar Peoneta
                        </Button>
                    </FormGroup>
                    {
                        cambiarAyudante ? (
                            <FormGroup>
                                <Select
                                    id="ayudante"
                                    name="ayudante"
                                    options={optiosAyudantes}
                                    placeholder="Seleccionar Ayudante"
                                    onChange={handleChangeAyudante}
                                />
                            </FormGroup>
                        ) : null
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleDesactive}>
                        cambiar
                    </Button>{' '}
                    <Modal
                        isOpen={modalDesactive}
                        toggle={toggleDesactive}
                    >
                        <ModalHeader toggle={toggleDesactive}>Cambio de Personal</ModalHeader>
                        <ModalBody>
                            <p>¿Seguro que desea realizar esta accion?</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={
                                () => {
                                    if(idChofer) {
                                        dispatch(changeChofer(novaOrdenById?.id, idChofer, novaOrdenById?.fecha))
                                    }
                                    if(idAyudante) {
                                        dispatch(changePeoneta(novaOrdenById?.id, idAyudante, novaOrdenById?.fecha))
                                    }
                                    setModal(false)
                                    setModalDesactive(false)
                                    setCambiarChofer(false)
                                    setCambiarAyudante(false)
                                    setIdChofer(null)
                                    setIdAyudante(null)
                                }
                            }>Aceptar</Button>{' '}
                            <Button color="secondary" onClick={toggleDesactive}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                    <Button color="secondary" onClick={
                        () => {
                            setModal(false)
                            setCambiarChofer(false)
                            setCambiarAyudante(false)
                            setIdChofer(null)
                            setIdAyudante(null)
                        }
                    }>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default CambioDePersonal
