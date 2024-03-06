import Axios from 'axios';

const baseUrl = Axios.create({
    baseURL: "http://localhost:3000/"
})

export default baseURL;