/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // more env...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
