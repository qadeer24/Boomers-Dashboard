import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAgentById } from '@/utils/agentService';

const About = () => {

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
        setData(agentsArray || []);
      })
      .catch((err) => console.error("Error fetching users:", err));

  };
  // console.log("Data fetched:", data);
  
  const tables = [
    { status: 'Age:', info: data.age || 'N/A' },
    { status: 'City:', info: data.city || 'N/A' },
    { status: 'State:', info: data.state || 'N/A' },
    { status: 'Country:', info: data.country || 'N/A' },
    { status: 'Postcode:', info: data.postcode || 'N/A' },
    { status: 'Phone:', info: data.phone || 'N/A' },
    { status: 'Email:', info: data.email || 'N/A'},
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
        <CardTitle>About</CardTitle>
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

export { About };
