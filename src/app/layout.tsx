import './globals.css';

export const metadata = {
  title: 'Wedding Invitation',
  description: '박현규 & 신유진 결혼식에 초대합니다.',
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
      <body>{children}</body>
    </html>
  );
}
