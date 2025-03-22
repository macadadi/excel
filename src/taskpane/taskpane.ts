/* global Excel console */

import { fetchData } from "./api";


export type TableProp= {
  year: string
  dataType: string
  tableName: string
  account: string
}
export async function createTable({year,dataType,tableName,account}:TableProp) {
  await Excel.run(async (context) => {
    const dataArray = await fetchData({year,dataType,account})
const sheetObj ={
  accounts: {
    heading: ["id", "Client", "Year", "Number", "Type", "Description"],
    columns: "A1:F1"
  },
  'cost-centers': {
    heading: ["client","description","id","name","system","year"],
    columns: "A1:F1"
  },
  entries: {
    heading: ["id","client", "year","type","reason", "account","contraAccount","recordDate",
      "amount","batch","costCenter1","costCenter2","currency","date","deliveryDate",
     "description", "invoiceNr","isGeneralReversal","isOpeningBalance","note","receiptNr",
     "credit"
    ],
    columns: "A1:V1"
  }
}

    const TableHeaders = sheetObj[dataType].heading 
    const currentWorksheet = context.workbook.worksheets.getActiveWorksheet();
    currentWorksheet.name = tableName;
  const expensesTable = currentWorksheet.tables.add(sheetObj[dataType].columns, true /*hasHeaders*/);
   
    expensesTable.getHeaderRowRange().values =
      [TableHeaders];
    const transformedArray = dataArray.map( item => Object.values(item));
    expensesTable.rows.add(null /*add at the end*/, transformedArray);
    expensesTable.getRange().format.autofitColumns();
    expensesTable.getRange().format.autofitRows();
    
  
    await context.sync();
  });
}