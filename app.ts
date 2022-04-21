import multik from './index';

(async () => {
  try {
    const response = await fetch('http://mysite.ru', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return await response.json();
  } catch (e: HttpClientError) {
    multik(
      (clientError: HttpClientError) => clientError.code,
      [404, () => { /* ... handle 404 code */ },
      [500, () => { /* ... handle 500 code */ },
    )(e);
  }
})();
