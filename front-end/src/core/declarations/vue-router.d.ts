export {};

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    layout?: RawRouteComponent;
  }
}
