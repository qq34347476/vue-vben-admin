export interface OptionsItem {
  value: string;
  label: string;
  [key: string]: any;
  [key: number]: any;
}

export interface LabelInValueItem {
  key: string;
  label: string;
}

export interface RemoteSelectSetting {
  listField?: string;
  keyField?: string;
  valueField: string;
  labelField: string;
}
