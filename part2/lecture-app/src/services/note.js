import axios from 'axios';
const baseURL = 'http://localhost:3001/notes';

const getAll = () => {
    const request = axios.get(baseURL);
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        important: true
    };
    return request.then(response => response.data.concat(nonExisting));
};

const create = (newObject) => {
    const request = axios.post(baseURL, newObject);
    return request.then(response => response.data);
};

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject);
    return request.then(response => response.data);
};

// All of these functions used to return promises.
// Now they return the actual data (note object) associated with the request.
// export default {
//     getAll: getAll,
//     create: create,
//     update: update
// };

// New compact way to define objects using variables. 
export default { getAll, create, update };