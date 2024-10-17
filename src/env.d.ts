/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly BETTER_AUTH_SECRET: string
  readonly BETTER_AUTH_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace App {
  interface Locals {
    isSignedIn: boolean
  }
}
