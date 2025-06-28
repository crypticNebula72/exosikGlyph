// pages/privacy.js

import React from 'react';
import Footer from '../Footer/Page';

const PrivacyPolicy = () => {
  return (
    <div className=" h-full overflow-y-auto bg-backgroundColor text-chatText mx-0 py-12 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto p-6 rounded-lg overflow-y-auto">
        <h1 className="text-4xl font-bold text-center text-headerColor mb-12">Fly-Note Privacy Policy</h1>

        <h2 className="text-2xl font-semibold mt-6">1. Welcome to Fly-Note!</h2>
        <p className="mt-2">
          At Fly-Note, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services. By accessing or using Fly-Note, you agree to the practices outlined in this policy.
        </p>

        <h2 className="text-2xl font-semibold mt-6">2. What Information We Collect</h2>
        <p className="mt-2">
          We collect both personal and non-personal data in order to improve your experience with Fly-Note. This may include:
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li><strong>Personal Information:</strong> This includes information you provide when registering or using Fly-Note, such as your name, email address, and profile picture.</li>
          <li><strong>Usage Data:</strong> We collect data on your interactions with our services, including the features you use, access times, and pages viewed to improve our services.</li>
          </ul>

        <h2 className="text-2xl font-semibold mt-6">3. How We Use Your Data</h2>
        <p className="mt-2">
          We use the information we collect for a variety of purposes, including:
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li><strong>Service Enhancement:</strong> To continuously improve Fly-Note&apos;s functionality, features, and user experience.</li>
          <li><strong>Communication:</strong> To send you updates, security alerts, newsletters, or marketing messages that you have opted into.</li>
          <li><strong>Analytics and Research:</strong> To analyze user behavior and improve platform stability and performance.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">4. How We Share Your Information</h2>
        <p className="mt-2">
          We believe in keeping your information private, but we may share it in the following situations:
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li><strong>With Service Providers:</strong> Trusted third-party partners who help us deliver our services, such as hosting providers and customer support platforms, under strict confidentiality agreements.</li>
          <li><strong>For Legal Purposes:</strong> If required by law, or when we believe it is necessary to protect our rights, users, or comply with legal obligations.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">5. Data Security and Your Privacy</h2>
        <p className="mt-2">
          Fly-Note implements industry-standard security measures to protect your personal data. However, please note that no online system is completely secure, and we cannot guarantee absolute protection.
        </p>

        <h2 className="text-2xl font-semibold mt-6">6. Retaining Your Data</h2>
        <p className="mt-2">
          Your personal data will be retained only as long as necessary for the purposes outlined in this Privacy Policy or as required by law. Once the data is no longer needed, we take steps to securely delete or anonymize it.
        </p>

        <h2 className="text-2xl font-semibold mt-6">7. Your Rights and Choices</h2>
        <p className="mt-2">
          You have various rights concerning your personal data. These include:
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li><strong>Access and Correction:</strong> You can request access to the personal data we hold about you, and you may correct any inaccuracies.</li>
          <li><strong>Data Deletion:</strong> You may request the deletion of your personal data, subject to certain legal limitations.</li>
          <li><strong>Opting Out:</strong> You can unsubscribe from marketing communications at any time by following the &quot;unsubscribe&quot; instructions included in the email or contacting us directly.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">8. Privacy of Children</h2>
        <p className="mt-2">
          Fly-Note is not intended for children under 13, and we do not knowingly collect personal information from children. If we become aware of such data, we will take steps to remove it from our records.
        </p>

        <h2 className="text-2xl font-semibold mt-6">9. Changes to This Privacy Policy</h2>
        <p className="mt-2">
          We reserve the right to update this Privacy Policy as needed. Any significant changes will be communicated to you via email or within our platform. We encourage you to review this policy periodically.
        </p>

        <h2 className="text-2xl font-semibold mt-6">10. Contact Us</h2>
        <p className="mt-2">
          If you have any questions or concerns about this Privacy Policy, please reach out to us at <a href="mailto:support@flynote.com" className="text-proColor">support@flynote.com</a>.
        </p>
        <div  className='flex flex-row w-full justify-center mt-10'>
            <Footer />
        </div>
      </div>
      <div className="h-20"></div>
    </div>
  );
};

export default PrivacyPolicy;
