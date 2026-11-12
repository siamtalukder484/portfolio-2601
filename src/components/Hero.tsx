import { ArrowDown, ArrowRight, Mail } from 'lucide-react'
import { motion } from 'motion/react'
import { siteConfig } from '../data/site'
import { fadeUp, staggerContainer } from '../lib/motion'
import Container from './ui/Container'
import SocialLinks from './ui/SocialLinks'
import { buttonStyles } from './ui/button'

function CodeCard() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[2rem] border border-border/70" />
      <div aria-hidden="true" className="absolute -inset-12 -z-20 rounded-[2.5rem] border border-border/40" />
      <figure
        className="overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-black/[0.04] dark:shadow-black/40"
        aria-label="Code snippet describing the developer"
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="ml-3 font-mono text-xs text-subtle">developer.ts</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[0.8125rem] leading-7">
          <code>
            <span className="text-subtle">{'// About me'}</span>
            {'\n'}
            <span className="text-accent">const</span> developer = {'{'}
            {'\n'}
            {'  '}role: <span className="text-muted">'{siteConfig.role}'</span>,{'\n'}
            {'  '}stack: [<span className="text-muted">'React'</span>, <span className="text-muted">'TypeScript'</span>,{' '}
            <span className="text-muted">'Tailwind'</span>],{'\n'}
            {'  '}focus: <span className="text-muted">'Clean, accessible UI'</span>,{'\n'}
            {'  '}available: <span className="text-accent">{String(siteConfig.availableForWork)}</span>,{'\n'}
            {'}'}
          </code>
        </pre>
      </figure>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 sm:pt-32"
    >
      <div
        aria-hidden="true"
        className="bg-dot-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)] opacity-60"
      />

      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer(0.1, 0.1)}>
          {siteConfig.availableForWork && (
            <motion.p
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Available for opportunities
            </motion.p>
          )}

          <motion.p variants={fadeUp} className="mb-4 font-mono text-xs font-medium tracking-[0.2em] text-subtle uppercase sm:text-sm">
            Hello, I'm a Frontend Developer
          </motion.p>

          <motion.h1
            id="home-heading"
            variants={fadeUp}
            className="text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Building Modern &amp; Interactive <span className="text-subtle">Web Experiences.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            I'm a Frontend Developer passionate about creating clean, responsive, and user-friendly web applications
            using modern frontend technologies.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 min-[400px]:flex-row">
            <a href="#projects" className={buttonStyles('primary', 'md', 'group')}>
              View My Projects
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a href="#contact" className={buttonStyles('secondary')}>
              <Mail className="size-4" aria-hidden="true" />
              Contact Me
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex items-center gap-4">
            <span className="h-px w-8 bg-border-strong" aria-hidden="true" />
            <SocialLinks className="-ml-2" />
          </motion.div>
        </motion.div>

        <motion.div
          className="hidden sm:block"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <CodeCard />
        </motion.div>
      </Container>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full p-2 text-subtle transition-colors hover:text-foreground lg:block"
      >
        <ArrowDown className="size-5 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
      </a>
    </section>
  )
}
