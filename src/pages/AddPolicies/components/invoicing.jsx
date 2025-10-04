import React from "react";

export function Invoicing() {
  return (
    <div className="min-h-screen items-center justify-center p-4">

      <h1 className="font-bold">Client Info</h1>
      <div className="w-full max-w-6xl border bg-white shadow-md rounded-xl p-6 my-3 space-y-8">
        {/* Record Type Section */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Select Record Type
          </label>
          <select className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option>Select Record Type</option>
          </select>
        </div>
      </div>

      <h1 className="font-bold mt-7">Policy Info</h1>
      <div className="w-full max-w-6xl border bg-white shadow-md rounded-xl p-6 my-3 space-y-8">
        {/* Policy Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Policy Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Carrier */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                Carrier <span className="text-red-500">*</span>
              </label>
              <select className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>Type your name</option>
              </select>
            </div>

            {/* Policy Number */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                Policy Number
              </label>
              <input
                type="text"
                placeholder="Type your name"
                className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>Type</option>
              </select>
            </div>

            {/* Coverage Type */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                Coverage Type <span className="text-red-500">*</span>
              </label>
              <select className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>coverage type</option>
              </select>
            </div>

            {/* Effective Date */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                Effective Date
              </label>
              <input
                type="date"
                className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Agent/Agency */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                Agent/Agency
              </label>
              <input
                type="text"
                placeholder="Type to Search"
                className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

      </div>
      <div className="w-full max-w-6xl bg-white p-6 my-3 space-y-8">
        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
            Cancel
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
