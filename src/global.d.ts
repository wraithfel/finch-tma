declare interface Window {
  Telegram?: {
    WebApp: {
      onEvent: (event: string, handler: (payload?: unknown) => void) => void;
    };
  };
}
