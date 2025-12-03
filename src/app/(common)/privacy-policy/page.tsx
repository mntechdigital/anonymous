export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to our application (&quot;Company,&quot; &quot;we,&quot;
              &quot;our,&quot; or &quot;us&quot;). We are committed to
              protecting your privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              visit our website and use our services.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree
              with our policies and practices, please do not use our
              application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Information We Collect
            </h2>
            <p className="font-semibold text-gray-900">
              We may collect information about you in a variety of ways:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>
                <strong>Personal Data:</strong> Name, email address, phone
                number, and other contact information you provide.
              </li>
              <li>
                <strong>Account Information:</strong> Login credentials, profile
                information, and preferences.
              </li>
              <li>
                <strong>Social Media Data:</strong> When you connect Facebook or
                other social accounts, we collect data as per your consent.
              </li>
              <li>
                <strong>Usage Data:</strong> Pages visited, time spent, clicks,
                and other interaction data.
              </li>
              <li>
                <strong>Device Information:</strong> IP address, browser type,
                operating system, and device identifiers.
              </li>
              <li>
                <strong>Cookies and Tracking Technologies:</strong> We use
                cookies and similar technologies to track activity on our
                application.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Use of Your Information
            </h2>
            <p className="font-semibold text-gray-900">
              Having accurate information about you permits us to provide you
              with a smooth, efficient, and customized experience. Specifically,
              we may use information collected about you via the Site to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Create and manage your account</li>
              <li>
                Process your transactions and send you related information
              </li>
              <li>Provide customer support and respond to your inquiries</li>
              <li>
                Send marketing and promotional communications (with your
                consent)
              </li>
              <li>Improve our services and develop new features</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraudulent transactions and protect our rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Disclosure of Your Information
            </h2>
            <p>We may share your information in the following situations:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>
                <strong>By Law or to Protect Rights:</strong> We may disclose
                your information when required by law or to protect our legal
                rights.
              </li>
              <li>
                <strong>Third-Party Service Providers:</strong> We may share
                information with vendors, contractors, and service providers who
                perform services on our behalf.
              </li>
              <li>
                <strong>Social Media Integration:</strong> When you connect your
                social media accounts, information is shared according to those
                platforms&apos; terms.
              </li>
              <li>
                <strong>Business Transfers:</strong> If the company merges,
                acquires, or sells assets, your information may be transferred.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Security of Your Information
            </h2>
            <p>
              We use administrative, technical, and physical security measures
              to protect your personal information. However, no method of
              transmission over the Internet or electronic storage is 100%
              secure. While we strive to use commercially acceptable means to
              protect your personal information, we cannot guarantee its
              absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Cookies
            </h2>
            <p>
              Our application uses cookies to enhance your experience. Cookies
              are small files that a site or its service provider transfers to
              your computer&apos;s hard drive through your Web browser (if you
              allow). You can choose to have your computer warn you each time a
              cookie is being sent, or you can choose to turn off all cookies
              through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Contact Us Regarding Privacy
            </h2>
            <p>
              If you have questions or concerns about this Privacy Policy,
              please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p>
                <strong>Email:</strong> privacy@company.com
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p>
                <strong>Address:</strong> 123 Business Street, City, State 12345
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time in order to
              reflect, for example, changes to our practices or for other
              operational, legal, or regulatory reasons. We will notify you of
              any changes by updating the date of this Privacy Policy and your
              continued use of the application following the posting of revised
              Privacy Policy means that you accept and agree to the changes.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
