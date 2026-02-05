import type { Metadata } from 'next';
import { AppProviders } from './providers';
import { pretendard } from '@/theme/font';
import EmotionRegistry from './emotion-registry';
import LayoutClient from '@/components/layout/Layout.client';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://develop.lokit.co.kr',
  ),
  title: '우리만의 이야기를, 지도에 Lokit.',
  description: '함께 기록하고, 함께 쌓아가는 커플 아카이빙 앱.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: '우리만의 이야기를, 지도에 Lokit.',
    description: '함께 기록하고, 함께 쌓아가는 커플 아카이빙 앱.',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lokit - 커플 아카이빙 앱',
      },
    ],
  },
};

const enableMocking = process.env.NEXT_PUBLIC_ENABLE_MOCK === 'true';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const beusableId = process.env.NEXT_PUBLIC_BEUSABLE_ID;

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
        {beusableId && (
          <Script
            id="beusable-rum"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w, d, a){
                  w.beusablerumclient = {
                      load : function(src){
                          var b = d.createElement("script");
                          b.src = src; b.async=true; b.type = "text/javascript";
                          d.getElementsByTagName("head")[0].appendChild(b);
                      }
                  };
                  w.beusablerumclient.load(a + "?url=" + encodeURIComponent(d.URL));
                })(window, document, "//rum.beusable.net/load/${beusableId}");
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
