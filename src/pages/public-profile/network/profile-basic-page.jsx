import { Fragment } from 'react';
import { PageMenu } from '@/pages/public-profile';
import { UserHero2 } from '@/partials/common/user-hero2';
import { DropdownMenu9 } from '@/partials/dropdown-menu/dropdown-menu-9';
import { Navbar, NavbarActions } from '@/partials/navbar/navbar';
import {
  EllipsisVertical,
  // Link,
  Mail,
  MapPin,
  MessagesSquare,
  Plus,
  Users,
  Zap,
} from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { Network } from './components';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from "lucide-react";
import { Link } from 'lucide-react';
import { deleteUpline } from '@/utils/agentService';
import ProfilePhotoEditor from './components/ProfilePhotoEditor';

export function ProfileNetworkPage() {
  const [showEdit, setShowEdit] = useState(false);
  const [update, setUpdate] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [email, setEmail] = useState("");

  const [dropdown, setDropdown] = useState(false);
  const [uplineId, setUplineId] = useState(null);
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

  const handleDeleteUpline = () => {
    deleteUpline(uplineId)
      .then((response) => {
        const agentsArray = response || [];
        console.log("Upline Deleted:", agentsArray);
      })
      .catch((err) => console.error("Error fetching uplines:", err));

  };

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    uplineName: "",
    email: "",
    websiteUrl: "",
    phoneNum: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setIsOpen(false); // close modal after submit
  };

  console.log("Upline Id: ", uplineId);
  return (
    <Fragment>
      <UserHero2
        name="All Uplines"
        image={toAbsoluteUrl('/media/avatars/300-2.png')}
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
                  Take Action
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
                        <div>
                          <li>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                              Edit
                            </button>
                          </li>
                          <li>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={handleDeleteUpline}>
                              Delete
                            </button>
                          </li>
                        </div>
                      ) : null}
                    </ul>
                  </div>
                )}
              </div>

            ) : (
              <div className="relative inline-block text-left" ref={dropdownRef}>
                {/* Trigger Button */}
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500"
                >
                  Take Action
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""
                      }`}
                  />
                </button>
              </div>

            )}
            <Button variant="outline" mode="icon" onClick={() => setIsOpen(true)}>
              {/* <Link to={'/account/home/settings-sidebar#basic_settings'}> */}
              <Plus />
              {/* </Link> */}
            </Button>
            {/* <DropdownMenu9
              trigger={
                <Button variant="outline" mode="icon">
                  <EllipsisVertical />
                </Button>
              }
            /> */}
          </NavbarActions>
        </Navbar>

      </Container>
      <Container>
        <Network setDropdown={setDropdown} setShowEdit={setShowEdit} setUplineId={setUplineId} />
      </Container>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Upline</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload */}
              <div>
                <ProfilePhotoEditor
                  initialImage={"/media/avatars/default-profile.jpeg"}
                  onSave={(newFile) => {
                    setFile(newFile);   // store the new file
                    setUpdate(true);    // mark as updated
                  }}
                />
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium">Upline Name</label>
                <input
                  type="text"
                  name="uplineName"
                  value={formData.uplineName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-sm font-medium">Website URL</label>
                <input
                  type="url"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                  type="phone"
                  name="phoneNum"
                  value={formData.phoneNum}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
}
