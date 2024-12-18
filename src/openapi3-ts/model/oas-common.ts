import { ISpecificationExtension } from "./specification-extension";
export interface ServerObject extends ISpecificationExtension {
  url: string;
  description?: string;
  variables?: {
    [v: string]: ServerVariableObject;
  };
}
export interface ServerVariableObject extends ISpecificationExtension {
  enum?: string[] | boolean[] | number[];
  default: string | boolean | number;
  description?: string;
}
