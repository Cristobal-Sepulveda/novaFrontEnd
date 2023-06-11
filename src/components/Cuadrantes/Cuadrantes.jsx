import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from 'reactstrap';
import { bringAllCuadrantes, createCuadrante, activeCuadrante, desactiveCuadrante } from '../../redux/novaSlice/thunks';
import { handleKeydown } from '../../helpers/KeyDown';
import cuadrantes from '../../assetsOficial/cuadrantes.svg'
import 'bootstrap/dist/css/bootstrap.css';
import style from './cuadrantes.module.css'

const Cuadrantes = () => {

    const dispatch = useDispatch()
    const [modal, setModal] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [modalDesactive, setModalDesactive] = useState(false);
    const [activarCrear, setActivarCrear] = useState(false)
    const [idCuadrante, setIdCuadrante] = useState('')
    const [cuadranteActivo, setCuadranteActivo] = useState('')
    const [disabled, setDisabled] = useState(false)
    const toggle = () => setModal(!modal);
    const toggleActive = () => setModalActive(!modalActive);
    const toggleDesactive = () => setModalDesactive(!modalDesactive);
    const { allCuadrantes } = useSelector((state) => state.Nova)

    const [nameCuadrante, setNameCuadrante] = useState({
        name: ''
    })

    const handleChange = (e) => {
        setNameCuadrante({
            ...nameCuadrante,
            name: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createCuadrante(nameCuadrante))
        setNameCuadrante({
            name: ''
        })
        setActivarCrear(false);
    }

    useEffect(() => {
        dispatch(bringAllCuadrantes())
    }, [dispatch])

    useEffect(() => {
        if(nameCuadrante.name !== '') {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [nameCuadrante.name])

    return (
        <div>
            <div className={style.iconContainer2}>
                <button onClick={toggle} className={style.botonsito}>
                    <img src={cuadrantes} alt="cuadrantes" className={style.icon}/>
                    <p>Cuadrantes</p>
                </button> 
            </div>
            <Modal isOpen={modal} toggle={toggle} onKeyDown={handleKeydown}>
                <Form onSubmit={handleSubmit}>
                    <ModalHeader toggle={toggle}>Cuadrantes</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="exampleSelect" style={{
                                    fontWeight: '700'
                                }}>
                                    Lista de cuadrantes
                                </Label>
                                <select 
                                    type="select" 
                                    value={idCuadrante}
                                    onChange={(e) => {
                                        setIdCuadrante(e.target.value)
                                        setCuadranteActivo(e.target.options[e.target.selectedIndex].id)
                                    }}
                                    className="form-select"
                                >
                                    <option hidden>Seleccione un cuadrante</option>
                                {
                                    allCuadrantes?.map((cuadrante) => (
                                        <option id={cuadrante.active.toString()} key={cuadrante.id} value={cuadrante.id}>
                                            {
                                                cuadrante.active ? <>✔️ </> : <p>❌</p>
                                            }
                                            {cuadrante.name}
                                        </option>  
                                    ))
                                }
                                </select>
                                {
                                    idCuadrante ? (
                                        <div className={style.botones}>
                                            {
                                                cuadranteActivo === 'true' ? (
                                                    <>
                                                        <Button color="danger" onClick={toggleDesactive}> Desactivar </Button>
                                                        <Modal isOpen={modalDesactive} toggle={toggleDesactive} onKeyDown={handleKeydown}>
                                                            <ModalHeader toggle={toggleDesactive}>Desactivar cuadrante</ModalHeader>
                                                            <ModalBody>
                                                                <p style={{color: "red"}}>¿Está seguro que desea desactivar el cuadrante?</p>
                                                            </ModalBody>
                                                            <ModalFooter>
                                                                <Button color="danger" onClick={(e) => {
                                                                    e.preventDefault()
                                                                    dispatch(desactiveCuadrante(idCuadrante))
                                                                    toggleDesactive()
                                                                    setIdCuadrante('')
                                                                }}>Desactivar</Button>{' '}
                                                                <Button color="secondary" onClick={toggleDesactive}>Cancelar</Button>
                                                            </ModalFooter>
                                                        </Modal>                                                
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button color="success" onClick={toggleActive}> Activar </Button>
                                                        <Modal isOpen={modalActive} toggle={toggleActive} onKeyDown={handleKeydown}>
                                                            <ModalHeader toggle={toggleActive}>Activar cuadrante</ModalHeader>
                                                            <ModalBody>
                                                                <p style={{color: "green"}}>¿Está seguro que desea activar el cuadrante?</p>
                                                            </ModalBody>
                                                            <ModalFooter>
                                                                <Button color="success" onClick={(e) => {
                                                                    e.preventDefault()
                                                                    dispatch(activeCuadrante(idCuadrante))
                                                                    toggleActive()
                                                                    setIdCuadrante('')
                                                                }}>Activar</Button>{' '}
                                                                <Button color="secondary" onClick={toggleActive}>Cancelar</Button>
                                                            </ModalFooter>
                                                        </Modal>
                                                    </>
                                                )
                                            }
                                        </div>
                                    ) : null
                                }
                            </FormGroup>
                            <FormGroup>
                                {
                                    activarCrear ? (
                                        <Input 
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Nombre del cuadrante"
                                            value={nameCuadrante.name}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                    ) : null
                                }
                            </FormGroup>
                        </ModalBody>
                    <ModalFooter>
                        {
                            activarCrear ? (
                                <Button
                                    color="success"
                                    type='submit'
                                    disabled={disabled}
                                >
                                    Guardar Cuadrante
                                </Button>
                            ) : (                        
                                <Button color="primary" onClick={
                                    (e) => {
                                        e.preventDefault()
                                        setActivarCrear(true)
                                    }
                                }>Crear</Button>
                            )
                        }
                        <Button color="secondary" onClick={
                            () => {
                                toggle();
                                setIdCuadrante('');
                                setActivarCrear(false);
                                setNameCuadrante({
                                    name: ''
                                })
                            }
                        }>Cancelar</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}

export default Cuadrantes
