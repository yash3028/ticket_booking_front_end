import axios from "axios"
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export async function post_request(url:string,body:any) {
    // eslint-disable-next-line no-useless-catch
    try{
        const response = await axios.post(url,body)
        return response
    }   
    catch(e){
        throw e;  
    }

}
