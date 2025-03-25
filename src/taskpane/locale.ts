import { Locale, TranslationKeys } from "./types";

const STRINGS: Record<TranslationKeys, Record<Locale, string>> = {
  // Menu
  menuTitle: {
    en: "APX",
    de: "APX",
  },
  dataImportMenuItemLabel: {
    en: "Data imports",
    de: "Datenimport",
  },
  settingsMenuItemLabel: {
    en: "Settings",
    de: "Einstellungen",
  },
  helpMenuItemLabel: {
    en: "Help",
    de: "Hilfe",
  },

  // Data Type Input
  dataTypeInputValue: {
    en: "Data type",
    de: "Datensatz",
  },
  dataTypeInputPlaceholder: {
    en: "Select data type...",
    de: "Datentype auswählen...",
  },
  dataTypeInputLabel: {
    en: "Data type",
    de: "Datensatz",
  },
  costCenters: {
    en: "Cost centers",
    de: "Kostenstellen",
  },
  entries: {
    en: "Entries",
    de: "Buchungen",
  },
  accounts: {
    en: "Accounts",
    de: "Konten",
  },

  // Year Input
  yearInputLabel: {
    en: "Year",
    de: "Jahr",
  },
  yearInputPlaceholder: {
    en: "e.g. 2024",
    de: "z.B. 2024",
  },

  // Client Input
  clientInputLabel: {
    en: "Client ID",
    de: "Mandantennummer",
  },
  clientInputPlaceholder: {
    en: "e.g. 12345",
    de: "z.B. 12345",
  },

  // Sheet Name Input
  sheetNameInputLabel: {
    en: "Sheet name",
    de: "Arbeitsblattname",
  },
  sheetNameInputPlaceholder: {
    en: "e.g. Cost Centers 2024",
    de: "z.B. Kostenstellen 2024",
  },

  // Sidebar
  sidebarTitle: {
    en: "Data import",
    de: "Datenimport",
  },
  sidebarDescription: {
    en: "Import data from APX into this Excel Sheet",
    de: "Importieren Sie Daten von APX in dieses Excel Sheet",
  },
  existingImportsListTitle: {
    en: "Existing Data Imports",
    de: "Existierende Datenimporte",
  },
  existingImportsPlaceholder: {
    en: "No imports configured",
    de: "Keine Datenimporte angelegt",
  },
  updateAllDataButtonLabel: {
    en: "Refresh all",
    de: "Alles aktualisieren",
  },

  // Form Buttons
  cancelImportEditButtonLabel: {
    en: "Cancel",
    de: "Abbrechen",
  },
  saveUpdatedImportButtonLabel: {
    en: "Save",
    de: "Speichern",
  },
  saveNewImportButtonLabel: {
    en: "Add",
    de: "Hinzufügen",
  },
  editFormTitle: {
    en: "Edit data import",
    de: "Datenimport bearbeiten",
  },
  addImportTitle: {
    en: "Add data import",
    de: "Datenimport hinzufügen",
  },

  // Dialogs
  confirmDataImportDeleteDialogText: {
    en: "Are you sure you want to delete this data import? This action cannot be undone.",
    de: "Möchten Sie diesen Datenimport wirklich löschen? Dies kann nicht rückgängig gemacht werden.",
  },
  dialogTitle: {
    en: "Settings",
    de: "Einstellungen",
  },
  dialogDescription: {
    en: "Configure the APX Add-On",
    de: "Das APX Add-On konfigurieren",
  },
  localeLabels: {
    en: "English",
    de: "Deutsch",
  },
  saveDialogButton: {
    en: "Save",
    de: "Speichern",
  },
  cancelDialogButton: {
    en: "Cancel",
    de: "Abbrechen",
  },
  localeInputLabel: {
    en: "Language",
    de: "Sprache",
  },
  localeInputPlaceholder: {
    en: "Select language...",
    de: "Sprache auswählen...",
  },

  // Help Sidebar
  helpSidebarContent: {
    en: "Please contact service@ax1.ai if you require help or have encountered a software bug.",
    de: "Kontaktieren Sie bitte service@ax1.ai falls Sie Hilfe benötigen oder ein Software-Bug entdeckt haben.",
  },

  // Settings Dialog
  someSettingsRequireReloadLabels: {
    de: "Einige Einstellungen werden erst nach dem Neuladen dieses Excel Sheets angewendet",
    en: "Some settings will only be applied after you reload this Excel Sheet",
  },
  settingsDialogDescription: {
    en: "Configure the APX Add-On",
    de: "Das APX Add-On konfigurieren",
  },
  settingsLocaleInputLabel: {
    en: "Language",
    de: "Sprache",
  },
};

export function getStrings(key: TranslationKeys, locale: Locale): string {
  return STRINGS[key]?.[locale] || `[Missing translation for key: ${key}]`;
}
