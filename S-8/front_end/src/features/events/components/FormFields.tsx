import React from "react";
import { EventFormData, FormErrors } from "../types/eventFormTypes";
import InputField from "./InputFields";

interface FormFieldsProps {
  formData: EventFormData;
  errors: Partial<FormErrors>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
}

const FormFields = ({
  formData,
  errors,
  handleChange,
  setFormData,
}: FormFieldsProps) => (
  <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
    <InputField
      label="Event Title"
      name="title"
      type="text"
      value={formData.title}
      onChange={handleChange}
      placeholder="Event title"
      error={errors.title}
    />
    <InputField
      label="Event Subtitle"
      name="subtitle"
      type="text"
      value={formData.subtitle}
      onChange={handleChange}
      placeholder="Optional"
      error={errors.subtitle}
    />
    <div className="flex items-center space-x-4">
      <InputField
        label="Start"
        name="start"
        type="date"
        value={formData.start}
        onChange={handleChange}
        error={errors.start}
      />
      <InputField
        label="End"
        name="end"
        type="date"
        value={formData.end}
        onChange={handleChange}
        error={errors.end}
      />
    </div>
    <InputField
      label="Event Description"
      name="description"
      type="text"
      value={formData.description}
      onChange={handleChange}
      placeholder="Optional"
      error={errors.description}
    />
    <div className="flex flex-col">
      <label className="leading-loose">Event Location</label>
      <input
        type="text"
        name="location"
        value={`${formData.lat}, ${formData.lng}`}
        onChange={(e) => {
          const [newLat, newLng] = e.target.value
            .split(",")
            .map((val) => val.trim());
          setFormData({
            ...formData,
            lat: newLat ? parseFloat(newLat) : formData.lat,
            lng: newLng ? parseFloat(newLng) : formData.lng,
          });
        }}
        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
        placeholder="Enter lat, lng (e.g., 40.7128, -74.0060)"
      />
      {(errors.lat || errors.lng) && (
        <p className="text-red-500 text-sm">{errors.lat || errors.lng}</p>
      )}
    </div>
  </div>
);

export default FormFields;
