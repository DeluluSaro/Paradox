import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Paradox",
  description: "Project Management App",
};

export default function RootLayout({ children }) {
  return (

    <ClerkProvider appearance={{baseTheme:shadesOfPurple,  variables: {
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
    },}}>
    <html lang="en">

      
      <body className={`${inter.className} antialiased ` }>
      <Header></Header>
        <main className="bg-black text-white min-h-screen"> {children}</main>
        <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4 text-center text-gray-200 ">
          <p>Made with Love</p>
        </div>
      </footer>
      </body>

      
    </html>

    </ClerkProvider>
  );
}
