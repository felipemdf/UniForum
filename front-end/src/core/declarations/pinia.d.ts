import type { Router } from "vue-router";

export {};

declare module 'pinia' {
    export interface PiniaCustomProperties {
      router: Router;
    }
  }