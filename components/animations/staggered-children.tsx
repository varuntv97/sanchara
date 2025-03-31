"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface StaggeredChildrenProps {
  children: ReactNode[]
  staggerDelay?: number
  initialDelay?: number
  duration?: number
  className?: string
}

export function StaggeredChildren({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  duration = 0.5,
  className,
}: StaggeredChildrenProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className={className}>
      {children.map((child, index) => (
        <motion.div key={index} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

