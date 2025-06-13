 
 export interface Lookup {
  isActive: boolean;
  createdBy: string;
  updateBy: string | null;
  createdAt: string;
  updatedAt: string | null;
  remark: string | null;
  id: string;
  type: string;
  name: string;
  description: string;
  value: string;
  index: number;
  isDefault: boolean;
}

export interface Company {
  isActive: boolean;
  createdBy: string;
  updateBy: string;
  createdAt: string;
  updatedAt: string;
  remark: string;
  id: string;
  type: string;
  name: string;
  displayName: string;
  tin: string;
  industry: string;
  contact1: string;
  contact2: string;
  location: string;
  template: string;
  logoPath: string;
  menuUrl: string;
  licenseKey: string;
  note: string;
  lookup: Lookup[];
}

export interface Category {
  isActive: boolean;
  createdBy: string;
  updateBy: string | null;
  createdAt: string;
  updatedAt: string | null;
  remark: string | null;
  id: string;
  type: string;
  name: string;
  description: string;
  value: string;
  index: number;
  isDefault: boolean;
  parentId: string;
  imagePath: string;
  videoPath: string
}
export interface Product{
id: string;
name: string
description: string
detail: string,
type: string;
imagePath: string,
price: number,
hasDiscount: boolean,
createdBy:string,
createdAt:Date,
updatedBy:string
categoryId:string,
lookupId:string
companyId:string
}
 
export interface user
{
  id:string
  fullName:string
  userName:string
  password:string
  email:string
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}