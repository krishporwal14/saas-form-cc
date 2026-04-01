"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitForm } from "./actions";

const initialState = {
  status: "idle",
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Submit"}
    </button>
  );
}

export default function HomePage() {
  const [state, formAction] = useActionState(submitForm, initialState);

  return (
    <main className="page">
      <section className="card">
        <h1>Customer Intake Form</h1>
        <p>Form entries are saved directly to your Vercel Postgres database.</p>

        <form action={formAction} className="form">
          <label>
            Full Name
            <input name="fullName" type="text" required placeholder="Jane Doe" />
          </label>

          <label>
            Email
            <input name="email" type="email" required placeholder="jane@company.com" />
          </label>

          <label>
            Company
            <input name="company" type="text" placeholder="Acme Inc." />
          </label>

          <label>
            Message
            <textarea
              name="message"
              rows="4"
              placeholder="Tell us what you are looking for"
            />
          </label>

          <SubmitButton />
        </form>

        {state.status !== "idle" && (
          <p className={state.status === "success" ? "ok" : "error"}>{state.message}</p>
        )}
      </section>
    </main>
  );
}
