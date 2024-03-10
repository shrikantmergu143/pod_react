import App_url from "../Common/constant";

export const PostRequestCallAPI = async (apiurl, payload, access_token) => {
  const controller = new AbortController();

  const CancelToken = window.axios.CancelToken;
  const source = CancelToken.source();

    const headers = {
      'Accept':"application/json",
    }
    if(access_token){
      headers.Authorization = `Bearer ${access_token}`
    }
    const getResponse = window.axios.post(`${App_url?.API_URL}/${apiurl}`,payload,{
      headers:headers,
      cancelToken: source.token
    }).then(function (result) {
      return result;
    }).catch((e)=>e.response);
    controller.abort();

    return getResponse;
};