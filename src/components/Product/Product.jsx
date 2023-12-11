import React, { useState, useEffect } from 'react';
import { fetchAllProduct, putUpdateHidden, getSort, getSearch } from '../../Service/ProductService';
import CreateProduct from './FormCreateProduct';
import ReactPaginate from 'react-paginate';
import  '../assets/TableProduct.scss';
import { debounce } from "lodash";
const Product = (props) => {

  const [products, setProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState([]);
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
    getProducts(1);
  }, []);
  const getProducts = async (page) => {
    let res = await fetchAllProduct(page);
    if (res &&  res.data) {
      console.log(">>Check res: ", res.data)
      setTotalProduct(res.data.data.totalItem)
      setTotalPage(res.data.totalPages)
      setProducts(res.data.data);
    }
  }
  const handlePageClick = (event) =>{
      console.log("event lib: ", event)
      getProducts(+event.selected + 1);
      setPage(+event.selected + 1);
  }
  const handleUpdateTable = async () => {
    // Gọi lại hàm getProducts để tải lại danh sách sản phẩm
    await getProducts();
  }
  const handleUpdateButtonClick = async ( product ) => {
    // Khi bạn nhấn vào nút cập nhật, cập nhật biến trạng thái
   setDataUpdate(product);
   handleShow();
   setIsUpdating(true);   
  }

  const handleButtonClick = async (productId) => {
        console.log(productId)
    try {
      await putUpdateHidden(productId);
      handleUpdateTable();
    } catch (error) {
      console.log('Error updating hidden status:', error);
    }
  };
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const handleSort = async (sortBy, sortOrder) => {
      setSortBy(sortBy)
      setSortOrder(sortOrder)
      let response =  await getSort(sortBy,sortOrder, page)
      console.log(response);
      if (response && response.data) {
        // Cập nhật danh sách sản phẩm sau khi sắp xếp
        setProducts(response.data.data);
        setTotalProduct(response.data.data.totalItem);
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
          setProducts(response.data.data);
          setTotalProduct(response.data.data.totalItem);
          setTotalPage(response.data.totalPages);
        }
    }else{
    getProducts(1)
    setKeyword("")
    }
  },1000)
  return (
    <>
     
    <div className="container">
      <h1 className="mt-5">Product List</h1>
      
      <CreateProduct handleUpdateTable={handleUpdateTable} isUpdating={isUpdating} handleClose={handleClose} show={show} handleShow={handleShow} dataUpdate={dataUpdate}/>
      <div className='col-6 my-3'>
        <input
        type='text'
        className='form-control'
        placeholder='Search user by name.......'     
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
              <span>Name </span>
                <span>
              <i className="fa-solid fa-arrow-up"
              onClick={()=> handleSort("name", "asc")}
              ></i> 
              <i className="fa-solid fa-arrow-down"
              onClick={()=> handleSort("name", "desc")}
              ></i>
                </span>  
                </div>
                </th>
        
              <th>Task ID</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quality</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 && products.map((product, index) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.taskId}</td>
                <td>{product.descriptions}</td>
                <td>{product.price}</td>
                <td>{product.quanlity}</td>
                <td>
                  <img
                    className="img-fluid"
                    style={{ width: '50px' }}
                    src={product.image}
                    alt={product.name}
                  />
                </td>
                <td>
                  <div className="d-flex">
                    <button className="btn btn-primary me-2 update-button" onClick={() => handleUpdateButtonClick(product)}>
                    <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button className="btn btn-light" onClick={() => handleButtonClick(product.id)}>
                    {!product.hidden? (<i class="fa-regular fa-eye-slash"></i>):(<i class="fa-regular fa-eye"></i>)}                             
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

export default Product;
