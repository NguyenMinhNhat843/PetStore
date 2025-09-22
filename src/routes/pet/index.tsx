import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pet/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/pet/"!</div>
}
