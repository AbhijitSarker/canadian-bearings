"use client";

import { useState } from "react";
import AccountInfoView from "@/components/account/AccountInfoView";
import AccountInfoForm from "@/components/account/AccountInfoForm";

export default function MyAccountTab({
  personalDetails,
  setPersonalDetails,
  onSavePersonal,
  shoppingAddress,
  setShoppingAddress,
  onSaveAddress,
}) {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleCancel = () => {
    setIsEditMode(false);
  };

  if (!isEditMode) {
    return (
      <AccountInfoView
        personalDetails={personalDetails}
        shoppingAddress={shoppingAddress}
        onEdit={() => setIsEditMode(true)}
      />
    );
  }

  return (
    <AccountInfoForm
      personalDetails={personalDetails}
      setPersonalDetails={setPersonalDetails}
      shoppingAddress={shoppingAddress}
      setShoppingAddress={setShoppingAddress}
      onSavePersonal={onSavePersonal}
      onSaveAddress={onSaveAddress}
      onCancel={handleCancel}
    />
  );
}

