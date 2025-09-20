import { useEffect, useState } from 'react';
import { StoreClientTopbar } from '@/pages/store-client/components/common/topbar';
import { SearchDialog } from '@/partials/dialogs/search/search-dialog';
import { AppsDropdownMenu } from '@/partials/topbar/apps-dropdown-menu';
import { ChatSheet } from '@/partials/topbar/chat-sheet';
import { NotificationsSheet } from '@/partials/topbar/notifications-sheet';
import { UserDropdownMenu } from '@/partials/topbar/user-dropdown-menu';
import {
  Bell,
  LayoutGrid,
  Menu,
  MessageCircleMore,
  Search,
  SquareChevronRight,
} from 'lucide-react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Container } from '@/components/common/container';
import { Breadcrumb } from './breadcrumb';
import { MegaMenu } from './mega-menu';
import { MegaMenuMobile } from './mega-menu-mobile';
import { SidebarMenu } from './sidebar-menu';
import { getAgentById } from '@/utils/agentService';
import { getprofileStatus } from '@/utils/agentService';


export function Header() {
  const [isSidebarSheetOpen, setIsSidebarSheetOpen] = useState(false);
  const [isMegaMenuSheetOpen, setIsMegaMenuSheetOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [dataUpdated, setDataUpdated] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [showProgress, setshowProgress] = useState(true);

  const { pathname } = useLocation();
  const mobileMode = useIsMobile();

  const scrollPosition = useScrollPosition();
  const headerSticky = scrollPosition > 0;

  // Close sheet when route changes
  useEffect(() => {
    setIsSidebarSheetOpen(false);
    setIsMegaMenuSheetOpen(false);
  }, [pathname]);


  const user = JSON.parse(localStorage.getItem('user-data'));
  // console.log("User Data in Header:", user.id);

  useEffect(() => {
    // console.log("Hello world")
    handleAutoFetch();
  }, []);
  const handleAutoFetch = async () => {
    // console.log("Fetching agents data...");
    setLoading(true);
    setMessage("");
    setErrors({});
    setDataUpdated(false);

    getprofileStatus()
      .then((status) => {
        console.log("Profile status data fetched successfully:", status.data.completion_percentage);
        setProgressValue(status.data.completion_percentage || 0);
        if (status.data.completion_percentage === 100) {
          setshowProgress(false);
        }
      })
      .catch((err) => console.error("Error fetching profile status:", err));

    getAgentById(user.id)
      .then((response) => {
        const agentsArray = response.data.agent;
        setData(agentsArray || []);
      })
      .catch((err) => console.error("Error fetching users:", err));
  };


  return (
    <div>
      {showProgress ? (
        <header
          className={
            cn(
              'header fixed top-0 z-10 start-0 items-stretch shrink-0 border-b border-transparent bg-background end-0 pe-[var(--removed-body-scroll-bar-size,0px)]',
              headerSticky && 'border-b border-border h-35',
            )
          }
        >
          <Link to='/public-profile/profiles/default'>
            <div className="my-3">

              <Container className="flex flex-col justify-center">
                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden relative">
                  {/* Filled portion */}
                  <div
                    className="bg-red-500 h-6 transition-all duration-500 flex items-center justify-center text-white text-sm font-medium"
                    style={{ width: `${progressValue}%` }}
                  >
                    {/* Show text only if progress > 10% so it doesn’t overflow */}
                    {progressValue > 10 && `${progressValue}% Profile Completed`}
                  </div>

                  {/* Show text outside if progress is too small */}
                  {progressValue <= 10 && (
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-700">
                      {progressValue}% Profile Completed
                    </span>
                  )}
                </div>
              </Container>
            </div>
          </Link>

          <Container className="flex justify-between items-stretch lg:gap-4">
            {/* HeaderLogo */}
            <div className="flex gap-1 lg:hidden items-center gap-2.5">
              <Link to="/" className="shrink-0">
                <img
                  src={toAbsoluteUrl('/media/app/mini-logo.svg')}
                  className="h-[25px] w-full"
                  alt="mini-logo"
                />
              </Link>
              <div className="flex items-center">
                {mobileMode && (
                  <Sheet
                    open={isSidebarSheetOpen}
                    onOpenChange={setIsSidebarSheetOpen}
                  >
                    <SheetTrigger asChild>
                      <Button variant="ghost" mode="icon">
                        <Menu className="text-muted-foreground/70" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      className="p-0 gap-0 w-[275px]"
                      side="left"
                      close={false}
                    >
                      <SheetHeader className="p-0 space-y-0" />
                      <SheetBody className="p-0 overflow-y-auto">
                        <SidebarMenu />
                      </SheetBody>
                    </SheetContent>
                  </Sheet>
                )}
                {mobileMode && (
                  <Sheet
                    open={isMegaMenuSheetOpen}
                    onOpenChange={setIsMegaMenuSheetOpen}
                  >
                    <SheetTrigger asChild>
                      <Button variant="ghost" mode="icon">
                        <SquareChevronRight className="text-muted-foreground/70" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      className="p-0 gap-0 w-[275px]"
                      side="left"
                      close={false}
                    >
                      <SheetHeader className="p-0 space-y-0" />
                      <SheetBody className="p-0 overflow-y-auto">
                        <MegaMenuMobile />
                      </SheetBody>
                    </SheetContent>
                  </Sheet>
                )}
              </div>
            </div>

            {/* Main Content (MegaMenu or Breadcrumbs) */}
            {pathname.startsWith('/account') ? (
              <>
                <Breadcrumb />
              </>
            ) : (
              !mobileMode && <MegaMenu />
            )}



            {/* HeaderTopbar */}
            <div className="flex items-center gap-3">
              {pathname.startsWith('/store-client') ? (
                <StoreClientTopbar />
              ) : (
                <>
                  {!mobileMode && (
                    <SearchDialog
                      trigger={
                        <Button
                          variant="ghost"
                          mode="icon"
                          shape="circle"
                          className="size-9 hover:bg-primary/10 hover:[&_svg]:text-primary"
                        >
                          <Search className="size-4.5!" />
                        </Button>
                      }
                    />
                  )}
                  <NotificationsSheet
                    trigger={
                      <Button
                        variant="ghost"
                        mode="icon"
                        shape="circle"
                        className="size-9 hover:bg-primary/10 hover:[&_svg]:text-primary"
                      >
                        <Bell className="size-4.5!" />
                      </Button>
                    }
                  />

                  <ChatSheet
                    trigger={
                      <Button
                        variant="ghost"
                        mode="icon"
                        shape="circle"
                        className="size-9 hover:bg-primary/10 hover:[&_svg]:text-primary"
                      >
                        <MessageCircleMore className="size-4.5!" />
                      </Button>
                    }
                  />

                  {/* <AppsDropdownMenu
                    trigger={
                      <Button
                        variant="ghost"
                        mode="icon"
                        shape="circle"
                        className="size-9 hover:bg-primary/10 hover:[&_svg]:text-primary"
                      >
                        <LayoutGrid className="size-4.5!" />
                      </Button>
                    }
                  /> */}

                  <UserDropdownMenu
                    profile={data.profile}
                    first_name={data.firstName}
                    last_name={data.lastName}
                    email={data.email}
                    trigger={
                      <img
                        className="size-9 rounded-full border-2 border-green-500 shrink-0 cursor-pointer"
                        // src={toAbsoluteUrl('/media/avatars/300-2.png')}
                        src={data.profile || toAbsoluteUrl('/media/avatars/default-profile.jpeg')}
                        alt="User Avatar"
                      />
                    }
                  />
                </>
              )}
            </div>


          </Container>
        </header >
      ) : (
        <header
          className={
            cn(
              'header fixed top-0 z-10 start-0 py-4 items-stretch shrink-0 border-b border-transparent bg-background end-0 pe-[var(--removed-body-scroll-bar-size,0px)]',
              headerSticky && 'border-b border-border',
            )
          }
        >
          <Container className="flex justify-between items-stretch lg:gap-4">
            {/* HeaderLogo */}
            <div className="flex gap-1 lg:hidden items-center gap-2.5">
              <Link to="/" className="shrink-0">
                <img
                  src={toAbsoluteUrl('/media/app/mini-logo.svg')}
                  className="h-[25px] w-full"
                  alt="mini-logo"
                />
              </Link>
              <div className="flex items-center">
                {mobileMode && (
                  <Sheet
                    open={isSidebarSheetOpen}
                    onOpenChange={setIsSidebarSheetOpen}
                  >
                    <SheetTrigger asChild>
                      <Button variant="ghost" mode="icon">
                        <Menu className="text-muted-foreground/70" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      className="p-0 gap-0 w-[275px]"
                      side="left"
                      close={false}
                    >
                      <SheetHeader className="p-0 space-y-0" />
                      <SheetBody className="p-0 overflow-y-auto">
                        <SidebarMenu />
                      </SheetBody>
                    </SheetContent>
                  </Sheet>
                )}
                {mobileMode && (
                  <Sheet
                    open={isMegaMenuSheetOpen}
                    onOpenChange={setIsMegaMenuSheetOpen}
                  >
                    <SheetTrigger asChild>
                      <Button variant="ghost" mode="icon">
                        <SquareChevronRight className="text-muted-foreground/70" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      className="p-0 gap-0 w-[275px]"
                      side="left"
                      close={false}
                    >
                      <SheetHeader className="p-0 space-y-0" />
                      <SheetBody className="p-0 overflow-y-auto">
                        <MegaMenuMobile />
                      </SheetBody>
                    </SheetContent>
                  </Sheet>
                )}
              </div>
            </div>

            {/* Main Content (MegaMenu or Breadcrumbs) */}
            {pathname.startsWith('/account') ? (
              <>
                <Breadcrumb />
              </>
            ) : (
              !mobileMode && <MegaMenu />
            )}



            {/* HeaderTopbar */}
            <div className="flex items-center gap-3">
              {pathname.startsWith('/store-client') ? (
                <StoreClientTopbar />
              ) : (
                <>
                  {!mobileMode && (
                    <SearchDialog
                      trigger={
                        <Button
                          variant="ghost"
                          mode="icon"
                          shape="circle"
                          className="size-9 hover:bg-primary/10 hover:[&_svg]:text-primary"
                        >
                          <Search className="size-4.5!" />
                        </Button>
                      }
                    />
                  )}
                  <NotificationsSheet
                    trigger={
                      <Button
                        variant="ghost"
                        mode="icon"
                        shape="circle"
                        className="size-9 hover:bg-primary/10 hover:[&_svg]:text-primary"
                      >
                        <Bell className="size-4.5!" />
                      </Button>
                    }
                  />

                  <ChatSheet
                    trigger={
                      <Button
                        variant="ghost"
                        mode="icon"
                        shape="circle"
                        className="size-9 hover:bg-primary/10 hover:[&_svg]:text-primary"
                      >
                        <MessageCircleMore className="size-4.5!" />
                      </Button>
                    }
                  />

                  <AppsDropdownMenu
                    trigger={
                      <Button
                        variant="ghost"
                        mode="icon"
                        shape="circle"
                        className="size-9 hover:bg-primary/10 hover:[&_svg]:text-primary"
                      >
                        <LayoutGrid className="size-4.5!" />
                      </Button>
                    }
                  />

                  <UserDropdownMenu
                    profile={data.profile}
                    first_name={data.firstName}
                    last_name={data.lastName}
                    email={data.email}
                    trigger={
                      <img
                        className="size-9 rounded-full border-2 border-green-500 shrink-0 cursor-pointer"
                        // src={toAbsoluteUrl('/media/avatars/300-2.png')}
                        src={data.profile || toAbsoluteUrl('/media/avatars/default-profile.jpeg')}
                        alt="User Avatar"
                      />
                    }
                  />
                </>
              )}
            </div>


          </Container>
        </header >
      )}
    </div>
  );
}
