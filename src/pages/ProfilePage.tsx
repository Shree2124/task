import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  FaPhone,
  FaEnvelope,
  FaAddressBook,
  FaGlobe,
  FaCheckCircle,
} from "react-icons/fa";
import {
  MdLanguage,
  MdVerifiedUser,
  MdOutlineDocumentScanner,
  MdOutlineSettings,
  MdFilePresent,
} from "react-icons/md";
import "./Profile.css"

export const ProfileDetails = ({ profileData }: { profileData: any }) => {
  const details = profileData.details || {};
  const profileInfo = profileData.profileInfo || {};
  const [showModal, setShowModal] = useState(false);
  const [emailDetails, setEmailDetails] = React.useState({
    name: "",
    email: "",
    message: "",
  });
  
  const handleSendEmail = (e) => {
    e.preventDefault();
    console.log("Email Details:", emailDetails);
    setShowModal(false);
    emailDetails.name = ""
    emailDetails.message = ""
    emailDetails.email = ""
  };

  const {
    billingAddress,
    shippingAddress,
    customFields,
    capabilities,
    availability,
    spokenLanguages = [],
    websites = [],
    emailAddresses = [],
    phoneNumbers = [],
    stateLicenses = [],
    insurances = [],
    backgroundChecks = [],
    documentLinks = [],
  } = details;


  return (
    <div className="max-w-5xl mx-auto p-6 gap-3">
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-blue-100 shadow-md">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={profileInfo.imageURL || "/default-avatar.png"}
                alt={profileInfo.name || "Profile Image"}
              />
              <AvatarFallback>
                {profileInfo.name ? profileInfo.name.charAt(0) : "N/A"}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold text-blue-800">
                {profileInfo.name || "Not Available"}
              </CardTitle>
              <p className="text-gray-600">
                {profileInfo.bio || "No bio provided."}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition-all duration-200"
          >
            Send Email
          </button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-indigo-800">Capabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="text-left px-4 py-2">Capability</th>
                  <th className="text-left px-4 py-2">Enabled</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(capabilities || {}).map(([key, value]) => (
                  <tr key={key}>
                    <td className="px-4 py-2">{key}</td>
                    <td className="px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={value}
                        readOnly
                        className="form-checkbox h-4 w-4 text-indigo-600"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="bg-green-50 shadow-md">
          <CardHeader>
            <div className="flex items-center gap-2 text-green-800">
              <FaCheckCircle size={20} />
              <CardTitle>Availability</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-green-100">
                <tr>
                  <th className="text-left px-4 py-2">Day/Time</th>
                  <th className="text-left px-4 py-2">Available</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "monday",
                  "tuesday",
                  "wednesday",
                  "thursday",
                  "friday",
                  "saturday",
                  "sunday",
                ].map((day) => (
                  <tr key={day}>
                    <td className="px-4 py-2 capitalize">{day}</td>
                    <td className="px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={availability[day] || false}
                        readOnly
                        className="form-checkbox h-4 w-4 text-green-600"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 shadow-md">
          <CardHeader>
            <CardTitle className="text-yellow-800">Insurances</CardTitle>
          </CardHeader>
          <CardContent>
            {insurances.length > 0 ? (
              insurances.map((insurance) => (
                <p key={insurance._id} className="text-gray-700">
                  {insurance.carrier}: ${insurance.amount}
                </p>
              ))
            ) : (
              <p className="text-gray-700">
                No insurance information available
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-orange-50 shadow-md">
          <CardHeader>
            <div className="flex items-center gap-2 text-orange-800">
              <FaPhone size={20} />
              <CardTitle>Contact Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {phoneNumbers.length > 0 ? (
              phoneNumbers.map((phone, idx) => (
                <p key={idx} className="text-gray-700">
                  <strong>{phone.type}:</strong>{" "}
                  {phone.label || "Not Available"}{" "}
                  {phone.preferred && (
                    <Badge variant="outline">Preferred</Badge>
                  )}
                </p>
              ))
            ) : (
              <p className="text-gray-700">No phone numbers provided.</p>
            )}
            {emailAddresses.length > 0 ? (
              emailAddresses.map((email, idx) => (
                <p key={idx} className="text-gray-700">
                  <FaEnvelope className="inline mr-2 text-orange-700" />
                  <strong>Email ({email.type}):</strong>{" "}
                  {email.label || "Not Available"}
                </p>
              ))
            ) : (
              <p className="text-gray-700">No email addresses provided.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="bg-yellow-50">
          <CardHeader>
            <div className="flex items-center gap-2 text-yellow-800">
              <FaAddressBook size={20} />
              <CardTitle>Address Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <h4 className="font-semibold">Billing Address:</h4>
              <p className="text-gray-600">
                {billingAddress?.address1 || "No billing address provided."},{" "}
                {billingAddress?.city || "N/A"},{" "}
                {billingAddress?.state || "N/A"} {billingAddress?.zip || "N/A"}
              </p>
            </div>
            <Separator className="my-4" />
            <div>
              <h4 className="font-semibold">Shipping Address:</h4>
              <p className="text-gray-600">
                {shippingAddress?.address1 || "No shipping address provided."},{" "}
                {shippingAddress?.city || "N/A"},{" "}
                {shippingAddress?.state || "N/A"}{" "}
                {shippingAddress?.zip || "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-indigo-50">
          <CardHeader>
            <div className="flex items-center gap-2 text-indigo-800">
              <MdLanguage size={20} />
              <CardTitle>Languages</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              {spokenLanguages.length > 0
                ? spokenLanguages.join(", ")
                : "No languages specified."}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-teal-50">
          <CardHeader>
            <div className="flex items-center gap-2 text-teal-800">
              <FaGlobe size={20} />
              <CardTitle>Websites</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {websites.length > 0 ? (
              websites.map((url, idx) => (
                <a
                  href={url}
                  key={idx}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {url}
                </a>
              ))
            ) : (
              <p className="text-gray-700">No websites provided.</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-purple-50">
          <CardHeader>
            <div className="flex items-center gap-2 text-purple-800">
              <MdVerifiedUser size={20} />
              <CardTitle>State Licenses</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {stateLicenses.length > 0 ? (
              stateLicenses.map((license: any, idx: number) => (
                <p key={idx} className="text-gray-700">
                  {license.state}: {license.licenseNumber} (Expires:{" "}
                  {new Date(license.expirationDate).toLocaleDateString()} )
                </p>
              ))
            ) : (
              <p className="text-gray-700">No state licenses provided.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="bg-gray-50">
          <CardHeader>
            <div className="flex items-center gap-2 text-gray-800">
              <MdOutlineSettings size={20} />
              <CardTitle>Custom Fields</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {customFields && Object.keys(customFields).length > 0 ? (
              Object.entries(customFields).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <strong className="text-gray-800">{key}:</strong>{" "}
                  <span className="text-gray-600">{value}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No custom fields provided.</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardHeader>
            <div className="flex items-center gap-2 text-green-800">
              <MdOutlineDocumentScanner size={20} />
              <CardTitle>Background Checks</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {backgroundChecks && backgroundChecks.length > 0 ? (
              <table className="w-full border text-sm">
                <thead className="bg-green-100">
                  <tr>
                    <th className="border px-2 py-1 text-left">Provider</th>
                    <th className="border px-2 py-1 text-left">
                      Conducted Date
                    </th>
                    <th className="border px-2 py-1 text-left">
                      Expiration Date
                    </th>
                    <th className="border px-2 py-1 text-left">
                      Reference Number
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {backgroundChecks.map((check, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="border px-2 py-1">{check.provider}</td>
                      <td className="border px-2 py-1">
                        {new Date(check.conductedDate).toLocaleDateString()}
                      </td>
                      <td className="border px-2 py-1">
                        {new Date(check.expirationDate).toLocaleDateString()}
                      </td>
                      <td className="border px-2 py-1">
                        {check.referenceNumber}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600">No background checks available.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-red-50 mt-6">
        <CardHeader>
          <div className="flex items-center gap-2 text-red-800">
            <MdFilePresent size={20} />
            <CardTitle>Documents</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {documentLinks && documentLinks.length > 0 ? (
            documentLinks.map((doc, idx) => (
              <div key={idx} className="mb-2">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {doc.description || "Document"}
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No documents provided.</p>
          )}
        </CardContent>
      </Card>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="w-full max-w-lg bg-white rounded-lg shadow-lg transform scale-95 transition-transform duration-300"
            style={{ animation: "fadeIn 0.3s ease-in-out" }}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">Send Email</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSendEmail} className="p-4 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={emailDetails.name}
                  onChange={(e) =>
                    setEmailDetails({ ...emailDetails, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={emailDetails.email}
                  onChange={(e) =>
                    setEmailDetails({ ...emailDetails, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="p-3 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={emailDetails.message}
                  onChange={(e) =>
                    setEmailDetails({
                      ...emailDetails,
                      message: e.target.value,
                    })
                  }
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition-all duration-200"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
