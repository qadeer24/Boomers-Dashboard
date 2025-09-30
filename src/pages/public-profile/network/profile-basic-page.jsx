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
import { createUpline } from '@/utils/agentService';
import { useNavigate } from "react-router-dom";

export function ProfileNetworkPage() {
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [update, setUpdate] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [email, setEmail] = useState("");

  const [dropdown, setDropdown] = useState(false);
  const [uplineId, setUplineId] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const token = localStorage.getItem("token");
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
    setLoading(true);

    deleteUpline(uplineId)
      .then((response) => {
        const agentsArray = response || [];
        console.log("Upline Deleted:", agentsArray);
        setLoading(false);

        // Reload after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((err) => console.error("Error fetching uplines:", err));

  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    image: null,
    uplineName: "",
    email: "",
    websiteUrl: "",
    phoneNum: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const HandleCreateUpline = async () => {
    setLoading(true);
    setMessage("");
    setErrors({});
    try {
      console.log("upline photo...", file);
      const uplineFormData = {
        name: formData.uplineName,
        email: formData.email,
        website_url: formData.websiteUrl,
        phone: formData.phoneNum,
        status: 0,
        ...(file ? { photo: file } : {}),
      };

      console.log("Submitting create with data:", uplineFormData);

      createUpline(uplineFormData, token)
        .then((response) => {
          const agentsArray = response || [];
          console.log("Upline created:", agentsArray);
          setMessage("Upline created successfully");
          setShowAlert(true);

          // Hide alert & close modal after 4 seconds
          setTimeout(() => {
            setShowAlert(false);
            setIsModalOpen(false);
            window.location.reload();
          }, 4000);
        })
        .catch((err) => console.error("Error fetching uplines:", err));

      // console.log("Upline Added updated:", dataupdated);
      // refresh from server
      // setTimeout(() => setDataupdated(false), 3000);
      // setTimeout(() => navigate(0), 2000); 
    } catch (error) {
      console.error("Error creating license info:", error);
      setErrors({ general: error?.message || "Create failed" });

    } finally {
      setLoading(false);
    }
  };

  const handleUplineChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

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
                  onClick={(e) => {setOpen(!open); e.stopPropagation();}}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                >
                  {loading ? "Loading" : "Take Action"}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="py-2 text-gray-700">
                      {showEdit ? (
                        <div>
                          <li>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => {navigate(`/admin/Uplines/detail/${uplineId}`);}}>
                              View
                            </button>
                          </li>
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
            <Button variant="outline" mode="icon" onClick={() => setIsModalOpen(true)}>
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
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            {showAlert ? (
              <div className="max-w-full ">
                <div className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800 shadow-md">
                  <svg
                    className="flex-shrink-0 inline w-5 h-5 mr-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9 4.75a1 1 0 1 1 2 0v4.5a1 1 0 0 1-2 0v-4.5ZM10 15a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" />
                  </svg>
                  <p className="font-medium">Upline Created!</p>
                  <span className="ml-2">You will be updated shortly by admin.</span>
                </div>
              </div>
            ) : null}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              style={{ cursor: 'pointer' }}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Upline</h2>

            <form onSubmit={HandleCreateUpline} className="space-y-4">
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
                  onChange={handleUplineChange}
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
                  onChange={handleUplineChange}
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
                  onChange={handleUplineChange}
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
                  onChange={handleUplineChange}
                  required
                  className="mt-1 block w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              {/* Submit */}
              <button
                type="button"
                onClick={HandleCreateUpline}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                {loading ? "Loading" : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
}
