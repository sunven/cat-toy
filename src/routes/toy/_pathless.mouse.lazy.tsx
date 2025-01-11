import MouseAnimation from '@/pages/mouse'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/toy/_pathless/mouse')({
  component: MouseAnimation,
})
