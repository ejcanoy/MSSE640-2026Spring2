import "./globals.css";

export const metadata = {
  title: "Decision Tables - Test Design Playground",
  description: "A mini app showing Decision Table testing for loan approval business rules."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
