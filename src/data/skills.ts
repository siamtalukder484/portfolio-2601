import type { LucideIcon } from 'lucide-react'
import { MonitorSmartphone } from 'lucide-react'
import type { IconType } from 'react-icons'
import {
  SiBootstrap,
  SiCss,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'

export type SkillCategory = 'Markup & Styling' | 'Languages' | 'Frameworks & Libraries'

export interface Skill {
  name: string
  category: SkillCategory
  icon: IconType | LucideIcon
  /** Brand color shown on hover. */
  color: string
}

export const skills: Skill[] = [
  { name: 'HTML5', category: 'Markup & Styling', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', category: 'Markup & Styling', icon: SiCss, color: '#1572B6' },
  { name: 'Bootstrap', category: 'Markup & Styling', icon: SiBootstrap, color: '#7952B3' },
  { name: 'Media Queries', category: 'Markup & Styling', icon: MonitorSmartphone, color: '#0EA5E9' },
  { name: 'Tailwind CSS', category: 'Markup & Styling', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'JavaScript', category: 'Languages', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', category: 'Languages', icon: SiTypescript, color: '#3178C6' },
  { name: 'React.js', category: 'Frameworks & Libraries', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', category: 'Frameworks & Libraries', icon: SiNextdotjs, color: 'currentColor' },
]
