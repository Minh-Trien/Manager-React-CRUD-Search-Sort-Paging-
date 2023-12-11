import customize from"./axios"

const fetchAllProduct = (page) =>{
    return customize.get(`/api/product?page=${page}`);
}

const postCreateProduct = (name, taskId, descriptions,price, quanlity,hidden, image ) => {
    return customize.post("/api/product", {name, taskId, descriptions,price, quanlity, hidden,image});
}

const putUpdateProduct = (id, name, taskId, descriptions,price, quanlity,hidden, image ) => {
    return customize.put(`/api/product/${id}`, {id, name, taskId, descriptions,price, quanlity, hidden,image})}  

const putUpdateHidden = (id) => {
    return customize.put(`/api/product/${id}/hidden`,{id});
}

const getSort = (sortBy, sortOrder, page) => {
    return customize.get(`/api/product/sort?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}`, {sortBy, sortOrder, page});
}

const getSearch = (keyword, page) => {
    return customize.get(`/api/product/search?keyword=${keyword}&page=${page}`);
}

export {
        fetchAllProduct,
        postCreateProduct, 
        putUpdateProduct, 
        putUpdateHidden,
        getSort,
        getSearch
    };
