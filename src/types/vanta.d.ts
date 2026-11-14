declare module 'vanta/dist/vanta.net.min' {
  export interface VantaEffect {
    destroy: () => void;
    resize?: () => void;
    setOptions?: (options: Record<string, unknown>) => void;
  }
  const NET: (options: Record<string, unknown>) => VantaEffect;
  export default NET;
}

declare module 'vanta/dist/vanta.waves.min' {
  export interface VantaEffect {
    destroy: () => void;
    resize?: () => void;
    setOptions?: (options: Record<string, unknown>) => void;
  }
  const WAVES: (options: Record<string, unknown>) => VantaEffect;
  export default WAVES;
}

declare module 'vanta/dist/vanta.fog.min' {
  export interface VantaEffect {
    destroy: () => void;
    resize?: () => void;
    setOptions?: (options: Record<string, unknown>) => void;
  }
  const FOG: (options: Record<string, unknown>) => VantaEffect;
  export default FOG;
}
