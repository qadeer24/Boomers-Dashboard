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
import { addDays, format } from 'date-fns';
import { ScrollspyMenu } from '@/partials/navbar/scrollspy-menu';
import {
  AdvancedSettingsAddress,
  AdvancedSettingsAppearance,
  AdvancedSettingsNotifications,
  AdvancedSettingsPreferences,
  AuthEmail,
  AuthPassword,
  AuthSingleSingOn,
  AuthSocialSignIn,
  AuthTwoFactor,
  BasicSettings,
  DeleteAccount,
  ExternalServicesIntegrations,
  ExternalServicesManageApi,
} from './components';
import { NavbarMenu } from '@/partials/navbar/navbar-menu';
import { MENU_SIDEBAR } from '@/config/menu.config';
import { Link } from 'lucide-react';

const items = [
    {
        title: 'Basic Settings',
        target: 'basic_settings',
        active: true,
    },
    {
        title: 'Authentication',
        children: [
            {
                title: 'Email',
                target: 'auth_email',
                active: false,
            },
            {
                title: 'Password',
                target: 'auth_password',
            },
            {
                title: 'Social Sign in',
                target: 'auth_social_sign_in',
            },
            {
                title: 'Single Sign On(SSO)',
                target: 'auth_social_sign_in_sso',
            },
            {
                title: 'Two-Factor auth(2FA)',
                target: 'auth_two_factor',
            },
        ],
    },
    {
        title: 'Advanced Settings',
        children: [
            {
                title: 'Preferences',
                target: 'advanced_settings_preferences',
            },
            {
                title: 'Appearance',
                target: 'advanced_settings_appearance',
            },
            {
                title: 'Notifications',
                target: 'advanced_settings_notifications',
            },
            {
                title: 'Address',
                target: 'advanced_settings_address',
            },
        ],
    },
    {
        title: 'External Services',
        children: [
            {
                title: 'Manage API',
                target: 'external_services_manage_api',
            },
            {
                title: 'Integrations',
                target: 'external_services_integrations',
            },
        ],
    },
    {
        title: 'Delete Account',
        target: 'delete_account',
    },
];



export function NewCarrier() {
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
                    <ToolbarDescription />

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
                <ScrollspyMenu items={items} />

            </Container>
            <Container>
                <div className="flex flex-col items-stretch grow gap-5 lg:gap-7.5">
                    <BasicSettings />
                    <AuthEmail />
                    <AuthPassword />
                    <AuthSocialSignIn />
                    <AuthSingleSingOn />
                    <AuthTwoFactor />
                    <AdvancedSettingsPreferences />
                    <AdvancedSettingsAppearance title={''} />
                    <AdvancedSettingsNotifications />
                    <AdvancedSettingsAddress />
                    <ExternalServicesManageApi title={''} switch={false} />
                    <ExternalServicesIntegrations />
                    <DeleteAccount />
                </div>
            </Container>
        </Fragment>
    );
}
