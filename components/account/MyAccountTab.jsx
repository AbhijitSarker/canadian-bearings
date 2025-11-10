"use client";

import PersonalDetails from "@/components/account/PersonalDetails";
import ShoppingAddress from "@/components/account/ShoppingAddress";

export default function MyAccountTab({
  personalDetails,
  setPersonalDetails,
  onSavePersonal,
  shoppingAddress,
  setShoppingAddress,
  onSaveAddress,
}) {
  return (
    <div className="space-y-6">
      <PersonalDetails
        personalDetails={personalDetails}
        setPersonalDetails={setPersonalDetails}
        onSave={onSavePersonal}
      />

      <ShoppingAddress
        shoppingAddress={shoppingAddress}
        setShoppingAddress={setShoppingAddress}
        onSave={onSaveAddress}
      />
    </div>
  );
}
