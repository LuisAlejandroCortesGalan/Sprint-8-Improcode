import React from "react";

interface SuccessMessageProps {
  message: string;
  show: boolean;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, show }) => {
  if (!show) return null;
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
    </div>
  );
};

export default SuccessMessage;