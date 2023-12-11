import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateProduct, putUpdateProduct} from '../../Service/ProductService';
import {  toast } from 'react-toastify';
import { useEffect } from 'react';
function CreateProduct(props) {
  const{handleUpdateTable, isUpdating, handleClose, show, handleShow, dataUpdate} = props;
  const handleSave = async () => {
    let res = await postCreateProduct(name, taskId, descriptions,price, quanlity,hidden, image);
    console.log(">>Check res:", res)
    if(res && res.data.id){
      handleClose();
      setName('');
      setTaskId('');
      setDescriptions('');
      setPrice('');
      setQuanlity('');
      setImage('');
      setHidden(true);
      toast.success("A Product created succeed !");    
      handleUpdateTable();
    }else{
    }
  }



  const handleUpdateProduct = async () => {
          // Kiểm tra giá trị của id
      if (id) {
      let res = await putUpdateProduct(id, name, taskId, descriptions,price, quanlity,hidden, image);
       console.log(">>Cheack res:", res)
       handleClose();
       toast.success("A Product update succeed !");    
       handleUpdateTable();
    }  
  }

  useEffect(() => {
    if (show) {
      if (isUpdating) {
        // Nạp dữ liệu từ dataUpdate khi ở chế độ "Update"
        setId(dataUpdate.id);
        setName(dataUpdate.name);
        setTaskId(dataUpdate.taskId);
        setDescriptions(dataUpdate.descriptions);
        setPrice(dataUpdate.price);
        setHidden(true);
        setQuanlity(dataUpdate.quanlity);
        setImage(dataUpdate.image);
      } else {
        // Đặt các giá trị thành rỗng khi ở chế độ "Add New"
        setId('');
        setName('');
        setTaskId('');
        setDescriptions('');
        setPrice('');
        setQuanlity('');
        setImage('');
        
        
      }
    }
  }, [dataUpdate, show, isUpdating]);
  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleTaskIdChange = (event) => {
    setTaskId(event.target.value);
  };

  const handleDescriptionsChange = (event) => {
    setDescriptions(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleQuanlityChange = (event) => {
    setQuanlity(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [taskId, setTaskId] = useState("");
  const [descriptions, setDescriptions]  = useState("");
  const [price, setPrice] = useState("");
  const [quanlity, setQuanlity] = useState("");
  const [image, setImage] = useState("");
  const [hidden, setHidden] = useState(true);
  


  return (
    <>
      
      <div className='col-3'>
      <Button variant="primary"  
      onClick={handleShow}  
      >
        Add new Product
      </Button></div>
      <Modal
        show= {show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header closeButton>
          {isUpdating ? (  <Modal.Title>Update New Product</Modal.Title>   ) : (  <Modal.Title>Add New Product</Modal.Title>  )}
        </Modal.Header>
        <Modal.Body>
        
        <form>
        
    
  <div className="mb-3">
    <label htmlFor="" className="form-label">
      Product Name
    </label>
    <input
      value={name}
      type="Text"
      className="form-control"
      onChange={handleNameChange}
    />
   
  </div>
  <div className="mb-3">
    <label  className="form-label">
     Task ID
    </label>
    <input
      value={taskId}
      type="Text"
      className="form-control"
      onChange={handleTaskIdChange}
    />
  </div>
  <div className="mb-3">
    <label  className="form-label">
     Descriptions
    </label>
    <input
    value={descriptions}
      type="Text"
      className="form-control"
      id=""
      onChange={handleDescriptionsChange}
    />
  </div>
  <div className="mb-3">
    <label  className="form-label">
     Price
    </label>
    <input
    value={price}
      type="Text"
      className="form-control"
      id=""
      onChange={handlePriceChange}
    />
  </div>
  <div className="mb-3">
    <label  className="form-label">
     Quanlity
    </label>
    <input
    value={quanlity}
      type="Text"
      className="form-control"
      id=""
      onChange={handleQuanlityChange}
    />
  </div>
  <div className='my-3'> Image</div>
  <div className="input-group mb-3">
  <input 
  value={image}
  type="text" 
  className="form-control" 
  id="inputGroupFile02" 
  onChange={handleImageChange}
  />
  <label className="input-group-text" htmlFor="inputGroupFile02">
    Upload
  </label>
</div>
</form>   
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {isUpdating ? ( <Button variant="primary" onClick={handleUpdateProduct}>Comfirm</Button> ):(<Button variant="primary" onClick={handleSave}>SAVE</Button>)};
        </Modal.Footer>
      </Modal>

    </>
  );
}
export default CreateProduct;
