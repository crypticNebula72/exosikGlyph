// pages/terms.js

import React from 'react';
import Footer from '../Footer/Page';

const TermsOfService = () => {
  return (
    <div className="h-full overflow-y-auto bg-backgroundColor text-chatText mx-0 py-12 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto p-6 rounded-lg  overflow-y-auto">
        <h1 className="text-4xl font-bold text-center text-headerColor mb-12">Fly-Note Terms of Service</h1>

        <h2 className="text-2xl font-semibold mt-6">1. Overview</h2>
        <p className="mt-2">
          Welcome to Fly-Note! These Terms of Service (&quot;Terms&quot;) outline the rules and guidelines for using our platform (&quot;Service&quot;).
          By accessing or using Fly-Note, you agree to abide by these Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6">2. Account Registration</h2>
        <p className="mt-2">
          To unlock full access to our features, you must create an account. You are solely responsible for maintaining the
          security of your account details and any actions performed under your account.
          Fly-Note does not store or access your passwords. Please do not share your password with anyone claiming to represent
          Fly-Note or any other third party.
        </p>

        <h2 className="text-2xl font-semibold mt-6">3. Permitted Usage</h2>
        <p className="mt-2">
          You agree not to use Fly-Note for any illegal activities or any actions that may disrupt the platform’s operations or
          impact other users negatively.
        </p>

        <h2 className="text-2xl font-semibold mt-6">4. Ownership & Copyright</h2>
        <p className="mt-2">
          All content, including but not limited to text, graphics, logos, and software available on Fly-Note, belongs to
          Fly-Note or its licensors and is protected under copyright laws.
        </p>

        <h2 className="text-2xl font-semibold mt-6">5. Account Suspension & Termination</h2>
        <p className="mt-2">
          Fly-Note reserves the right to suspend or permanently terminate your access to the platform if we determine that you
          have violated these Terms or engaged in harmful behavior.
        </p>

        <h2 className="text-2xl font-semibold mt-6">6. Disclaimer & Liability</h2>
        <p className="mt-2">
          Fly-Note is provided &quot;as is,&quot; without guarantees of any kind. We are not liable for any damages resulting from your
          use or inability to use our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-6">7. Modifications to Terms</h2>
        <p className="mt-2">
          We may revise these Terms periodically. By continuing to use Fly-Note after updates, you acknowledge and accept the
          revised Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6">8. Legal Jurisdiction</h2>
        <p className="mt-2">
          These Terms shall be interpreted in accordance with the laws of Nepal. Any legal disputes shall be resolved under
          Nepalese jurisdiction.
        </p>

        <h2 className="text-2xl font-semibold mt-6">9. Academic Integrity</h2>
        <p className="mt-2">
          By using Fly-Note, you acknowledge that we are not responsible for any academic misconduct arising from misuse of our
          platform. Users are expected to comply with their educational institution’s academic policies.
        </p>

        <h2 className="text-2xl font-semibold mt-6">10. Contact Information</h2>
        <p className="mt-2">
          For any inquiries or concerns regarding these Terms, you may contact us at <a href="mailto:support@flynote.com" className="text-proColor">support@flynote.com</a>.
        </p>
        <div  className='flex flex-row w-full justify-center mt-10'>
            <Footer />
        </div>
      </div>
      <div className="h-20"></div>
    </div>
  );
};

export default TermsOfService;
