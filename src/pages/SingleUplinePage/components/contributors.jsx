import { DropdownMenu3 } from '@/partials/dropdown-menu/dropdown-menu-3';
import { DropdownMenu6 } from '@/partials/dropdown-menu/dropdown-menu-6';
import { EllipsisVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Contributors = () => {
  const items = [
    {
      avatar: '300-3.png',
      name: 'Aetna',
      connections: 10,
      connected: false,
    },
    {
      avatar: '300-1.png',
      name: 'Aetna Med Supp',
      connections: 10,
      connected: true,
    },
    {
      avatar: '300-14.png',
      name: 'Align',
      connections: 10,
      connected: false,
    },
    {
      avatar: '300-7.png',
      name: 'AmeriGroup',
      connections: 10,
      connected: true,
    },
  ];

  const renderItem = (item, index) => {
    return (
      <div key={index} className="flex items-center gap-2">
        <div className="flex items-center grow gap-2.5">
          <img
            src={toAbsoluteUrl(`/media/avatars/${item.avatar}`)}
            className="rounded-full size-9 shrink-0"
            alt="image"
          />

          <div className="flex flex-col">
            <Link
              to="#"
              className="text-sm font-semibold text-mono hover:text-primary-active mb-px"
            >
              {item.name}
            </Link>
            <span className="text-xs font-semibold text-secondary-foreground">
              {item.connections} Sold
            </span>
          </div>
        </div>
        <DropdownMenu3
          trigger={
            <Button variant="ghost" mode="icon">
              <EllipsisVertical />
            </Button>
          }
        />
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="gap-2">
        <CardTitle>Carriers</CardTitle>
        <DropdownMenu6
          trigger={
            <Button variant="ghost" mode="icon">
              <EllipsisVertical />
            </Button>
          }
        />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 lg:gap-5">
          {items.map((item, index) => {
            return renderItem(item, index);
          })}
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button mode="link" underlined="dashed" asChild>
          <Link to="/public-profile/network">View All</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export { Contributors };
