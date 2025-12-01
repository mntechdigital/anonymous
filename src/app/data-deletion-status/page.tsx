"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Data Deletion Status</h1>
      {code ? (
        <p>
          Your deletion request has been received. Confirmation code:{" "}
          <span className="font-mono">{code}</span>.
        </p>
      ) : (
        <p>No confirmation code provided.</p>
      )}
      <p>
        If you have questions about your request, contact{" "}
        <a href="mailto:privacy@yourdomain.com" className="underline">
          privacy@yourdomain.com
        </a>
        .
      </p>
    </main>
  );
}
