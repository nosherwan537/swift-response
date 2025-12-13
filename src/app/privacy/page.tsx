export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#008C5A] to-[#006B47] text-white py-16 text-center overflow-hidden">
        <div className="absolute top-10 right-10 w-48 h-48 bg-[#FFD700] opacity-10 rounded-full blur-3xl animate-float"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in-up">Privacy Policy</h1>
          <p className="text-lg opacity-95 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '100ms'}}>
            Your privacy is important to us
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto py-16 px-4">
        <div className="glass p-10 rounded-3xl">
          <p className="text-sm text-gray-500 mb-8">Last Updated: December 2024</p>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Swift Response ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our emergency response platform.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">2. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect several types of information to provide and improve our services:
            </p>
            
            <h3 className="text-xl font-bold text-[#333333] mb-3 mt-6">Personal Information</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Name, email address, and phone number</li>
              <li>Account credentials and profile information</li>
              <li>Emergency contact information</li>
              <li>Volunteer skills and availability</li>
            </ul>

            <h3 className="text-xl font-bold text-[#333333] mb-3 mt-6">Emergency Request Data</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Location data (GPS coordinates and addresses)</li>
              <li>Emergency type and description</li>
              <li>Photos and media uploaded with requests</li>
              <li>Communication between users and volunteers</li>
            </ul>

            <h3 className="text-xl font-bold text-[#333333] mb-3 mt-6">Usage Data</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Device information and IP address</li>
              <li>Browser type and operating system</li>
              <li>Pages visited and features used</li>
              <li>Time and date of access</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the collected information for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Facilitating emergency response and volunteer coordination</li>
              <li>Sending real-time alerts and notifications</li>
              <li>Verifying user identities and preventing fraud</li>
              <li>Improving platform functionality and user experience</li>
              <li>Communicating important updates and information</li>
              <li>Analyzing usage patterns and generating statistics</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">4. Information Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Volunteers:</strong> Emergency request details are shared with nearby verified volunteers</li>
              <li><strong>Emergency Services:</strong> Information may be shared with official emergency responders when necessary</li>
              <li><strong>Partner Organizations:</strong> NGOs and relief organizations working on emergency response</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect safety and rights</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">5. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate security measures to protect your information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication and access controls</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to personal data by authorized personnel only</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">6. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate data</li>
              <li>Delete your account and associated data</li>
              <li>Opt-out of non-essential communications</li>
              <li>Export your data in a portable format</li>
              <li>Object to certain data processing activities</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">7. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We retain your information for as long as necessary to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Provide our services and maintain your account</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
              <li>Maintain emergency response records for safety purposes</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">8. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this Privacy Policy periodically. We will notify you of significant changes through the platform or via email. Your continued use after changes indicates acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">10. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <div className="bg-[#F8F9FA] p-6 rounded-xl">
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@swiftresponse.com<br />
                <strong>Address:</strong> 123 Emergency Lane, Lahore, Pakistan<br />
                <strong>Phone:</strong> +92 300 1234567
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
