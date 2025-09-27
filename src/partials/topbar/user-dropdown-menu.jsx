import { useAuth } from '@/auth/context/auth-context';
import { I18N_LANGUAGES } from '@/i18n/config';
import {
  BetweenHorizontalStart,
  Coffee,
  CreditCard,
  FileText,
  Globe,
  IdCard,
  Moon,
  Settings,
  Shield,
  SquareCode,
  UserCircle,
  Users,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { data, Link, Navigate } from 'react-router';
import { toAbsoluteUrl } from '@/lib/helpers';
import { useLanguage } from '@/providers/i18n-provider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { da } from '@faker-js/faker';
import { useNavigate } from 'react-router';
import { languages } from 'eslint-plugin-prettier';
import { useState } from 'react';

export function UserDropdownMenu({ trigger, profile, first_name, last_name, email }) {
  const { logout, user } = useAuth();
  const { currenLanguage, changeLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [ switchProfile, setSwitchProfile ] = useState(0);
  const navigate = useNavigate();

  // Use display data from currentUser
  const displayName =
    user?.fullname ||
    (user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : user?.username || 'User');

  const displayEmail = email || '';
  // const displayAvatar = user?.pic || toAbsoluteUrl('/media/avatars/300-2.png');
  const displayAvatar = profile;

  const handleLanguage = (lang) => {
    changeLanguage(lang);
  };

  const handleThemeToggle = (checked) => {
    setTheme(checked ? 'dark' : 'light');
  };

  const handlePersonalProfileToggle = (checked) => {
    setSwitchProfile(checked ? 0 : 1);
  };

  const handleAgencyProfileToggle = (checked) => {
    setSwitchProfile(checked ? 1 : 0);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from local storage
    localStorage.removeItem('user-data');
    return window.location.href = '/'; // Redirect to login page
  }

  const Languages = [
    { code: 'en', label: 'English', flag: toAbsoluteUrl('/media/flags/united-states.svg') },
    { code: 'es', label: 'Spanish', flag: toAbsoluteUrl('/media/flags/spain.svg') },
    { code: 'cn', label: 'Chinese', flag: toAbsoluteUrl('/media/flags/china.svg') },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" side="bottom" align="end">
        {/* Header */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <img
              className="size-9 rounded-full border-2 border-green-500"
              src={displayAvatar || toAbsoluteUrl('/media/avatars/default-profile.jpeg')}
              alt="User avatar"
            />

            <div className="flex flex-col">
              <Link
                to="/account/home/get-started"
                className="text-sm text-mono hover:text-primary font-semibold"
              >
                {first_name} {last_name}
              </Link>
              <a
                href={`mailto:${displayEmail}`}
                className="text-xs text-muted-foreground hover:text-primary"
              >
                {displayEmail}
              </a>
            </div>
          </div>
          {/* <Badge variant="primary" appearance="light" size="sm">
            Pro
          </Badge> */}
        </div>

        <DropdownMenuSeparator />

        {/* Menu Items */}
        <DropdownMenuItem asChild>
          <Link
            to="/public-profile/profiles/default"
            className="flex items-center gap-2"
          >
            <UserCircle />
            My Profile
          </Link>

        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            // to="https://devs.keenthemes.com"
            className="flex items-center gap-2"
          >
            <SquareCode />
            Boomers Academy
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a
            href="https://boomersinsuranceservices.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <SquareCode />
            Boomers Insurance
          </a>

        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            className="flex items-center gap-2"
          >
            <IdCard />
            My Agency
          </Link>
        </DropdownMenuItem>

        {/* My Account Submenu */}
        {/* <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2">
            <Settings />
            My Account
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-48">
            <DropdownMenuItem asChild>
              <Link
                to="/account/home/get-started"
                className="flex items-center gap-2"
              >
                <Coffee />
                Get Started
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                to="/account/home/user-profile/edit"
                className="flex items-center gap-2"
              >
                <FileText />
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                to="/account/billing/basic"
                className="flex items-center gap-2"
              >
                <CreditCard />
                Billing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                to="/account/security/overview"
                className="flex items-center gap-2"
              >
                <Shield />
                Security
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                to="/account/members/teams"
                className="flex items-center gap-2"
              >
                <Users />
                Members & Roles
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                to="/account/integrations"
                className="flex items-center gap-2"
              >
                <BetweenHorizontalStart />
                Integrations
              </Link>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub> */}



        {/* Language Submenu with Radio Group */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2 [&_[data-slot=dropdown-menu-sub-trigger-indicator]]:hidden hover:[&_[data-slot=badge]]:border-input data-[state=open]:[&_[data-slot=badge]]:border-input">
            <Globe />
            <span className="flex items-center justify-between gap-2 grow relative">
              Language
              <Badge
                variant="outline"
                className="absolute end-0 top-1/2 -translate-y-1/2"
              >
                {currenLanguage.label}
                <img
                  src={currenLanguage.flag}
                  className="w-3.5 h-3.5 rounded-full"
                  alt={currenLanguage.label}
                />
              </Badge>
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-48">
            <DropdownMenuRadioGroup
              value={currenLanguage.code}
              onValueChange={(value) => {
                const selectedLang = I18N_LANGUAGES.find(
                  (lang) => lang.code === value,
                );
                if (selectedLang) handleLanguage(selectedLang);
              }}
            >
              {Languages.map((item) => (
                <DropdownMenuRadioItem
                  key={item.code}
                  value={item.code}
                  className="flex items-center gap-2"
                >
                  <img
                    src={item.flag}
                    className="w-4 h-4 rounded-full"
                    alt={item.label}
                  />

                  <span>{item.label}</span>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <h2 className='font-bold px-2'>Switch Profiles</h2>

        <DropdownMenuItem
          className="flex items-center gap-2"
          onSelect={(event) => event.preventDefault()}
        >
          <div className="flex items-center gap-2 justify-between grow">
            Switch To Agent
            <Switch
              size="sm"
              checked={switchProfile === 0}
              onCheckedChange={handlePersonalProfileToggle}
            />
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex items-center gap-2"
          onSelect={(event) => event.preventDefault()}
        >
          <div className="flex items-center gap-2 justify-between grow">
            Switch To Agency 
            <Switch
              size="sm"
              checked={switchProfile === 1}
              onCheckedChange={handleAgencyProfileToggle}
            />
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />


        <DropdownMenuItem
          className="flex items-center gap-2"
          onSelect={(event) => event.preventDefault()}
        >
          <Moon />
          <div className="flex items-center gap-2 justify-between grow">
            Dark Mode
            <Switch
              size="sm"
              checked={theme === 'dark'}
              onCheckedChange={handleThemeToggle}
            />
          </div>
        </DropdownMenuItem>

        <div className="p-2 mt-1">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
