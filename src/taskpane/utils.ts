export const sheetObj = {
  accounts: {
    heading: ["id", "Client", "Year", "Number", "Type", "Description"],
    columns: "A1:F1",
  },
  "cost-centers": {
    heading: ["client", "description", "id", "name", "system", "year"],
    columns: "A1:F1",
  },
  entries: {
    heading: [
      "id",
      "client",
      "year",
      "type",
      "reason",
      "account",
      "contraAccount",
      "recordDate",
      "amount",
      "batch",
      "costCenter1",
      "costCenter2",
      "currency",
      "date",
      "deliveryDate",
      "description",
      "invoiceNr",
      "isGeneralReversal",
      "isOpeningBalance",
      "note",
      "receiptNr",
      "credit",
    ],
    columns: "A1:V1",
  },
};

export const replaceSpaceWithUnderScore = (originalString: string) => {
  return originalString.replace(/ /g, "_");
};
