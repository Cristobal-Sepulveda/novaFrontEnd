import React, { useState } from 'react'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Form, Input, Label, FormGroup } from 'reactstrap';
import { numberWithDots } from '../../helpers/numberWithDot';
import style from './gastos.module.css'

const Gastos = ({ gastos, handleGastosChange, setGastos, setGastosNumber }) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button
                color='warning'
                onClick={toggle}
                className={style.boton}
            >
                Asignar gastos
            </Button>
            <Modal isOpen={modal} toggle={toggle} size="sm">
                <ModalHeader toggle={toggle}>Asignar gastos</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Gastos de la orden</Label>
                            <Input
                                type="text"
                                name="montoGastos"
                                value={gastos.montoGastos ? numberWithDots(gastos.montoGastos) : ''}
                                onChange={handleGastosChange}
                                autoComplete="off"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Descripción</Label>
                            <Input
                                type="textarea"
                                name="DescripcionGastos"
                                value={gastos.DescripcionGastos}
                                onChange={handleGastosChange}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Guardar</Button>{' '}
                    <Button color="secondary" onClick={
                        () => {
                            setGastos({
                                montoGastos: '',
                                DescripcionGastos: ''
                            });
                            setGastosNumber({
                                montoGastos: 0,
                                DescripcionGastos: ''
                            });
                            toggle();
                        }
                    }>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Gastos
