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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { NavbarMenu } from '@/partials/navbar/navbar-menu';
import { MENU_SIDEBAR } from '@/config/menu.config';
import { Link } from 'lucide-react';


export function LeadsPage() {
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

  return (
    <Fragment>
      <Container>
        <ToolbarHeading>
          <div className=" justify-between">
            <ToolbarPageTitle />
            <p>Lorem ipsum dolor </p>
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
            {/* <Button variant="outline" style={{ marginBottom: '1.3rem' }}>Import CSV</Button> */}
            <Button variant="primary" style={{ marginBottom: '1.3rem' }}>Add Lead</Button>
            <Button variant="primary" style={{ marginBottom: '1.3rem' }}>Import Lead</Button>
          </ToolbarActions>
        </Toolbar>
        {/* )} */}
      </Container>
      <Container>
        <AccountHistoryContent />
      </Container>
    </Fragment>
  );
}
