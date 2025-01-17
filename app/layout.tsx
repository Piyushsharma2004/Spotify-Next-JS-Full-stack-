import { Figtree } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProviders";
import ModalProvider from "@/providers/ModalProvider";
import UserProvider from '@/providers/UserProvider'
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";
const font  = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify || SwiftMusic",
  description: "Listen to music!",
};

export const revalidate = 0

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
      <ToasterProvider/>
         <SupabaseProvider>
        <UserProvider>
         <ModalProvider />
        <Sidebar songs={userSongs}>
        {children}
        </Sidebar>
        <Player />
       
        </UserProvider>
        </SupabaseProvider>
        </body>
    </html>
  );
}
