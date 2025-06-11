import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function post_request(url: string, body: any) {
  // eslint-disable-next-line no-useless-catch
 const token = localStorage.getItem("Authorization"); 
  try {
    const response = await axios.post(url, body, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    return response;
  } catch (e) {
    console.error("Axios Error:", e);
    throw e;
  }
}

export async function put_request (url: string, body: any){
  const token = localStorage.getItem("Authorization"); 
  try {
    const response = await axios.put(url, body, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    return response;
  } catch (e) {
    console.error("Axios Error:", e);
    throw e;
  }
};


export async function get_request(url: string) {
  // eslint-disable-next-line no-useless-catch
  try {
    const token = localStorage.getItem("Authorization")
    const response = await axios.get(url, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    return response;
  } catch (e) {
    throw e;
  }
}


export const delete_request = (url: string) => {
  const token = localStorage.getItem("Authorization");
  return axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
