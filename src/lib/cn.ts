interface cnProps {
  classes: Array<string | false | null | undefined>
}

export function cn(...classes: cnProps['classes']) {
  return classes.filter(Boolean).join(' ')
}
