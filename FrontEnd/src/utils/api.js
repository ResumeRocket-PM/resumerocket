const api = (token) => {

  const baseUrl = import.meta.env.VITE_API_URL || "https://localhost:5001/api"; 

    const headers = {
      "Content-Type": "application/json",
    };
  
    if (token) {
        // console.log('token', token)
        headers["Authorization"] = "Bearer " + token;
    }

    // console.log('token', token)

    const get = (url) => (
        fetch(baseUrl + url, { method: "GET", headers, })
    );
  
    const put = (url, body) => {
      return fetch(baseUrl + url, {
        method: "PUT",
        headers: headers,
        body: body ? JSON.stringify(body) : null,
      })
    };

    const post = (url, body) => {
      return fetch(
        baseUrl + url,
        {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        }
      );
    };
  
    const postForm = (url, body) => {

      headers['Content-Type'] = 'application/json'

      return fetch(baseUrl + url, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        }
      )
    };

    const postFileForm = (url, body, retries = 2, delay = 100) => {

      const cloneHeaders = JSON.parse(JSON.stringify(headers));
      
      delete cloneHeaders['Content-Type'] // = 'multipart/form-data'

      return fetch(baseUrl + url, {
            method: 'POST',
            body: body,
            headers: cloneHeaders
        }).then(res => {
          if (!res.ok) {  // Check if the response status code is not OK
              if (retries > 0) {
                  console.log(`Request failed, ${retries} retries remaining, retrying in ${delay} ms...`);
                  return new Promise(resolve => setTimeout(resolve, delay))
                      .then(() => postFileForm(url, body, retries - 1, delay));
              }
              throw new Error('No retries left');
            }
            return res;  // Return the successful response
          })
          .catch(error => {
              if (retries > 0) {
                  console.log(`Request failed due to ${error}, ${retries} retries remaining, retrying in ${delay} ms...`);
                  return new Promise(resolve => setTimeout(resolve, delay))
                      .then(() => postFileForm(url, body, retries - 1, delay));
              }
              throw error;  // Propagate the error if no retries left
          });
      };
  
    return { get, post, postForm, postFileForm, put };
  };
  
  export default api;
  
  