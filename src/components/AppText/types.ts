export type Variant = 'headline' | 'body' | 'label';

export type FontWeight = 'regular' | 'semiBold' | 'bold' | 'extraBold';

export const sizeMap = {
  headline: ['sm', 'md', 'lg', 'xl'] as const,
  body: ['sm', 'md', 'lg'] as const,
  label: ['sm', 'md', 'lg'] as const,
} satisfies Record<Variant, readonly string[]>;

export type AppTextProps = {
  variant?: Variant;
  size?: string;
  weight?: FontWeight;
  letterSpacing?: number;
  color?: string;
  children?: React.ReactNode;
};
