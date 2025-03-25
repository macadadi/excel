export async function fetchData({year,dataType,account}){
    const url = `http://localhost:5000/api/accounts/${account}/accounting/${year}/${dataType}`
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
        return response.json();
      })
      .then(data =>{
        if(dataType ==='entries'){
          const res = data.map(({ correlations, ...rest }) => rest) 
          console.log(res)
           return   res     
        }
        return data
      })
      .catch(error => console.error("Error:", error));
    return data
    }