export interface UserTableRowType {
  uuid?: string;
  name?: string;
  phone?: string;
  email?: string;
  group?: string[];
}

export interface UserType {
  count?: number;
  next?: null | any;
  previous?: null | any;
  results?: UserTableRowType[];
}
