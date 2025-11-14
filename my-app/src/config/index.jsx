const {default:axios} =require("axios")
// const axios = require("axios");
export const BASE_URl="http://localhost:9090"
export const clientServer=axios.create({
    baseURL:BASE_URl
})