import axiosConfig from "./axiosConfig"
import { BASEURL } from "./BaseURL"

export const addCourse=async(reqBody)=>{

    return await axiosConfig("post",`${BASEURL}/courseDatas`,reqBody)
}

export const getCourse=async()=>{

    return await axiosConfig('get',`${BASEURL}/courseDatas`,'')
}

export const deleteCourse=async(id)=>{
    
    return await axiosConfig('delete',`${BASEURL}/courseDatas/${id}`,'')
}

export const updateCourse=async(id,reqBody)=>{

    return await axiosConfig('put',`${BASEURL}/courseDatas/${id}`,reqBody)
}