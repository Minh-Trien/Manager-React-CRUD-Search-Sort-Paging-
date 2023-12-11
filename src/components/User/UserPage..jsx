import React, { useState, useEffect } from 'react';
import { fetchAllUser,  getSort, getSearch } from '../../Service/UserService';
import CreateUser from './FormCreateUser';
import ReactPaginate from 'react-paginate';
import "../assets/TableProduct.scss";
import { debounce } from "lodash";
const User = (props) => {

  const [Users, setUsers] = useState([]);
  const [totalUser, setTotalUser] = useState([]);
  const [totalPage, setTotalPage] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false); // Biến trạng thái để xác định chế độ cập nhật
  // Sử dụng một đối tượng để lưu trạng thái của từng hàng
  const [dataUpdate, setDataUpdate] = useState([]);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () =>
  { setShow(true)
  setIsUpdating(false)
  };

  useEffect(() => {
    getUsers(1);
  }, []);
  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res &&  res.data) {
      console.log(">>Check res: ", res.data)
      setTotalUser(res.data.data.totalItem)
      setTotalPage(res.data.totalPages)
      setUsers(res.data.data);
    }
  }
  const handlePageClick = (event) =>{
      console.log("event lib: ", event)
      getUsers(+event.selected + 1);
      setPage(+event.selected + 1);
  }
  const handleUpdateTable = async () => {
    // Gọi lại hàm getUsers để tải lại danh sách sản phẩm
    await getUsers();
  }
  const handleUpdateButtonClick = async ( User ) => {
    // Khi bạn nhấn vào nút cập nhật, cập nhật biến trạng thái
   setDataUpdate(User);
   handleShow();
   setIsUpdating(true);   
  }

  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const handleSort = async (sortBy, sortOrder) => {
      setSortBy(sortBy)
      setSortOrder(sortOrder)
      let response =  await getSort(sortBy,sortOrder, page)
      console.log(response);
      if (response && response.data) {
        // Cập nhật danh sách sản phẩm sau khi sắp xếp
        setUsers(response.data.data);
        setTotalUser(response.data.data.totalItem);
        setTotalPage(response.data.totalPages);
      }
  };
  const handleSearch = debounce( async (sr) =>
  {
    let term = sr.target.value;
    if(term){
        let response = await getSearch(term, page)  
        console.log(response)
        if (response && response.data) {
          // Cập nhật danh sách sản phẩm sau khi sắp xếp
          setUsers(response.data.data);
          setTotalUser(response.data.data.totalItem);
          setTotalPage(response.data.totalPages);
        }
    }else{
    getUsers(1)
    setKeyword("")
    }
  },1000)
  return (
    <>
     
    <div className="container">
      <h1 className="mt-5">User List</h1>
      
      <CreateUser handleUpdateTable={handleUpdateTable} isUpdating={isUpdating} handleClose={handleClose} show={show} handleShow={handleShow} dataUpdate={dataUpdate}/>
      <div className='col-6 my-3'>
        <input
        type='text'
        className='form-control'
        placeholder='Search user by email.......'     
        onChange={(sr)=> handleSearch(sr)}/>
      </div>
      <hr></hr>
      <div className="table-responsive">
        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
          <thead>
            <tr>
              <th>
                <div className='sort-header'>
                <span>ID </span>
                <span>
              <i className="fa-solid fa-arrow-up"
              onClick={()=> handleSort("id", "asc")}
              ></i> 
              <i className="fa-solid fa-arrow-down"
              onClick={()=> handleSort("id", "desc")}
              ></i>
                </span>
                 </div>
              </th>
            
              <th>
                <div className='sort-header'>
              <span>Email </span>
                <span>
              <i className="fa-solid fa-arrow-up"
              onClick={()=> handleSort("email", "asc")}
              ></i> 
              <i className="fa-solid fa-arrow-down"
              onClick={()=> handleSort("email", "desc")}
              ></i>
                </span>  
                </div>
                </th>
              <th>Password</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Quality</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Users && Users.length > 0 && Users.map((User, index) => (
              <tr key={index}>
                <td>{User.id}</td>
                <td>{User.email}</td>
                <td>{User.password}</td>
                <td>{User.firstName}</td>
                <td>{User.lastName}</td>
                <td>{User.phone}</td>
                <td>{User.address} </td>
                <td>
                  <div className="d-flex">
                    <button className="btn btn-primary me-2 update-button" onClick={() => handleUpdateButtonClick(User)}>
                    <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPage}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      </div>
    </div>
    
    </>
  );
}

export default User;
