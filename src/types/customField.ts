export type CustomFieldType = 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'url';

export interface CustomField {
  id: string;
  name: string;
  type: CustomFieldType;
  options?: string[]; // For select type
  value?: string | number | boolean;
}

export interface CustomFieldDefinition {
  id: string;
  name: string;
  type: CustomFieldType;
  options?: string[];
}

