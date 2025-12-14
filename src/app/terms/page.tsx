import HeroCardSection from '@/components/hero/HeroCardSection';

export default function TermsPage() {
  const heroCards = [
    { title: 'Clear and simple terms', icon: '📝' },
    { title: 'Easy-to-understand policies', icon: '✅' },
    { title: 'Fair and transparent rules', icon: '⚖️' }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <HeroCardSection 
        cards={heroCards}
        pageTitle="Terms of Service"
        subtitle="Please read these terms carefully before using our platform"
      />

      <div className="min-h-screen flex items-center justify-center py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="glass p-6 sm:p-8 md:p-10 rounded-3xl">
          <p className="text-sm text-gray-500 mb-8">Last Updated: December 2024</p>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing and using the Swift Response platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use our platform.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Swift Response is a community-driven emergency response platform that connects people in need with volunteers, hospitals, shelters, and resources during emergencies. Our services include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Emergency request submission and tracking</li>
              <li>Volunteer registration and coordination</li>
              <li>Real-time alerts and notifications</li>
              <li>Resource mapping and information sharing</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">3. User Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              As a user of Swift Response, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Provide accurate and truthful information</li>
              <li>Use the platform only for legitimate emergency purposes</li>
              <li>Not misuse or abuse the emergency reporting system</li>
              <li>Respect the privacy and safety of other users</li>
              <li>Comply with all applicable local laws and regulations</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">4. Emergency Reporting</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Users must understand that:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Swift Response is a supplementary platform and should not replace official emergency services</li>
              <li>For life-threatening emergencies, always call local emergency numbers (e.g., 1122) first</li>
              <li>False or malicious emergency reports may result in account suspension and legal action</li>
              <li>Response times may vary based on volunteer availability and location</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">5. Volunteer Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Volunteers on our platform:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Are independent individuals offering assistance voluntarily</li>
              <li>Are not employees or agents of Swift Response</li>
              <li>Provide services at their own discretion and risk</li>
              <li>Must maintain appropriate certifications for specialized services (e.g., medical assistance)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Swift Response and its operators:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Are not responsible for the actions or inactions of volunteers or users</li>
              <li>Do not guarantee response times or availability of assistance</li>
              <li>Are not liable for any damages arising from use of the platform</li>
              <li>Provide the platform "as is" without warranties of any kind</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">7. Privacy and Data</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your use of Swift Response is also governed by our Privacy Policy. We collect and use data as described in that policy to provide and improve our services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">8. Account Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to suspend or terminate accounts that:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Violate these Terms of Service</li>
              <li>Submit false or malicious reports</li>
              <li>Engage in harassment or abusive behavior</li>
              <li>Compromise the safety or integrity of the platform</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">9. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update these Terms of Service from time to time. We will notify users of significant changes through the platform or via email. Continued use of the platform after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold text-[#333333] mb-4">10. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-[#F8F9FA] p-6 rounded-xl">
              <p className="text-gray-700">
                <strong>Email:</strong> legal@swiftresponse.com<br />
                <strong>Address:</strong> 123 Emergency Lane, Lahore, Pakistan
              </p>
            </div>
          </section>
        </div>
        </div>
      </div>
    </div>
  );
}
