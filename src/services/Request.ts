import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function post_request(url: string, body: any) {
  // eslint-disable-next-line no-useless-catch
 const token = localStorage.getItem("Authorization"); // or sessionStorage

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

export async function get_request(url: string) {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(url);
    return response;
  } catch (e) {
    throw e;
  }
}
