import { ReactNode } from 'react'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

type HeadingProps = {
  level: HeadingLevel
  children: ReactNode
  className?: string
}

export default function Heading({
  level,
  children,
  className = '',
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  const baseStyles = 'font-gilroy font-bold text-(--solid-white)'

  const levelStyles = {
    1: 'text-4xl md:text-5xl',
    2: 'text-3xl md:text-4xl',
    3: 'text-2xl md:text-3xl',
    4: 'text-xl md:text-2xl',
    5: 'text-lg md:text-xl',
    6: 'text-base md:text-lg',
  }

  return (
    <Tag className={`${baseStyles} ${levelStyles[level]} ${className}`}>
      {children}
    </Tag>
  )
}