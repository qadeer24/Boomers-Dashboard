
import React, { useState, useRef, useEffect } from "react";
import { File, Users, Link } from "lucide-react"; // Importing Lucide React icons
import { getAgents } from '@/utils/agentService';
import { format } from 'date-fns';
import { formatDistanceToNow } from 'date-fns';
import { getUplineById, getUplines } from "@/utils/agentService";


export function ProfileDefaultContent() {

  const [uplines, setUplines] = useState([]);
  const [agents, setAgents] = useState([]);


  const [selectedUpline, setSelectedUpline] = useState(null);
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [uplineQuery, setUplineQuery] = useState("");
  const [agentQuery, setAgentQuery] = useState("");
  const [uplineOpen, setUplineOpen] = useState(false);
  const [agentOpen, setAgentOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [errors, setErrors] = useState(false);

  const uplineDropdownRef = useRef(null);
  const agentDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (uplineDropdownRef.current && !uplineDropdownRef.current.contains(event.target)) {
        setUplineOpen(false);
      }
      if (agentDropdownRef.current && !agentDropdownRef.current.contains(event.target)) {
        setAgentOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    handleAutoFetch();
    handleAutoFetchUplines();
  }, []);

  const handleAutoFetch = async () => {
    console.log("Fetching agents data...");
    setLoading(true);
    setMessage("");
    setErrors({});

    // getprofileStatus()
    //   .then((status) => {
    //     console.log("Profile status data fetched successfully:", status);
    //   });

    getAgents()
      .then((data) => {
        const agentsArray = data.data.agents;
        console.log("agentsArray", agentsArray);

        const formattedData = agentsArray.map((agent, index) => ({
          id: agent.id, // Unique ID
          firstName: agent.firstName || 'N/A',
          lastName: agent.lastName || 'N/A',
          email: agent.email || 'N/A',
          npn: agent.npn || 'N/A',
          time: agent.createdAt ? format(agent.createdAt, "h:mma").toLowerCase() : "N/A",
          relativeTime: agent.createdAt ? formatDistanceToNow(agent.createdAt, { addSuffix: true }) : "N/A",

          status: agent.status,
          isEmailVerified: agent.isEmailVerified,
        }));

        setAgents(formattedData);
        // console.log("Agents data fetched successfully:", formattedData);
      })
      .catch((err) => console.error("Error fetching users:", err));

  };

  const handleAutoFetchUplines = async () => {
    console.log("Fetching agents data...");
    setLoading(true);
    setMessage("");
    setErrors({});
    getUplines()
    .then((response) => {
      const UplinesArray = response.data.uplines;
      setUplines(UplinesArray);
      console.log("Uplines:", UplinesArray);
    })
      .catch((err) => console.error("Error fetching uplines:", err));
  }
  // Helper function to handle a single selection (Upline)
  const handleUplineSelect = (upline) => {
    setSelectedUpline(upline);
    setUplineQuery("");
    setUplineOpen(false);
  };

  // Helper function to handle multi-selection (Agents)
  const handleAgentToggle = (agent) => {
    setSelectedAgents((prev) =>
      prev.some((a) => a.id === agent.id)
        ? prev.filter((a) => a.id !== agent.id)
        : [...prev, agent]
    );
  };
  const [selectedAgent, setSelectedAgent] = useState(null);

  // This helper function now handles a single selection
  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent);
    setAgentQuery("");
    setAgentOpen(false);
  };

  const handleAssign = () => {
    if (selectedUpline && selectedAgent) {
      console.log(`Assigning upline ${selectedUpline.name} to agent: `, selectedAgent);
      alert(`Assigned ${selectedUpline.name} to ${selectedAgent.name}`);
      setSelectedUpline(null);
      setSelectedAgent(null);
    } else {
      alert("Please select an upline and an agent.");
    }
  };


  return (
    <>
      <div className="flex flex-col items-center p-8 ">
        <div className="w-full max-w-4xl p-8 bg-white rounded-xl ">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Assign Upline
          </h2>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 md:grid-cols-9 gap-4 md:gap-4 items-center">

            {/* Upline Column (Now spans 4 columns) */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 relative md:col-span-4">
              <h3 className="text-lg font-semibold mb-4 text-blue-800 flex items-center">
                <File size={20} className="mr-2" />
                Select an Upline
              </h3>
              {selectedUpline ? (
                <div className="p-3 bg-blue-100 rounded-lg flex items-center justify-between text-blue-800">
                  <span className="font-medium">{selectedUpline.name}</span>
                  <button
                    onClick={() => setSelectedUpline(null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="relative" ref={uplineDropdownRef}>
                  <input
                    type="text"
                    value={uplineQuery}
                    onChange={(e) => { setUplineQuery(e.target.value); setUplineOpen(true); }}
                    onFocus={() => setUplineOpen(true)}
                    placeholder="Search for an upline..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {uplineOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {uplines
                        .filter((u) => u.name.toLowerCase().includes(uplineQuery.toLowerCase()))
                        .map((upline) => (
                          <div
                            key={upline.id}
                            className="p-3 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleUplineSelect(upline)}
                          >
                            {upline.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Link Icon in the center (Now spans 1 column - much narrower) */}
            <div className="hidden md:flex justify-center md:col-span-1">
              <Link size={40} className="text-gray-500 transform rotate-90 md:rotate-45" />
            </div>

            {/* Agent Column (Now spans 4 columns) */}
            <div className="bg-green-50 p-6 rounded-lg border border-green-200 md:col-span-4">
              <h3 className="text-lg font-semibold mb-4 text-green-800 flex items-center">
                <Users size={20} className="mr-2" />
                Assign to an Agent
              </h3>
              {selectedAgent ? (
                <div className="p-3 bg-green-100 rounded-lg flex items-center justify-between text-green-800">
                  <span className="font-medium">{selectedAgent.email}</span>
                  <button
                    onClick={() => setSelectedAgent(null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="relative" ref={agentDropdownRef}>
                  <input
                    type="text"
                    value={agentQuery}
                    onChange={(e) => {
                      setAgentQuery(e.target.value);
                      setAgentOpen(true);
                    }}
                    onFocus={() => setAgentOpen(true)}
                    placeholder="Search for an agent..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {agentOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {agents
                        .filter((a) => a.email.toLowerCase().includes(agentQuery.toLowerCase()))
                        .map((agent) => (
                          <div
                            key={agent.id}
                            className="p-3 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleAgentSelect(agent)}
                          >
                            {agent.email}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer with Assign Button */}
          <div className="mt-8 py-6 border-b border-gray-200 flex justify-center">
            <button
              onClick={handleAssign}
              // Check for a single selectedAgent object, not array length
              disabled={!selectedUpline || !selectedAgent}
              className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Assign Upline
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
