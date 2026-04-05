import "./globals.css";

export const metadata = {
  title: "Equivalence Classes and Boundary Values",
  description: "Mini Next.js app for demonstrating test design techniques"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
