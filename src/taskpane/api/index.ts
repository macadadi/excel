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
        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        return response.json(); // or response.text() if it's not JSON
      })
      .then(data =>{
        if(dataType ==='entries'){
            // This to be returned into a fielter to only remive the columns that we don't need
            const resuslt = data.map(item =>({ id: item.id, client: item.client, year: item.year, 
                type: item.type, reason: item.reason, account: item.account, contraAccount: item.contraAccount,
                recordDate: item.recordDate, amount: item.amount,
                batch: item.batch,costCenter1: item.costCenter1 ,costCenter2:item.costCenter2,
                currency: item.currency, date: item.date, deliveryDate: item.deliveryDate,
                description: item.description, invoiceNr: item.invoiceNr,
                isGeneralReversal: item.isGeneralReversal,isOpeningBalance: item.isOpeningBalance,
                note: item.note, receiptNr: item.receiptNr, credit: item.credit}))
                return resuslt
        }
        return data
      })
      .catch(error => console.error("Error:", error));
    return data
    }