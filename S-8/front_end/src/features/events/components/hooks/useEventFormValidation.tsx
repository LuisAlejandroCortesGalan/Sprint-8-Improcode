import { useState } from "react";
import { EventFormData, FormErrors } from "../../types/eventFormTypes";

export const useEventFormValidation = (formData: EventFormData) => {
  const [errors, setErrors] = useState<Partial<FormErrors>>({});

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

  return { errors, validate, setErrors };
};
