import { useEffect, useMemo, useState } from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Download, Settings2, MessageCircleMore, Table, } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTable,
  CardHeading,
  CardTitle,
  CardToolbar,
} from '@/components/ui/card';
import {
  Filter,
  Info,
  Search,
  SquarePen,
  Trash2,
  X,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DataGrid, useDataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridColumnVisibility } from '@/components/ui/data-grid-column-visibility';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DropdownMenu2 } from '@/partials/dropdown-menu/dropdown-menu-2';
import { EllipsisVertical } from 'lucide-react';
import {
  DataGridTable,
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from '@/components/ui/data-grid-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ChatSheet } from '@/partials/topbar/chat-sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  // Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const data = [
  {
    id: '1', // Unique ID as a string
    invoice: 'John Doe',
    label: 'Active',
    status: 'success',
    date: 'HealthNet',
    dueDate: '24 Aug, 2024', // Changed to date
    amount: 'MAPD',
    activity: '24 Aug, 2024'
  },
  {
    id: '2',
    invoice: 'Invoice-2024-rq857m',
    label: 'Active',
    status: 'success',
    date: '17 Jun, 2024',
    dueDate: '6 Aug, 2024',
    amount: '$29.99',
    activity: '2 days ago'
  },
  {
    id: '3',
    invoice: 'John Doe',
    label: 'Active',
    status: 'success',
    date: 'Anderson',
    dueDate: '6 Aug, 2024',
    amount: '19876543',
    activity: '2 days ago'
  },
  {
    id: '4',
    invoice: 'Invoice-2024-hg234x',
    label: 'Inactive',
    status: 'destructive',
    date: '21 Apr, 2024',
    dueDate: '6 Aug, 2024',
    amount: '$6.59',
    activity: '2 days ago'
  },
  {
    id: '5',
    invoice: 'Invoice-2024-lp098y',
    label: 'Active',
    status: 'success',
    date: '14 Mar, 2024',
    dueDate: '6 Aug, 2024',
    amount: '$79.00',
    activity: '2 days ago'
  },
  {
    id: '6',
    invoice: 'Invoice-2024-q196l',
    label: 'Active',
    status: 'success',
    date: '08 Jan, 2024',
    dueDate: '6 Aug, 2024',
    amount: '$257.00',
    activity: '2 days ago'
  },
  {
    id: '7',
    invoice: 'Invoice-2024-m113s',
    label: 'Upcoming',
    status: 'warning',
    date: '07 Nov, 2024',
    dueDate: 'Design Dept', // Changed to date
    amount: '$67.00',
    activity: '2 days ago'
  },
  {
    id: '8',
    invoice: 'Invoice-2024-u859c',
    label: 'Inactive',
    status: 'destructive',
    date: '16 May, 2024',
    dueDate: '07 Nov, 2024',
    amount: '$494.00',
    activity: '2 days ago'
  },
  {
    id: '9',
    invoice: 'Invoice-2024-m803g',
    label: 'Active',
    status: 'success',
    date: '16 Mar, 2024',
    dueDate: '16 Mar, 2024',
    amount: '$142.00',
    activity: '2 days ago'
  },
  {
    id: '10',
    invoice: 'John Doe',
    label: 'Active',
    status: 'success',
    date: '25 Mar, 2024',
    dueDate: '25 Mar, 2024',
    amount: '$35.00',
    activity: '2 days ago'
  },
  {
    id: '11',
    invoice: 'Invoice-2024-b907a',
    label: 'Active',
    status: 'success',
    date: '12 Feb, 2024',
    dueDate: '12 Feb, 2024',
    amount: '$59.99',
    activity: '2 days ago'
  },
  {
    id: '12',
    invoice: 'Invoice-2024-n567k',
    label: 'Upcoming',
    status: 'warning',
    date: '01 Mar, 2024',
    dueDate: 'Marketing Dept', // Changed to date
    amount: '$150.00',
    activity: '2 days ago'
  },
  {
    id: '13',
    invoice: 'Invoice-2024-k453j',
    label: 'Inactive',
    status: 'destructive',
    date: '03 Apr, 2024',
    dueDate: '03 Apr, 2024',
    amount: '$89.50',
    activity: '2 days ago'
  },
  {
    id: '14',
    invoice: 'Invoice-2024-d981q',
    label: 'Active',
    status: 'success',
    date: '20 Feb, 2024',
    dueDate: '20 Feb, 2024',
    amount: '$200.00',
    activity: '2 days ago'
  },
  {
    id: '15',
    invoice: 'Invoice-2024-p846y',
    label: 'Active',
    status: 'success',
    date: '15 May, 2024',
    dueDate: '15 May, 2024',
    amount: '$75.00',
    activity: '2 days ago'
  },
  {
    id: '16',
    invoice: 'Invoice-2024-z190x',
    label: 'Upcoming',
    status: 'warning',
    date: '10 Jun, 2024',
    dueDate: 'Finance Dept', // Changed to date
    amount: '$130.00',
    activity: '2 days ago'
  },
  {
    id: '17',
    invoice: 'Invoice-2024-l892v',
    label: 'Active',
    status: 'success',
    date: '25 Jan, 2024',
    dueDate: '25 Jan, 2024',
    amount: '$100.00',
    activity: '2 days ago'
  },
  {
    id: '18',
    invoice: 'Invoice-2024-t675c',
    label: 'Inactive',
    status: 'destructive',
    date: '18 Jul, 2024',
    dueDate: '18 Jul, 2024',
    amount: '$45.00',
    activity: '2 days ago'
  },
  {
    id: '19',
    invoice: 'Invoice-2024-w432r',
    label: 'Active',
    status: 'success',
    date: '09 Aug, 2024',
    dueDate: '09 Aug, 2024',
    amount: '$60.00',
    activity: '2 days ago'
  },
  {
    id: '20',
    invoice: 'Invoice-2024-e765n',
    label: 'Upcoming',
    status: 'warning',
    date: '12 Oct, 2024',
    dueDate: 'IT Dept', // Changed to date
    amount: '$500.00',
    activity: '2 days ago'
  },
  // Add the rest of the items in the same pattern...
];

const AuthPassword = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [rowSelection] = useState({});
  const [sorting, setSorting] = useState([{ id: 'date', desc: true }]);

  const ColumnInputFilter = ({ column }) => {
    return (
      <Input
        placeholder="Filter..."
        value={column.getFilterValue() ?? ''}
        onChange={(event) => column.setFilterValue(event.target.value)}
        size="sm"
        className="max-w-40"
      />
    );
  };

  const columns = useMemo(
    () => [
      {
        id: 'invoice',
        accessorFn: (row) => row.invoice,
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Holder Name"
            filter={<ColumnInputFilter column={column} />}
            column={column}
          />
        ),

        cell: (info) => {
          return info.row.original.invoice;
        },
        enableSorting: true,
        size: 170,
        meta: {
          cellClassName: 'px-7',
        },
      },
      {
        id: 'Last Name',
        accessorFn: (row) => row.date,
        header: ({ column }) => (
          <DataGridColumnHeader title="Carrier" column={column} />
        ),

        cell: (info) => {
          return info.row.original.date;
        },
        enableSorting: true,
        size: 120,
        meta: {
          cellClassName: 'px-7',
        },
      },
      {
        id: 'dueDate',
        accessorFn: (row) => row.dueDate,
        header: ({ column }) => (
          <DataGridColumnHeader title="Effective Date" column={column} />
        ),

        cell: (info) => {
          return info.row.original.dueDate;
        },
        enableSorting: true,
        size: 190,
        meta: {
          cellClassName: 'px-7',
        },
      },
      {
        id: 'amount',
        accessorFn: (row) => row.amount,
        header: ({ column }) => (
          <DataGridColumnHeader title="Coverage Type" column={column} />
        ),

        cell: (info) => {
          return info.row.original.amount;
        },
        enableSorting: true,
        size: 180,
        meta: {
          cellClassName: 'px-7',
        },
      },
      {
        id: 'activity',
        // header: () => '',
        accessorFn: (row) => row.amount,
        enableSorting: true,
        header: ({ column }) => (
          <DataGridColumnHeader title="Submitted Date" column={column} />
        ),
        cell: (info) => {
          return info.row.original.activity;
        },
        size: 130,
        meta: {
          cellClassName: 'px-7',
        },
      },
      {
        id: 'label',
        accessorFn: (row) => row.label,
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),

        cell: (info) => {
          const variant = info.row.original.status;

          return (
            <Badge variant={variant} appearance="light">
              {info.row.original.label}
            </Badge>
          );
        },
        enableSorting: true,
        size: 90,
        meta: {
          cellClassName: 'px-7',
        },
      },
      {
        accessorKey: 'id',
        accessorFn: (row) => row.id,
        header: (''),
        cell: () => {
          return (
            // <TableRow>
            // <TableCell className="text-start">
            <DropdownMenu2
              trigger={
                <Button variant="ghost" mode="icon">
                  <EllipsisVertical />
                </Button>
              }
            />
            // {/* </TableCell> */}
            // </TableRow>
          );
        },
        enableSorting: false,
        enableHiding: false,
        enableResizing: false,
        size: 76,
        meta: {
          cellClassName: 'px-7',
        },
      },
    ],

    [],
  );

  const filteredData = useMemo(() => data, []);

  useEffect(() => {
    const selectedRowIds = Object.keys(rowSelection);

    if (selectedRowIds.length > 0) {
      toast(`Total ${selectedRowIds.length} are selected.`, {
        description: `Selected row IDs: ${selectedRowIds}`,
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      });
    }
  }, [rowSelection]);

  const table = useReactTable({
    columns,
    data: filteredData,
    pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
    getRowId: (row) => row.id,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const Toolbar = () => {
    const { table } = useDataGrid();

    return (
      <CardToolbar>
        <CardHeader className="py-4" id="agency">
          <CardHeading>
            <div className="relative">
              {/* <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Search Agents"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-9 w-40"
              /> */}

              {/* {searchQuery.length > 0 && (
                <Button
                  mode="icon"
                  variant="ghost"
                  className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                  onClick={() => setSearchQuery('')}
                >
                  <X />
                </Button>
              )} */}
            </div>
          </CardHeading>
        </CardHeader>
        {/* <Select defaultValue="active">
          <SelectTrigger className="w-28">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="w-32">
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="disabled">Disabled</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="Latest">
          <SelectTrigger className="w-28 mx-3">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="w-32">
            <SelectItem value="Latest">Latest</SelectItem>
            <SelectItem value="disabled">Disabled</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <DataGridColumnVisibility
          table={table}
          trigger={
            <Button variant="outline">
              <Settings2 />
              Filters
            </Button>
          }
        /> */}
      </CardToolbar>
    );
  };

  return (
    <DataGrid
      table={table} 
      recordCount={filteredData?.length || 0}
      tableLayout={{
        columnsPinnable: true,
        columnsMovable: true,
        columnsVisibility: true,
        cellBorder: true,
      }}
    >
      <h1 className='font-bold underline pb-6'>Agencies</h1>
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
          <Toolbar />
        </CardHeader>
        <CardTable>
          <ScrollArea>
            <DataGridTable />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardTable>
        <CardFooter>
          <DataGridPagination />
        </CardFooter>
      </Card>
    </DataGrid>
  );
};

export { AuthPassword };
