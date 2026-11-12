import type { LucideIcon } from 'lucide-react'
import { Code2, Gauge, GraduationCap, LayoutTemplate, Smartphone } from 'lucide-react'
import { motion } from 'motion/react'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'
import Section from './ui/Section'

interface Interest {
  label: string
  description: string
  icon: LucideIcon
}

const interests: Interest[] = [
  { label: 'Frontend Development', description: 'Component-driven apps with React and Next.js.', icon: Code2 },
  { label: 'Responsive Web Design', description: 'Layouts that adapt from 320px to wide screens.', icon: Smartphone },
  { label: 'Modern UI/UX', description: 'Clear hierarchy, consistent systems, accessible UI.', icon: LayoutTemplate },
  { label: 'Web Performance', description: 'Fast loads, lean bundles, and smooth interactions.', icon: Gauge },
  { label: 'Continuous Learning', description: 'Exploring new tools and best practices every day.', icon: GraduationCap },
]

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="About Me">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
          <p className="text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
            I'm a passionate <span className="font-medium text-foreground">Frontend Developer</span> who enjoys turning
            ideas into beautiful, functional, and responsive web experiences. I love learning modern technologies and
            building user-focused applications with clean and maintainable code.
          </p>
        </motion.div>

        <div>
          <h3 className="mb-5 text-sm font-medium text-subtle">What I care about</h3>
          <motion.ul
            className="divide-y divide-border border-y border-border"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.07)}
          >
            {interests.map(({ label, description, icon: Icon }) => (
              <motion.li key={label} variants={fadeUp} className="group flex items-start gap-4 py-4">
                <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors duration-200 group-hover:text-accent">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-medium">{label}</p>
                  <p className="mt-0.5 text-sm text-muted">{description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </Section>
  )
}
