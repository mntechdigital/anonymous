"use client";

import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">User Data Deletion</h1>
      <p>
        You can request deletion of your data associated with this application
        at any time. There are two supported ways to request deletion:
      </p>
      <ol className="list-decimal pl-6 space-y-2">
        <li>
          Remove the app from your Facebook account and submit a deletion
          request from Facebook: Settings &gt; Apps and Websites &gt; find this
          app &gt; Remove &gt; Send Request. Facebook will send us a signed
          deletion request which we process automatically.
        </li>
        <li>
          Contact us directly by email and we will process your request
          manually. Include your Facebook user ID or the email tied to your
          Facebook account
        </li>
      </ol>
      <div>
        <p>
          Contact email:{" "}
          <a href="mailto:privacy@yourdomain.com" className="underline">
            privacy@yourdomain.com
          </a>
        </p>
      </div>
      <p>
        After a request is received, we delete associated records from our
        systems and send you a confirmation code. You can track the status of a
        request using the confirmation code on the status page below.
      </p>
      <p>
        <Link href="/data-deletion-status" className="underline">
          Check deletion request status
        </Link>
      </p>
    </main>
  );
}
