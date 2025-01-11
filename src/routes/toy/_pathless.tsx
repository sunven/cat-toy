import ShinyButton from '@/components/ui/shiny-button'
import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/toy/_pathless')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()

  return (
    <div>
      <div className="fixed top-0 left-0 z-10 m-2">
        <ShinyButton
          onClick={() => {
            router.history.push('/')
          }}
        >
          {'<'} Back
        </ShinyButton>
      </div>
      <Outlet />
    </div>
  )
}
