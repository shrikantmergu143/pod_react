import App_url from "../Common/constant";

export const PostRequestCallAPI = async (apiurl, payload, access_token, {signal}={}) => {
    const headers = {
      'Accept':"application/json",
    }
    if(access_token){
      headers.Authorization = `Bearer ${access_token}`
    }
    const getResponse = window.axios.post(`${App_url?.API_URL}/${apiurl}`,payload,{
      headers:headers,
      signal:signal
    }).then(function (result) {
      return result;
    })

    return getResponse;
};