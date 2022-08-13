import axios from 'axios'

const baseAPI = axios.create({
    baseURL: "http://localhost:4000/",
})

function requestConfig(token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
}

async function signUp(signUpData) {
    await baseAPI.post("/sign-up", signUpData);
}
  
async function signIn(signInData) {
    return baseAPI.post("/sign-in", signInData);
}

async function getBranches(token) {
    const config = requestConfig(token);
    return baseAPI.get("/location?show=branch", config);
}

async function getProviders(token) {
    const config = requestConfig(token);
    return baseAPI.get("/location?show=provider", config);
}

async function getServices(id,token) {
    const config = requestConfig(token);
    return baseAPI.get(`/services/${id}`, config);
}

async function getStock(id,token) {
    const config = requestConfig(token);
    return baseAPI.get(`/stock/${id}`, config);
}

async function getProvider(id,token) {
    const config = requestConfig(token);
    return baseAPI.get(`/provider/${id}`, config);
}

async function sendFile(file,provider,token) {
    const formData = new FormData();
    formData.append('table',file);

    const config = { 
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'multipart/form-data;',
        },
        data: formData,
    }

    return await baseAPI.post(`/upload/${provider}`,formData,config);
}

const api = {
    signUp,
    signIn,
    getBranches,
    getProviders,
    sendFile,
    getServices,
    getStock,
    getProvider
};

export default api;