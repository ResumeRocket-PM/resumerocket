const api = (token) => {
    const baseUrl = "https://localhost:44392/api";

    const headers = {
      "Content-Type": "application/json",
    };
  
    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }
  
    const get = (url) => (
      fetch(baseUrl + url, { method: "GET", headers, })
    );
  
    const post = (url, body) => {
    //   console.log("baseUrl", baseUrl)
    //   console.log("url", url);
    //   console.log("baseurl + url", baseUrl + url);
      return fetch(
        baseUrl + url,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers,
        }
      );
    };
    

    // const postMessage = (url, body) => (
    //   fetch(
    //     baseUrl + url,
    //     {
    //       method: "POST",
    //       body: JSON.stringify(body),
    //       headers,
    //     },
    //   )
    // );
  
    const postForm = (url, body) => (
      console.log(body),
      fetch(baseUrl + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }
      )
    );
  
    return { get, post, postForm };
  };
  
  export default api;
  
  