import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  const geo = (request as any).geo;
  const country = geo?.country || 'US';
  const city = geo?.city || 'Unknown';
  const region = geo?.region || 'Unknown';
  
  response.headers.set('x-user-country', country);
  response.headers.set('x-user-city', city);
  response.headers.set('x-user-region', region);
  
  if (country === 'IN' && (city === 'Chennai' || region === 'TN')) {
    response.headers.set('x-geo-context', 'local-chennai');
  } else if (country === 'IN') {
    response.headers.set('x-geo-context', 'regional-india');
  } else {
    response.headers.set('x-geo-context', 'global');
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
  ],
};
