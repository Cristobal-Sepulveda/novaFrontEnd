import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Form }  from 'reactstrap';
import validate from '../../helpers/validate';
import { createPersonal } from '../../redux/novaSlice/thunks';
import CreateButton from '../../assetsOficial/botonCrear.svg';
import { handleKeydown } from '../../helpers/KeyDown';
import style from './createPersonal.module.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function CreatePersonal() {

        const [modal, setModal] = useState(false);
        const toggle = () => setModal(!modal);
        const [error, setError] = useState({});
        const [disabled, setDisabled] = useState(true);
        const dispatch = useDispatch();

        const [personal, setPersonal] = useState({
            name: '',
            lastname: '',
            email: '',
            password: '',
            rut: '',
            rol: ''
        });

        const handleInputChange = (e) => {
            setError(validate({
                ...personal,
                [e.target.name]: e.target.value,
                }));
            setPersonal({
                ...personal,
                [e.target.name]: e.target.value,
            });
        };

        const cleanStates = () => {
            setPersonal({
                name: '',
                lastname: '',
                email: '',
                password: '',
                rut: '',
                rol: ''
            });
            setError({});
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            dispatch(createPersonal(personal));
            cleanStates();
            toggle();
        };
        
        useEffect(() => {
            if ( //Validacion habilitar el boton submit
                personal.name.length > 0 &&
                personal.name.length <= 10 &&
                isNaN(personal.name) &&
                personal.lastname.length > 0 &&
                personal.lastname.length <= 10 &&
                isNaN(personal.lastname) &&
                personal.email.length > 0 &&
                personal.email.length <= 30 &&
                personal.password.length > 0 &&
                personal.password.length <= 20 &&
                personal.rut.length > 0 &&
                personal.rut.length <= 10 &&
                personal.rol.length > 0
        ) {
          setDisabled(false); //si todo esta correcto se habilitara el boton submit
        } else {
          setDisabled(true); //si no se deshabilitara el boton submit
        };
        }, [error, disabled, personal.name, personal.lastname, personal.email, personal.password, personal.rut, personal.rol]);

        const modalStyles = {
            position: 'relative',
            top: '50%',
            left: '15%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'Roboto',
            "--bs-modal-bg": "#F5F5F5"
        };
        
        return (
            <>  
                <button onClick={toggle} className={style.boton}>
                    <img src={CreateButton} alt="CreateButton" className={style.ico} />
                    &nbsp;
                    Crear personal
                </button>
                <Modal isOpen={modal} toggle={toggle} style={modalStyles} backdrop="static" onKeyDown={handleKeydown}>
                    <ModalHeader toggle={toggle}>Crear personal</ModalHeader>
                    <Form onSubmit={handleSubmit}>
                    <ModalBody>
                            <FormGroup>
                                <Input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    placeholder="Nombre"
                                    value={personal.name}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    className={style.bgModal}
                                />
                                {error.name && <p className={style.error}>{error.name}</p>}
                            </FormGroup>
                            <FormGroup>
                                <Input 
                                    type="text" 
                                    name="lastname" 
                                    id="lastname" 
                                    placeholder="Apellido"
                                    value={personal.lastname}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    className={style.bgModal}
                                />
                                {error.lastname && <p className={style.error}>{error.lastname}</p>}
                            </FormGroup>
                            <FormGroup>
                                <Input 
                                    type="text" 
                                    name="email" 
                                    id="email" 
                                    placeholder="Email"
                                    value={personal.email}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    className={style.bgModal} 
                                />
                                {error.email && <p className={style.error}>{error.email}</p>}
                            </FormGroup>
                            <FormGroup>
                                <Input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    placeholder="Contraseña"
                                    value={personal.password}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    className={style.bgModal} 
                                />
                                {error.password && <p className={style.error}>{error.password}</p>}
                            </FormGroup>
                            <FormGroup>
                                <Input 
                                    type="text" 
                                    name="rut" 
                                    id="rut" 
                                    placeholder="Rut"
                                    value={personal.rut}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    className={style.bgModal} 
                                />
                                {error.rut && <p className={style.error}>{error.rut}</p>}
                            </FormGroup>
                            <FormGroup>
                                <select name="rol" id="rol" onChange={handleInputChange} style={{
                                    backgroundColor: "#F5F5F5",
                                    borderRadius: "2px",
                                    border: "1px solid #3C3C3C"
                                }}>
                                    <option hidden>Rol</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Auxiliar">Auxiliar</option>
                                    <option value="Chofer">Chofer</option>
                                    <option value="Ayudante">Peoneta</option>
                                    <option value="Chofer/Peoneta">Chofer/Peoneta</option>
                                </select>
                                {error.rol && <p className={style.error}>{error.rol}</p>}
                            </FormGroup>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type='submit' disabled={disabled}>Crear</Button>
                        <Button color="secondary" onClick={() => {
                            toggle();
                            cleanStates();
                        }}>Cancelar</Button>
                    </ModalFooter>
                    </Form>
                </Modal>
            </>
        )
}


