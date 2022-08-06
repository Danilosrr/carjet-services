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

const api = {
    signUp,
    signIn,
    getBranches,
    getProviders
};

export default api;