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
// import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router';
import React from 'react';
import { getAgents } from '@/utils/agentService';
import { getprofileStatus } from '@/utils/agentService';

import { formatDistanceToNow, format } from "date-fns";
import { get } from 'react-hook-form';

const Invoicing = () => {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]); // <- stores all agent data
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");


  useEffect(() => {
    handleAutoFetch();
  }, []);

  // const handleAutoFetch = async () => {
  //   console.log("Fetching agents data...");
  //   setLoading(true);
  //   setMessage("");
  //   setErrors({});

  //   try {
  //     const apiUrl = import.meta.env.VITE_API_URL;

  //     const response = await fetch(`${apiUrl}/admin/agents/list`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     });

  //     const resData = await response.json(); // renamed from 'data'

  //     if (!response.ok) {
  //       if (resData.errors) {
  //         setErrors(resData.errors);
  //         setMessage(resData.message || "Validation failed");
  //         console.log("Validation failed");
  //       } else {
  //         setMessage(resData.message || "Something went wrong");
  //         console.log("Something went wrong");
  //       }
  //       return;
  //     }

  //     if (resData.data.agents.length > 0) {
  //       const agentsArray = resData.data.agents;

  //       const formattedData = agentsArray.map((agent, index) => ({
  //         id: agent.id, // Unique ID
  //         firstName: agent.firstName || 'N/A',
  //         lastName: agent.lastName || 'N/A',
  //         email: agent.email || 'N/A',
  //         npn: agent.npn || 'N/A',
  //         activity: agent.updatedAt ? formatDistanceToNow(new Date(agent.updatedAt), { addSuffix: true }) : 'N/A',
  //         status: agent.status,

  //       }));

  //       setData(formattedData);
  //     } else {
  //       setMessage("No agents found.");
  //       setData([]);
  //     }

  //     setMessage("Data loaded successfully!");
  //   } catch (err) {
  //     setMessage("An unexpected error occurred. Please try again.");
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleAutoFetch = async () => {
    console.log("Fetching agents data...");
    setLoading(true);
    setMessage("");
    setErrors({});

    // getprofileStatus()
    //   .then((status) => {
    //     console.log("Profile status data fetched successfully:", status);
    //   });

    getAgents()
      .then((data) => {
        const agentsArray = data.data.agents;
        console.log("agentsArray", agentsArray);

        const formattedData = agentsArray.map((agent, index) => ({
          id: agent.id, // Unique ID
          firstName: agent.firstName || 'N/A',
          lastName: agent.lastName || 'N/A',
          email: agent.email || 'N/A',
          npn: agent.npn || 'N/A',
          time: agent.createdAt ? format(agent.createdAt, "h:mma").toLowerCase() : "N/A",
          relativeTime: agent.createdAt ? formatDistanceToNow(agent.createdAt, { addSuffix: true }) : "N/A",

          status: agent.status,
          isEmailVerified: agent.isEmailVerified,
        }));

        setData(formattedData);
        const id = formattedData.id;
        console.log("Agents data fetched successfully:", formattedData);
      })
      .catch((err) => console.error("Error fetching users:", err));


  };


  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [rowSelection] = useState({});
  const [sorting, setSorting] = useState([{ id: 'date', desc: true }]);
  console.log("data", data);
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
        id: 'firstName',
        accessorFn: (row) => row.firstName,
        header: ({ column }) => (
          <DataGridColumnHeader
            title="First Name"
            filter={<ColumnInputFilter column={column} />}
            column={column}
          />
        ),

        cell: (info) => {
          return info.row.original.firstName;
        },
        enableSorting: true,
        size: 120,
        meta: {
          cellClassName: 'px-7',
        },
      },

      {
        id: 'lastName',
        accessorFn: (row) => row.lastName,
        header: ({ column }) => (
          <DataGridColumnHeader title="Last Name" column={column} />
        ),

        cell: (info) => {
          return info.row.original.lastName;
        },
        enableSorting: true,
        size: 120,
        meta: {
          cellClassName: 'px-7',
        },
      },
      {
        id: 'email',
        accessorFn: (row) => row.email,
        header: ({ column }) => (
          <DataGridColumnHeader title="Email" column={column} />
        ),

        cell: (info) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>{info.row.original.email}</span>
            {info.row.original.isEmailVerified ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                className="text-primary"
              >
                <path
                  d="M14.5425 6.89749L13.5 5.83999C13.4273 5.76877 13.3699 5.6835 13.3312 5.58937C13.2925 5.49525 13.2734 5.39424 13.275 5.29249V3.79249C13.274 3.58699 13.2324 3.38371 13.1527 3.19432C13.0729 3.00494 12.9565 2.83318 12.8101 2.68892C12.6638 2.54466 12.4904 2.43073 12.2998 2.35369C12.1093 2.27665 11.9055 2.23801 11.7 2.23999H10.2C10.0982 2.24159 9.99722 2.22247 9.9031 2.18378C9.80898 2.1451 9.72371 2.08767 9.65249 2.01499L8.60249 0.957487C8.30998 0.665289 7.91344 0.50116 7.49999 0.50116C7.08654 0.50116 6.68999 0.665289 6.39749 0.957487L5.33999 1.99999C5.26876 2.07267 5.1835 2.1301 5.08937 2.16879C4.99525 2.20747 4.89424 2.22659 4.79249 2.22499H3.29249C3.08699 2.22597 2.88371 2.26754 2.69432 2.34731C2.50494 2.42709 2.33318 2.54349 2.18892 2.68985C2.04466 2.8362 1.93073 3.00961 1.85369 3.20013C1.77665 3.39064 1.73801 3.5945 1.73999 3.79999V5.29999C1.74159 5.40174 1.72247 5.50275 1.68378 5.59687C1.6451 5.691 1.58767 5.77627 1.51499 5.84749L0.457487 6.89749C0.165289 7.19 0.00115967 7.58654 0.00115967 7.99999C0.00115967 8.41344 0.165289 8.80998 0.457487 9.10249L1.49999 10.16C1.57267 10.2312 1.6301 10.3165 1.66878 10.4106C1.70747 10.5047 1.72659 10.6057 1.72499 10.7075V12.2075C1.72597 12.413 1.76754 12.6163 1.84731 12.8056C1.92709 12.995 2.04349 13.1668 2.18985 13.3111C2.3362 13.4553 2.50961 13.5692 2.70013 13.6463C2.89064 13.7233 3.0945 13.762 3.29999 13.76H4.79999C4.90174 13.7584 5.00275 13.7775 5.09687 13.8162C5.191 13.8549 5.27627 13.9123 5.34749 13.985L6.40499 15.0425C6.69749 15.3347 7.09404 15.4988 7.50749 15.4988C7.92094 15.4988 8.31748 15.3347 8.60999 15.0425L9.65999 14C9.73121 13.9273 9.81647 13.8699 9.9106 13.8312C10.0047 13.7925 10.1057 13.7734 10.2075 13.775H11.7075C12.1212 13.775 12.518 13.6106 12.8106 13.3181C13.1031 13.0255 13.2675 12.6287 13.2675 12.215V10.715C13.2659 10.6132 13.285 10.5122 13.3237 10.4181C13.3624 10.324 13.4198 10.2387 13.4925 10.1675L14.55 9.10999C14.6953 8.96452 14.8104 8.79176 14.8887 8.60164C14.9671 8.41152 15.007 8.20779 15.0063 8.00218C15.0056 7.79656 14.9643 7.59311 14.8847 7.40353C14.8051 7.21394 14.6888 7.04197 14.5425 6.89749ZM10.635 6.64999L6.95249 10.25C6.90055 10.3026 6.83864 10.3443 6.77038 10.3726C6.70212 10.4009 6.62889 10.4153 6.55499 10.415C6.48062 10.4139 6.40719 10.3982 6.33896 10.3685C6.27073 10.3389 6.20905 10.2961 6.15749 10.2425L4.37999 8.44249C4.32532 8.39044 4.28169 8.32793 4.25169 8.25867C4.22169 8.18941 4.20593 8.11482 4.20536 8.03934C4.20479 7.96387 4.21941 7.88905 4.24836 7.81934C4.27731 7.74964 4.31999 7.68647 4.37387 7.63361C4.42774 7.58074 4.4917 7.53926 4.56194 7.51163C4.63218 7.484 4.70726 7.47079 4.78271 7.47278C4.85816 7.47478 4.93244 7.49194 5.00112 7.52324C5.0698 7.55454 5.13148 7.59935 5.18249 7.65499L6.56249 9.05749L9.84749 5.84749C9.95296 5.74215 10.0959 5.68298 10.245 5.68298C10.394 5.68298 10.537 5.74215 10.6425 5.84749C10.6953 5.90034 10.737 5.96318 10.7653 6.03234C10.7935 6.1015 10.8077 6.1756 10.807 6.25031C10.8063 6.32502 10.7908 6.39884 10.7612 6.46746C10.7317 6.53608 10.6888 6.59813 10.635 6.64999Z"
                  fill="currentColor"
                />
              </svg>
            )
              :
              null
            }


          </div>
        ),
        enableSorting: true,
        size: 240,
        meta: {
          cellClassName: 'px-7',
        },
      },
      {
        id: 'npn',
        accessorFn: (row) => row.npn,
        header: ({ column }) => (
          <DataGridColumnHeader title="NPN" column={column} />
        ),

        cell: (info) => {
          return info.row.original.npn;
        },
        enableSorting: true,
        size: 80,
        meta: {
          cellClassName: 'px-7',
        },
      },
      {
        id: 'actions',
        // header: () => '',
        enableSorting: false,
        header: ({ column }) => (
          <DataGridColumnHeader title="Chat" column={column} />
        ),
        cell: () => {
          return (
            <ChatSheet
              trigger={
                <Button
                  onClick={(e) => e.stopPropagation()}
                  variant="ghost"
                  mode="icon"
                  shape="circle"
                  className="size-9 hover:bg-primary/10 hover:[&_svg]:text-primary"
                >
                  <MessageCircleMore className="size-4.5!" />
                </Button>
              }
            />
          );
        },
        size: 70,
        meta: {
          cellClassName: 'px-6',
        },
      },
      {
        id: 'activity',
        // header: () => '',
        accessorFn: (row) => row.amount,
        enableSorting: true,
        header: ({ column }) => (
          <DataGridColumnHeader title="Created At" column={column} />
        ),
        cell: (info) => {
          return (
            <div style={{ fontSize: '12px', display: 'grid' }}>
              <div>{info.row.original.time}</div>
              <div style={{ color: '#6b7280' }}>{info.row.original.relativeTime}</div>
            </div>
          );
        },
        size: 110,
        meta: {
          cellClassName: 'px-7',
        },
      },
      {
        id: 'status',
        accessorFn: (row) => row.status,
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),

        cell: (info) => {
          const variant = info.row.original.status === 'active' ? 'success' : info.row.original.status === 'inactive' ? 'destructive' : 'warning';

          return (
            <Badge variant={variant} appearance="light">
              {info.row.original.status}
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
        cell: (info) => {
          return (
            // <TableRow>
            // <TableCell className="text-start">
            <DropdownMenu2
              rowID={info.row.id}
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

  const filteredData = useMemo(() => data, [data]);

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
        <CardHeader className="py-4">
          <CardHeading>
            <div className="relative">
              <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Search Agents"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-9 w-40"
              />

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
        <Select defaultValue="active">
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
        />
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
      <Card>
        <CardHeader>
          <CardTitle>Showing 10 of 49,053 users</CardTitle>
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

export { Invoicing };
// import DataTable from 'react-data-table-component';
// import { formatDistanceToNow } from 'date-fns';
// import styled from 'styled-components';
// import { faker } from '@faker-js/faker';
// import { getAgents } from '@/utils/agentService';




// const TextField = styled.input`
// 	height: 32px;
// 	width: 200px;
// 	border-radius: 3px;
// 	border-top-left-radius: 5px;
// 	border-bottom-left-radius: 5px;
// 	border-top-right-radius: 0;
// 	border-bottom-right-radius: 0;
// 	border: 1px solid #e5e5e5;
// 	padding: 0 32px 0 16px;

// 	&:hover {
// 		cursor: pointer;
// 	}
// `;

// const ClearButton = styled(Button)`
// 	border-top-left-radius: 0;
// 	border-bottom-left-radius: 0;
// 	border-top-right-radius: 5px;
// 	border-bottom-right-radius: 5px;
// 	height: 34px;
// 	width: 32px;
// 	text-align: center;
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// `;
// const customStyles = {
//   rows: {
//     style: {
//       cursor: 'pointer',
//       '&:hover': {
//         backgroundColor: '#f5f5f5',
//       },
//     },
//   },
// };
// const FilterComponent = ({ filterText, onFilter, onClear }) => (
//   <>
//     <TextField
//       id="search"
//       type="text"
//       placeholder="Search Agents"
//       aria-label="Search Input"
//       value={filterText}
//       onChange={onFilter}
//     />
//     <ClearButton type="button" onClick={onClear}>
//       X
//     </ClearButton>
//   </>
// );


// const columns = [
//   {
//     name: 'ID',
//     selector: row => row.id,
//     sortable: true,
//   },
//   {
//     name: 'First Name',
//     selector: row => row.firstName,
//     sortable: true,
//     width: 80,
//     meta: {
//       cellClassName: 'px-7',
//     },
//   },
//   {
//     name: 'Last Name',
//     selector: row => row.lastName,
//     sortable: true,
//   },
//   {
//     name: 'Email',
//     // selector: row => row.email,
//     sortable: true,
//     width: '20rem',
//     cell: row => (
//       <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//         <span>{row.email}</span>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="15"
//           height="16"
//           viewBox="0 0 15 16"
//           fill="none"
//           className="text-primary"
//         >
//           <path
//             d="M14.5425 6.89749L13.5 5.83999C13.4273 5.76877 13.3699 5.6835 13.3312 5.58937C13.2925 5.49525 13.2734 5.39424 13.275 5.29249V3.79249C13.274 3.58699 13.2324 3.38371 13.1527 3.19432C13.0729 3.00494 12.9565 2.83318 12.8101 2.68892C12.6638 2.54466 12.4904 2.43073 12.2998 2.35369C12.1093 2.27665 11.9055 2.23801 11.7 2.23999H10.2C10.0982 2.24159 9.99722 2.22247 9.9031 2.18378C9.80898 2.1451 9.72371 2.08767 9.65249 2.01499L8.60249 0.957487C8.30998 0.665289 7.91344 0.50116 7.49999 0.50116C7.08654 0.50116 6.68999 0.665289 6.39749 0.957487L5.33999 1.99999C5.26876 2.07267 5.1835 2.1301 5.08937 2.16879C4.99525 2.20747 4.89424 2.22659 4.79249 2.22499H3.29249C3.08699 2.22597 2.88371 2.26754 2.69432 2.34731C2.50494 2.42709 2.33318 2.54349 2.18892 2.68985C2.04466 2.8362 1.93073 3.00961 1.85369 3.20013C1.77665 3.39064 1.73801 3.5945 1.73999 3.79999V5.29999C1.74159 5.40174 1.72247 5.50275 1.68378 5.59687C1.6451 5.691 1.58767 5.77627 1.51499 5.84749L0.457487 6.89749C0.165289 7.19 0.00115967 7.58654 0.00115967 7.99999C0.00115967 8.41344 0.165289 8.80998 0.457487 9.10249L1.49999 10.16C1.57267 10.2312 1.6301 10.3165 1.66878 10.4106C1.70747 10.5047 1.72659 10.6057 1.72499 10.7075V12.2075C1.72597 12.413 1.76754 12.6163 1.84731 12.8056C1.92709 12.995 2.04349 13.1668 2.18985 13.3111C2.3362 13.4553 2.50961 13.5692 2.70013 13.6463C2.89064 13.7233 3.0945 13.762 3.29999 13.76H4.79999C4.90174 13.7584 5.00275 13.7775 5.09687 13.8162C5.191 13.8549 5.27627 13.9123 5.34749 13.985L6.40499 15.0425C6.69749 15.3347 7.09404 15.4988 7.50749 15.4988C7.92094 15.4988 8.31748 15.3347 8.60999 15.0425L9.65999 14C9.73121 13.9273 9.81647 13.8699 9.9106 13.8312C10.0047 13.7925 10.1057 13.7734 10.2075 13.775H11.7075C12.1212 13.775 12.518 13.6106 12.8106 13.3181C13.1031 13.0255 13.2675 12.6287 13.2675 12.215V10.715C13.2659 10.6132 13.285 10.5122 13.3237 10.4181C13.3624 10.324 13.4198 10.2387 13.4925 10.1675L14.55 9.10999C14.6953 8.96452 14.8104 8.79176 14.8887 8.60164C14.9671 8.41152 15.007 8.20779 15.0063 8.00218C15.0056 7.79656 14.9643 7.59311 14.8847 7.40353C14.8051 7.21394 14.6888 7.04197 14.5425 6.89749ZM10.635 6.64999L6.95249 10.25C6.90055 10.3026 6.83864 10.3443 6.77038 10.3726C6.70212 10.4009 6.62889 10.4153 6.55499 10.415C6.48062 10.4139 6.40719 10.3982 6.33896 10.3685C6.27073 10.3389 6.20905 10.2961 6.15749 10.2425L4.37999 8.44249C4.32532 8.39044 4.28169 8.32793 4.25169 8.25867C4.22169 8.18941 4.20593 8.11482 4.20536 8.03934C4.20479 7.96387 4.21941 7.88905 4.24836 7.81934C4.27731 7.74964 4.31999 7.68647 4.37387 7.63361C4.42774 7.58074 4.4917 7.53926 4.56194 7.51163C4.63218 7.484 4.70726 7.47079 4.78271 7.47278C4.85816 7.47478 4.93244 7.49194 5.00112 7.52324C5.0698 7.55454 5.13148 7.59935 5.18249 7.65499L6.56249 9.05749L9.84749 5.84749C9.95296 5.74215 10.0959 5.68298 10.245 5.68298C10.394 5.68298 10.537 5.74215 10.6425 5.84749C10.6953 5.90034 10.737 5.96318 10.7653 6.03234C10.7935 6.1015 10.8077 6.1756 10.807 6.25031C10.8063 6.32502 10.7908 6.39884 10.7612 6.46746C10.7317 6.53608 10.6888 6.59813 10.635 6.64999Z"
//             fill="currentColor"
//           />
//         </svg>
//       </div>
//     ),
//   },
//   {
//     name: 'NPN',
//     selector: row => row.npn,
//     sortable: true,
//   },
//   {
//     name: 'Chat',
//     cell: (row) => {
//       const variant =
//         row.status === 'active'
//           ? 'success'
//           : row.status === 'inactive'
//             ? 'destructive'
//             : 'warning';

//       return (
//         <ChatSheet
//           trigger={
//             <Button
//               onClick={(e) => e.stopPropagation()}
//               variant="ghost"
//               mode="icon"
//               shape="circle"
//               className="size-9 hover:bg-primary/10 hover:[&_svg]:text-primary"
//             >
//               <MessageCircleMore className="size-4.5!" />
//             </Button>
//           }
//         />
//       );
//     },
//   },
//   {
//     name: 'Activity',
//     selector: row => row.activity,
//     sortable: true,
//   },
//   {
//     name: 'Status',
//     cell: (row) => {
//       const variant =
//         row.status === 'active'
//           ? 'success'
//           : row.status === 'inactive'
//             ? 'destructive'
//             : 'warning';

//       return (
//         <Badge variant={variant}>
//           {row.status}
//         </Badge>
//       );
//     },
//     ignoreRowClick: true,
//     allowOverflow: true,
//     button: true,
//   },
//   {

//     accessorKey: 'id',
//     accessorFn: (row) => row.id,
//     header: (''),
//     cell: (row) => {
//       return (
//         <TableRow>
//           <TableCell className="text-start">
//             <DropdownMenu2
//               rowID={row.id}
//               trigger={
//                 <Button variant="ghost" mode="icon">
//                   <EllipsisVertical />
//                 </Button>
//               }
//             />
//           </TableCell>
//         </TableRow>
//       );
//     },
//     enableSorting: false,
//     enableHiding: false,
//     enableResizing: false,
//     size: 76,
//     meta: {
//       cellClassName: 'px-7',
//     },
//   }
// ];


// function Invoicing() {

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [data, setData] = useState([]); // <- stores all agent data
//   const [errors, setErrors] = useState({});
//   const [form, setForm] = useState({});
//   const [selectedCounty, setSelectedCounty] = useState("");
//   const [selectedLanguage, setSelectedLanguage] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     handleAutoFetch();
//   }, []);

//   const handleAutoFetch = async () => {
//     console.log("Fetching agents data...");
//     setLoading(true);
//     setMessage("");
//     setErrors({});


//     getAgents()
//       .then((data) => {
//         const agentsArray = data.data.agents;

//         const formattedData = agentsArray.map((agent, index) => ({
//           id: agent.id, // Unique ID
//           firstName: agent.firstName || 'N/A',
//           lastName: agent.lastName || 'N/A',
//           email: agent.email || 'N/A',
//           npn: agent.npn || 'N/A',
//           activity: agent.updatedAt ? formatDistanceToNow(new Date(agent.updatedAt), { addSuffix: true }) : 'N/A',
//           status: agent.status,

//         }));

//         setData(formattedData);
//       })
//       .catch((err) => console.error("Error fetching users:", err));

//   };

//   const [filterText, setFilterText] = React.useState('');
//   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
//   const filteredItems = data.filter(item => {
//     const term = filterText.toLowerCase();
//     return (
//       (item.firstName && item.firstName.toLowerCase().includes(term)) ||
//       (item.lastName && item.lastName.toLowerCase().includes(term)) ||
//       (item.email && item.email.toLowerCase().includes(term)) ||
//       (item.npn && item.npn.toLowerCase().includes(term))
//     );
//   });

//   const subHeaderComponentMemo = React.useMemo(() => {
//     const handleClear = () => {
//       if (filterText) {
//         setResetPaginationToggle(!resetPaginationToggle);
//         setFilterText('');
//       }
//     };
//     return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
//   }, [filterText, resetPaginationToggle]);
//   return <DataTable columns={columns} data={filteredItems} pagination paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
//     subHeader subHeaderComponent={subHeaderComponentMemo} persistTableHead customStyles={customStyles} onRowClicked={(row) => { navigate(`/admin/agent/detail/${row.id}`) }} />;

// };
// export { Invoicing }