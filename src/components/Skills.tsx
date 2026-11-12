import { motion } from 'motion/react'
import type { CSSProperties } from 'react'
import { skills } from '../data/skills'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'
import Section from './ui/Section'

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="My Tech Stack"
      description="The tools and technologies I use to design and build fast, responsive interfaces."
    >
      <motion.ul
        className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer(0.05)}
      >
        {skills.map(({ name, category, icon: Icon, color }) => (
          <motion.li
            key={name}
            variants={fadeUp}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{ '--brand': color } as CSSProperties}
            className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-colors duration-200 hover:border-border-strong"
          >
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-surface-hover text-muted transition-colors duration-200 group-hover:text-(--brand)">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-medium">{name}</p>
              <p className="truncate text-xs text-subtle">{category}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}
