import { type Table } from "@tanstack/react-table";

import { Column } from "@/components/table/columns";

import { createGlobalState } from ".";

type TableState = {
  table: Table<Column> | null;
};

export const useTableState = createGlobalState<TableState>("table", {
  table: null,
});
