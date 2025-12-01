/* eslint-disable react/no-unescaped-entities */
import React from "react";

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Terms and Conditions
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Last Updated: December 1, 2025
        </p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this Facebook Page Automation platform
              ("Service"), you accept and agree to be bound by these Terms and
              Conditions. If you do not agree to these terms, please do not use
              our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              2. Description of Service
            </h2>
            <p className="mb-3">Our Service provides:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Facebook page management tools</li>
              <li>Post scheduling and automation</li>
              <li>Analytics and insights for Facebook pages</li>
              <li>Multi-page management capabilities</li>
              <li>Centralized dashboard for administrators</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              3. User Accounts and Roles
            </h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  3.1 Account Types
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Super Admin:</strong> Full system access and
                    management
                  </li>
                  <li>
                    <strong>Admin:</strong> Organization-level management
                  </li>
                  <li>
                    <strong>Page Owner:</strong> Connect and manage own Facebook
                    pages
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  3.2 Account Responsibilities
                </h3>
                <p>You are responsible for:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Maintaining the confidentiality of your account</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized access</li>
                  <li>Ensuring your password is secure and not shared</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              4. Facebook Integration
            </h2>
            <div className="space-y-3">
              <p>
                Our Service integrates with Facebook through official APIs. By
                using our Service:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  You agree to comply with Facebook's Terms of Service and
                  Platform Policies
                </li>
                <li>
                  You grant us permission to access your Facebook pages using
                  the permissions you authorize
                </li>
                <li>
                  You understand that we store encrypted access tokens to
                  publish posts on your behalf
                </li>
                <li>
                  You can revoke our access at any time through Facebook
                  settings
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              5. Acceptable Use Policy
            </h2>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold mb-2">
                5.1 You agree NOT to:
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>
                  Violate Facebook's Community Standards or Platform Policies
                </li>
                <li>Post spam, harassment, hate speech, or harmful content</li>
                <li>
                  Attempt to gain unauthorized access to our systems or other
                  users' accounts
                </li>
                <li>
                  Use automated systems to scrape or extract data beyond what
                  the Service provides
                </li>
                <li>Reverse engineer, decompile, or disassemble the Service</li>
                <li>Transmit viruses, malware, or any harmful code</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              6. Content Ownership and Responsibility
            </h2>
            <div className="space-y-3">
              <p>
                <strong>6.1 Your Content:</strong> You retain all rights to the
                content you create and post through our Service. You are solely
                responsible for the content you publish.
              </p>
              <p>
                <strong>6.2 License to Us:</strong> By posting content through
                our Service, you grant us a limited license to store, process,
                and publish your content to your connected Facebook pages.
              </p>
              <p>
                <strong>6.3 Content Liability:</strong> You are solely liable
                for any content you post. We are not responsible for any claims
                arising from your content.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              7. Service Availability
            </h2>
            <p>
              We strive to provide reliable service, but we do not guarantee
              uninterrupted or error-free operation. We may suspend or terminate
              the Service for maintenance, updates, or other reasons with or
              without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              8. Fees and Payment
            </h2>
            <p className="mb-3">If applicable to your account type:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fees are specified in your subscription plan or agreement</li>
              <li>All fees are non-refundable unless otherwise stated</li>
              <li>We reserve the right to change fees with 30 days' notice</li>
              <li>
                Failure to pay may result in service suspension or termination
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              9. Termination
            </h2>
            <div className="space-y-3">
              <p>
                <strong>9.1 By You:</strong> You may terminate your account at
                any time by contacting us or using account deletion features.
              </p>
              <p>
                <strong>9.2 By Us:</strong> We may suspend or terminate your
                access immediately, without notice, for:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Violation of these Terms</li>
                <li>Illegal or fraudulent activity</li>
                <li>Non-payment of fees</li>
                <li>Harm to the Service or other users</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              10. Disclaimer of Warranties
            </h2>
            <p className="mb-3">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
              WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT
              NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
              <li>Accuracy, reliability, or availability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              11. Limitation of Liability
            </h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR
              ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
              DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED
              DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR
              OTHER INTANGIBLE LOSSES.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              12. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold harmless our company, its
              officers, directors, employees, and agents from any claims,
              damages, losses, liabilities, and expenses (including legal fees)
              arising from your use of the Service or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              13. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms at any time. We will
              notify you of material changes via email or through the Service.
              Your continued use after changes constitutes acceptance of the new
              Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              14. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of [Your Jurisdiction], without regard to its conflict of
              law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              15. Contact Information
            </h2>
            <p className="mb-3">
              For questions about these Terms, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <p>Email: support@yourcompany.com</p>
              <p>Address: Your Company Address</p>
              <p>Phone: Your Contact Number</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              16. Severability
            </h2>
            <p>
              If any provision of these Terms is found to be unenforceable or
              invalid, that provision will be limited or eliminated to the
              minimum extent necessary, and the remaining provisions will remain
              in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              17. Entire Agreement
            </h2>
            <p>
              These Terms constitute the entire agreement between you and us
              regarding the Service and supersede all prior agreements and
              understandings.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            By using our Service, you acknowledge that you have read,
            understood, and agree to be bound by these Terms and Conditions.
          </p>
        </div>
      </div>
    </div>
  );
}
