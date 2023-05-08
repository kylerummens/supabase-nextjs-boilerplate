import "server-only";

import "@/styles/globals.scss";

import { Inter } from "next/font/google";
import { createClient } from "@/utils/server/supabase-server";
import SupabaseProvider from "@/components/supabase-provider";
import SupabaseListener from "@/components/supabase-listener";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// do not cache this layout
export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html
      lang="en"
      style={{ colorScheme: "light dark" }}
      className={inter.variable}
    >
      <head></head>
      <body>
        <SupabaseProvider>
          <SupabaseListener serverAccessToken={session?.access_token} />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
