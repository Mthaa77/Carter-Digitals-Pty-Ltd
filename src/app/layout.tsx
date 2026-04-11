import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Carter Digitals — High-Agility Digital Infrastructure & AI-Enabled Solutions",
  description:
    "Carter Digitals (Pty) Ltd is a Pretoria-based digital services studio delivering high-performance websites, bespoke web applications, and strategic brand collateral for South Africa's forward-thinking institutions. B-BBEE Level 1 | 100% Black-Owned.",
  keywords: [
    "Carter Digitals",
    "web development South Africa",
    "Next.js development",
    "digital services",
    "B-BBEE Level 1",
    "website design Pretoria",
    "AI-powered solutions",
    "web applications",
    "brand identity",
    "small business websites",
  ],
  authors: [{ name: "Carter Digitals (Pty) Ltd" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Carter Digitals — Built Different. Built African. Built to Win.",
    description:
      "High-agility digital infrastructure and AI-enabled solutions for South Africa's forward-thinking institutions.",
    siteName: "Carter Digitals",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-[#0A0A0B] text-[#F5F5F5] transition-colors duration-500">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
