import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { TradePlan } from "@/types/trade";
import TradeTableCellViewer from "@/components/trade-table/trade-table-cell-viewer";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<TradePlan>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => {
      return <TradeTableCellViewer item={row.original} />;
    },
    enableHiding: false,
  },
  {
    accessorKey: "side",
    header: "Side",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.side}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "entry",
    header: "Entry Price",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.entry}
      </Badge>
    ),
  },
  {
    accessorKey: "target",
    header: "Target Price",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.target}
      </Badge>
    ),
  },
  {
    accessorKey: "stopLoss",
    header: "Stop Loss Price",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.stopLoss}
      </Badge>
    ),
  },
  {
    accessorKey: "result",
    header: "Result",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.result ?? "N/A"}
      </Badge>
    ),
  },
];
