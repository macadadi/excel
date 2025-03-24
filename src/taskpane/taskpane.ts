import { fetchData } from "./api";
import { dataType, Locale } from "./types";
import { generateRangeFromData, getColumns, replaceSpaceWithUnderScore, } from "./utils";

export type TableProp = {
  year: string;
  dataType: dataType;
  tableName: string;
  account: string;
  locale: Locale
};

async function fetchAndTransformData({ year, dataType, account}: Omit<TableProp, "tableName" | "locale">) {
  const dataArray = await fetchData({ year, dataType, account });
  return dataArray.map((item) => Object.values(item));
}

async function addTableToSheet(
  context: Excel.RequestContext,
  sheet: Excel.Worksheet,
  tableName: string,
  dataType: dataType,
  transformedArray: any[][],
  locale: Locale
) {
  const columns = getColumns(dataType,locale)
  const rowRange = generateRangeFromData(columns)
  const TableHeaders = columns;
  const currentTable = sheet.tables.add(rowRange, true);
  currentTable.name = replaceSpaceWithUnderScore(tableName);
  currentTable.getHeaderRowRange().values = [TableHeaders];
  currentTable.rows.add(null, transformedArray);
  currentTable.getRange().format.autofitColumns();
  currentTable.getRange().format.autofitRows();
  await context.sync();
}

async function updateTableData(
  context: Excel.RequestContext,
  table: Excel.Table,
  transformedArray: any[][]
) {
  const dataBodyRange = table.getDataBodyRange();
  dataBodyRange.delete(Excel.DeleteShiftDirection.up);
  await context.sync();
  table.rows.add(null, transformedArray);
  table.getRange().format.autofitColumns();
  table.getRange().format.autofitRows();
  await context.sync();
}

async function ensureTableExists(
  context: Excel.RequestContext,
  tableName: string,
  dataType: dataType,
  transformedArray: any[][],
  locale: Locale
) {
  const currentWorksheet = context.workbook.worksheets.getItem(tableName);
  const tables = currentWorksheet.tables;
  const existingTable = tables.getItemOrNullObject(replaceSpaceWithUnderScore(tableName));
  existingTable.load("name");
  await context.sync();

  if (existingTable.isNullObject) {
    await addTableToSheet(context, currentWorksheet, tableName, dataType, transformedArray,locale);
  } else {
    await updateTableData(context, existingTable, transformedArray);
  }
  currentWorksheet.activate();
}

export async function createTable({ year, dataType, tableName, account, locale }: TableProp) {
  await Excel.run(async (context) => {
    const transformedArray = await fetchAndTransformData({ year, dataType, account });
    const currentWorksheet = context.workbook.worksheets.add(tableName);
    await addTableToSheet(context, currentWorksheet, tableName, dataType, transformedArray,locale);
    currentWorksheet.activate();
    await context.sync();
  });
}

export async function UpdateWorkBookProperties(config: any) {
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
    console.error("Error in getWorkBookProperties:", error);
  });
  return property;
}

export async function refreshTable({ year, dataType, tableName, account,locale }: TableProp) {
  await Excel.run(async (context) => {
    const transformedArray = await fetchAndTransformData({ year, dataType, account });
    await ensureTableExists(context, tableName, dataType, transformedArray,locale);
  }).catch(async () => {
    await createTable({ year, dataType, tableName, account,locale});
  });
}

export async function updateUserLocale(local: "en" | "de") {
  await Excel.run(async (context) => {
    const settings = context.workbook.settings;
    settings.add("locale", local);
    await context.sync();
  });
}

export async function getUserLocale() {
const locale = await Excel.run(async (context) => {
    const settings = context.workbook.settings;
    const locale = settings.getItem("locale");
    locale.load("value");
    await context.sync()
    return locale.value
  })
  return locale
}