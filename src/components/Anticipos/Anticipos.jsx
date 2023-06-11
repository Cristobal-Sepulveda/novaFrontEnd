import React, { useState } from 'react'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from 'reactstrap';
import { numberWithDots } from '../../helpers/numberWithDot';
import style from './anticipos.module.css' 

const Anticipos = ({novaOrdenById}) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const total = Number(novaOrdenById?.faltanteChofer) + Number(novaOrdenById?.faltantePeoneta)

    return (
        <div>
            <Button
                onClick={toggle}
                className={style.boton}
            >
                Anticipos
            </Button>
            <Modal isOpen={modal} toggle={toggle} size="sm">
                <ModalHeader toggle={toggle}>Anticipos</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label>{novaOrdenById?.chofer?.personal?.name + " " + novaOrdenById?.chofer?.personal?.lastname}</Label>
                        <Input 
                            type="text" 
                            name="faltanteChofer"
                            value={novaOrdenById?.faltanteChofer ? numberWithDots(novaOrdenById?.faltanteChofer) : 0}
                            disabled
                        />
                    </FormGroup>
                    <FormGroup>
                        {
                            novaOrdenById?.ayudante ? (
                                <>
                                    <Label>{novaOrdenById?.ayudante?.personal?.name + " " + novaOrdenById?.ayudante?.personal?.lastname}</Label>
                                    <Input
                                        type="text"
                                        name="faltanteAyudante"
                                        value={novaOrdenById?.faltantePeoneta ? numberWithDots(novaOrdenById?.faltantePeoneta) : 0}
                                        disabled
                                    />
                                </>
                            )  : null
                        }
                        
                    </FormGroup>
                    <FormGroup>
                        <Label>Total</Label>
                        <Input
                            type="text"
                            name="faltanteTotal"
                            value={total ? numberWithDots(total) : 0}
                            disabled
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Anticipos
