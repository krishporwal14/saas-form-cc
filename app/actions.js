"use server";

import { sql } from "@vercel/postgres";

let tableReady = false;

async function ensureTable() {
  if (tableReady) return;

  await sql`
    CREATE TABLE IF NOT EXISTS form_submissions (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      message TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  tableReady = true;
}

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
    await ensureTable();

    await sql`
      INSERT INTO form_submissions (full_name, email, company, message)
      VALUES (${fullName}, ${email}, ${company || null}, ${message || null})
    `;

    return {
      status: "success",
      message: "Saved successfully.",
    };
  } catch (error) {
    console.error("Failed to insert form submission", error);

    return {
      status: "error",
      message: "Could not save data. Check your database env vars.",
    };
  }
}
