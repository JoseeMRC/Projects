import Modal from 'react-bootstrap/Modal';
import './kakeiboModal.scss';
/* import {ButtonsApp} from "../Buttons/ButtonsApp"; */


export const KakeiboModal = ( {show, handleShow, title, children} ) => {
  
    return (     
        <Modal dialogClassName="kakeibo-modal vertical-centered" 
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show} 
          onHide={handleShow}>

          <Modal.Header closeButton>
            <Modal.Title className='modal-titulo'> 
              {title}  
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className='pb-5'>
            {children}
          </Modal.Body>

          {/* <Modal.Footer className='d-flex justify-content-center gap-3'>
            <ButtonsApp onClick={handleShow} botonText={"Cancelar"}/>
            { boton &&
              <ButtonsApp onClick={action} botonText={boton}/>
            }
          </Modal.Footer> */}
        </Modal>
    );
}