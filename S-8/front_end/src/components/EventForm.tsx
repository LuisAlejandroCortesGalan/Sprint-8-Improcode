import React, { useEffect, useState } from "react";
import { useMapContext } from "../mapContext/MapContext";
import {
  EventFormData,
  EventFormProps,
  FormErrors,
} from "../types/eventFormTypes";

const EventForm = ({
  coordinates,
  handleClick,
  isEditing,
  setIsEditing,
  eventId,
  defaultDate,
  onSuccess,
}: EventFormProps) => {
  const { createMapEvent, updateMapEvent } = useMapContext();
  const [formData, setFormData] = useState<EventFormData>({
    _id: "",
    title: "",
    subtitle: "",
    start: isEditing ? "" : defaultDate || "", // Usa defaultDate para nuevos eventos
    end: "",
    description: "",
    lat: coordinates?.lat ?? 0,
    lng: coordinates?.lng ?? 0,
  });

  const [errors, setErrors] = useState<Partial<FormErrors>>({});
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormErrors> = {};
    const today = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() + 1);

    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.subtitle) newErrors.subtitle = "Subtitle is required";
    if (!formData.start) newErrors.start = "Start date is required";
    if (!formData.end) newErrors.end = "End date is required";
    if (!formData.description)
      newErrors.description = "Description is required";

    if (formData.start) {
      const startDate = new Date(formData.start);
      if (startDate < today)
        newErrors.start = "Start date must be today or later";
    }

    if (formData.end) {
      const endDate = new Date(formData.end);
      if (endDate > maxDate)
        newErrors.end = "End date must be within one year from today";
    }

    if (formData.start && formData.end) {
      const startDate = new Date(formData.start);
      const endDate = new Date(formData.end);
      if (startDate >= endDate)
        newErrors.end = "End date must be after start date";
    }

    if (formData.lat < -90 || formData.lat > 90)
      newErrors.lat = "Latitude must be between -90 and 90";
    if (formData.lng < -180 || formData.lng > 180)
      newErrors.lng = "Longitude must be between -180 and 180";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (validate()) {
      try {
        await createMapEvent(formData);
        handleReset();
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error("Error creating event:", error);
      }
    } else {
      console.log("Form has errors:", errors);
    }
  };

  const handleUpdate = async () => {
    if (validate() && formData._id) {
      try {
        await updateMapEvent(formData._id, formData);
        handleReset();
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error("Error updating event:", error);
      }
    } else {
      console.log("Form has errors or missing ID:", errors);
    }
  };

  const handleReset = () => {
    console.log("Resetting form with coordinates:", coordinates);
    setFormData({
      _id: "",
      title: "",
      subtitle: "",
      start: defaultDate || "", // Restablece con defaultDate si está disponible
      end: "",
      description: "",
      lat: coordinates?.lat ?? 0,
      lng: coordinates?.lng ?? 0,
    });
    setErrors({});
    setIsEditing(false);
    setInitialLoadDone(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleReset();
    if (onSuccess) onSuccess();
  };

  useEffect(() => {
    if (eventId && isEditing && !initialLoadDone) {
      const eventData = handleClick(eventId);
      if (eventData) {
        const normalizedEventData = {
          ...eventData,
          start: new Date(eventData.start).toISOString().split("T")[0],
          end: new Date(eventData.end).toISOString().split("T")[0],
          lat: eventData.lat,
          lng: eventData.lng,
        };
        console.log("Loading event data:", normalizedEventData);
        setFormData(normalizedEventData);
        setInitialLoadDone(true);
      } else {
        setIsEditing(false);
      }
    }
  }, [eventId, isEditing, handleClick, initialLoadDone]);

  useEffect(() => {
    if (coordinates) {
      console.log("Coordinates updated:", coordinates);
      setFormData((prevState) => ({
        ...prevState,
        lat: coordinates.lat,
        lng: coordinates.lng,
      }));
    }
  }, [coordinates]);

  console.log("Rendering with formData:", formData);

  return (
    <div className="flex flex-col justify-center py-10">
      <div className="sm:max-w-xl sm:mx-auto">
        <div className="bg-white md:mx-0 rounded-3xl p-4.5 shadow-lg shadow-purple-400">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label className="leading-loose">Event Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Event title"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm">{errors.title}</p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Event Subtitle</label>
                    <input
                      type="text"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Optional"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <label className="leading-loose">Start</label>
                      <input
                        type="date"
                        name="start"
                        value={formData.start}
                        onChange={handleChange}
                        className="pr-2 pl-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      />
                      {errors.start && (
                        <p className="text-red-500 text-sm">{errors.start}</p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose">End</label>
                      <input
                        type="date"
                        name="end"
                        value={formData.end}
                        onChange={handleChange}
                        className="pr-2 pl-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      />
                      {errors.end && (
                        <p className="text-red-500 text-sm">{errors.end}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Event Description</label>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Optional"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm">
                        {errors.description}
                      </p>
                    )}
                  </div>
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
                      <p className="text-red-500 text-sm">
                        {errors.lat || errors.lng}
                      </p>
                    )}
                  </div>
                </div>
                <div className="pt-2 flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none cursor-pointer"
                  >
                    Reset
                  </button>
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={handleUpdate}
                        className="bg-purple-600 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none cursor-pointer"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none cursor-pointer"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleCreate}
                      className="bg-purple-600 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none cursor-pointer"
                    >
                      Create
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;