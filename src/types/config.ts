export interface EntityField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[]; // Only used if type is 'select'
  placeholder?: string;
}

export interface AppConfig {
  appName: string;
  entity: {
    name: string;
    route: string;
  };
  ui?: {
    showImage?: boolean;
    showPrice?: boolean;
  };
  fields: EntityField[];
  features: {
    auth: boolean;
    admin: boolean;
  };
}
