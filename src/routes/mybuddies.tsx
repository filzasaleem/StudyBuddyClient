import Buddies from '@/components/buddies/Buddies'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/mybuddies')({
  component: Buddies
})

