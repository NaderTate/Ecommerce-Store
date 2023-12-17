"use client";

import { useState } from "react";
import { createNewAdmin, updateAdmin } from "@/app/server_actions/admins";

export const useHandleAdminData = (admin?: {
  id?: string;
  Name?: string;
  Email?: string;
}) => {
  const [adminData, setAdminData] = useState({
    Name: admin?.Name || "",
    Email: admin?.Email || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    setIsSubmitting(true);

    if (admin?.id) {
      await updateAdmin(admin.id, {
        ...adminData,
      });
    } else {
      await createNewAdmin({
        ...adminData,
      });
    }

    setIsSubmitting(false);
  };

  return {
    adminData,
    setAdminData,
    isSubmitting,
    onSubmit,
  };
};
