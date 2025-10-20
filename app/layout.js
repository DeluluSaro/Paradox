import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import { Toaster } from "sonner";
import ErrorBoundary from "@/components/error-boundary";
import "@/lib/console-override";
import Image from "next/image";

const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Paradox",
  description: "Project Management App",
  icons: {
    icon: "/paradox.ico",
    shortcut: "/paradox.ico",
    apple: "/paradox.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
        variables: {
          colorPrimary: "#3b82f6",
          colorBackground: "#1a202c",
          colorInputBackground: "#2D3748",
          colorInputText: "#F3F4F6",
        },
        elements: {
          formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
          card: "bg-gray-800",
          headerTitle: "text-blue-400",
          headerSubtitle: "text-gray-400",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <ErrorBoundary>
            <Header />
            <main className="bg-black text-white min-h-screen">{children}</main>
            <Toaster richColors />
            <footer className="bg-black py-6 border-t border-gray-800">
              <div className="container mx-auto px-4 flex items-center justify-center gap-3 text-gray-400">
                <Image src="/paradox.ico" alt="Paradox logo" width={24} height={24} />
                <span>Paradox reserved @2024</span>
              </div>
            </footer>
          </ErrorBoundary>
        </body>
      </html>
    </ClerkProvider>
  );
}
