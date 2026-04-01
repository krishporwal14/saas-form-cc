"use server";

import { prisma } from "../lib/prisma";

export async function submitForm(_prevState, formData) {
  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!fullName || !email) {
    return {
      status: "error",
      message: "Name and email are required.",
    };
  }

  try {
    await prisma.formSubmission.create({
      data: {
        fullName,
        email,
        company: company || null,
        message: message || null,
      },
    });

    return {
      status: "success",
      message: "Saved successfully.",
    };
  } catch (error) {
    console.error("Failed to insert form submission", error);

    return {
      status: "error",
      message: "Could not save data. Run Prisma db push and verify POSTGRES_URL.",
    };
  }
}
