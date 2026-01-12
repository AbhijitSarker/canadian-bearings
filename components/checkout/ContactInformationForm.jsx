'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Upload, Edit2 } from 'lucide-react';

const ContactInformationForm = ({ initialData, onSave, isEditMode = false }) => {
  const [formData, setFormData] = useState(initialData || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+1',
    accountDistribution: '',
    description: '',
    attachment: null,
  });

  const [isEditing, setIsEditing] = useState(!isEditMode);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, attachment: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (isEditMode && !isEditing) {
    return (
      <div className="bg-white rounded-lg border border-gray-100 p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>
        
        <div className="space-y-2 text-sm">
          <p className="text-gray-600">
            <span className="font-medium text-gray-900">Name:</span> {formData.firstName} {formData.lastName}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-900">Email:</span> {formData.email}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-900">Phone:</span> ({formData.countryCode}) {formData.phone}
          </p>
        </div>

        {formData.description && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Order information</h3>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Comment:</span> {formData.description}
            </p>
            {formData.attachment && (
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium text-gray-900">Attachment:</span>
                <span className="flex items-center gap-1">
                  <Upload className="w-4 h-4" />
                  PDF
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="James Brown"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="James Brown"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hello@example.com"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <div className="flex gap-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="w-24 px-2 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+91">🇮🇳 +91</option>
              </select>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 000-0000"
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Order Information Section */}
        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Distribution <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="text"
                name="accountDistribution"
                value={formData.accountDistribution}
                onChange={handleChange}
                placeholder="12345"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-gray-400">(Optional)</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Placeholder text"
                rows={4}
                maxLength={200}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
              <div className="text-right text-xs text-gray-400 mt-1">
                {formData.description.length}/200
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            className="w-full md:w-auto px-8 h-11 bg-green-600 hover:bg-green-700 text-white"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactInformationForm;
