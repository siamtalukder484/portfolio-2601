import { ExternalLink } from 'lucide-react'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { FaGithub } from 'react-icons/fa6'
import type { Project } from '../data/projects'
import { projects } from '../data/projects'
import { fadeUp, staggerContainer } from '../lib/motion'
import Section from './ui/Section'
import { buttonStyles } from './ui/button'

interface ProjectLinkProps {
  href?: string
  label: string
  projectTitle: string
  variant: 'primary' | 'secondary'
  children: ReactNode
}

function ProjectLink({ href, label, projectTitle, variant, children }: ProjectLinkProps) {
  const className = buttonStyles(variant, 'sm', 'flex-1 sm:flex-none')

  if (!href) {
    return (
      <span
        role="link"
        aria-disabled="true"
        title="Link coming soon"
        className={`${className} cursor-not-allowed opacity-50 active:scale-100`}
      >
        {children}
        <span className="sr-only">for {projectTitle} (coming soon)</span>
      </span>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={`${label} for ${projectTitle}`}>
      {children}
    </a>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const { title, description, image, imageAlt, technologies, liveUrl, githubUrl } = project

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-[border-color,box-shadow] duration-300 hover:border-border-strong hover:shadow-lg hover:shadow-black/[0.04] dark:hover:shadow-black/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface-hover">
        <img
          src={image}
          alt={imageAlt}
          width={640}
          height={400}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{description}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
          {technologies.map((tech) => (
            <li key={tech} className="rounded-md border border-border px-2 py-1 font-mono text-[0.6875rem] text-muted">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex gap-2">
          <ProjectLink href={liveUrl} label="Live demo" projectTitle={title} variant="primary">
            <ExternalLink className="size-4" aria-hidden="true" />
            Live Demo
          </ProjectLink>
          <ProjectLink href={githubUrl} label="GitHub repository" projectTitle={title} variant="secondary">
            <FaGithub className="size-4" aria-hidden="true" />
            GitHub
          </ProjectLink>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Featured Projects"
      description="A selection of projects that show how I approach layout, interaction, and code quality."
    >
      <motion.div
        className="grid gap-6 md:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer(0.1)}
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>
    </Section>
  )
}
