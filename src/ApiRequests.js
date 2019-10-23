export function getPutDataRequest(data) {
  const url = '/api/Bets/' + data.id;
  // The data we are going to send in our request
  
  let jsonData = JSON.stringify(data)
  // The parameters we are gonna pass to the fetch function
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

export function putData(data) {
  const url = '/api/Bets/' + data.id;
  // The data we are going to send in our request
  
  let jsonData = JSON.stringify(data)
  // The parameters we are gonna pass to the fetch function
  let fetchData = { 
      method: 'PUT', 
      body: jsonData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
  }
  fetch(url, fetchData)
  .then(response => {
      console.log(response)
  });
}


export function deleteData(data) {
  const url = '/api/Bets/' + data.id;
  let fetchData = { 
      method: 'DELETE', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
  }
  fetch(url, fetchData)
  .then(response => {
      console.log(response)
  });
}


export function postData(jsonData) {
  const url = '/api/Bets/';
  let fetchData = { 
      method: 'POST', 
      body: jsonData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
  }
  fetch(url, fetchData)
  .then(response => {
    console.log(response);
  });
}