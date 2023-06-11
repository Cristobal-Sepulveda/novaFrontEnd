import React, { useState } from 'react'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from 'reactstrap';
import { numberWithDots } from '../../helpers/numberWithDot';
import style from './modalGastos.module.css'

const ModalGastos = ({ novaOrdenById }) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const monto = novaOrdenById?.metodoPagos[0]?.gasto?.monto
    const descripcion = novaOrdenById?.metodoPagos[0]?.gasto?.descripcion

    return (
        <div>
            <Button
                onClick={toggle}
                className={style.boton}
            >
                Gastos
            </Button>  
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Gastos</ModalHeader> 
                <ModalBody>
                    <FormGroup>
                        <Label for="exampleEmail">Monto</Label>
                        <Input type="number" name="monto" id="monto" placeholder="Monto"  value={monto ? numberWithDots(monto) : 0} disabled/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Descripción</Label>
                        <Input type="text" name="descripcion" id="descripcion" placeholder="Descripción" value={descripcion} disabled/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModalGastos
