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

async function getStock(provider,token) {
    const config = requestConfig(token);
    return baseAPI.get(`/stock/${provider}`, config);
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

    return await baseAPI.post(`/upload/stock/${provider}`,formData,config);
}

const api = {
    signUp,
    signIn,
    getBranches,
    getProviders,
    sendFile,
    getStock
};

export default api;