import { socialLinks } from '../../data/site'
import { cn } from '../../lib/cn'

interface SocialLinksProps {
  className?: string
  iconClassName?: string
}

export default function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  return (
    <ul className={cn('flex items-center gap-1', className)}>
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="inline-flex size-10 items-center justify-center rounded-lg text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-foreground"
          >
            <Icon className={cn('size-[18px]', iconClassName)} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}
