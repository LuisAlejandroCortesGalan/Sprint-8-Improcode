import { useMapContext } from "../context/MapContext";
import { EventFormProps } from "../types/eventFormTypes";
import FormFields from "./FormFields";
import FormActions from "./FormActions";
import { useEventFormValidation } from "./hooks/useEventFormValidation";
import { useEventFormHandlers } from "../components/hooks/useEventFormHandlers";

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
  const { formData } = useEventFormHandlers({
    coordinates,
    handleClick,
    isEditing,
    setIsEditing,
    eventId,
    defaultDate,
    onSuccess,
    createMapEvent,
    updateMapEvent,
    validate: useEventFormValidation({
      _id: "",
      title: "",
      subtitle: "",
      start: "",
      end: "",
      description: "",
      lat: 0,
      lng: 0
    }).validate,
    setErrors: () => {}, 
  });
  const { errors, validate, setErrors } = useEventFormValidation(formData);

  const updatedHandlers = useEventFormHandlers({
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
  });

  return (
    <div className="flex flex-col justify-center py-10">
      <div className="sm:max-w-xl sm:mx-auto">
        <div className="bg-white md:mx-0 rounded-3xl p-4.5 shadow-lg shadow-purple-400">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <form onSubmit={(e) => e.preventDefault()}>
                <FormFields
                  formData={updatedHandlers.formData}
                  errors={errors}
                  handleChange={updatedHandlers.handleChange}
                  setFormData={updatedHandlers.setFormData}
                />
                <FormActions
                  isEditing={isEditing}
                  handleReset={updatedHandlers.handleReset}
                  handleCreate={updatedHandlers.handleCreate}
                  handleUpdate={updatedHandlers.handleUpdate}
                  handleCancel={updatedHandlers.handleCancel}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;