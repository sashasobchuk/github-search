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
        return null
    }
}
export const findUsers = async (name:string,size:number,page:number) => {
    try {
        return await instanse.get(`search/users?per_page=${size}&q=${name}&page=${page}`,
        )
    }
    catch (e) {
        errorReporte('problem in  deleteItemAPI', e)
        return null
    }
}

export const getUserPage = async (url:string) => {
    try {
        return await axios.get(url)
    }
    catch (e) {
        errorReporte('problem in  deleteItemAPI', e)
        return null
    }
}
export const getUserRepos = async (userName:string,repoName:string,count:number,page:number) => {
    try {
        return await instanse.get(`search/repositories?q=${repoName.length ? repoName :''}${!!userName && ('+user:'+userName)}${!!page ? '&page='+page : ''}${count && '&per_page='+count}`)
    }
    catch (e) {
        errorReporte('problem in  deleteItemAPI', e)
        return null
    }
}
export const getOneUser = async (id:string) => {
    try {
        return await instanse.get(`user/${id}`)
    }
    catch (e) {
        errorReporte('problem in  deleteItemAPI', e)
        return null
    }
}








