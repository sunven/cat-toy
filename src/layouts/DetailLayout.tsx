import ShinyButton from '@/components/ui/shiny-button'
import { Outlet, useNavigate } from 'react-router'

export default function DetailLayout() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="fixed top-0 left-0 z-10 m-2">
        <ShinyButton
          onClick={() => {
            navigate('/')
          }}
        >
          {'<'} Back
        </ShinyButton>
      </div>
      <Outlet />
    </div>
  )
}
