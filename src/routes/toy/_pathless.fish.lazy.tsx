import KoiFish from '@/pages/fish'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/toy/_pathless/fish')({
  component: KoiFish,
})
