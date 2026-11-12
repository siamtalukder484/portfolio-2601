import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { navLinks, siteConfig } from '../data/site'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrolled } from '../hooks/useScrolled'
import { cn } from '../lib/cn'
import ThemeToggle from './ThemeToggle'
import Container from './ui/Container'

const sectionIds = navLinks.map((link) => link.id)

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const activeId = useActiveSection(sectionIds)
  const scrolled = useScrolled()

  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    const desktopQuery = window.matchMedia('(min-width: 768px)')
    const onBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    desktopQuery.addEventListener('change', onBreakpointChange)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      desktopQuery.removeEventListener('change', onBreakpointChange)
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || isMenuOpen
          ? 'border-border bg-background/80 backdrop-blur-md'
          : 'border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <a
          href="#home"
          onClick={closeMenu}
          className="group flex items-center gap-2.5 font-semibold tracking-tight"
          aria-label={`${siteConfig.name}, back to top`}
        >
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-foreground font-mono text-xs font-bold text-background transition-transform duration-200 group-hover:-rotate-6">
            {siteConfig.initials}
          </span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map(({ id, label }) => {
              const isActive = activeId === id
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative block rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-200',
                      isActive ? 'text-foreground' : 'text-muted hover:text-foreground',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 -z-10 rounded-md bg-surface-hover"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-foreground md:hidden"
          >
            {isMenuOpen ? <X className="size-[18px]" aria-hidden="true" /> : <Menu className="size-[18px]" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <Container>
              <ul className="flex flex-col py-3">
                {navLinks.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={closeMenu}
                      aria-current={activeId === id ? 'true' : undefined}
                      className={cn(
                        'flex items-center justify-between rounded-md px-3 py-3 text-base font-medium transition-colors',
                        activeId === id ? 'bg-surface-hover text-foreground' : 'text-muted hover:text-foreground',
                      )}
                    >
                      {label}
                      {activeId === id && <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />}
                    </a>
                  </li>
                ))}
              </ul>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
