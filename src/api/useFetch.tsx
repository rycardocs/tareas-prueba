const UseFetch = <T,>(data: any, url: string) => {
  return new Promise<T>((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((datos) => {
        resolve(datos);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export default UseFetch;
