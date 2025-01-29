export interface GroupTableRow {
  id?: number;
  name?: string;
}

export interface GroupType {
  count?: number;
  next?: null | any;
  previous?: null | any;
  results: GroupTableRow[];
}

export interface SendGroupNotificationType {
  title?: string;
  body?: string;
  group?: string;
}
