import SearchPage from '@/components/search/SearchPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/search')({
  component: SearchPage,
})

