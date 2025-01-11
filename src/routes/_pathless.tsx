import SparklesText from '@/components/ui/sparkles-text'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_pathless')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="p-4 text-center">
        <SparklesText text="Cat Toys" />
      </div>
      <div className="px-20 py-10">
        <Outlet />
      </div>
    </>
  )
}
