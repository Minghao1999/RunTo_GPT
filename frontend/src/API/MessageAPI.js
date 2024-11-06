import axios from "axios";

const baseURL = 'http://localhost:3000/api'

const getMessages = async () =>{
    try{
        const response = await axios.get(`${baseURL}/messages`)
        const historyMessages = response.data.reduce((acc, day)=>{
            acc[day._id] = day.messages
            return acc
        },{})
        return historyMessages
    }catch (error){
        console.error('Error getting messages', error)
        throw error
    }
}

const postMessage = async (message)=>{
    try{
        const response = await axios.post(`${baseURL}/messages`,message)
        return response.data
    }catch (error){
        console.error('Error sending message:', error)
        throw error
    }
}

export {getMessages,postMessage}