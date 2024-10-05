import { Toaster } from '@/components/ui/sonner';
import { validateRequest } from '@/lib/auth';
import { SessionProvider } from '@/lib/auth/context';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from './header';
import { NavigationLinks } from './navigation';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider value={session}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
              <aside className="hidden w-64 lg:block">
                <NavigationLinks />
              </aside>
              <main className="flex-1 p-4">{children}</main>
            </div>
          </div>
          <Toaster position="top-center" />
        </SessionProvider>
      </body>
    </html>
  );
}
