import React, { useEffect, useState } from "react";

export interface Position {
  lng: number;
  lat: number;
}

interface EventFormData {
  title: string;
  subtitle: string;
  start: string;
  end: string;
  description: string;
  lat: number;
  lng: number;
}

interface EventFormProps {
  coordinates?: Position;
  handleSuccess: () => void;
}

const EventForm = ({ coordinates, handleSuccess }: EventFormProps) => {
  const lng = coordinates?.lng ?? 0;
  const lat = coordinates?.lat ?? 0;

  console.log("ver si se pasa bien la funcion", handleSuccess);
  

  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    subtitle: "",
    start: "",
    end: "",
    description: "",
    lat: lat,
    lng: lng,
  });

  const [errors, setErrors] = useState<Partial<EventFormData>>({
    title: "",
    start: "",
    end: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<EventFormData> = {};

    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.start) newErrors.start = "Start date is required";
    if (!formData.end) newErrors.end = "End date is required";

    if (formData.start && formData.end) {
      if (new Date(formData.start) >= new Date(formData.end)) {
        newErrors.end = "End date must be after start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form data is valid:", formData);
      // Guardar datos en el estado o hacer lo que necesites con los datos aquí
      handleSuccess();
      handleReset();
    } else {
      console.log("Form has errors:", errors);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      subtitle: "",
      start: "",
      end: "",
      description: "",
      lat: lat,
      lng: lng,
    });
    setErrors({});
  };

  useEffect(() => {
    if (coordinates) {
      setFormData((prevState) => ({
        ...prevState,
        lat: coordinates.lat,
        lng: coordinates.lng,
      }));
    }
  }, [coordinates]);

  return (
    <div className="flex flex-col justify-center">
      <div className="sm:max-w-xl sm:mx-auto">
        <div className="bg-white md:mx-0 rounded-3xl p-4.5">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleSubmit}>
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
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
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
                        className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      />
                      {errors.start && <p className="text-red-500 text-sm">{errors.start}</p>}
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose">End</label>
                      <input
                        type="date"
                        name="end"
                        value={formData.end}
                        onChange={handleChange}
                        className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      />
                      {errors.end && <p className="text-red-500 text-sm">{errors.end}</p>}
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
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Event Location</label>
                    <input
                      type="text"
                      name="location"
                      value={coordinates ? `${lat}, ${lng}` : "No coordinates yet"}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      disabled
                    />
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
                  <button
                    type="submit"
                    className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none cursor-pointer"
                  >
                    Create
                  </button>
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
