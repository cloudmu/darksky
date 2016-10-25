export function checkStatus(response) {
  if (!response.ok) {   // (response.status < 200 || response.status > 300)
    const error = new Error(response.statusText||response.status);
    error.response = response;
    throw error;
  }
  return response;
}

export function parseJSON(response) {
  return response.json();
}

/**
 * A utility to call a restful service.
 *
 * @param url The restful service end point.
 * @param config The config object of the call. Can be null.
 * @param onRequestSuccess The callback function to be executed upon request success.
 *                 The function expects response json payload as its argument.
 * @param onRequestFailure The callback function to be executed upon request failure.
 *                 The function expects error as its argument.
 */
export default function callApi(url, config, onRequestSuccess, onRequestFailure) {
  fetch(url, config)
    .then(checkStatus).catch((error)=>{
      throw error;
    })
    .then(parseJSON)
    .then((json) => {
      onRequestSuccess(json);
    }).catch((error) => {
      const response = error.response;
      if (response === undefined) {
          onRequestFailure(error);
      } else {
        error.status = response.status;
        error.statusText = response.statusText;
        response.text().then( (text) => {
          try {
              const json = JSON.parse(text);
              error.message = json.message;
          } catch (ex) {
              error.message = text;
          }
        
          onRequestFailure(error);
        });
      }
  });
}

