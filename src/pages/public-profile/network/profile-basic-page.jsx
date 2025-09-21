import { Fragment } from 'react';
import { PageMenu } from '@/pages/public-profile';
import { UserHero } from '@/partials/common/user-hero';
import { DropdownMenu9 } from '@/partials/dropdown-menu/dropdown-menu-9';
import { Navbar, NavbarActions } from '@/partials/navbar/navbar';
import {
  EllipsisVertical,
  Mail,
  MapPin,
  MessagesSquare,
  Users,
  Zap,
} from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { Network } from './components';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from "lucide-react";

export function ProfileNetworkPage() {
  const [dropdown, setDropdown] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const image = (
    <img
      src={toAbsoluteUrl('/media/avatars/300-2.png')}
      className="rounded-full border-3 border-green-500 size-[100px] shrink-0"
      alt="image"
    />
  );
  const uplianse = 10;

  return (
    <Fragment>
      <UserHero
        name="All Uplines"
        image={image}
        info={[
          { label: "Total: " + uplianse, icon: Zap },
          { label: 'Published: ' + uplianse, icon: MapPin },
          { email: 'UnPublishes: ' + uplianse, icon: Mail },
        ]}
      />

      <Container>
        <Navbar className="flex items-center justify-between px-4 py-2">
          {/* Left side */}
          <div></div>

          {/* Right side */}
          <NavbarActions className="flex items-center gap-2 ml-auto">
            {dropdown ? (
              <div className="relative inline-block text-left" ref={dropdownRef}>
                {/* Trigger Button */}
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                >
                  Menu
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="py-2 text-gray-700">
                      <li>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                          View
                        </button>
                      </li>
                      {showEdit ? (
                        <li>
                          <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                            Edit
                          </button>
                        </li>
                      ) : null}
                      <li>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                          Export
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

            ) : null}
            <Button variant="outline" mode="icon">
              <MessagesSquare />
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

      </Container>
      <Container>
        <Network setDropdown={setDropdown} setShowEdit={setShowEdit}/>
      </Container>
    </Fragment>
  );
}
