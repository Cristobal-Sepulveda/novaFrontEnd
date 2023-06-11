import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Form }  from 'reactstrap';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { handleKeydown } from '../../helpers/KeyDown';
import Select from 'react-select';
import style from './modifyPersonal.module.css';
import 'bootstrap/dist/css/bootstrap.css';

const ModifyPersonal = () => {

    const { novaPersonals } = useSelector(state => state.Nova);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const dispatch = useDispatch();
    const [idPersonal, setIdPersonal] = useState(0);
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [lastPassword, setLastPassword] = useState('');
    const [password, setPassword] = useState('');

    const personalOptions = novaPersonals.map(personal => {
        return {
            value: personal.id,
            label: personal.name + ' ' + personal.lastname
        }
    });

    return (
        <div>
            <button onClick={toggle} className={style.boton}>
                <BsFillPersonLinesFill className={style.ico} />
                &nbsp;
                Modificar personal
            </button>
            <Modal isOpen={modal} toggle={toggle} onKeyDown={handleKeydown}>
                <ModalHeader toggle={toggle} className={style.modalHeader}>Modificar personal</ModalHeader>
                <ModalBody className={style.modalBody}>
                    <Form className={style.form}>
                        <FormGroup>
                            <Select
                                options={personalOptions}
                                onChange={e => setIdPersonal(e.value)}
                                placeholder="Seleccionar personal"
                                className={style.select}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type="text" 
                                name="name" 
                                id="name" 
                                placeholder="Nombre" 
                                className={style.input} 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type="text" 
                                name="lastname" 
                                id="lastname" 
                                placeholder="Apellido" 
                                className={style.input} 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type="text" 
                                name="email" 
                                id="email" 
                                placeholder="Email" 
                                className={style.input} 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type="password" 
                                name="lastPassword" 
                                id="lastPassword" 
                                placeholder="Contraseña anterior" 
                                className={style.input} 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="Contraseña" 
                                className={style.input} 
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter className={style.modalFooter}>
                    <Button color="primary" className={style.button}>Modificar</Button>{' '}
                    <Button color="secondary" className={style.button} onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModifyPersonal
