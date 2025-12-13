import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

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
        {/* Header */}
        <header className="bg-white text-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-200">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              {/* Simple Logo Icon */}
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                SR
              </div>
              <h1 className="text-xl font-bold tracking-tight text-primary">Swift Response</h1>
            </Link>
            <nav>
              <ul className="flex space-x-6 font-medium text-sm">
                <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="/requests/create" className="hover:text-primary transition-colors">Report Help</a></li>
                <li><a href="/volunteer" className="hover:text-primary transition-colors">Volunteer</a></li>
                <li><a href="/terms" className="hover:text-primary transition-colors">Terms</a></li>
                <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy</a></li>
              </ul>
            </nav>
            <div className="hidden md:block">
              <a href="/login" className="bg-green-500 text-white px-4 py-2 rounded-md font-bold hover:bg-green-600 transition-colors text-sm">
                Log In
              </a>
            </div>
          </div>
        </header>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="bg-[#333333] text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="font-semibold text-lg mb-2">Swift Response</p>
            <p className="text-[#F8F9FA] opacity-80 text-sm">
              &copy; {new Date().getFullYear()} Community Emergency Response Platform.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
