function parseDevice(ua='') {
  const l = ua.toLowerCase();
  const isIPad = /ipad/.test(l);
  const android = /android/.test(l);
  const isAndroidTablet = android && !/mobile/.test(l);
  const otherTablet = /(tablet|kindle|silk|playbook|sm-t|tab)/.test(l);
  const isTablet = isIPad || isAndroidTablet || otherTablet;
  const isMobilePhone = !isTablet && /(iphone|ipod|android.*mobile|blackberry|bb10|opera mini|iemobile|windows phone|mobile)/.test(l);
  return { isTablet, isMobilePhone };
}

function shouldRedirectDevice({ isTablet, isMobilePhone }, policy) {
  const p = (policy || 'desktop').toLowerCase();
  if (isMobilePhone) return true;
  if (isTablet) {
    if (p === 'mobile' || p === 'always') return true;
    if (p === 'ignore') return false;
    return false; // default desktop
  }
  return false;
}

export default function middleware(request) {
  const url = new URL(request.url);
  if (url.pathname.startsWith('/api') || url.pathname.startsWith('/_next') || url.pathname.startsWith('/m')) return;
  if (/\.[a-zA-Z0-9]{2,6}$/.test(url.pathname)) return;
  const ua = request.headers.get('user-agent') || '';
  const policy = request.headers.get('x-tablet-policy') || (Netlify?.env?.MOBILE_WEB_TABLET_POLICY) || 'desktop';
  const info = parseDevice(ua);
  if (shouldRedirectDevice(info, policy)) {
    url.pathname = '/m';
    return Response.redirect(url.toString(), 302);
  }
}

export const config = { path: '/*' };
