import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
        className={`${inter.variable} antialiased font-sans bg-gray-50 text-gray-900`}
      >
        {/* Header will go here */}
        <header className="bg-primary text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Swift Response</h1>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:text-accent">Home</a></li>
                <li><a href="/requests/create" className="hover:text-accent">Get Help</a></li>
                <li><a href="/volunteer" className="hover:text-accent">Volunteer</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="min-h-screen container mx-auto p-4">
          {children}
        </main>

        <footer className="bg-gray-800 text-white p-4 text-center mt-8">
          <p>&copy; {new Date().getFullYear()} Swift Response. Community Emergency Platform.</p>
        </footer>
      </body>
    </html>
  );
}
