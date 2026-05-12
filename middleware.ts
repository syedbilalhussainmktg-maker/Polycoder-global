import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ur', 'hi', 'ar', 'bn', 'tr', 'id', 'es', 'fr', 'de'],
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/', '/(ur|hi|ar|bn|tr|id|es|fr|de)/:path*']
};
