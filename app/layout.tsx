import React from 'react';

export const metadata = {
  title: 'Umhlanga Car Wash & Valet',
  description: 'Precision wash, ceramic gloss protection, and executive detailing in Umhlanga.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
