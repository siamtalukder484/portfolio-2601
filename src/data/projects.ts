import dashboardThumbnail from '../assets/projects/dashboard.svg'
import ecommerceThumbnail from '../assets/projects/ecommerce.svg'
import taskThumbnail from '../assets/projects/tasks.svg'
import weatherThumbnail from '../assets/projects/weather.svg'

export interface Project {
  title: string
  description: string
  image: string
  imageAlt: string
  technologies: string[]
  /** Leave empty until the project is deployed. */
  liveUrl?: string
  /** Leave empty until the repository is public. */
  githubUrl?: string
}

// Placeholder projects: replace with your own work, screenshots, and links.
export const projects: Project[] = [
  {
    title: 'Analytics Dashboard',
    description:
      'A responsive admin dashboard with interactive charts, filterable data tables, and a collapsible sidebar layout.',
    image: dashboardThumbnail,
    imageAlt: 'Placeholder preview of an analytics dashboard with charts and stat cards',
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS'],
    liveUrl: "https://www.youtube.com/"
  },
  {
    title: 'E-commerce Storefront',
    description:
      'A product catalog with category filters, a persistent shopping cart, and a streamlined checkout flow.',
    image: ecommerceThumbnail,
    imageAlt: 'Placeholder preview of an online store product grid',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Task Manager',
    description:
      'A kanban-style task board with drag-friendly columns, local persistence, and keyboard-accessible controls.',
    image: taskThumbnail,
    imageAlt: 'Placeholder preview of a kanban task board with three columns',
    technologies: ['React.js', 'JavaScript', 'CSS3'],
  },
  {
    title: 'Weather App',
    description:
      'A clean weather app showing current conditions and a weekly forecast, optimized for mobile screens.',
    image: weatherThumbnail,
    imageAlt: 'Placeholder preview of a weather app with a forecast list',
    technologies: ['HTML5', 'Bootstrap', 'JavaScript'],
  },
]
