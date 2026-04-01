declare namespace NodeJS {
  interface ProcessEnv {
    readonly VITE_API_URL: string;
    readonly VITE_APP_VERSION: string;
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
