import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Form, Label, Input } from 'reactstrap';
import { createPatente, activePatente, desactivePatente, bringAllPatentes } from '../../redux/novaSlice/thunks';
import { handleKeydown } from '../../helpers/KeyDown';
import patentes from '../../assetsOficial/patente.svg'
import 'bootstrap/dist/css/bootstrap.css';
import style from './patentes.module.css'

const Patentes = () => {

    const dispatch = useDispatch()
    const [modal, setModal] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [modalDesactive, setModalDesactive] = useState(false);
    const [activarCrear, setActivarCrear] = useState(false)
    const [idPatente, setIdPatente] = useState('')
    const [patenteActiva, setPatenteActiva] = useState('')
    const [disabled, setDisabled] = useState(false)

    const toggle = () => setModal(!modal);
    const toggleActive = () => setModalActive(!modalActive);
    const toggleDesactive = () => setModalDesactive(!modalDesactive);
    const { allPatentes } = useSelector(state => state.Nova)

    const [patente, setPatente] = useState({
        name: ''
    })

    const handleChange = (e) => {
        setPatente({
            ...patente,
            name: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createPatente(patente))
        setPatente({
            name: ''
        })
        toggle();
    }

    useEffect(() => {
        dispatch(bringAllPatentes())
    }, [dispatch])

    useEffect(() => {
        if (patente.name !== '') {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [patente.name])

    return (
        <div>
            <div className={style.iconContainer2}>
                <button onClick={toggle} className={style.botonsito}>
                    <img src={patentes} alt="patentes" className={style.icon}/>
                    <p>Patentes</p>
                </button> 
            </div>
            <Modal isOpen={modal} toggle={toggle} onKeyDown={handleKeydown} size="md">
                <ModalHeader toggle={toggle} >Crear patente</ModalHeader>
                <Form onSubmit={handleSubmit}>
                    <ModalBody>
                        <Label style={{
                            fontWeight: '700'
                        }}>
                            Lista de patentes
                        </Label>
                        <select
                        type="select"
                            className="form-select"
                            value={idPatente}
                            onChange={(e) => {
                                setIdPatente(e.target.value)
                                setPatenteActiva(e.target.options[e.target.selectedIndex].id)
                            }}
                        >
                            <option hidden>Seleccione una patente</option>
                            {
                                allPatentes?.map(patente => (
                                    <option id={patente.habilitada.toString()} key={patente.id} value={patente.id}>
                                        {
                                            patente.habilitada ? <>✔️ </> : <p>❌</p>
                                        }
                                        {patente.name}
                                    </option>
                                ))
                            }
                        </select>

                        {
                            idPatente ? (
                                <div className={style.botones}>
                                    {
                                        patenteActiva === 'true' ? (
                                            <>
                                                <Button color="danger" onClick={toggleDesactive}>
                                                    Desactivar patente
                                                </Button>
                                                <Modal isOpen={modalDesactive} toggle={toggleDesactive} onKeyDown={handleKeydown} size="md">
                                                    <ModalHeader toggle={toggleDesactive} >Desactivar patente</ModalHeader>
                                                    <ModalBody>
                                                        <p style={{color: "red"}}>¿Está seguro que desea desactivar la patente?</p>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="danger" onClick={(e) => {
                                                            e.preventDefault()
                                                            dispatch(desactivePatente(idPatente))
                                                            toggleDesactive()
                                                            setIdPatente('')
                                                        }}>
                                                            Desactivar
                                                        </Button>
                                                        <Button color="secondary" onClick={toggleDesactive}>Cerrar</Button>
                                                    </ModalFooter>
                                                </Modal>
                                            </>
                                        ) : (
                                            <>
                                                <Button color="success" onClick={toggleActive}>
                                                    Activar patente
                                                </Button>
                                                <Modal isOpen={modalActive} toggle={toggleActive} onKeyDown={handleKeydown} size="md">
                                                    <ModalHeader toggle={toggleActive} >Activar patente</ModalHeader>
                                                    <ModalBody>
                                                        <p style={{color: "green"}}>¿Está seguro que desea activar la patente?</p>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="success" onClick={(e) => {
                                                            e.preventDefault()
                                                            dispatch(activePatente(idPatente))
                                                            toggleActive()
                                                            setIdPatente('')
                                                        }
                                                        }>
                                                            Activar
                                                        </Button>
                                                        <Button color="secondary" onClick={toggleActive}>Cerrar</Button>
                                                    </ModalFooter>
                                                </Modal>
                                            </>
                                        )
                                    }
                                </div>
                            ) : null
                        } 
                        <div className={style.form}>
                            {
                                activarCrear ? (
                                    <div style={{
                                        paddingTop: '20px'
                                    }}>
                                        <Label style={{
                                            fontWeight: '700'
                                        }}>
                                            Numero de patente
                                        </Label>
                                        <Input 
                                            type="text" 
                                            name="name" 
                                            value={patente.name}
                                            onChange={handleChange}
                                            autoComplete="off" 
                                        />
                                    </div>
                                ) : null
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {
                            activarCrear ? (
                                <Button
                                    color="success"
                                    type='submit'
                                    disabled={disabled}
                                >
                                    Crear patente
                                </Button>
                            ) : (
                                <Button color="primary" onClick={
                                    (e) => {
                                        e.preventDefault()
                                        setActivarCrear(true)
                                    }
                                }>
                                    Crear patente
                                </Button>
                            )
                        }
                        <Button color="secondary" onClick={
                            (e) => {
                                e.preventDefault();
                                setActivarCrear(false);
                                setIdPatente('');
                                toggle();
                            }
                        }>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}

export default Patentes
