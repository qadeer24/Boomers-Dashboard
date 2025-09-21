import { Fragment, useState } from 'react';
import { PageNavbar } from '@/pages/account';
import {
    Toolbar,
    ToolbarActions,
    ToolbarDescription,
    ToolbarHeading,
    ToolbarPageTitle,
} from '@/partials/common/toolbar';
import { useSettings } from '@/providers/settings-provider';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { AccountHistoryContent } from '.';
import { CalendarDays } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { useEffect, useMemo } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { Download, Settings2, MessageCircleMore, Table, } from 'lucide-react';
import {
    DataGridTable,
    DataGridTableRowSelect,
    DataGridTableRowSelectAll,
} from '@/components/ui/data-grid-table';
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Filter,
    Info,
    Search,
    SquarePen,
    Trash2,
    X,
} from 'lucide-react';
import { DataGrid, useDataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridColumnVisibility } from '@/components/ui/data-grid-column-visibility';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { NavbarMenu } from '@/partials/navbar/navbar-menu';
import { MENU_SIDEBAR } from '@/config/menu.config';
import { Link } from 'lucide-react';
import {
    Card,
    CardFooter,
    CardHeader,
    CardTable,
    CardHeading,
    CardTitle,
    CardToolbar,
} from '@/components/ui/card';

export function LeadsOtherInfoPage() {
    const { settings } = useSettings();

    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState({
        from: new Date(2025, 0, 20),
        to: addDays(new Date(2025, 0, 20), 20),
    });
    const [tempDateRange, setTempDateRange] = useState(date);

    const handleDateRangeApply = () => {
        setDate(tempDateRange); // Save the temporary date range to the main state
        setIsOpen(false); // Close the popover
    };

    const handleDateRangeReset = () => {
        setTempDateRange(undefined); // Reset the temporary date range
    };

    const defaultStartDate = new Date(); // Default start date fallback
    const accountMenuConfig = MENU_SIDEBAR?.['2']?.children;


    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [data, setData] = useState([]); // <- stores all agent data
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({});
    const [selectedCounty, setSelectedCounty] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");

    const formatBoolean = (value) => {
        if (value === 1) return "Yes";
        if (value === 0) return "No";
        return "N/A"; // fallback if null/undefined or other value
    };


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


        getLeads()
            .then((data) => {
                const agentsArray = data.data;
                const formattedData = agentsArray.map((agent, index) => ({
                    id: agent.id, // Unique ID
                    name: agent.name || 'N/A',
                    phone: agent.phone || 'N/A',
                    npn: agent.npm || 'N/A',
                    activity: agent.updatedAt ? formatDistanceToNow(new Date(agent.updatedAt), { addSuffix: true }) : 'N/A',
                    doctors: agent.doctors || 'N/A',

                    chronicHealth: formatBoolean(agent.chronicHealth),
                    dentalVisionHearing: formatBoolean(agent.dentalVisionHearing),
                    do_takePrescriptions: formatBoolean(agent.do_takePrescriptions),
                    gymTransport: formatBoolean(agent.gymTransport),
                    hasMedicare: formatBoolean(agent.hasMedicare),
                    lowerPremium: formatBoolean(agent.lowerPremium),
                    medicareParts: formatBoolean(agent.medicareParts),
                    otherCoverage: formatBoolean(agent.otherCoverage),
                }));
                console.log(";;Leads:::", formattedData);
                setData(formattedData);
                console.log("Agents data fetched successfully:", data);
            })
            .catch((err) => console.error("Error fetching users:", err));

    };


    return (
        <Fragment>
            <Container>
                <ToolbarHeading>
                    <div className="flex justify-between">
                        <ToolbarPageTitle />
                        <ToolbarActions>
                        </ToolbarActions>
                    </div>
                    <ToolbarDescription>

                    </ToolbarDescription>

                </ToolbarHeading>


            </Container>
            <Container className="flex justify-between">
                {/* <PageNavbar /> */}
                {/* {settings?.layout === 'demo1' && ( */}
                <Toolbar>
                    <ToolbarActions>
                        <Button variant="outline" style={{ marginBottom: '1.3rem' }}>Import CSV</Button>
                        <Button variant="primary" style={{ marginBottom: '1.3rem' }}>Add Agents</Button>
                        <Button variant="primary" style={{ marginBottom: '1.3rem' }}>Add Policies</Button>
                    </ToolbarActions>
                </Toolbar>
                {/* )} */}
            </Container>
            <Container>
                {/* <AccountHistoryContent /> */}
                <Card>
                    <CardHeader className="py-4">
                        <h4>Edit Lead Details (#2388604)</h4>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            <CardHeading>
                                <div className="relative">
                                    <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
                                    <Input
                                        placeholder="Search Agents"
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="ps-9 w-40"
                                    />
                                </div>
                            </CardHeading>
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
                        </div>
                    </CardHeader>
                    <Container>
                        <div className='my-12'>
                            <div className="max-w-6xl mx-auto bg-white p-6  rounded-xl">
                                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* First Name */}
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Title */}
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-700 mb-1">Title</label>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your number"
                                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="flex flex-col md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            placeholder="example@gmail.com"
                                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Address */}
                                    <div className="flex flex-col md:col-span-2">
                                        <label className="text-sm font-medium text-gray-700 mb-1">Address Type</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your address"
                                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Select City */}
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-700 mb-1">Select City</label>
                                        <select className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option>Enter your city</option>
                                        </select>
                                    </div>

                                    {/* Select State */}
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-700 mb-1">Select State</label>
                                        <select className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option>Enter your state</option>
                                        </select>
                                    </div>

                                    {/* Country */}
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-700 mb-1">Country</label>
                                        <select className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option>Enter your country</option>
                                        </select>
                                    </div>

                                    {/* Zip Code */}
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                                        <input
                                            type="text"
                                            placeholder="City zip code"
                                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Container>
                </Card>


            </Container>
        </Fragment>
    );
}
