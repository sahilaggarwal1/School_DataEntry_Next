import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "School Portal",
  description: "Add and View Schools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">School Portal</h1>
          <nav className="flex gap-4">
            <Link
              href="/addSchool"
              className="hover:bg-blue-700 px-3 py-1 rounded"
            >
              Add School
            </Link>
            <Link
              href="/showSchools"
              className="hover:bg-blue-700 px-3 py-1 rounded"
            >
              Show Schools
            </Link>
          </nav>
        </header>

        {/* Main content */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
