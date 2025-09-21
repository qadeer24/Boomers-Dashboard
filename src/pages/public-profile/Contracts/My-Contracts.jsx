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
import { Invoicing } from './invoicing';
import { Link } from 'lucide-react';


export function MyContracts() {
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
          <div className="flex justify-between">
          <ToolbarPageTitle />
          <ToolbarActions>
            {/* <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button id="date" variant="outline">
                  <CalendarDays size={16} className="me-0.5" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} -{' '}
                        {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={tempDateRange?.from || defaultStartDate}
                  selected={tempDateRange}
                  onSelect={setTempDateRange}
                  numberOfMonths={2}
                />

                <div className="flex items-center justify-end gap-1.5 border-t border-border p-3">
                  <Button variant="outline" onClick={handleDateRangeReset}>
                    Reset
                  </Button>
                  <Button onClick={handleDateRangeApply}>Apply</Button>
                </div>
              </PopoverContent>
            </Popover> */}
          </ToolbarActions>
          </div>
          <ToolbarDescription/>

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
        <div>
            <h1>My Contracts</h1>
            <p className='text-gray-400'>Stay informed about the status of your carrier contracts. Here's what each status means.</p>
        </div>
        <div className='m-6'>
            <p className='text-gray-400 font-semibold'><span className='text-black'>Active / Contracted: </span>You're Ready to Sell! Your contract with this carrier is active and you're approved to submit business.</p>
            <p className='text-gray-400 font-semibold'><span className='text-black'>Contracted – Not Certified:  </span>Your contract is in place, but required certifications are still pending. Complete them to become Ready to Sell.</p>
            <p className='text-gray-400 font-semibold'><span className='text-black'>Incomplete Contract:  </span>The contracting process wasn't completed. A new contracting link will need to be sent to you.</p>
            <p className='text-gray-400 font-semibold'><span className='text-black'>Declined:  </span>Unfortunately, the carrier declined your contract. Please reach out to our contracting team for next steps.</p>
            <p className='text-gray-400 font-semibold'><span className='text-black'>Failed Background:  </span>Your contract was declined due to background check results. Contact our team for further clarification.</p>
            <p className='text-gray-400 font-semibold'><span className='text-black'>Inactive:  </span>Your contract is no longer active. You're not currently authorized to sell with this carrier.</p>
            <p className='text-gray-400 font-semibold'><span className='text-black'>JIT Pending (Just-In-Time):  </span>Your contract has been submitted and will become active after your first piece of business is submitted.</p>
            <p className='text-gray-400 font-semibold'><span className='text-black'>JSH Pending (Just-Sell-Here):  </span>The contract can’t be submitted until you’ve written your first piece of business with the carrier.</p>
            <p className='text-gray-400 font-semibold'><span className='text-black'>Moved to New FMO:  </span>You’re no longer affiliated with Boomers Insurance Services. You’ve been transferred to a different FMO.</p>
            <p className='text-gray-400 font-semibold'><span className='text-black'>Onboarding:  </span>A new contracting invitation has been sent to you. Please complete it to proceed.</p>
            <p className='text-gray-400 font-semibold'><span className='text-black'>Pending:  </span>Your contract is under review by the carrier. We’ll update your status once it’s approved.</p>
            <p className='text-gray-400 font-semibold'><span className='text-black'>Released:  </span>Boomers Insurance Services has issued a release letter. You're no longer contracted under our organization.</p>
            <p className='text-gray-400 font-semibold'><span className='text-black'>Termed / Servicing:  </span>You’ve been placed in Servicing status (e.g., by UHC). You’re not eligible to write new business but will continue to receive renewals.</p>
            <p className='text-gray-400 font-semibold'><span className='text-black'>Terminated:  </span>Your contract has been terminated by the carrier. Contact our support team if you need clarification.</p>
            <p className='text-gray-400 font-semibold'><span className='text-black'>Pending / Transfer:  </span>You're in the process of transferring your contract to Boomers Insurance Services. We're here to ensure it goes smoothly.</p>
        </div>
        <Invoicing />
      </Container>
    </Fragment>
  );
}
