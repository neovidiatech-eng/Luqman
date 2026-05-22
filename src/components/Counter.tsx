'use client'

import { animate, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

function Counter({
  from = 0,
  to,
  duration = 2,
}: {
  from?: number
  to: number
  duration?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(from)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        setCount(Math.floor(value))
      },
    })

    return () => controls.stop()
  }, [isInView, from, to, duration])

  return <span ref={ref}>{count}</span>
}

export default Counter