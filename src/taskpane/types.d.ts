export type IconProps = React.SVGProps<SVGSVGElement>;
import React from "react";

type ModalType = "default" | "success" | "warn" | "error";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  type?: ModalType;
  title?: string;
};

//
export type TranslationKeys =
  | 'menuTitle'
  | 'dataImportMenuItemLabel'
  | 'settingsMenuItemLabel'
  | 'helpMenuItemLabel'
  | 'dataTypeInputValue'
  | 'dataTypeInputPlaceholder'
  | 'dataTypeInputLabel'
  | 'costCenters'
  | 'entries'
  | 'accounts'
  | 'yearInputLabel'
  | 'yearInputPlaceholder'
  | 'clientInputLabel'
  | 'clientInputPlaceholder'
  | 'sheetNameInputLabel'
  | 'sheetNameInputPlaceholder'
  | 'sidebarTitle'
  | 'sidebarDescription'
  | 'existingImportsListTitle'
  | 'existingImportsPlaceholder'
  | 'addImportTitle'
  | 'updateAllDataButtonLabel'
  | 'cancelImportEditButtonLabel'
  | 'saveUpdatedImportButtonLabel'
  | 'saveNewImportButtonLabel'
  | 'editFormTitle'
  | 'confirmDataImportDeleteDialogText'
  | 'dialogTitle'
  | 'dialogDescription'
  | 'localeLabels'
  | 'saveDialogButton'
  | 'cancelDialogButton'
  | 'localeInputLabel'
  | 'localeInputPlaceholder'
  | 'helpSidebarContent'
  | 'someSettingsRequireReloadLabels'
  | 'settingsDialogDescription'
  | 'settingsLocaleInputLabel';

export type Locale = 'en' | 'de';
export type DataType = 'entries' | 'accounts' | 'cost-centers';
export type AddOnConfigV1 = {
  version: '1';
  locale: Locale;
  uuid: string;
  // dataFetchingConfigurations: {
  //   targetSheet: string;
  //   dataType: DataType;
  //   account: string;
  //   year: string;
  // };
  targetSheet: string;
  dataType: DataType;
  account: string;
  year: string;
};

type BaseAddOnConfigV1 = Omit<AddOnConfigV1, 'uuid' | 'version'>;

type Configurations = Record<string, AddOnConfigV1>;

type EditingConfig = BaseAddOnConfigV1 & {
  key?: string;
};
export interface Configuration {
  dataType: 'entries' | 'accounts' | 'cost-centers';
  year: string;
  account: string;
  sheetName: string;
  lang: 'de' | 'en';
}

export interface ConfigurationWithKey extends Configuration {
  key: string;
}

interface ConfigurationFormProps {
  initialConfig?: BaseAddOnConfigV1;
  onSave: (config: BaseAddOnConfigV1 | EditingConfig) => Promise<void>;
  onCancel?: () => void;
  isLoading: boolean;
  mode: 'create' | 'edit';
  strings: (key: TranslationKeys) => string;
}

type Config = Configuration & {
  version?: string;
  uuid?: string;
};

interface ConfigurationsMap {
  [key: string]: Config;
}

interface ConfigurationListProps {
  configurations: Configurations;
  onUpdate: (key: string) => Promise<boolean>;
  onEdit: (key: string) => void;
  onDelete: (key: string) => Promise<void>;
  strings: (key: TranslationKeys) => string;
}