import { useState, useEffect } from "react";
import { EventFormData } from "../../types/eventFormTypes";
import { UseEventFormHandlersProps } from "../../types/eventFormTypes";

export const useEventFormHandlers = ({
  coordinates,
  handleClick,
  isEditing,
  setIsEditing,
  eventId,
  defaultDate,
  onSuccess,
  createMapEvent,
  updateMapEvent,
  validate,
  setErrors,
}: UseEventFormHandlersProps) => {
  const [formData, setFormData] = useState<EventFormData>({
    _id: "",
    title: "",
    subtitle: "",
    start: isEditing ? "" : defaultDate || "",
    end: "",
    description: "",
    lat: coordinates?.lat ?? 0,
    lng: coordinates?.lng ?? 0,
  });
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: EventFormData) => ({
      ...prevState,
      [name]: value,
    }));
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
      console.log("Form has errors");
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
      console.log("Form has errors or missing ID");
    }
  };

  const handleReset = () => {
    console.log("Resetting form with coordinates:", coordinates);
    setFormData({
      _id: "",
      title: "",
      subtitle: "",
      start: defaultDate || "",
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, isEditing, handleClick, initialLoadDone]);

  useEffect(() => {
    if (coordinates) {
      console.log("Coordinates updated:", coordinates);
      setFormData((prevState: EventFormData) => ({
        ...prevState,
        lat: coordinates.lat,
        lng: coordinates.lng,
      }));
    }
  }, [coordinates]);

  console.log("Rendering with formData:", formData);

  return {
    formData,
    setFormData,
    handleChange,
    handleCreate,
    handleUpdate,
    handleReset,
    handleCancel,
  };
};