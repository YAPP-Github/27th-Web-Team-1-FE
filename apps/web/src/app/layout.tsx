import { AppProviders } from './providers';
import { pretendard } from '@/theme/font';
import { Container } from './layout.styles';

const enableMocking = process.env.NEXT_PUBLIC_ENABLE_MOCK === 'true';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.variable}>
        <AppProviders enableMocking={enableMocking}>
          <Container>{children}</Container>
        </AppProviders>
        <div id="modal-root" />
      </body>
    </html>
  );
}
