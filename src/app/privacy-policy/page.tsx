import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Last Updated: December 1, 2025
        </p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              1. Information We Collect
            </h2>
            <p className="mb-3">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Account Information:</strong> Name, email address, and
                password when you create an account
              </li>
              <li>
                <strong>Facebook Data:</strong> When you connect your Facebook
                account, we access your Facebook pages, profile information, and
                page access tokens
              </li>
              <li>
                <strong>Content:</strong> Posts, images, videos, and other
                content you create or schedule through our platform
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our
                service, including log data and analytics
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              2. How We Use Your Information
            </h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>
                Schedule and publish posts to your connected Facebook pages
              </li>
              <li>
                Retrieve and display analytics data from your Facebook pages
              </li>
              <li>Send you technical notices and support messages</li>
              <li>Monitor and analyze trends and usage</li>
              <li>Detect and prevent fraud and abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              3. Facebook Permissions
            </h2>
            <p className="mb-3">
              Our application requests the following Facebook permissions:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>pages_show_list:</strong> To display your Facebook pages
              </li>
              <li>
                <strong>pages_read_engagement:</strong> To retrieve analytics
                and insights
              </li>
              <li>
                <strong>pages_manage_posts:</strong> To create and publish posts
                on your behalf
              </li>
              <li>
                <strong>pages_manage_metadata:</strong> To manage page settings
              </li>
            </ul>
            <p className="mt-3">
              You can revoke these permissions at any time through your Facebook
              settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              4. Data Storage and Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information. Your Facebook access tokens are
              encrypted before storage. However, no method of transmission over
              the Internet is 100% secure, and we cannot guarantee absolute
              security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              5. Data Sharing
            </h2>
            <p className="mb-3">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information only in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
              <li>
                With service providers who assist in operating our platform
                (under strict confidentiality agreements)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              6. Data Retention
            </h2>
            <p>
              We retain your information for as long as your account is active
              or as needed to provide services. You may request deletion of your
              account and associated data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              7. Your Rights
            </h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Revoke Facebook permissions</li>
              <li>Export your data</li>
              <li>Object to processing of your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              8. Cookies and Tracking
            </h2>
            <p>
              We use cookies and similar tracking technologies to track activity
              on our service and hold certain information. You can instruct your
              browser to refuse all cookies or to indicate when a cookie is
              being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              9. Children&apos;s Privacy
            </h2>
            <p>
              Our service is not intended for children under 13 years of age. We
              do not knowingly collect personal information from children under
              13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the &quot;Last Updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              11. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <div className="mt-3 bg-gray-50 p-4 rounded-md">
              <p>Email: support@yourcompany.com</p>
              <p>Address: Your Company Address</p>
            </div>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            By using our service, you acknowledge that you have read and
            understood this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
