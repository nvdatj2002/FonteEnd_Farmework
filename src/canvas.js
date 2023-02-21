import { Container, } from "react-bootstrap"
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";

const Canvas = ({show , handleClose}) => {
  return (
    <Container>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Danh mục</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="" style={{
          display:'block'
        }}>
          <Link className="canvas-link" onClick={handleClose} to={'/admin'}
            
          >Quản lý sản phẩm</Link>
          <Link className="canvas-link" onClick={handleClose} to={'/order'}
          
          >Quản lý Order</Link>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  )
}
export default Canvas

