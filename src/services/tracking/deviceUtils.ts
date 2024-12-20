export const getBrowserInfo = (ua: string): string => {
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Edge')) return 'Edge';
  return 'Other';
};

export const getOSInfo = (ua: string): string => {
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac')) return 'MacOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iOS')) return 'iOS';
  return 'Other';
};

export const getDeviceType = (ua: string): 'mobile' | 'tablet' | 'desktop' => {
  const mobile = /Mobile|Android|iPhone/i.test(ua);
  const tablet = /Tablet|iPad/i.test(ua);
  return mobile ? 'mobile' : tablet ? 'tablet' : 'desktop';
};