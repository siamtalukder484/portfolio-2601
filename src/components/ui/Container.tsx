
import { cn } from '../../lib/cn'
import type { ContainerProps } from '../../types/alltypes'



export default function Container({ children, className }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8', className)}>{children}</div>
}
