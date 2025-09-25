import { Fragment } from 'react';
import { PageMenu } from '@/pages/public-profile';
import { UserHero } from '@/partials/common/user-hero';
import { DropdownMenu9 } from '@/partials/dropdown-menu/dropdown-menu-9';
import { Navbar, NavbarActions } from '@/partials/navbar/navbar';
import {
  EllipsisVertical,
  Luggage,
  Mail,
  MapPin,
  MessageSquareText,
  Users,
} from 'lucide-react';
import { Invoicing } from './components/Invoicing';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { ProfileDefaultContent } from '.';
import { useState, useEffect } from 'react';
import { formatDate, formatDistanceToNow } from 'date-fns';
import { FormattedDate } from 'react-intl';
import { id } from 'date-fns/locale/id';
import { useParams } from 'react-router-dom';
import { getAgentById } from '@/utils/agentService';
import { AccountSettingsSidebar } from './components/settings-sidebar/account-basic-sidebar';
import { AccountSettingsSidebarContent } from './components/settings-sidebar/account-basic-content';

export function UplineProfilePage() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   // console.log("Hello world")
  //   handleAutoFetch();
  // }, []);
  // const handleAutoFetch = async () => {
  //   console.log("Fetching agents data...");
  //   setLoading(true);
  //   setMessage("");
  //   setErrors({});


  //   getAgentById(id)
  //     .then((response) => {
  //       const agentsArray = response.data.agent;
  //       setData(agentsArray || []);
  //     })
  //     .catch((err) => console.error("Error fetching users:", err));

  // };


  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [rowSelection] = useState({});
  const [sorting, setSorting] = useState([{ id: 'date', desc: true }]);



  return (
    <Fragment>
      <UserHero
        name={data.firstName || "Upline Name"}
        image={data.profile }
        info={[
          // { label: data.phoneNumber || "Agents", icon: Luggage },
          { label: data.country || "email@gmail.com", icon: Mail },
          { email: data.email || "UplineURL.com", icon: MapPin },
        ]}
      />

      {/* <Container>
        <Navbar>
          <PageMenu />
          <NavbarActions>
            <Button>
              <Users /> Add agent
            </Button>
            <Button>
              <Users /> Add Policies
            </Button>
            <Button variant="outline" mode="icon">
              <MessageSquareText />
            </Button>
            <DropdownMenu9
              trigger={
                <Button variant="outline" mode="icon">
                  <EllipsisVertical />
                </Button>
              }
            />
          </NavbarActions>
        </Navbar>
      </Container> */}
      <Container>
        {/* <ProfileDefaultContent /> */}
        {/* <Invoicing /> */}
        {/* <AccountSettingsSidebar/> */}
        <AccountSettingsSidebarContent/>
      </Container>
    </Fragment>
  );
}
