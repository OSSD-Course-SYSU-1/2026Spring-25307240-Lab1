/*
 * 设计系统常量
 * 统一管理颜色、字体、间距、动画等设计规范
 */

export class DesignSystem {
  // ==================== 颜色系统 ====================
  
  /** 主色调 - 活力红 */
  static readonly COLOR_PRIMARY: string = '#FF4C3B';
  static readonly COLOR_PRIMARY_LIGHT: string = '#FF6B5A';
  static readonly COLOR_PRIMARY_DARK: string = '#E63A2A';
  
  /** 辅助色 - 能量黄 */
  static readonly COLOR_ACCENT: string = '#FFB826';
  static readonly COLOR_ACCENT_LIGHT: string = '#FFD45A';
  
  /** 信息色 - 科技蓝 */
  static readonly COLOR_INFO: string = '#3498FF';
  static readonly COLOR_INFO_LIGHT: string = '#5AADFF';
  
  /** 成功色 - 健康绿 */
  static readonly COLOR_SUCCESS: string = '#2ED573';
  static readonly COLOR_SUCCESS_LIGHT: string = '#5AE096';
  
  /** 背景色系 */
  static readonly BG_PRIMARY: string = '#000000';
  static readonly BG_SECONDARY: string = '#1A1A1F';
  static readonly BG_CARD: string = 'rgba(40, 40, 48, 0.6)';
  static readonly BG_CARD_SOLID: string = '#28282F';
  static readonly BG_ELEVATED: string = 'rgba(50, 50, 58, 0.8)';
  
  /** 文字色系 */
  static readonly TEXT_PRIMARY: string = '#FFFFFF';
  static readonly TEXT_SECONDARY: string = '#A8A8B3';
  static readonly TEXT_TERTIARY: string = '#6E6E7A';
  static readonly TEXT_DISABLED: string = '#4A4A54';
  
  /** 边框和分割线 */
  static readonly BORDER_LIGHT: string = 'rgba(255, 255, 255, 0.08)';
  static readonly BORDER_MEDIUM: string = 'rgba(255, 255, 255, 0.12)';
  static readonly BORDER_STRONG: string = 'rgba(255, 255, 255, 0.2)';
  
  // ==================== 字体系统 ====================
  
  /** 字号 */
  static readonly FONT_SIZE_XS: number = 10;
  static readonly FONT_SIZE_SM: number = 12;
  static readonly FONT_SIZE_MD: number = 14;
  static readonly FONT_SIZE_LG: number = 16;
  static readonly FONT_SIZE_XL: number = 20;
  static readonly FONT_SIZE_2XL: number = 24;
  static readonly FONT_SIZE_3XL: number = 28;
  static readonly FONT_SIZE_4XL: number = 36;
  static readonly FONT_SIZE_5XL: number = 48;
  
  /** 字重 */
  static readonly FONT_WEIGHT_REGULAR: FontWeight = FontWeight.Normal;
  static readonly FONT_WEIGHT_MEDIUM: FontWeight = FontWeight.Medium;
  static readonly FONT_WEIGHT_BOLD: FontWeight = FontWeight.Bold;
  
  // ==================== 间距系统 ====================
  
  static readonly SPACING_XS: number = 4;
  static readonly SPACING_SM: number = 8;
  static readonly SPACING_MD: number = 12;
  static readonly SPACING_LG: number = 16;
  static readonly SPACING_XL: number = 20;
  static readonly SPACING_2XL: number = 24;
  static readonly SPACING_3XL: number = 32;
  
  // ==================== 圆角系统 ====================
  
  static readonly RADIUS_SM: number = 8;
  static readonly RADIUS_MD: number = 12;
  static readonly RADIUS_LG: number = 16;
  static readonly RADIUS_XL: number = 20;
  static readonly RADIUS_FULL: number = 100;
  
  // ==================== 阴影系统 ====================
  
  static readonly SHADOW_SM: ShadowOptions = {
    radius: 4,
    color: 'rgba(0, 0, 0, 0.2)',
    offsetX: 0,
    offsetY: 2
  };
  
  static readonly SHADOW_MD: ShadowOptions = {
    radius: 8,
    color: 'rgba(0, 0, 0, 0.3)',
    offsetX: 0,
    offsetY: 4
  };
  
  static readonly SHADOW_LG: ShadowOptions = {
    radius: 16,
    color: 'rgba(0, 0, 0, 0.4)',
    offsetX: 0,
    offsetY: 8
  };
  
  // ==================== 动画系统 ====================
  
  /** 动画时长 */
  static readonly DURATION_FAST: number = 150;
  static readonly DURATION_NORMAL: number = 300;
  static readonly DURATION_SLOW: number = 500;
  
  /** 动画曲线 */
  static readonly CURVE_STANDARD: Curve = Curve.EaseInOut;
  static readonly CURVE_BOUNCE: Curve = Curve.EaseOut;
  static readonly CURVE_LINEAR: Curve = Curve.Linear;
  
  // ==================== 尺寸系统 ====================
  
  /** 图标尺寸 */
  static readonly ICON_SIZE_SM: number = 16;
  static readonly ICON_SIZE_MD: number = 24;
  static readonly ICON_SIZE_LG: number = 32;
  static readonly ICON_SIZE_XL: number = 40;
  
  /** 按钮高度 */
  static readonly BTN_HEIGHT_SM: number = 32;
  static readonly BTN_HEIGHT_MD: number = 44;
  static readonly BTN_HEIGHT_LG: number = 56;
  
  /** 导航栏高度 */
  static readonly NAV_HEIGHT: number = 60;
  static readonly STATUS_BAR_HEIGHT: number = 24;
  
  // ==================== 辅助方法 ====================
  
  /**
   * 生成渐变色
   */
  static gradientColors(color1: string, color2: string): LinearGradient {
    return {
      angle: 90,
      colors: [[color1, 0], [color2, 1]]
    };
  }
  
  /**
   * 生成带透明度的颜色
   */
  static withAlpha(color: string, alpha: number): string {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  /**
   * 颜色变亮
   */
  static lighten(color: string, factor: number): string {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    const newR = Math.min(255, Math.floor(r + (255 - r) * factor));
    const newG = Math.min(255, Math.floor(g + (255 - g) * factor));
    const newB = Math.min(255, Math.floor(b + (255 - b) * factor));
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  }
}
