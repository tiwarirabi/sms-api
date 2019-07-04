import http from '../utils/http';

const headers = {
    'Content-Type': 'application/json',
    'Client-ID': 'dronasoft-microservice', 
}

export const fetchToken = async (email: string, password: string) => {
    try{
        const body = {
            email, 
            password
        }
        
        const tokenResponse = await http.post("http://smsapp.easyservice.com.np/api/reseller/login", body)

        return tokenResponse.data.data.token;
    }catch(error){
        throw error;
    }
}

export const send = async (token: string, mobile: string, message: string, senderId: string) => {
    const specificHeaders = {
        headers: {
            ...headers,
            'Authorization':`Bearer ${token}`
        }
    }

    const body = {
        mobile,
        message,
        senderId
    }
    
    try{
        const sendResponse = await  http.post("http://smsapp.easyservice.com.np/api/client/sms/send", body, specificHeaders)
        
        return sendResponse.data.data;
    }catch(error){
        throw error;
    }
}