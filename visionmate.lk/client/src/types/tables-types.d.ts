
export interface DataTableProps {
    filterOption: boolean;
    filterOnchange: boolean;
    rowSelection: boolean;
    tableData: any[]; // replace `any` with interface for table data
    columns: any[]; // replace `any` with interface for table columns
}
