import  axios from "axios";
import {errorReporte} from "../acces/functions";


export const hostUrl =   'https://api.github.com/'



const instanse = axios.create({
    baseURL: hostUrl,
    headers: {
        Accept: "application/vnd.github.v3.json"
    },
})


export const getUsers = async (name:string,size=3) => {
    try {
        return await instanse.get(`users?per_page=${size}`,
        )
    }
    catch (e) {
        errorReporte('problem in  deleteItemAPI', e)
    }
}
export const findUsers = async (name:string,size=3) => {
    try {
        return await instanse.get(`search/users?per_page=${size}&q=${name}`,
        )
    }
    catch (e) {
        errorReporte('problem in  deleteItemAPI', e)
    }
}

export const getUserPage = async (url:string) => {
    // debugger
    try {
        return await axios.get(url)
    }
    catch (e) {
        errorReporte('problem in  deleteItemAPI', e)
    }
}




export {}






