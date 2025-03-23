import { fetchData } from "./api";
import { replaceSpaceWithUnderScore, sheetObj } from "./utils";

export type TableProp = {
  year: string;
  dataType: string;
  tableName: string;
  account: string;
};

export async function createTable({ year, dataType, tableName, account }: TableProp) {
  await Excel.run(async (context) => {
    const dataArray = await fetchData({ year, dataType, account });

    const TableHeaders = sheetObj[dataType].heading;
    const currentWorksheet = context.workbook.worksheets;
    const sheet = currentWorksheet.add(tableName);
    const currentTable = sheet.tables.add(sheetObj[dataType].columns, true /*hasHeaders*/);
    currentTable.name = replaceSpaceWithUnderScore(tableName);
    currentTable.getHeaderRowRange().values = [TableHeaders];
    const transformedArray = dataArray.map((item) => Object.values(item));
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
    const customProperty = workbook.properties.custom.add("APX", JSON.stringify(config));
    customProperty.load("value");
    await context.sync();
  }).catch((error) => {
    console.error("Error in UpdateTable:", error);
  });
}
export async function getWorkBookProperties() {
  const property = await Excel.run(async (context) => {
    const workbook = context.workbook;
    const customProperty = workbook.properties.custom.getItem("APX");
    customProperty.load("value");
    await context.sync();
    return JSON.parse(customProperty.value);
  }).catch((error) => {
    console.error("Error in UpdateTable:", error);
  });
  return property;
}

export async function refreshTable({ year, dataType, tableName, account }: TableProp) {
  await Excel.run(async (context) => {
    const dataArray = await fetchData({ year, dataType, account });
    const TableHeaders = sheetObj[dataType].heading;

    const currentWorksheet = context.workbook.worksheets.getItem(tableName);

    const tables = currentWorksheet.tables;
    const existingTable = tables.getItemOrNullObject(replaceSpaceWithUnderScore(tableName));
    existingTable.load("name");
    await context.sync();
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
  }).catch(async () => {
    await createTable({ year, dataType, tableName, account });
  });
}
