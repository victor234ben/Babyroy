export {};

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          id?: number;
          first_name?: string;
          last_name?: string;
          username?: string;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          [key: string]: any;
        };
        expand(): void;
        close(): void;
        sendData(data: string): void;
        // You can extend this further based on the Telegram WebApp API
      };
    };
  }
}
