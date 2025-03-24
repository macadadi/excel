// export const sheetObj = {
//   accounts: {
//     heading: ["id", "Client", "Year", "Number", "Type", "Description"],
//     columns: "A1:F1",
//   },
//   "cost-centers": {
//     heading: ["client", "description", "id", "name", "system", "year"],
//     columns: "A1:F1",
//   },
//   entries: {
//     heading: [
//       "id",
//       "client",
//       "year",
//       "type",
//       "reason",
//       "account",
//       "contraAccount",
//       "recordDate",
//       "amount",
//       "batch",
//       "costCenter1",
//       "costCenter2",
//       "currency",
//       "date",
//       "deliveryDate",
//       "description",
//       "invoiceNr",
//       "isGeneralReversal",
//       "isOpeningBalance",
//       "note",
//       "receiptNr",
//       "credit",
//     ],
//     columns: "A1:V1",
//   },
// };

import { Locale } from "./types";

const columnDef = {
  accounts: [
    { key: 'id', label_de: 'ID', label_en: 'Id' },
    { key: 'client', label_de: 'Kunde', label_en: 'Client' },
    { key: 'year', label_de: 'Jahr', label_en: 'Year' },
    { key: 'number', label_de: 'Nummer', label_en: 'Number' },
    { key: 'type', label_de: 'Typ', label_en: 'Type' },
    { key: 'description', label_de: 'Beschreibung', label_en: 'Description' },
  ],
  entries: [
    { key: 'id', label_de: 'ID', label_en: 'Id' },
    { key: 'client', label_de: 'Kunde', label_en: 'Client' },
    { key: 'year', label_de: 'Jahr', label_en: 'Year' },
    { key: 'type', label_de: 'Typ', label_en: 'Type' },
    { key: 'reason', label_de: 'Grund', label_en: 'Reason' },
    { key: 'account', label_de: 'Konto', label_en: 'Account' },
    {
      key: 'contraAccount',
      label_de: 'Vertragskonto',
      label_en: 'Contract Account',
    },
    { key: 'recordDate', label_de: 'Aufnahmedatum', label_en: 'Record Date' },
    { key: 'deliveryDate', label_de: 'Lieferdatum', label_en: 'Delivery Date' },
    { key: 'date', label_de: 'Datum', label_en: 'Date' },
    {
      key: 'isGeneralReversal',
      label_de: 'Allgemeine Umkehr',
      label_en: 'General Reversal',
    },
    {
      key: 'isOpeningBalance',
      label_de: 'Eröffnungsbilanz',
      label_en: 'Opening Balance',
    },
    { key: 'amount', label_de: 'Menge', label_en: 'Amount' },
    { key: 'currency', label_de: 'Währung', label_en: 'Currency' },
    { key: 'description', label_de: 'Beschreibung', label_en: 'Description' },
    {
      key: 'costCenter1',
      label_de: 'Kostenstelle 1',
      label_en: 'Cost Center 1',
    },
    {
      key: 'costCenter2',
      label_de: 'Kostenstelle 2',
      label_en: 'Cost Center 2',
    },
    {
      key: 'invoiceNr',
      label_de: 'Rechnungsnummer',
      label_en: 'Invoice Number',
    },
    { key: 'receiptNr', label_de: 'Belegnummer', label_en: 'Receipt Number' },
    { key: 'note', label_de: 'Notiz', label_en: 'Note' },
    { key: 'batch', label_de: 'Batch', label_en: 'Batch' },
    {
      key: 'correlations',
      label_de: 'Korrelationen',
      label_en: 'Correlations',
    },
  ],
  'cost-centers': [
    { key: 'id', label_de: 'ID', label_en: 'Id' },
    { key: 'client', label_de: 'Kunde', label_en: 'Client' },
    { key: 'year', label_de: 'Jahr', label_en: 'Year' },
    { key: 'name', label_de: 'Name', label_en: 'Name' },
    { key: 'system', label_de: 'System', label_en: 'System' },
    { key: 'description', label_de: 'Beschreibung', label_en: 'Description' },
  ],
};

function getExcelColumnLetter(num) {
  let letter = '';
  while (num > 0) {
    const remainder = (num - 1) % 26;
    letter = String.fromCharCode(65 + remainder) + letter;
    num = Math.floor((num - 1) / 26);
  }
  return letter;
}

export function generateRangeFromData(data) {
  const endColumn = getExcelColumnLetter(data.length)
  return `A1:${endColumn}1`;
}


function getColumns(dataType: keyof typeof columnDef, lang: Locale) {
  return columnDef[dataType].map((col) => col[`label_${lang}`],
  )
}

export { columnDef, getColumns };

export const replaceSpaceWithUnderScore = (originalString: string) => {
  return originalString.replace(/ /g, "_");
};

console.log(getColumns('accounts','de'))