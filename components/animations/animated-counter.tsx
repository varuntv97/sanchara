"use client"

import { useSpring, animated } from "@react-spring/web"
import { useEffect, useState } from "react"

interface AnimatedCounterProps {
  value: number
  duration?: number
  formatValue?: (value: number) => string
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 1000,
  formatValue = (val) => val.toFixed(0),
  className,
}: AnimatedCounterProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const { number } = useSpring({
    from: { number: 0 },
    to: { number: value },
    config: { duration },
    delay: 100,
  })

  if (!isClient) {
    return <span className={className}>{formatValue(value)}</span>
  }

  return <animated.span className={className}>{number.to((val) => formatValue(val))}</animated.span>
}

