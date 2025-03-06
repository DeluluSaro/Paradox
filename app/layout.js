import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import { Toaster } from "sonner";
import Head from "next/head";
import MainFooter from "@/components/footer";

const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Paradox",
  description: "Project Management App",
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
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </Head>
        <body className={`${inter.className} antialiased`}>
          <Header />
          <main className="bg-black text-white min-h-screen">{children}</main>
          <Toaster richColors />
          <footer className="bg-gray-900 py-12">
            <div className="container mx-auto mt-10 px-4 text-center text-gray-200">
              <MainFooter></MainFooter>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
