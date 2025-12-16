import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import AuthButton from "./components/AuthButton";
import MobileNav from "./components/MobileNav";
import Logo from "@/components/Logo";
import Providers from "./providers";
import NewsButton from "@/components/NewsButton";
import SafetyCheckIn from "@/components/SafetyCheckIn";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Swift Response - Community Emergency Platform",
  description: "Connect with help and resources during emergencies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased font-sans bg-[#F8F9FA] text-[#333333]`}
      >
        <Providers>
          {/* Header */}
          <header className="bg-white text-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-200">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link
                href="/"
                className="hover:opacity-80 transition-opacity"
              >
                <Logo />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:block">
                <ul className="flex space-x-6 font-medium text-sm">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-primary transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-primary transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="hover:text-primary transition-colors"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard"
                      className="hover:text-primary transition-colors"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/volunteer"
                      className="hover:text-primary transition-colors"
                    >
                      Volunteer
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="hover:text-primary transition-colors"
                    >
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="hover:text-primary transition-colors"
                    >
                      Privacy
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                {/* Desktop Auth Button */}
                <div className="hidden lg:block">
                  <AuthButton />
                </div>

                {/* Mobile Menu Button */}
                <MobileNav />
              </div>
            </div>
          </header>

          <main className="min-h-screen">{children}</main>

          {/* Floating News Button */}
          <NewsButton />

          {/* Safety Check-In */}
          <SafetyCheckIn />

          <footer className="bg-[#333333] text-white py-8">
            <div className="container mx-auto px-4 text-center flex flex-col items-center">
              <Logo variant="light" className="mb-4" />
              <p className="text-[#F8F9FA] opacity-80 text-sm">
                &copy; {new Date().getFullYear()} Community Emergency Response
                Platform.
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
