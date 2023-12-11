import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser, putUpdateUser} from '../../Service/UserService';
import {  toast } from 'react-toastify';
import { useEffect } from 'react';
function CreateUser(props) {
  const{handleUpdateTable, isUpdating, handleClose, show, handleShow, dataUpdate} = props;
  const handleSave = async () => {
    let res = await postCreateUser(email, password, firstName,phone, lastName,address );
    console.log(">>Check res:", res)
    if(res && res.data.id){
      handleClose();
      setEmail('');
      setPassword('');
      setFirstName('');
      setPhone('');
      setLastName('');
      setAddress(true);
      toast.success("A User created succeed !");    
      handleUpdateTable();
    }else{
    }
  }



  const handleUpdateUser = async () => {
          // Kiểm tra giá trị của id
      if (id) {
      let res = await putUpdateUser(id, email, password, firstName,phone, lastName,address);
       console.log(">>Cheack res:", res)
       handleClose();
       toast.success("A User update succeed !");    
       handleUpdateTable();
    }  
  }

  useEffect(() => {
    if (show) {
      if (isUpdating) {
        // Nạp dữ liệu từ dataUpdate khi ở chế độ "Update"
        setId(dataUpdate.id);
        setName(dataUpdate.name);
        setPassword(dataUpdate.password);
        setFirstName(dataUpdate.firstName);
        setPhone(dataUpdate.phone);
        setAddress(dataUpdate.address);
        setLastName(dataUpdate.lastName);
      } else {
        // Đặt các giá trị thành rỗng khi ở chế độ "Add New"
        setId('');
        setName('');
        setPassword('');
        setFirstName('');
        setPhone('');
        setLastName('');
        set('');
        
        
      }
    }
  }, [dataUpdate, show, isUpdating]);
  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlepasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlefirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handlephoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handlelastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleaddressChange = (event) => {
    setAddress(event.target.value);
  };
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName]  = useState("");
  const [phone, setPhone] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  


  return (
    <>
      
      <div className='col-3'>
      <Button variant="primary"  
      onClick={handleShow}  
      >
        Add new User
      </Button></div>
      <Modal
        show= {show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header closeButton>
          {isUpdating ? (  <Modal.Title>Update User</Modal.Title>   ) : (  <Modal.Title>Add New User</Modal.Title>  )}
        </Modal.Header>
        <Modal.Body>
        
        <form>
        
    
  <div className="mb-3">
    <label htmlFor="" className="form-label">
      Email
    </label>
    <input
      value={email}
      type="email"
      className="form-control"
      onChange={handleNameChange}
    />
   
  </div>
  <div className="mb-3">
    <label  className="form-label">
     Password
    </label>
    <input
      value={password}
      type="password"
      className="form-control"
      onChange={handlepasswordChange}
    />
  </div>
  <div className="mb-3">
    <label  className="form-label">
     FirstName
    </label>
    <input
    value={firstName}
      type="Text"
      className="form-control"
      id=""
      onChange={handlefirstNameChange}
    />
  </div>
  <div className="mb-3">
    <label  className="form-label">
     LastName
    </label>
    <input
    value={lastName}
      type="Text"
      className="form-control"
      id=""
      onChange={handlelastNameChange}
    />
  </div>
  <div className="mb-3">
    <label  className="form-label">
     Phone
    </label>
    <input
    value={phone}
      type="tel"
      className="form-control"
      id=""
      onChange={handlephoneChange}
    />
  </div>
  <div className='my-3'>
  <label  className="form-label">
     Address
    </label>
    <input
    value={address}
      type="Text"
      className="form-control"
      id=""
      onChange={handleaddressChange}
    />
     </div>
</form>   
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {isUpdating ? ( <Button variant="primary" onClick={handleUpdateUser}>Comfirm</Button> ):(<Button variant="primary" onClick={handleSave}>SAVE</Button>)};
        </Modal.Footer>
      </Modal>

    </>
  );
}
export default CreateUser;
