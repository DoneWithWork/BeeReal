import Link from 'next/link';
import React from 'react';

export default function Privacy() {
  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-6">Effective Date: January 8, 2025</p>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Introduction
          </h2>
          <p className="text-gray-700">
            At BeeReal, your privacy is paramount. We are dedicated to
            safeguarding your data and being transparent about our practices.
            This Privacy Policy explains what information we collect, how we use
            it, and your rights concerning your data.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Information We Collect
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>No Personal Information:</strong> BeeReal does not collect
              personal information such as your name, email address, or phone
              number.
            </li>
            <li>
              <strong>Minimal Usage Data:</strong> To enhance functionality,
              BeeReal may collect anonymous usage data, including:
              <ul className="list-decimal list-inside ml-4">
                <li>The number of times coupons are successfully applied.</li>
                <li>
                  General usage metrics (e.g., popular websites where coupons
                  are applied).
                </li>
              </ul>
            </li>
            <li>
              <strong>No Tracking:</strong> BeeReal does not track your browsing
              history, search history, or overall online activity.
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            How We Use Your Information
          </h2>
          <p className="text-gray-700">
            The anonymous data collected is utilized for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
            <li>Improving the performance and functionality of BeeReal.</li>
            <li>Diagnosing and resolving technical issues.</li>
            <li>Ensuring compatibility with a wide range of websites.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Information Sharing
          </h2>
          <p className="text-gray-700">
            BeeReal does not share, sell, or rent any data to third parties. All
            collected data is processed securely and used solely for internal
            purposes as outlined above.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Cookies and Third-Party Services
          </h2>
          <p className="text-gray-700">
            BeeReal does not use cookies or incorporate third-party services
            that monitor or track your activities.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Your Choices and Control
          </h2>
          <p className="text-gray-700">
            As a BeeReal user, you have complete control over your experience:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
            <li>
              You may disable or uninstall the BeeReal extension at any time
              through your browser settings.
            </li>
            <li>
              The anonymous data we collect is non-identifiable and cannot be
              traced back to you.
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Data Security
          </h2>
          <p className="text-gray-700">
            BeeReal employs robust security measures to protect any data it
            processes. While we strive to ensure the highest level of security,
            we encourage users to adopt safe online practices.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Policy Updates
          </h2>
          <p className="text-gray-700">
            This Privacy Policy may be updated periodically to reflect new
            features, improvements, or changes in regulatory requirements.
            Updates will be published on our official website or GitHub
            repository. We recommend reviewing this policy regularly to stay
            informed about our practices.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Contact Us
          </h2>
          <p className="text-gray-700">
            For questions or concerns about this Privacy Policy, please contact
            us at{' '}
            <Link
              href="mailto: donewithworkyt@gmail.com"
              className="text-blue-600 hover:underline"
            >
              donewithworkyt@gmail.com
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
