import { ArrowUp } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { siteConfig } from '../data/site'
import Container from './ui/Container'
import SocialLinks from './ui/SocialLinks'

const currentYear = new Date().getFullYear()

export default function Footer() {
  const prefersReducedMotion = useReducedMotion()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col items-center justify-between gap-6 py-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-semibold tracking-tight">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-subtle">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SocialLinks />
          <span className="h-6 w-px bg-border" aria-hidden="true" />
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            className="group inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted transition-colors duration-200 hover:border-border-strong hover:bg-surface-hover hover:text-foreground"
          >
            <ArrowUp className="size-[18px] transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </footer>
  )
}
