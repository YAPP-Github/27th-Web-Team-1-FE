interface KakaoShare {
  sendCustom(options: {
    templateId: string | number;
    templateArgs: Record<string, string | number>;
  }): void;
}

interface Kakao {
  init(javascriptKey: string): void;
  isInitialized(): boolean;
  Share: KakaoShare;
}

declare global {
  interface Window {
    Kakao?: Kakao;
  }
}

export {};
