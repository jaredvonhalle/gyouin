export function getPutDataRequest(data) {
  const url = '/api/Bets/' + data.id;
  let jsonData = JSON.stringify(data)
  let fetchData = { 
      method: 'PUT', 
      body: jsonData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
  }
  return function () {return fetch(url, fetchData);}
}

export function getDeleteDataRequest(data) {
  const url = '/api/Bets/' + data.id;
  let fetchData = { 
      method: 'DELETE', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
  }
  return function () {return fetch(url, fetchData);}
}

export function getPostDataRequest(jsonData) {
  const url = '/api/Bets/'
  let fetchData = { 
      method: 'POST', 
      body: jsonData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
  }
  return function () {return fetch(url, fetchData);}
}