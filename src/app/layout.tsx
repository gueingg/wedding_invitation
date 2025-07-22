import { PrefixProvider } from './context/PrefixContext';
import './globals.css';

export const metadata = {
  title: '박현규 & 신유진 모바일청첩장',
  description: '모바일청첩장 바로가기',
  openGraph: {
    title: '박현규 & 신유진 모바일청첩장.',
    description: '모바일청첩장 바로가기',
    url: 'https://gueingg.github.io/wedding_invitation/',
    siteName: '박현규 & 신유진 모바일청첩장',
    images: [
      {
        url: 'https://cloud.bojagicard.com/scene/si/sinyu999/dfc45045965aac0b4fbc55c4cf41bd49.jpg',
        width: 800,
        height: 600,
        alt: '박현규 & 신유진 모바일청첩장',
      },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: 'no',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <PrefixProvider>{children}</PrefixProvider>
      </body>
    </html>
  );
}
