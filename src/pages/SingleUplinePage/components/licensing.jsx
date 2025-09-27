import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAgentById } from '@/utils/agentService';
const Licensing = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [Upline, setUpline] = useState("");
  const [EOPolicy, setEOPolicy] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [agents, setAgents] = useState({});
  useEffect(() => {
    // console.log("Hello world")
    handleAutoFetch();
  }, []);
  const handleAutoFetch = async () => {
    console.log("Fetching agents data...");
    setLoading(true);
    setMessage("");
    setErrors({});


    getAgentById(id)
      .then((response) => {
        const agentsArray = response.data.agent;
        setAgents(agentsArray)
        const licenseInfo = agentsArray.licenseInfo || {};
        setData(licenseInfo);
        
        // Use licenseInfo directly instead of waiting for React state
        if (licenseInfo.working_with_upline === 0) {
          setUpline("No");
        } else if (licenseInfo.working_with_upline === 1) {
          setUpline("Yes");
        } else {
          setUpline("N/A");
        }
        
        if (licenseInfo.active_eo_policy === 0) {
          setEOPolicy("No");
        } else if (licenseInfo.active_eo_policy === 1) {
          setEOPolicy("Yes");
        } else {
          setEOPolicy("N/A");
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
      
    };
    console.log("Agents data fetched:", data);
  const tables = [
    { status: 'National Producer Number', info: agents.npn },
    { status: 'Social Security Number', info: data.social_security_number || 'N/A' },
    { status: 'Resident License State', info: data.resident_license_state_id || 'N/A' },
    { status: 'Other States I\'m Licensed In (if applicabe)', info: data.other_licensed_states_id || 'N/A' },
    { status: 'Are you working with an immediate upline?', info: Upline || 'N/A' },
    { status: 'Do you have an active E&O policy?', info: EOPolicy || 'N/A' },
  ];

  console.log("Upline:", Upline);

  const renderTable = (table, index) => {
    return (
      <TableRow key={index} className="border-0">
        <TableCell className="text-sm text-secondary-foreground py-2">
          {table.status}
        </TableCell>
        <TableCell className="text-sm text-mono py-2">{table.info}</TableCell>
      </TableRow>
    );
  };

  return (
    <Card>
      <CardHeader className="ps-8">
        <CardTitle>Licensing Info</CardTitle>
      </CardHeader>
      <CardContent style={{ paddingBottom: '17rem' }}>
        <Table>
          <TableBody>
            {tables.map((table, index) => {
              return renderTable(table, index);
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export { Licensing };
