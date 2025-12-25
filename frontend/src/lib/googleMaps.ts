export const loadGoogleMaps = (apiKey: string) => {
  return new Promise<any>((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('window is undefined'));
    // @ts-ignore
    if ((window as any).google && (window as any).google.maps) return resolve((window as any).google);

    const existing = document.querySelector(`script[data-google-maps]`);
    if (existing) {
      existing.addEventListener('load', () => resolve((window as any).google));
      existing.addEventListener('error', (e) => reject(e));
      return;
    }

    const script = document.createElement('script');
    script.setAttribute('data-google-maps', '1');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve((window as any).google);
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
};
