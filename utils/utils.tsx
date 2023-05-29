export interface Column {
  name: string;
  header: string;
}

export interface TableConfig {
  dataSource: any[];
  columns: Column[];
}
