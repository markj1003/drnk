import axios from "axios";


const url = "http://localhost:3001/"

axios.interceptors.request.use(config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    return config;
    },
    error => {
        return Promise.reject(error);
})

export async function authenticatedPost(endpoint, data) {
    return await axios
        .post(url + endpoint, data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        });
}