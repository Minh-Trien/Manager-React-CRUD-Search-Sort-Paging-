import customize from"./axios"

const fetchAllUser = (page) =>{
    return customize.get(`/api/user?page=${page}`);
}

const postCreateUser = (name, taskId, descriptions,price, quanlity,hidden, image ) => {
    return customize.post("/api/user", {name, taskId, descriptions,price, quanlity, hidden,image});
}

const putUpdateUser = (id, name, taskId, descriptions,price, quanlity,hidden, image ) => {
    return customize.put(`/api/user/${id}`, {id, name, taskId, descriptions,price, quanlity, hidden,image})}  

const getSort = (sortBy, sortOrder, page) => {
    return customize.get(`/api/user/sort?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}`, {sortBy, sortOrder, page});
}

const getSearch = (keyword, page) => {
    return customize.get(`/api/user/search?keyword=${keyword}&page=${page}`);
}

export {
        fetchAllUser,
        postCreateUser, 
        putUpdateUser, 
        getSort,
        getSearch
    };
