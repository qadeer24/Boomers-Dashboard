import { AvatarInput } from '@/partials/common/avatar-input';
import { SquarePen, File } from 'lucide-react';
import { Link } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HexagonBadge } from '@/partials/common/hexagon-badge';
import { MessagesSquare, Truck, Volleyball, Zap } from 'lucide-react';
import { getAgentById } from '@/utils/agentService';
import { updateAgent } from '@/utils/agentService';
import axios from 'axios';
import { set } from 'date-fns/set';
import { updateLicenseInfo } from '@/utils/agentService';
import { createLicenseInfo } from '@/utils/agentService';
import { updateBankInfo } from '@/utils/agentService';
import { createBankInfo } from '@/utils/agentService';
import { getCountytByStateId } from '@/utils/agentService';
import { se } from 'date-fns/locale/se';
import { sub } from 'date-fns';
import { da } from '@faker-js/faker';
import ProfilePhotoEditor from './ProfilePhotoEditor';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const handleChange = (e) => {
  const { name, value } = e.target;
  setData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const user = JSON.parse(localStorage.getItem('user-data'));

const PersonalInfo = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [update, setUpdate] = useState(false)
  const [dataupdated, setDataUpdated] = useState(false)
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    gender: '',
    phoneNumber: '',
    npn: '',
    profile: '',
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const id = Number(user.id); // ya parseInt(user.id, 10)
  const [errors, setErrors] = useState({});
  const [profile, setProfile] = useState({});
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploaded, setUploaded] = useState(null);

  function base64ToFile(base64, filename) {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }


  async function urlToFile(url, filename) {
    console.log("Converting URL to File:", url);
    const response = await fetch('https://boomersinsuranceservices.com/be/public/storage/uploads/user/profile/original/agent_21_1757951889.jpg');
    if (!response.ok) throw new Error("Failed to fetch file from URL");
    const blob = await response.blob();
    const mimeType = blob.type || "image/png";
    return new File([blob], filename, { type: mimeType });
  }

  const onSave = (newFile) => {
    const base64String = newFile; // your string
    setFile(base64ToFile(base64String, "profile.png"));
    // do something with file
    setFile(newFile); // make sure newFile is defined
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleProfileSave = (file) => {
    // File/image is coming from ProfilePhotoEditor
    console.log("New profile picture:", file);

    setUpdate(true); // 👈 mark as updated
  };

  // const [file, setFile] = useState(null);

  // const handleFileChange = (e) => {
  //   // e.target.files is a FileList, we take the first file
  //   setFile(e.target.files[0]);
  // };


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


    getAgentById(id)
      .then((response) => {
        const agentsArray = response.data.agent;
        setData(agentsArray || []);
      })
      .catch((err) => console.error("Error fetching users:", err));
  };
  // console.log("Fetched agents data:", data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setUpdate(true);
    // console.log("Data changed:", { ...data, [name]: value })
  };

  // console.log("Data to update:", data);
  const handleSave = async () => {
    console.log("Updating agent data...");
    setLoading(true);
    setMessage("");
    setErrors({});


    try {
      const apiUrl = import.meta.env.VITE_API_URL; // or your base API URL
      const token = localStorage.getItem("token");
      const agentId = data.id; // assuming you have agentId in data
      // Create FormData
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("npn", data.npn);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("dob", data.dob);
      formData.append("gender", data.gender);
      formData.append("description", data.description);
      // if (file) {
      //   // user uploaded a new file
      //   formData.append("profile", base64ToFile(file, "profile.png"));
      // } else if (data.profile && data.profile.startsWith("http")) {
      //   // convert URL to File
      //   const profileFile = await urlToFile(data.profile, "profile.png");
      //   formData.append("profile", profileFile);
      // }
      // formData.append("profile", data.profile); // This should be a File object
      if (file) {
        formData.append("profile", base64ToFile(file, "profile.png"));
      }
      formData.append("_method", "PUT"); // tell backend it's a PUT request
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      updateAgent(formData, agentId, token)
        .then((response) => {
          console.log("Agent updated successfully:", response.data);
          setMessage("Agent updated successfully");
        })
        .catch((error) => {
          console.error("Error updating agent:", error);
          setErrors({ general: error.message });
        });
      setTimeout(() => navigate(0), 2000); // Refresh page after 2 seconds

    } catch (err) {
      console.error("Error updating user:", err);
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
    setIsOpen(false);
    setUpdate(false);
    setDataUpdated(true);
    useEffect(() => { handleAutoFetch(); }, [])


  };

  const handleCheck = (e) => {
    const { name, value } = e.target;

    if (value === 'N/A') {
      setData((prev) => ({
        ...prev,
        [name]: ''   // dynamically clear whichever field was clicked
      }));
    }
  };
  // console.log("Fetched agents data:", data);
  return (
    <Card className="min-w-full">
      <CardHeader>
        <CardTitle>Personal Info</CardTitle>
        {update ?
          <Button onClick={() => setIsOpen(true)} className="bg-blue-500 ps-3 text-white hover:bg-blue-600 cursor-pointer ">Update</Button>
          :
          <div className='flex'>
            <div className={dataupdated ? "text-green-500 pt-2 pe-1" : "hidden"} style={{ fontSize: '12px' }}>Successfully Updated!</div>
            <Button disabled className="bg-gray-500 text-white">Update</Button>
          </div>
        }
        {isOpen && (
          <div className="fixed inset-0 flex max-h-sm justify-center backdrop-blur-sm bg-opacity-50 z-50" onClick={() => setIsOpen(false)}>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full" style={{ height: '12rem' }}>
              <h2 className="text-xl font-bold mb-4">Update Personal Info</h2>
              <p className="text-gray-600">Are You sure You want to update this data?</p>

              <div className="flex justify-evenly mt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-red-400 text-white rounded hover:bg-blue-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className="kt-scrollable-x-auto pb-3 p-0">
        <Table className="align-middle text-sm text-muted-foreground">
          <TableBody>
            <TableRow>
              <TableCell className="py-2 min-w-28 text-secondary-foreground font-normal">
                Photo
              </TableCell>
              <TableCell className="py-2 text-gray700 font-normal min-w-32 text-sm">
                150x150px JPEG, PNG Image
              </TableCell>
              {/* <TableCell className="py-2 text-center">
                <div className="flex justify-center items-center">
                  <AvatarInput setProfile={setProfile} handleFileChange={handleFileChange} />
                  <div>
                    <h2>Upload Image</h2>
                    <input type="file" onChange={handleFileChange} />
                    {preview && <img src={preview} alt="preview" width="200" />}
                    <br />

                    {uploaded && (
                      <div>
                        <p>Uploaded:</p>
                        <img src={`http://localhost:5000${uploaded}`} alt="uploaded" width="200" />
                      </div>
                    )}
                  </div>
                </div>
              </TableCell> */}
              <TableCell className="py-2 text-center">
                <ProfilePhotoEditor
                  initialImage={data.profile}
                  onSave={(newFile) => {
                    setFile(newFile);   // store the new file
                    setUpdate(true);    // mark as updated
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                First Name
              </TableCell>
              <TableCell className="py-2 text-foreground font-normaltext-sm">
                <input type="text" value={data.firstName ?? 'N/A'} name='firstName' onChange={handleChange} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Last Name
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                <input type="text" value={data.lastName ?? 'N/A'} name='lastName' onChange={handleChange} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Birthday
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                <input
                  type="date"
                  name="dob"
                  value={data.dob || ""}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Gender
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                {/* <input type="text" value={data.gender ?? 'N/A'} name='gender' onChange={handleChange} /> */}
                <div className="py-4">
                  <select
                    className="border rounded-lg p-2 w-full"
                    name="gender"
                    value={data.gender || ""}
                    onChange={handleChange}
                    required
                  >
                    {/* Show only when gender is not selected */}
                    {!data.gender && (
                      <option value="">
                        -- Select Gender --
                      </option>
                    )}

                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>

                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Phone
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                <input type="tel" value={data.phoneNumber ?? 'N/A'} name='phoneNumber' onClick={handleCheck} onChange={handleChange} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                NPN
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                <input type="tel" value={data.npn ?? 'N/A'} name='npn' onClick={handleCheck} onChange={handleChange} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                City
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                <input type="text" value={data.city ?? 'N/A'} name='city' onClick={handleCheck} onChange={handleChange} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Address
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                <input type="text" value={data.address ?? 'N/A'} name='address' onClick={handleCheck} onChange={handleChange} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Zip Code
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                <input type="text" value={data.zip ?? 'N/A'} name='zip' onClick={handleCheck} onChange={handleChange} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
const states = [{}];

const LicensingInfo = () => {


  const [selectedState, setSelectedState] = useState({});
  const [selectedOtherState, setSelectedOtherState] = useState([]);
  const safeSelectedOtherState = Array.isArray(selectedOtherState)
    ? selectedOtherState
    : [];
  const [selectedUpline, setSelectedUpline] = useState("");
  const [selectedEOpolicy, setSelectedEOpolicy] = useState("");
  const [states, setStates] = useState([]);


  const id = Number(user.id); // ya parseInt(user.id, 10)

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [ids, setIds] = useState({});
  const [pdfFile, setPdfFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // confirm modal
  const [isModalOpen, setIsModalOpen] = useState(false); // confirm modal
  const [create, setCreate] = useState(false); // create vs update mode
  const [update, setUpdate] = useState(false); // track unsaved edits
  const [showErrors, setShowErrors] = useState(false);
  const [showUpdate, setShowUpdate] = useState(true); // track unsaved edits
  const [dataupdated, setDataupdated] = useState(false); // track if data was updated
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // console.log("Hello world")
    handleAutoFetch();
  }, []);
  // Fetch licensing info for the agent
  const handleAutoFetch = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await getAgentById(id);
      // console.log("Fetched agent data:", response.data);
      const licenseArray = response.data.agent.licenseInfo;
      console.log("License Array:", licenseArray);
      setData(licenseArray || {});
      setSelectedUpline(licenseArray?.working_with_upline);
      setSelectedEOpolicy(licenseArray?.active_eo_policy);
      if (!licenseArray || Object.keys(licenseArray).length === 0) {
        setCreate(true); // No data means we are in create mode
      }
      const stateRes = await getCountytByStateId();
      const updatedStates = [...states, ...stateRes.data];
      setStates(updatedStates);

      // map selected states safely
      const residentState =
        licenseArray?.resident_license_state_id != null
          ? updatedStates[licenseArray.resident_license_state_id]
          : null;

      const otherState =
        licenseArray?.other_licensed_states_id != null
          ? updatedStates[licenseArray.other_licensed_states_id]
          : null;

      setSelectedState(residentState || null);
      setSelectedOtherState(otherState || null);

      console.log("State data:", states);
    } catch (err) {
      console.error("Error fetching agent:", err.message);
      setErrors({ general: err?.message || "Failed to fetch license info" });
      // Still prepare an empty form in create mode
      setData({ id });
      setCreate(true);
    } finally {
      setLoading(false);
      setUpdate(false);
    }

  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setUpdate(true);
    setMessage("");
  };


  useEffect(() => {
    if (!showErrors) {

      const isValid = Boolean(
        data.social_security_number &&
        data.resident_license_state_id &&
        safeSelectedOtherState &&
        selectedUpline >= 0 &&
        selectedEOpolicy >= 0
      );
      console.log("data.social_security_number", data.social_security_number);
      console.log("data.resident_license_state_id", data.resident_license_state_id);
      console.log("data.other_licensed_states_id", safeSelectedOtherState);
      console.log("selectedUpline", selectedUpline);
      console.log("selectedEOpolicy", selectedEOpolicy);
      // console.log("Other State Id's:", ids); // [2, 1]

      setShowErrors(isValid);   // update state
      console.log("error isValid (calculated):", isValid); // always correct
    } else {


      const updateisValid = Boolean(
        data.social_security_number ||
        data.resident_license_state_id ||
        data.other_licensed_states_id ||
        selectedUpline ||
        selectedEOpolicy
      );
      setShowUpdate(!updateisValid);
      console.log("error (calculated):", updateisValid); // always correct
    }

    // console.log("data", data);
    // console.log("selectedOtherState", selectedOtherState);
    // console.log("selectedUpline", selectedUpline);
    // console.log("selectedEOpolicy", selectedEOpolicy);

  }, [
    data.social_security_number,
    data.resident_license_state_id,
    selectedOtherState,
    selectedUpline,
    selectedEOpolicy
  ]);

  // useEffect(() => {
  //   const allFieldsFilled = Boolean(
  //     data.social_security_number &&
  //     data.resident_license_state_id &&
  //     data.other_licensed_states_id &&
  //     selectedUpline &&
  //     selectedEOpolicy
  //   );

  //   const anyFieldFilled = Boolean(
  //     data.social_security_number ||
  //     data.resident_license_state_id ||
  //     data.other_licensed_states_id ||
  //     selectedUpline ||
  //     selectedEOpolicy
  //   );

  //   if (!showErrors) {
  //     // First-time check → require ALL fields
  //     setShowErrors(allFieldsFilled);
  //     console.log("Initial validation (all required):", allFieldsFilled);
  //   } else {
  //     // After errors already shown → allow partial updates
  //     setShowUpdate(anyFieldFilled);
  //     console.log("Update validation (any field):", anyFieldFilled);
  //   }
  // }, [
  //   data.social_security_number,
  //   data.resident_license_state_id,
  //   data.other_licensed_states_id,
  //   selectedUpline,
  //   selectedEOpolicy,
  //   showErrors, // 🔑 include this!
  // ]);





  const submitCreate = async () => {
    // if (!validateForm()) {
    //   alert("Please fill all fields before submitting.");
    //   return;
    // }

    const OtherIds = safeSelectedOtherState.map(item => item.id);

    setLoading(true);
    setMessage("");
    setErrors({});
    try {
      const formData = {
        user_id: id,
        social_security_number: data.social_security_number,
        resident_license_state_id: selectedState,
        other_licensed_states_id: JSON.stringify(OtherIds),
        working_with_upline: selectedUpline,
        active_eo_policy: selectedEOpolicy,
      }; // Use the current state data
      console.log("Submitting create with data:", formData);

      await createLicenseInfo(formData);

      setMessage("License info created successfully");
      setDataupdated(true); // Set to true to indicate data was updated
      setUpdate(false);
      setIsOpen(false);
      console.log("data updated:", dataupdated);
      // refresh from server
      setTimeout(() => setDataupdated(false), 3000);
      setTimeout(() => navigate(0), 2000); // Refresh page after 2 seconds
      // ✅ Refresh page after success
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000); // wait 1 second so user can see the message
      await handleAutoFetch();
    } catch (error) {
      console.error("Error creating license info:", error);
      setErrors({ general: error?.message || "Create failed" });

    } finally {
      setLoading(false);
    }
  };

  const submitUpdate = async () => {
    const OtherIds = safeSelectedOtherState.map(item => item.id);

    setLoading(true);
    setMessage("");
    setErrors({});
    try {
      const formData = new FormData();
      formData.append("user_id", id);
      formData.append("social_security_number", data.social_security_number);
      formData.append("resident_license_state_id", data.resident_license_state_id);
      formData.append("other_licensed_states_id", JSON.stringify(OtherIds));
      formData.append("working_with_upline", selectedUpline);
      formData.append("active_eo_policy", selectedEOpolicy);
      formData.append("_method", "PUT"); // if your backend needs method spoofing

      await updateLicenseInfo(formData, data.id);

      setMessage("License info updated successfully");
      setDataupdated(true); // Set to true to indicate data was updated
      setUpdate(false);
      setIsOpen(false);
      setTimeout(() => setDataupdated(false), 3000);
      // ✅ Refresh page after success
      setTimeout(() => navigate(0), 2000); // Refresh page after 2 seconds

      // refresh from server
      await handleAutoFetch();
    } catch (error) {
      console.error("Error updating license info:", error);
      setErrors({ general: error?.message || "Update failed" });
    } finally {
      setLoading(false);
    }
  };

  const onConfirmUpdate = async () => {
    if (create) await submitCreate();
    else await submitUpdate();
  };



  const toggleState = (item) => {
    setSelectedOtherState((prevSelected) => {
      const safePrev = Array.isArray(prevSelected) ? prevSelected : [];

      if (safePrev.some((s) => s.id === item.id)) {
        // already selected → move back to state
        setStates((prevState) => [...prevState, item]);
        return safePrev.filter((s) => s.id !== item.id);
      } else {
        // not selected → move to selected
        setStates((prevState) => prevState.filter((s) => s.id !== item.id));
        return [...safePrev, item];
      }
    });
  };



  const removeState = (id) => {
    setSelectedOtherState((prev) => {
      const removedItem = prev.find((s) => s.id === id);

      if (removedItem) {
        setStates((old) => {
          // check if already exists in old states
          const exists = old.some((s) => s.id === removedItem.id);
          if (exists) return old; // don't add duplicate

          const updated = [...old, removedItem];
          return updated.sort((a, b) => a.name.localeCompare(b.name));
        });
      }

      return prev.filter((s) => s.id !== id);
    });
  };

  const handleCheck = (e) => {
    const { name, value } = e.target;

    if (value === 'N/A') {
      setData((prev) => ({
        ...prev,
        [name]: ''   // dynamically clear whichever field was clicked
      }));
    }
  };

  const [formData, setFormData] = useState({
    image: null,
    uplineName: "",
    email: "",
    websiteUrl: "",
    phoneNum: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setIsOpen(false); // close modal after submit
  };

  const uplines = [
    { id: 1, name: "Upline 1", abbreviation: "AL" },
    { id: 2, name: "Upline 2", abbreviation: "AK" },
    { id: 3, name: "Upline 3", abbreviation: "AS" },
    { id: 4, name: "Upline 4", abbreviation: "AZ" },
    { id: 5, name: "Upline 5", abbreviation: "AR" },
  ];

  const [selectedUplines, setSelectedUplines] = useState([]);
  const [uplineQuery, setUplineQuery] = useState("");
  const [uplineOpen, setUplineOpen] = useState(false);
  const uplineDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        uplineDropdownRef.current &&
        !uplineDropdownRef.current.contains(event.target)
      ) {
        setUplineOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Single function to handle both adding and removing
  const toggleUpline = (upline) => {
    setSelectedUplines((prev) => {
      // Check if the upline is already selected
      if (prev.some((s) => s.id === upline.id)) {
        // If it is, remove it
        return prev.filter((s) => s.id !== upline.id);
      } else {
        // If not, add it
        return [...prev, upline];
      }
    });
  };

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  // console.log("Profile:", data.profile);
  return (
    <form action="">
      <Card className="min-w-full">
        <CardHeader>
          <CardTitle>Licensing Info</CardTitle>
          {showUpdate ? (
            update ? (
              showErrors ? (
                <a
                  onClick={() => setIsOpen(true)}
                  className="bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 cursor-pointer"
                  style={{ borderRadius: '7px' }}
                >
                  Update
                </a>
              ) : (
                <Button
                  type="submit"
                  className="bg-yellow-500 ps-3 text-white hover:bg-blue-600 cursor-pointer"
                >
                  Update
                </Button>
              )
            ) : (
              <div className="flex">
                <div
                  className={dataupdated ? "text-green-500 pt-2 pe-1" : "hidden"}
                  style={{ fontSize: "12px" }}
                >
                  Successfully Updated!
                </div>
                <Button disabled className="bg-gray-500 text-white">Update</Button>
              </div>
            )
          ) : (
            update ? (
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 cursor-pointer"
                style={{ borderRadius: "7px" }}
              >
                Update
              </button>

            ) : (
              <div className="flex">
                <div
                  className={dataupdated ? "text-green-500 pt-2 pe-1" : "hidden"}
                  style={{ fontSize: "12px" }}
                >
                  Successfully Updated!
                </div>
                <Button disabled className="bg-gray-500 text-white">Update</Button>
              </div>
            )
          )}



          {isOpen && (
            <div className="fixed inset-0 flex max-h-sm justify-center backdrop-blur-sm bg-opacity-50 z-50" onClick={() => setIsOpen(false)}>
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full" style={{ height: '12rem' }}>
                <h2 className="text-xl font-bold mb-4">Update Licensing Info</h2>
                <p className="text-gray-600">Are You sure You want to update this data?</p>

                <div className="flex justify-evenly mt-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-red-400 text-white rounded hover:bg-blue-700"
                  >
                    Cancel
                  </button>
                  {create ?
                    <button
                      onClick={submitCreate}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Update
                    </button>
                    :
                    <button
                      onClick={submitUpdate}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Update
                    </button>
                  }
                </div>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="kt-scrollable-x-auto pb-3 p-0">
          <Table className="align-middle text-sm text-muted-foreground">
            <TableBody>
              <TableRow>
                <TableCell className="py-3 text-secondary-foreground font-normal">
                  Social Security Number
                </TableCell>
                <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                  <input type="number" required value={data.social_security_number ?? 'N/A'} name='social_security_number' onClick={handleCheck} onChange={handleChange} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="py-3 text-secondary-foreground font-normal">
                  Resident License State
                </TableCell>
                <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                  <div className="p-4">
                    <select
                      className="border rounded-lg p-2 w-full"
                      name="resident_license_state_id"
                      value={selectedState ? selectedState.id : ""}
                      onChange={(e) => {
                        setSelectedState(e.target.value); // updates state
                        handleChange(e); // call your custom handler
                      }}
                      required
                    >
                      <option value="">
                        {selectedState?.name || "-- Select State --"}
                      </option>

                      {states.map((states) => (
                        <option key={states.id} value={states.id}>
                          {states.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="py-3 text-secondary-foreground font-normal">
                  Other States I'm Licensed In (if applicable)
                </TableCell>

                <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                  <div className="w-full p-4">
                    {/* Selected tags */}
                    {safeSelectedOtherState.length > 0 && (
                      <div className="flex flex-wrap gap-2 border rounded-lg p-2 min-h-[45px] cursor-pointer">
                        {safeSelectedOtherState.map((state) => (
                          <span
                            key={state.id}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1 text-sm"
                          >
                            {state.name}
                            <button
                              type="button"
                              onClick={() => removeState(state.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    )}


                    {/* Dropdown */}
                    <div className="relative mt-2" ref={dropdownRef}>
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                          setQuery(e.target.value);
                          setOpen(true);
                        }}
                        onFocus={() => setOpen(true)}
                        placeholder="Select State"
                        className="border rounded-lg p-2 w-full"
                      />

                      {open && (
                        <div className="absolute z-10 bg-white border rounded-lg w-full max-h-40 overflow-y-auto">
                          {states.filter((s) =>
                            s.name.toLowerCase().includes(query.toLowerCase())
                          ).length === 0 ? (
                            <div className="p-2 text-gray-400">No results</div>
                          ) : (
                            states
                              .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
                              .map((state) => (
                                <div
                                  key={state.id}
                                  className="p-2 cursor-pointer hover:bg-gray-100"
                                  onClick={() => {
                                    toggleState(state);
                                    setQuery(""); // reset input
                                    setOpen(false);
                                  }}
                                >
                                  {state.name}
                                </div>
                              ))
                          )}
                        </div>
                      )}
                    </div>

                  </div>
                </TableCell>

              </TableRow>

              <TableRow>
                <TableCell className="py-3 text-secondary-foreground font-normal">
                  Are you working with an immediate upline?
                </TableCell>
                <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                  <div className="p-4">
                    <select
                      className="border rounded-lg p-2 w-full"
                      name="resident_license_state_id"
                      value={selectedUpline} // controlled by state
                      onChange={(e) => {
                        setSelectedUpline(e.target.value);
                        handleChange(e);
                      }}
                      required
                    >
                      {/* Show dynamic placeholder only if no value is set */}
                      {!selectedUpline && (
                        <option value="">-- Working with Upline? --</option>
                      )}

                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>

                    {(selectedUpline === "1" || data.working_with_upline === 1) && (
                      <div className="w-full py-4">
                        {/* Selected tags */}
                        {selectedUplines.length > 0 && (
                          <div className="flex flex-wrap gap-2 border rounded-lg p-2 min-h-[45px] cursor-pointer">
                            {selectedUplines.map((upline) => (
                              <span
                                key={upline.id}
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1 text-sm"
                              >
                                {upline.name}
                                <button
                                  type="button"
                                  // Use the single toggleUpline function to remove
                                  onClick={() => toggleUpline(upline)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  ✕
                                </button>
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Dropdown */}

                        <div className="relative mt-2" ref={uplineDropdownRef}>
                          <input
                            type="text"
                            value={uplineQuery}
                            onChange={(e) => {
                              setUplineQuery(e.target.value);
                              setUplineOpen(true);
                            }}
                            onFocus={() => setUplineOpen(true)}
                            placeholder="Select Upline"
                            className="border rounded-lg p-2 w-full"
                          />

                          {uplineOpen && (
                            <div className="absolute z-10 bg-white border rounded-lg w-full max-h-40 overflow-y-auto">
                              {/* Combine filters: by query and by selection */}
                              {uplines
                                .filter((upline) =>
                                  upline.name.toLowerCase().includes(uplineQuery.toLowerCase())
                                )
                                .filter(
                                  (upline) =>
                                    !selectedUplines.some((selected) => selected.id === upline.id)
                                ).length === 0 ? (
                                <div className="p-2 text-gray-400">No results</div>
                              ) : (
                                uplines
                                  .filter((upline) =>
                                    upline.name.toLowerCase().includes(uplineQuery.toLowerCase())
                                  )
                                  .filter(
                                    (upline) =>
                                      !selectedUplines.some((selected) => selected.id === upline.id)
                                  )
                                  .map((upline) => (
                                    <div
                                      key={upline.id}
                                      className="p-2 cursor-pointer hover:bg-gray-100"
                                      onClick={() => {
                                        toggleUpline(upline);
                                        setUplineQuery("");
                                        setUplineOpen(false);
                                      }}
                                    >
                                      {upline.name}
                                    </div>
                                  ))
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {(selectedUpline === "0" || data.working_with_upline === 0) && (
                      <div className='py-2 justify-end' style={{ fontSize: '12px' }}>
                        Want to add an Upline? <span className='px-1' onClick={() => setIsModalOpen(true)} style={{ color: "red", textDecoration: "underline", cursor: 'pointer' }}>Click Here</span>
                      </div>
                    )}

                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="py-3 text-secondary-foreground font-normal">
                  Do you have an active E&O policy?
                </TableCell>
                <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                  <div className="p-4">
                    <select
                      className="border rounded-lg p-2 w-full"
                      name="resident_license_state_id"
                      value={selectedEOpolicy} // controlled by state
                      onChange={(e) => {
                        setSelectedEOpolicy(e.target.value);
                        handleChange(e);
                      }}
                      required
                    >
                      {/* Show dynamic placeholder only if no value is set */}
                      {!selectedEOpolicy && (
                        <option value="">-- Select E&O Policy --</option>
                      )}

                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                    {(selectedEOpolicy === "1" || data.active_eo_policy === 1) && (
                      <div className="my-3 w-full">
                        {pdfFile ? (
                          <div>
                            <a
                              href={URL.createObjectURL(pdfFile)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className='text-blue-500 flex'
                            >
                              View File
                              <File style={{width: '15px'}}/>
                            </a>
                          </div>
                        ) : null}
                        <label
                          htmlFor="pdfUpload"
                          className="border rounded-lg p-2 w-full block text-center cursor-pointer bg-blue-100 hover:bg-blue-200"
                        >
                          Upload PDF
                        </label>
                        <input
                          id="pdfUpload"
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={(e) => setPdfFile(e.target.files[0])} // handle file here
                        />
                        <div className="text-right pt-2" style={{ fontSize: '12px' }}>
                          Don’t have E&0?
                          <Link
                            to="https://www.calsurance.com/thebrokerage"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='px-1'
                            style={{ color: "red", textDecoration: "underline" }}
                          >
                            Signup Here
                          </Link>
                        </div>
                      </div>

                    )}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              style={{ cursor: 'pointer' }}
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
    </form>
  );
};

const Bio = () => {
  const [update, setUpdate] = useState(false);
  const [dataupdated, setDataUpdated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const id = Number(user.id); // ya parseInt(user.id, 10)
  const [errors, setErrors] = useState({});

  // const [file, setFile] = useState(null);

  // const handleFileChange = (e) => {
  //   // e.target.files is a FileList, we take the first file
  //   setFile(e.target.files[0]);
  // };


  useEffect(() => {
    // console.log("Hello world")
    handleAutoFetch();
  }, []);
  const handleAutoFetch = async () => {
    console.log("Fetching agents data...");
    setLoading(true);
    setMessage("");
    setErrors({});


    getAgentById(id)
      .then((response) => {
        const agentsArray = response.data.agent;
        setData(agentsArray || []);
      })
      .catch((err) => console.error("Error fetching users:", err));

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setUpdate(true);
  };

  // console.log("Data to update:", data);
  const handleSave = async () => {
    console.log("Updating agent data...");
    setLoading(true);
    setMessage("");
    setErrors({});

    try {
      const apiUrl = import.meta.env.VITE_API_URL; // or your base API URL
      const token = localStorage.getItem("token");
      const agentId = data.id; // assuming you have agentId in data

      // Create FormData
      const formData = new FormData();
      formData.append("description", data.description);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("gender", data.gender);
      formData.append("npn", data.npn);
      formData.append("dob", data.dob);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("_method", "PUT"); // tell backend it's a PUT request
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      updateAgent(formData, agentId, token)
        .then((response) => {
          console.log("Agent updated successfully:", response.data);
          setMessage("Agent updated successfully");
        })
        .catch((error) => {
          console.error("Error updating agent:", error);
          setErrors({ general: error.message });
        });
      setTimeout(() => navigate(0), 2000); // Refresh page after 2 seconds

    } catch (err) {
      console.error("Error updating user:", err);
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
    setIsOpen(false);
    setUpdate(false);
    setDataUpdated(true);
    useEffect(() => { handleAutoFetch(); }, [])
  };

  const handleCheck = (e) => {
    const { name, value } = e.target;

    if (value === 'N/A' || value === 'null') {
      setData((prev) => ({
        ...prev,
        [name]: ''   // dynamically clear whichever field was clicked
      }));
    }
  };

  const WORD_LIMIT = 150;
  return (
    <Card className="min-w-full">
      <CardHeader>
        <CardTitle>Bio</CardTitle>
        {update ?
          <Button onClick={() => setIsOpen(true)} className="bg-blue-500 ps-3 text-white hover:bg-blue-600 cursor-pointer ">Update</Button>
          :
          <div className='flex'>
            <div className={dataupdated ? "text-green-500 pt-2 pe-1" : "hidden"} style={{ fontSize: '12px' }}>Successfully Updated!</div>
            <Button disabled className="bg-gray-500 text-white">Update</Button>
          </div>
        }
        {isOpen && (
          <div className="fixed inset-0 flex max-h-sm justify-center backdrop-blur-sm bg-opacity-50 z-50" onClick={() => setIsOpen(false)}>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full" style={{ height: '12rem' }}>
              <h2 className="text-xl font-bold mb-4">Update Licensing Info</h2>
              <p className="text-gray-600">Are You sure You want to update this data?</p>

              <div className="flex justify-evenly mt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className="kt-scrollable-x-auto pb-3 p-0">
        <Table className="align-middle text-sm text-muted-foreground">
          <TableBody>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                <textarea
                  value={data.description ?? "N/A"}
                  name="description"
                  onClick={handleCheck}
                  onChange={(e) => {
                    const words = e.target.value.trim().split(/\s+/);
                    if (words.length <= WORD_LIMIT) {
                      handleChange(e); // ✅ your existing change handler
                    }
                  }}
                  style={{
                    width: "100%",
                    minHeight: "100px",
                    resize: "none",
                    overflow: "hidden"
                  }}
                  rows={1}
                  onInput={(e) => {
                    e.target.style.height = "auto"; // Reset height
                    e.target.style.height = e.target.scrollHeight + "px"; // Set new height
                  }}
                />
                <p>
                  {data.description
                    ? data.description.trim().split(/\s+/).length
                    : 0}{" "}
                  / {WORD_LIMIT} words
                </p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
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
    </Card>
  );
};

const LoginInfo = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const id = Number(user.id); // ya parseInt(user.id, 10)

  const [errors, setErrors] = useState({});
  useEffect(() => {
    // console.log("Hello world")
    handleAutoFetch();
  }, []);
  const handleAutoFetch = async () => {
    console.log("Fetching agents data...");
    setLoading(true);
    setMessage("");
    setErrors({});


    getAgentById(id)
      .then((response) => {
        const agentsArray = response.data.agent;
        setData(agentsArray || []);
      })
      .catch((err) => console.error("Error fetching users:", err));

  };

  const handleSendResetPassRequest = async () => {
    setLoading(true);
    setMessage("");
    setErrors({});


    try {

      const apiUrl = import.meta.env.VITE_API_URL;


      const response = await fetch(`${apiUrl}/forgot-password`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          platform: "admin"
        },
        body: JSON.stringify({
          email: data.email
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send reset email');
      }

      setMessage("Password reset email sent. Please check your inbox.");
      setShowAlert(true);

    } catch (error) {
      console.error("Error sending password reset email:", error);
      setErrors({ general: error.message || "Failed to send reset email" });
    } finally {
      setLoading(false);
    }


  };
  return (

    <Card className="min-w-full">
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
            <span className="font-medium">Check your email!</span>
            <span className="ml-2">We’ve sent you instructions to reset your password.</span>
          </div>
        </div>
      ) : null}
      <CardHeader>
        <CardTitle>Login Info</CardTitle>
      </CardHeader>
      <CardContent className="kt-scrollable-x-auto pb-3 p-0">
        <Table className="align-middle text-sm text-muted-foreground">
          <TableBody>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                Email
              </TableCell>
              <TableCell className="py-2 text-foreground font-normaltext-sm">
                {data.email || 'N/A'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Password
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                <Button onClick={handleSendResetPassRequest} className="bg-blue-500 ps-3 text-white hover:bg-blue-600 cursor-pointer">
                  Reset Password
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const BankInfo = () => {

  const id = Number(user.id); // ya parseInt(user.id, 10)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [isOpen, setIsOpen] = useState(false); // confirm modal
  const [create, setCreate] = useState(false); // create vs update mode
  const [update, setUpdate] = useState(false); // track unsaved edits
  const [showErrors, setShowErrors] = useState(false);
  const [showUpdate, setShowUpdate] = useState(true);
  const [dataupdated, setDataupdated] = useState(false); // track if data was updated

  useEffect(() => {
    // console.log("Hello world")
    handleAutoFetch();
  }, []);
  // Fetch licensing info for the agent
  const handleAutoFetch = async () => {
    setLoading(true);
    setMessage("");
    setErrors({});

    try {
      const response = await getAgentById(id);
      // console.log("Fetched agent data:", response.data);
      const licenseArray = response.data.agent.bankInfo;
      // console.log("License Array:", licenseArray);
      setData(licenseArray || {});
      if (!licenseArray || Object.keys(licenseArray).length === 0) {
        setCreate(true); // No data means we are in create mode
      }

    } catch (err) {
      console.error("Error fetching agent:", err);
      setErrors({ general: err?.message || "Failed to fetch license info" });
      // Still prepare an empty form in create mode
      setData({ id });
      setCreate(true);
    } finally {
      setLoading(false);
      setUpdate(false);
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setUpdate(true);
    setMessage("");
  };


  useEffect(() => {
    if (!showErrors) {

      const isValid = Boolean(
        data.account_holder &&
        data.bank_name &&
        data.account_number &&
        data.routing_number &&
        data.address &&
        data.account_type
      );
      console.log("data.account_holder", data.account_holder);
      console.log("data.bank_name", data.bank_name);
      console.log("data.account_number", data.account_number);
      console.log("routing_number", data.routing_number);
      console.log("address", data.address);
      console.log("account_type", data.account_type);
      setShowErrors(isValid);   // update state
      console.log("error isValid (calculated):", isValid); // always correct
    } else {


      const updateisValid = Boolean(
        data.account_holder ||
        data.bank_name ||
        data.account_number ||
        data.routing_number ||
        data.address ||
        data.account_type
      );
      setShowUpdate(!updateisValid);
      console.log("error (calculated):", updateisValid); // always correct
    }

    // console.log("data", data);
    // console.log("selectedOtherState", selectedOtherState);
    // console.log("selectedUpline", selectedUpline);
    // console.log("selectedEOpolicy", selectedEOpolicy);

  }, [
    data.account_holder,
    data.bank_name,
    data.account_number,
    data.routing_number,
    data.address,
    data.account_type
  ]);

  const submitCreate = async () => {
    setLoading(true);
    setMessage("");
    setErrors({});
    try {
      const formData = {
        user_id: id,
        account_holder: data.account_holder,
        bank_name: data.bank_name,
        account_number: data.account_number,
        routing_number: data.routing_number,
        account_type: data.account_type, // Assuming account_type is a string
        address: data.address,
      }; // Use the current state data
      console.log("Submitting create with data:", formData);

      await createBankInfo(formData);

      setMessage("License info created successfully");
      setDataupdated(true); // Set to true to indicate data was updated
      setUpdate(false);
      setIsOpen(false);
      console.log("data updated:", dataupdated);
      // refresh from server
      setTimeout(() => setDataupdated(false), 3000);
      setTimeout(() => navigate(0), 2000); // Refresh page after 2 seconds

      await handleAutoFetch();
    } catch (error) {
      console.error("Error creating license info:", error);
      setErrors({ general: error?.message || "Create failed" });
    } finally {
      setLoading(false);
    }
  };

  const submitUpdate = async () => {
    setLoading(true);
    setMessage("");
    setErrors({});
    try {
      const formData = new FormData();
      formData.append("user_id", id);
      formData.append("account_holder", data.account_holder);
      formData.append("bank_name", data.bank_name);
      formData.append("account_number", data.account_number);
      formData.append("routing_number", data.routing_number);
      formData.append("account_type", data.account_type); // Assuming account_type is a string
      formData.append("address", data.address);
      formData.append("_method", "PUT"); // if your backend needs method spoofing

      await updateBankInfo(formData, data.id);

      setMessage("License info updated successfully");
      setDataupdated(true); // Set to true to indicate data was updated
      setUpdate(false);
      setIsOpen(false);
      setTimeout(() => setDataupdated(false), 3000);
      setTimeout(() => navigate(0), 2000); // Refresh page after 2 seconds

      // refresh from server
      await handleAutoFetch();
    } catch (error) {
      console.error("Error updating license info:", error);
      setErrors({ general: error?.message || "Update failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = (e) => {
    const { name, value } = e.target;

    if (value === 'N/A') {
      setData((prev) => ({
        ...prev,
        [name]: ''   // dynamically clear whichever field was clicked
      }));
    }
  };

  const onConfirmUpdate = async () => {
    if (create) await submitCreate();
    else await submitUpdate();
  };
  return (
    <form action="">

      <Card className="min-w-full">
        <CardHeader>
          <CardTitle>Bank Info</CardTitle>
          {showUpdate ? (
            update ? (
              showErrors ? (
                <a
                  onClick={() => setIsOpen(true)}
                  className="bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 cursor-pointer"
                  style={{ borderRadius: '7px' }}
                >
                  Update
                </a>
              ) : (
                <Button
                  type="submit"
                  className="bg-yellow-500 ps-3 text-white hover:bg-blue-600 cursor-pointer"
                >
                  Update
                </Button>
              )
            ) : (
              <div className="flex">
                <div
                  className={dataupdated ? "text-green-500 pt-2 pe-1" : "hidden"}
                  style={{ fontSize: "12px" }}
                >
                  Successfully Updated!
                </div>
                <Button disabled className="bg-gray-500 text-white">Update</Button>
              </div>
            )
          ) : (
            update ? (
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 cursor-pointer"
                style={{ borderRadius: "7px" }}
              >
                Update
              </button>

            ) : (
              <div className="flex">
                <div
                  className={dataupdated ? "text-green-500 pt-2 pe-1" : "hidden"}
                  style={{ fontSize: "12px" }}
                >
                  Successfully Updated!
                </div>
                <Button disabled className="bg-gray-500 text-white">Update</Button>
              </div>
            )
          )}

          {isOpen && (
            <div className="fixed inset-0 flex max-h-sm justify-center backdrop-blur-sm bg-opacity-50 z-50" onClick={() => setIsOpen(false)}>
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full" style={{ height: '12rem' }}>
                <h2 className="text-xl font-bold mb-4">Update Licensing Info</h2>
                <p className="text-gray-600">Are You sure You want to update this data?</p>

                <div className="flex justify-evenly mt-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-red-400 text-white rounded hover:bg-blue-700"
                  >
                    Cancel
                  </button>
                  {create ?
                    <button
                      onClick={submitCreate}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Update
                    </button>
                    :
                    <button
                      onClick={submitUpdate}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Update
                    </button>
                  }
                </div>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="kt-scrollable-x-auto pb-3 p-0">
          <Table className="align-middle text-sm text-muted-foreground">
            <TableBody>
              <TableRow>
                <TableCell className="py-2 text-secondary-foreground font-normal">
                  Account Holder:
                </TableCell>
                <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                  <input type="text" value={data.account_holder ?? 'N/A'} name='account_holder' onClick={handleCheck} onChange={handleChange} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="py-3 text-secondary-foreground font-normal">
                  Bank Name:
                </TableCell>
                <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                  <input type="text" value={data.bank_name ?? 'N/A'} name='bank_name' onClick={handleCheck} onChange={handleChange} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="py-3 text-secondary-foreground font-normal">
                  Account Number:
                </TableCell>
                <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                  <input type="text" value={data.account_number ?? 'N/A'} name='account_number' onClick={handleCheck} onChange={handleChange} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="py-3 text-secondary-foreground font-normal">
                  Routing Number:
                </TableCell>
                <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                  <input type="text" value={data.routing_number ?? 'N/A'} name='routing_number' onClick={handleCheck} onChange={handleChange} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="py-3 text-secondary-foreground font-normal">
                  Account Type:
                </TableCell>
                <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                  {/* <input type="text" value={data.account_type ?? 'N/A'} name='account_type' onChange={handleChange} /> */}
                  <div className="py-4">
                    <select
                      className="border rounded-lg p-2 w-full"
                      name="account_type"
                      value={data.account_type || ""}
                      onChange={handleChange}
                      required
                    >
                      {/* Show only when gender is not selected */}
                      {!data.gender && (
                        <option value="">
                          -- Select Gender --
                        </option>
                      )}

                      <option value="checking">Checking</option>
                      <option value="savings">Savings</option>
                    </select>

                  </div>
                </TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell className="py-3 text-secondary-foreground font-normal">
                  Address:
                </TableCell>
                <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                  <input type="text" value={data.address ?? 'N/A'} name='address' onChange={handleChange} />
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </form>
  );
};




export { PersonalInfo, LicensingInfo, Bio, CommunityBadges, LoginInfo, BankInfo };
