
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
    const currentWorksheet = context.workbook.worksheets;
    const sheet = currentWorksheet.add(tableName)
  const expensesTable = sheet.tables.add(sheetObj[dataType].columns, true /*hasHeaders*/);
    expensesTable.getHeaderRowRange().values =
      [TableHeaders];
    const transformedArray = dataArray.map( item => Object.values(item));
    expensesTable.rows.add(null, transformedArray);
    expensesTable.getRange().format.autofitColumns();
    expensesTable.getRange().format.autofitRows();
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

    // Load the 'value' property
    customProperty.load("value");

    // Synchronize to apply changes and fetch the value
    await context.sync();

    // Log the value of the custom property
    console.log(customProperty.value, "CURRENT TEST");
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
