import { useEffect, useState } from 'react'
import { animate, useReducedMotion } from 'motion/react'

const format = (value: number) => new Intl.NumberFormat('en-IN').format(value)

export function AnimatedCount({ value, from }: { value: number, from?: number }) {
  const reducedMotion = useReducedMotion()
  const [shown, setShown] = useState(from ?? value)
  useEffect(() => {
    if (reducedMotion) { setShown(value); return }
    const control = animate(shown, value, { duration: .8, ease: 'easeOut', onUpdate: latest => setShown(Math.round(latest)) })
    return () => control.stop()
  }, [value, reducedMotion])
  return <span>{format(shown)}</span>
}
