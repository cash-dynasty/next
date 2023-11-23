type TypographyProps = {
  children: string
  variant: keyof typeof VARIANTS_MAPPING
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
}

const VARIANTS_MAPPING = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subheading1: 'h6',
  subheading2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'p',
}

export const Typography = ({ children, variant, size }: TypographyProps) => {
  if (variant === 'heading') {
    return <h1 className={`text-${size} font-bold`}>{children}</h1>
  }

  if (variant === 'paragraph') {
    return <p className={`text-${size} font-normal`}>{children}</p>
  }

  if (variant === 'body') {
    return <p className={`text-${size} font-medium`}>{children}</p>
  }

  if (variant === 'caption') {
    return <p className={`text-${size} font-light`}>{children}</p>
  }
}
