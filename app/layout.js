import "./globals.css";

export const metadata = {
  title: "SaaS Form App",
  description: "Simple form that stores data in Vercel Postgres",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
