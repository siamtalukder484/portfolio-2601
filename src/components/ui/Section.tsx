import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/motion'
import { cn } from '../../lib/cn'
import Container from './Container'

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export default function Section({ id, eyebrow, title, description, children, className }: SectionProps) {
  const headingId = `${id}-heading`

  return (
    <section id={id} aria-labelledby={headingId} className={cn('py-20 sm:py-24 lg:py-28', className)}>
      <Container>
        <motion.header
          className="mb-10 max-w-2xl sm:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 font-mono text-xs font-medium tracking-[0.2em] text-accent uppercase"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            id={headingId}
            variants={fadeUp}
            className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {description}
            </motion.p>
          )}
        </motion.header>
        {children}
      </Container>
    </section>
  )
}
