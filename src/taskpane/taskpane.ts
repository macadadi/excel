
import { fetchData } from "./api";


export type TableProp= {
  year: string
  dataType: string
  tableName: string
  account: string
}
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
export async function createTable({year,dataType,tableName,account}:TableProp) {
  await Excel.run(async (context) => {
    const dataArray = await fetchData({year,dataType,account})


    const TableHeaders = sheetObj[dataType].heading 
    const currentWorksheet = context.workbook.worksheets;
    const sheet = currentWorksheet.add(tableName)
    const currentTable = sheet.tables.add(sheetObj[dataType].columns, true /*hasHeaders*/);
     currentTable.name= replaceSpaceWithUnderScore(tableName)
    currentTable.getHeaderRowRange().values =
      [TableHeaders];
    const transformedArray = dataArray.map( item => Object.values(item));
    currentTable.rows.add(null, transformedArray);
    currentTable.getRange().format.autofitColumns();
    currentTable.getRange().format.autofitRows();
    await context.sync();
    let currentSheet = context.workbook.worksheets.getItem(tableName);
    currentSheet.activate();
    currentSheet.load("name");
    await context.sync();
  });
}

export async function UpdateTable(config) {
  await Excel.run(async (context) => {
    const workbook = context.workbook;
    const customProperty = workbook.properties.custom.add('APX', JSON.stringify(config));
    customProperty.load("value");
    await context.sync();
  }).catch((error) => {
    console.error("Error in UpdateTable:", error);
  });
}
export async function getWorkBookProperties() {
  const property = await Excel.run(async (context) => {
    const workbook = context.workbook;
    const customProperty = workbook.properties.custom.getItem('APX')
    customProperty.load("value");
    await context.sync();
    return JSON.parse(customProperty.value)
  })
  .catch((error) => {
    console.error("Error in UpdateTable:", error);
  });
  return property
}



// export async function refreshTable({ year, dataType, tableName, account }: TableProp) {
//   await Excel.run(async (context) => {
//     let sheet = context.workbook.worksheets.getItem(tableName);
//     let farmData = sheet.getUsedRange();
//     farmData.clear()
//     await context.sync();
//     createRefreshed({year,dataType,tableName,account})
    
// });
// }
const replaceSpaceWithUnderScore=(originalString: string)=>{
  return originalString.replace(/ /g, "_")
}

export async function refreshTable({ year, dataType, tableName, account }: TableProp) {
  await Excel.run(async (context) => {
    // Fetch the latest data
    const dataArray = await fetchData({ year, dataType, account });

    // Define the table structure
    const sheetObj = {
      accounts: {
        heading: ["id", "Client", "Year", "Number", "Type", "Description"],
        columns: "A1:F1",
      },
      'cost-centers': {
        heading: ["client", "description", "id", "name", "system", "year"],
        columns: "A1:F1",
      },
      entries: {
        heading: [
          "id", "client", "year", "type", "reason", "account", "contraAccount", "recordDate",
          "amount", "batch", "costCenter1", "costCenter2", "currency", "date", "deliveryDate",
          "description", "invoiceNr", "isGeneralReversal", "isOpeningBalance", "note", "receiptNr",
          "credit"
        ],
        columns: "A1:V1",
      },
    };

    const TableHeaders = sheetObj[dataType].heading;

    const currentWorksheet = context.workbook.worksheets.getItem(tableName);

    const tables = currentWorksheet.tables;
    const existingTable = tables.getItemOrNullObject(replaceSpaceWithUnderScore(tableName));
    existingTable.load("name");
    await context.sync();
console.log(  existingTable.name,'  existingTable   existingTable')
    let currentTable;
    if (existingTable.isNullObject) {
      currentTable = tables.add(sheetObj[dataType].columns, true /*hasHeaders*/);
      currentTable.name = replaceSpaceWithUnderScore(tableName);
      currentTable.getHeaderRowRange().values = [TableHeaders];
    } else {
      currentTable = existingTable;
      const dataBodyRange = currentTable.getDataBodyRange();
      dataBodyRange.delete();
      await context.sync();
    }
    const transformedArray = dataArray.map((item) => Object.values(item));
    currentTable.rows.add(null, transformedArray);
    currentTable.getRange().format.autofitColumns();
    currentTable.getRange().format.autofitRows();
    currentWorksheet.activate();
    await context.sync();
  }).catch((error) => {
    console.error("Error refreshing table:", error);
  });
}

