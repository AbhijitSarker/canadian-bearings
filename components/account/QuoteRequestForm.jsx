"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { X, FileText, Eye } from "lucide-react";

export default function QuoteRequestForm({ initialUser, onClose, onSubmit }) {
  const [form, setForm] = useState({
    firstName: initialUser?.firstName || "",
    lastName: initialUser?.lastName || "",
    email: initialUser?.email || "",
    phoneCountryCode: "+1",
    phoneNumber: "(555) 000-0000",
    comment: "",
  });

  const [lines, setLines] = useState([
    { id: 1, part: "", description: "", qty: 1, files: [] },
    { id: 2, part: "", description: "", qty: 1, files: [] }
  ]);

  const [imageModal, setImageModal] = useState(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const addLine = () => {
    setLines((prev) => [
      ...prev,
      { id: prev.length ? prev[prev.length - 1].id + 1 : 1, part: "", description: "", qty: 1, files: [] },
    ]);
  };

  const removeLine = (id) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  };

  const updateLine = (id, key, value) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, [key]: value } : l)));
  };

  const handleFiles = (id, newFiles) => {
    const fileArray = Array.from(newFiles);
    const validFiles = fileArray.filter(file => {
      const isValidType = file.type === "application/pdf" || file.type.startsWith("image/");
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!isValidType) {
        toast.error(`${file.name} is not a valid file type. Only images and PDFs are allowed.`);
        return false;
      }
      
      if (file.size > maxSize) {
        toast.error(`${file.name} is too large. Maximum file size is 10MB.`);
        return false;
      }
      
      return true;
    });

    if (validFiles.length > 0) {
      setLines((prev) => prev.map((l) => 
        l.id === id ? { ...l, files: [...l.files, ...validFiles] } : l
      ));
      toast.success(`${validFiles.length} file(s) added`);
    }
  };

  const removeFile = (lineId, fileIndex) => {
    setLines((prev) => prev.map((l) => 
      l.id === lineId 
        ? { ...l, files: l.files.filter((_, idx) => idx !== fileIndex) } 
        : l
    ));
  };

  const viewImage = (file) => {
    const url = URL.createObjectURL(file);
    setImageModal({ url, name: file.name });
  };

  const viewPdf = (file) => {
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
  };

  const prepareFormDataForServer = () => {
    const formData = new FormData();
    
    // Add basic form fields
    formData.append('firstName', form.firstName);
    formData.append('lastName', form.lastName);
    formData.append('email', form.email);
    formData.append('phoneCountryCode', form.phoneCountryCode);
    formData.append('phoneNumber', form.phoneNumber);
    formData.append('comment', form.comment);
    
    // Add line items with their files
    lines.forEach((line, index) => {
      formData.append(`lines[${index}].id`, line.id);
      formData.append(`lines[${index}].part`, line.part);
      formData.append(`lines[${index}].description`, line.description);
      formData.append(`lines[${index}].qty`, line.qty);
      
      // Add files for this line
      line.files.forEach((file, fileIndex) => {
        formData.append(`lines[${index}].files[${fileIndex}]`, file, file.name);
      });
    });
    
    return formData;
  };

  const resetForm = () => {
    setForm({
      firstName: initialUser?.firstName || "",
      lastName: initialUser?.lastName || "",
      email: initialUser?.email || "",
      phoneCountryCode: "+1",
      phoneNumber: "(555) 000-0000",
      comment: "",
    });
    setLines([
      { id: 1, part: "", description: "", qty: 1, files: [] },
      { id: 2, part: "", description: "", qty: 1, files: [] }
    ]);
    setImageModal(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.firstName || !form.lastName) {
      toast.error("Please enter your first and last name.");
      return;
    }
    
    if (!form.email) {
      toast.error("Please enter your email.");
      return;
    }
    
    if (!form.phoneNumber) {
      toast.error("Please enter your phone number.");
      return;
    }
    
    // Validate at least one line has data
    const validLines = lines.filter(l => l.part || l.description);
    if (validLines.length === 0) {
      toast.error("Please add at least one product line.");
      return;
    }
    
    // Validate quantities are positive numbers
    const invalidQty = lines.some(l => (l.part || l.description) && (l.qty <= 0 || isNaN(l.qty)));
    if (invalidQty) {
      toast.error("Please enter valid quantities for all product lines.");
      return;
    }
    
    // Prepare data for server
    const formData = prepareFormDataForServer();
    
    console.log("Quote submitted - FormData ready for server");
    console.log("Form data:", { form, lines });
    
    // Call the parent's onSubmit callback with FormData
    if (onSubmit) {
      const success = await onSubmit({ form, lines, formData, resetForm });
      // Only close if submission was successful and onClose is defined
      // For standalone pages, onClose might not trigger redirect
      if (success && onClose) {
        onClose();
      }
    } else {
      // Fallback if no onSubmit handler
      toast.success("Quote request submitted — our team will contact you shortly.");
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <form className="space-y-6 border p-6 rounded-lg shadow-sm" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-gray-900">Request for Quote</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">First Name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleFormChange}
            className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="First name"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Last Name</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleFormChange}
            className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Last name"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <div className="relative mt-1">
            <input
              name="email"
              value={form.email}
              onChange={handleFormChange}
              className="block w-full rounded-md border border-gray-200 px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="hello@example.com"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <div className="flex items-center gap-2 mt-1">
            <select
              name="phoneCountryCode"
              value={form.phoneCountryCode}
              onChange={handleFormChange}
              className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleFormChange}
              className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="(555) 000-0000"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Comment</label>
        <textarea
          name="comment"
          value={form.comment}
          onChange={handleFormChange}
          className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Placeholder text..."
        />
      </div>

      {/* Quote lines table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Serial</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Part</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Description</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Qty</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Upload Image (jpg / pdf)</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, idx) => (
              <tr key={line.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900 align-middle">{idx + 1}</td>
                <td className="px-4 py-3">
                  <input
                    value={line.part}
                    onChange={(e) => updateLine(line.id, "part", e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Part"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    value={line.description}
                    onChange={(e) => updateLine(line.id, "description", e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Description"
                  />
                </td>
                <td className="px-4 py-3 w-24">
                  <input
                    type="number"
                    min="1"
                    value={line.qty}
                    onChange={(e) => updateLine(line.id, "qty", parseInt(e.target.value) || 1)}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="1"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="space-y-2">
                    <label className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-md cursor-pointer text-sm font-medium hover:bg-green-700">
                      Upload Image/Pdf
                      <input
                        type="file"
                        multiple
                        accept="image/*,.pdf"
                        onChange={(e) => e.target.files && handleFiles(line.id, e.target.files)}
                        className="hidden"
                      />
                    </label>
                    
                    {line.files.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {line.files.map((file, fileIndex) => {
                          const isImage = file.type.startsWith("image/");
                          const isPdf = file.type === "application/pdf";
                          
                          return (
                            <div 
                              key={fileIndex} 
                              className="relative group border border-gray-200 rounded-md p-2 bg-white hover:shadow-md transition-shadow"
                            >
                              {isImage ? (
                                <div className="relative">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="w-16 h-16 object-cover rounded cursor-pointer"
                                    onClick={() => viewImage(file)}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => viewImage(file)}
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50 rounded transition-all opacity-0 group-hover:opacity-100"
                                  >
                                    <Eye className="w-5 h-5 text-white" />
                                  </button>
                                </div>
                              ) : isPdf ? (
                                <div 
                                  className="w-16 h-16 flex flex-col items-center justify-center cursor-pointer"
                                  onClick={() => viewPdf(file)}
                                >
                                  <FileText className="w-8 h-8 text-red-600" />
                                  <span className="text-xs text-gray-600 mt-1">PDF</span>
                                </div>
                              ) : null}
                              
                              <button
                                type="button"
                                onClick={() => removeFile(line.id, fileIndex)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-md"
                                aria-label={`Remove ${file.name}`}
                              >
                                <X className="w-3 h-3" />
                              </button>
                              
                              <p className="text-xs text-gray-600 mt-1 truncate max-w-[64px]" title={file.name}>
                                {file.name}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => removeLine(line.id)}
                    className="text-red-500 hover:text-red-700 text-lg"
                    aria-label={`Remove line ${idx + 1}`}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-4">
        <button 
          type="button" 
          onClick={addLine} 
          className="px-4 py-2 rounded-md border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Add Line
        </button>

        <div className="ml-auto flex items-center gap-3">
          {onClose && (
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button 
            type="submit" 
            className="bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500">Please fill out the above form to connect directly with our sales team. Alternatively, you may email your request to sales@canadianbearings.com or call 905-670-6700</p>

      {/* Image Modal */}
      {imageModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={() => setImageModal(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              type="button"
              onClick={() => setImageModal(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={imageModal.url}
              alt={imageModal.name}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <p className="text-white text-center mt-2">{imageModal.name}</p>
          </div>
        </div>
      )}
    </form>
  );
}
