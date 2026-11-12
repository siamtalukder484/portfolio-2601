import { AlertCircle, CheckCircle2, Info, Loader2, Mail, Send } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { ChangeEvent, FocusEvent, FormEvent } from 'react'
import { useState } from 'react'
import { socialLinks, siteConfig } from '../data/site'
import { fadeUp, viewportOnce } from '../lib/motion'
import { cn } from '../lib/cn'
import Section from './ui/Section'
import { buttonStyles } from './ui/button'

interface FormValues {
  name: string
  email: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

type SubmitStatus =
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success'; message: string }
  | { type: 'info'; message: string }
  | { type: 'error'; message: string }

const initialValues: FormValues = { name: '', email: '', subject: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT

function validateField(field: keyof FormValues, rawValue: string): string | undefined {
  const value = rawValue.trim()
  switch (field) {
    case 'name':
      if (!value) return 'Please enter your name.'
      if (value.length < 2) return 'Name should be at least 2 characters.'
      return undefined
    case 'email':
      if (!value) return 'Please enter your email address.'
      if (!EMAIL_PATTERN.test(value)) return 'Please enter a valid email address.'
      return undefined
    case 'subject':
      if (!value) return 'Please add a subject.'
      if (value.length < 3) return 'Subject should be at least 3 characters.'
      return undefined
    case 'message':
      if (!value) return 'Please write a message.'
      if (value.length < 10) return 'Message should be at least 10 characters.'
      return undefined
  }
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  for (const field of Object.keys(values) as Array<keyof FormValues>) {
    const error = validateField(field, values[field])
    if (error) errors[field] = error
  }
  return errors
}

const inputClassName =
  'w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-subtle transition-colors duration-200 outline-none focus:border-foreground focus-visible:outline-none'

interface FieldProps {
  field: keyof FormValues
  label: string
  value: string
  error?: string
  type?: string
  placeholder: string
  autoComplete?: string
  multiline?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

function Field({ field, label, value, error, type = 'text', placeholder, autoComplete, multiline, onChange, onBlur }: FieldProps) {
  const id = `contact-${field}`
  const errorId = `${id}-error`
  const shared = {
    id,
    name: field,
    value,
    placeholder,
    onChange,
    onBlur,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
    className: cn(inputClassName, error ? 'border-red-500/70' : 'border-border hover:border-border-strong'),
  }

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={5} className={cn(shared.className, 'resize-y')} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} />
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

const statusStyles = {
  success: { icon: CheckCircle2, className: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' },
  info: { icon: Info, className: 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300' },
  error: { icon: AlertCircle, className: 'border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300' },
} as const

function openMailClient({ name, email, subject, message }: FormValues) {
  const body = `${message.trim()}\n\n— ${name.trim()} (${email.trim()})`
  window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(body)}`
}

export default function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>({ type: 'idle' })

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as keyof FormValues
    const { value } = event.target
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: validateField(field, value) }))
    if (status.type !== 'idle' && status.type !== 'submitting') setStatus({ type: 'idle' })
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as keyof FormValues
    if (!event.target.value) return
    setErrors((current) => ({ ...current, [field]: validateField(field, event.target.value) }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)

    const firstInvalid = Object.keys(validationErrors)[0]
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus()
      setStatus({ type: 'error', message: 'Please fix the highlighted fields and try again.' })
      return
    }

    if (!contactEndpoint) {
      openMailClient(values)
      setStatus({
        type: 'info',
        message: `Your email app should open with this message prefilled. Nothing is sent from this site until you send it there. You can also email ${siteConfig.email} directly.`,
      })
      return
    }

    setStatus({ type: 'submitting' })
    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
      setValues(initialValues)
      setStatus({ type: 'success', message: "Thanks! Your message has been sent. I'll get back to you soon." })
    } catch {
      setStatus({
        type: 'error',
        message: `Something went wrong while sending your message. Please try again or email ${siteConfig.email}.`,
      })
    }
  }

  const contactLinks = [
    { label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail },
    ...socialLinks
      .filter((link) => link.label === 'GitHub' || link.label === 'LinkedIn')
      .map((link) => ({ label: link.label, value: link.href.replace(/^https?:\/\/(www\.)?/, ''), href: link.href, icon: link.icon })),
  ]

  const isSubmitting = status.type === 'submitting'
  const feedback = status.type === 'success' || status.type === 'info' || status.type === 'error' ? status : null

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's Work Together"
      description="Have a project in mind or looking for a frontend developer? Feel free to get in touch."
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <motion.ul
          className="flex flex-col gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          {contactLinks.map(({ label, value, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-colors duration-200 hover:border-border-strong hover:bg-surface-hover"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-hover text-muted transition-colors group-hover:text-foreground">
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-subtle">{label}</span>
                  <span className="block truncate text-sm font-medium">{value}</span>
                </span>
              </a>
            </li>
          ))}
        </motion.ul>

        <motion.form
          noValidate
          onSubmit={handleSubmit}
          aria-label="Contact form"
          className="rounded-2xl border border-border bg-surface p-5 sm:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field field="name" label="Name" placeholder="Jane Doe" autoComplete="name" value={values.name} error={errors.name} onChange={handleChange} onBlur={handleBlur} />
            <Field field="email" label="Email" type="email" placeholder="jane@example.com" autoComplete="email" value={values.email} error={errors.email} onChange={handleChange} onBlur={handleBlur} />
          </div>
          <div className="mt-5 grid gap-5">
            <Field field="subject" label="Subject" placeholder="Project inquiry" value={values.subject} error={errors.subject} onChange={handleChange} onBlur={handleBlur} />
            <Field field="message" label="Message" placeholder="Tell me a bit about your project..." multiline value={values.message} error={errors.message} onChange={handleChange} onBlur={handleBlur} />
          </div>

          <div aria-live="polite" className="mt-5">
            <AnimatePresence mode="wait">
              {feedback && (
                <motion.p
                  key={feedback.type + feedback.message}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={cn('flex items-start gap-2.5 rounded-lg border px-3.5 py-3 text-sm', statusStyles[feedback.type].className)}
                >
                  {(() => {
                    const StatusIcon = statusStyles[feedback.type].icon
                    return <StatusIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  })()}
                  {feedback.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <button type="submit" disabled={isSubmitting} className={buttonStyles('primary', 'md', 'mt-5 w-full sm:w-auto')}>
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="size-4" aria-hidden="true" />
            )}
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>
      </div>
    </Section>
  )
}
