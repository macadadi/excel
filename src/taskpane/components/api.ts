export async function fetchData({year,dataType}){
    const url = `http://localhost:5000/api/accounts/99999/accounting/${year}/${dataType}`
    const token = 'rmFwQsX1.19fa351898d8db4b24a11eb9de0bd9ae6ca7a12ab33a974244f513248787b2c7'
    
    const data = await fetch(url, {
      method: "GET", // or "POST", "PUT", "DELETE", etc.
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      },
    
    })
      .then(response => {
        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        return response.json(); // or response.text() if it's not JSON
      })
      .then(data =>{
        return data
      })
      .catch(error => console.error("Error:", error));
    return data
    }