
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
  const currentTable = sheet.tables.add(sheetObj[dataType].columns, true /*hasHeaders*/);
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
    // Load the 'value' property
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

export async function refreshTable({ year, dataType, tableName, account }: TableProp) {
  await Excel.run(async (context) => {

    const dataArray = await fetchData({ year, dataType, account });
    const currentWorksheet = context.workbook.worksheets.getItem(tableName);
    const tables = currentWorksheet.tables;
    const table = tables.getItemOrNullObject(tableName);
    table.load("name");
    await context.sync();
    if (currentWorksheet.isNullObject) {
      throw new Error(`Table "${tableName}" not found.`);
    }
    console.log(table.name)
    // const dataBodyRange = currentWorksheet.getDataBodyRange();
    // dataBodyRange.clear(Excel.ClearApplyTo.contents);
    // await context.sync();
    // const transformedArray = dataArray.map((item) => Object.values(item));
    // table.rows.add(null, transformedArray);
    // table.getRange().format.autofitColumns();
    // table.getRange().format.autofitRows();
    // currentWorksheet.activate();
    // await context.sync();
  }).catch((error) => {
    console.error("Error refreshing table:", error);
  });
}