import React, { useState } from "react";

const useConfirmationBeforePublish = () => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const handleShowConfirmation = () => {
    setShowConfirmation((prev) => !prev);
  };

  const openConfirmationDrawer = () => {
    setShowConfirmation(true);
  };

  const closeConfirmationDrawer = () => {
    setShowConfirmation(false);
  };

  return {
    showConfirmation,
    openConfirmationDrawer,
    closeConfirmationDrawer,
    handleShowConfirmation,
  };
};

export default useConfirmationBeforePublish;
