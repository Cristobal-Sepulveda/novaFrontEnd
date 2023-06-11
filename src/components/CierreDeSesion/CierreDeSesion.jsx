import React, { useState, useEffect } from 'react'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Input, Form } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAuxAction } from '../../redux/autenticacionSlice/thunks';
import { handleKeydown } from '../../helpers/KeyDown';

const CierreDeSesion = ({ className }) => {

    const dispatch = useDispatch()
    const [modal, setModal] = React.useState(false);
    const [modal2, setModal2] = React.useState(false);
    const [modal3, setModal3] = React.useState(false);
    const toggle = () => setModal(!modal);
    const toggle2 = () => setModal2(!modal2);
    const toggle3 = () => setModal3(!modal3);
    const [disabled, setDisabled] = useState(true)

    const [sesion, setSesion] = useState({
        email: '',
        password: ''
    })

    const handleSesion = (e) => {
        setSesion({
            ...sesion,
            [e.target.name]: e.target.value
        })
    }

    const cleanSesion = () => {
        setSesion({
            email: '',
            password: ''
        })
    }

    const handleSesionSubmit = (e) => {
        e.preventDefault()
        dispatch(logoutAuxAction(sesion))
        cleanSesion()
        toggle2()
        toggle()
    }

    useEffect(() => {
        if(sesion.email !== '' && sesion.password !== ''){
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [sesion])

    const modalStyles = {
        position: 'relative',
        left: '15%',
        top: '3%',
        transform: 'translate(-38%, -2%)',
        "--bs-modal-bg": "#F5F5F5",
        "--bs-modal-width": "580px",
        fontFamily: 'Roboto'
    };

    return (
        <div>
            <button className={className} onClick={toggle}>
                ¿Problemas para iniciar sesión?
            </button>
            <Modal isOpen={modal} toggle={toggle} style={modalStyles} onKeyDown={handleKeydown}>
                <ModalHeader toggle={toggle}>Problemas para iniciar sesión</ModalHeader>
                <ModalBody>
                    {/* <p>Si no recuerdas tu contraseña, puedes restablecerla haciendo click en el boton de abajo.</p> */}
                    <p>Si quieres cerrar sesión en otros dispositivos, puedes cerrarlas todas haciendo click en el boton de abajo</p>
                    <p>Si no recuerdas tu nombre de usuario, puedes contactar a un administrador.</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="warning" onClick={toggle2}>Cerrar todas las sesiones</Button>{' '}
                        <Modal isOpen={modal2} toggle={toggle2}>
                            <Form onSubmit={handleSesionSubmit}>
                                <ModalHeader toggle={toggle2}>Cerrar todas las sesiones</ModalHeader>
                                <ModalBody>
                                        <Input 
                                            type="email" 
                                            name="email" 
                                            placeholder="Correo electronico" 
                                            onChange={handleSesion}
                                            autoComplete="off"
                                        />
                                        <br/>
                                        <Input 
                                            type="password" 
                                            name="password" 
                                            placeholder="Contraseña" 
                                            onChange={handleSesion}
                                            autoComplete="off"
                                        />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" type='submit' disabled={disabled}>Cerrar todas las sesiones</Button>{' '}
                                    <Button color="secondary" onClick={toggle2}>Cancelar</Button>
                                </ModalFooter>
                            </Form>
                        </Modal>
                    {/* <Button color="primary" onClick={toggle3}>Restablecer contraseña</Button>{' '}
                        <Modal isOpen={modal3} toggle={toggle3}>
                            <ModalHeader toggle={toggle3}>Restablecer contraseña</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="Correo electronico" />
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={toggle3}>Enviar correo</Button>{' '}
                                <Button color="secondary" onClick={toggle3}>Cancelar</Button>
                            </ModalFooter>
                        </Modal> */}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default CierreDeSesion
