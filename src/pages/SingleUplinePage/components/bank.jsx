import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAgentById } from '@/utils/agentService';
const Bank = () => {

  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [errors, setErrors] = useState({});
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
        const bankInfo = agentsArray.bankInfo || {};
        setData(bankInfo || []);
      })
      .catch((err) => console.error("Error fetching users:", err));

  };

  const tables = [
    { status: 'Account Holder:', info: data.account_holder || 'N/A' },
    { status: 'Bank Name:', info: data.bank_name || 'N/A' },
    { status: 'Account Number:', info: data.account_number || 'N/A' },
    { status: 'Routing Number:', info: data.routing_number || 'N/A' },
    { status: 'Account Type:', info: data.account_type || 'N/A' },
    { status: 'Address:', info: data.address || 'N/A' },
  ];

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
        <CardTitle>Bank Info</CardTitle>
      </CardHeader>
      <CardContent>
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

export { Bank };
