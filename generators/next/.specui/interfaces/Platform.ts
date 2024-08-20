export interface Platform {
  desktop?: PlatformDesktop;
  domain?: string;
}

export interface PlatformDesktop {
  url?: string;
  window?: PlatformDesktopWindow;
}

export interface PlatformDesktopWindow {
  height?: number;
  width?: number;
}
