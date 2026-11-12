import type { ReactNode } from 'react'
export interface PeragraphProps {
    className?: string;
    text?: string | number | null | undefined;
    label?: string;
}

export interface ContainerProps {
  children: ReactNode
  className?: string
}