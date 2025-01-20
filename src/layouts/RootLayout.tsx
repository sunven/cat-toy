import SparklesText from '@/components/ui/sparkles-text'
import { Outlet } from 'react-router'

export default function RootLayout() {
  return (
    <main>
      <div className="p-4 text-center">
        <SparklesText text="Cat Toys" />
      </div>
      <div className="px-20 py-10">
        <Outlet />
      </div>
    </main>
  )
}
