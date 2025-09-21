import { Fragment } from 'react';
import { AvatarGroup } from '@/partials/common/avatar-group';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { HexagonBadge } from '@/partials/common/hexagon-badge';
import { Volleyball, Zap, MessagesSquare, Truck } from 'lucide-react';
import { DropdownMenu4 } from '@/partials/dropdown-menu/dropdown-menu-4';
import { ArrowDown, ArrowUp, EllipsisVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";


// export default function CustomDropdown() {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <button className="p-2 rounded-full hover:bg-gray-100">
//           <EllipsisVertical className="w-5 h-5" />
//         </button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent className="w-40">
//         {/* 🔹 Your custom options */}
//         <DropdownMenuItem onClick={() => alert("View clicked!")}>
//           Add Upliance
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => alert("Edit clicked!")}>
//           Edit
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => alert("Delete clicked!")}>
//           Delete
//         </DropdownMenuItem>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem onClick={() => alert("Custom Action clicked!")}>
//           Custom Action 🚀
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
const EntryCallout = ({ className }) => {
  return (
    <Fragment>
      <style>
        {`
          .entry-callout-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/2.png')}');
          }
          .dark .entry-callout-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/2-dark.png')}');
          }
        `}
      </style>

      <Card className={`h-full ${className}`}>
        <CardContent className="p-10 bg-[length:80%] rtl:[background-position:-70%_25%] [background-position:175%_25%] bg-no-repeat entry-callout-bg">
          <div className="flex flex-col justify-center gap-4">
            <AvatarGroup
              size="size-10"
              group={[
                { filename: '300-4.png' },
                { filename: '300-1.png' },
                { filename: '300-2.png' },
                {
                  fallback: 'S',
                  variant: 'text-white text-xs ring-background bg-green-500',
                },
              ]}
            />

            <h2 className="text-xl font-semibold text-mono">
              Connect Today & Join <br />
              the{' '}
              <Button mode="link" asChild className="text-xl font-semibold">
                <Link to="#">KeenThemes Network</Link>
              </Button>
            </h2>
            <p className="text-sm font-normal text-secondary-foreground leading-5.5">
              Enhance your projects with premium themes and <br />
              templates. Join the KeenThemes community today <br />
              for top-quality designs and resources.
            </p>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button mode="link" underlined="dashed" asChild>
            <Link to="#">Get Started</Link>
          </Button>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

const CommunityBadges = ({ title }) => {
  const items = [
    {
      stroke: 'stroke-blue-200 dark:stroke-blue-950',
      fill: 'fill-blue-50 dark:fill-blue-950/30',
      icon: Volleyball,
      iconColor: 'text-blue-500',
    },
    {
      stroke: 'stroke-orange-200 dark:stroke-orange-950',
      fill: 'fill-orange-50 dark:fill-orange-950/30',
      icon: Zap,
      iconColor: 'text-orange-500',
    },
    {
      stroke: 'stroke-green-200 dark:stroke-green-950',
      fill: 'fill-green-50 dark:fill-green-950/30',
      icon: MessagesSquare,
      iconColor: 'text-green-500',
    },
    {
      stroke: 'stroke-violet-200 dark:stroke-violet-950',
      fill: 'fill-violet-50  dark:fill-violet-950/30',
      icon: Truck,
      iconColor: 'text-violet-500',
    },
  ];

  const renderItem = (item, index) => {
    return (
      <HexagonBadge
        key={index}
        stroke={item.stroke}
        fill={item.fill}
        size="size-[50px]"
        badge={<item.icon className={`text-xl ps-px ${item.iconColor}`} />}
      />

    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {/* <CustomDropdown /> */}
      </CardHeader>
      <CardContent className="pb-7.5">
        <div className="flex items-center flex-wrap gap-3 lg:gap-4">
          {/* {items.map((item, index) => {
            return renderItem(item, index);
          })} */}
          <img
            src="/media/app/logo-academy.svg"
            style={{ width: '5rem', stroke: 'stroke-orange-200 dark:stroke-orange-950' }}
            alt=""
          />
          <img src="/media/app/logo-insurance.svg" style={{ width: '5rem' }} alt="" />
        </div>
      </CardContent>
              <CardFooter className="justify-center">
          <Button mode="link" underlined="dashed" asChild>
            <Link to="#">View All</Link>
          </Button>
        </CardFooter>
    </Card>
  );
};

export { EntryCallout, CommunityBadges };
