export {};

declare global {
  interface TelegramWebAppUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    allows_write_to_pm?: boolean;
  }

  interface TelegramWebApp {
    initData: string;
    initDataUnsafe: {
      user?: TelegramWebAppUser;
      auth_date?: number;
      query_id?: string;
      hash?: string;
    };
    version: string;
    platform: string;
    colorScheme: 'light' | 'dark';
    isExpanded: boolean;
    isClosingConfirmationEnabled: boolean;
    themeParams: {
      bg_color?: string;
      text_color?: string;
      hint_color?: string;
      link_color?: string;
      button_color?: string;
      button_text_color?: string;
    };

    expand(): void;
    ready(): void;
    close(): void;
    sendData(data: string): void;
  }

  interface Telegram {
    WebApp: TelegramWebApp;
  }

  interface Window {
    Telegram: Telegram;
  }
}
