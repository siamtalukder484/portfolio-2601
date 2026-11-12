import type { IconType } from 'react-icons'
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa6'

export interface NavLink {
  id: string
  label: string
}

export interface SocialLink {
  label: string
  href: string
  icon: IconType
}

// Replace these placeholders with your personal details.
export const siteConfig = {
  name: 'Your Name',
  initials: 'YN',
  role: 'Frontend Developer',
  email: 'hello@example.com',
  location: 'Your City, Country',
  availableForWork: true,
}

export const navLinks: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/your-username', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-username', icon: FaLinkedin },
  { label: 'Facebook', href: 'https://www.facebook.com/your-username', icon: FaFacebook },
]
