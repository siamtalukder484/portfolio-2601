/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional form endpoint (e.g. Formspree) that accepts JSON POST requests. */
  readonly VITE_CONTACT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
