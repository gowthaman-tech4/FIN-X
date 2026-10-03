import "./globals.css";

export const metadata = {
  title: "FIN-X — Finance News For You | Markets, Tax, Regulations & Economy in 2 Lines",
  description: "Discover what is happening in the financial world. Strict 2-line summaries of tax amendments, RBI & SEBI circulars, Fed decisions, and global market news with direct links to official sources.",
  keywords: ["financial news", "tax updates", "GST", "RBI circulars", "SEBI notifications", "Federal Reserve", "finance digest", "FIN-X"],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "FIN-X — Finance News For You",
    description: "Everything important happening in the financial world, in one place. 2-line AI summaries + original source attribution.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIN-X — Finance News For You",
    description: "Discover what is happening in the financial world without the noise.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
