import { AppProviders } from './providers';
import { pretendard } from '@/theme/font';
import EmotionRegistry from './emotion-registry';
import LayoutClient from '@/components/layout/Layout.client';

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
          <EmotionRegistry>
            <LayoutClient>{children}</LayoutClient>
          </EmotionRegistry>
        </AppProviders>
        <div id="modal-root" />
        <div id="toast-root" />
      </body>
    </html>
  );
}
