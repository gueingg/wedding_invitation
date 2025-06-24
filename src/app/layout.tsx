import './globals.css';

export const metadata = {
  title: 'Wedding Invitation',
  description: '박현규 & 신유진 결혼식에 초대합니다.',
  viewport:
    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
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
