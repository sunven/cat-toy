import { Link } from '@tanstack/react-router'
import { toyList } from './data'
import ShineBorder from '@/components/ui/shine-border'

export default function Home() {
  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {toyList.map((item, index) => {
        return (
          <ShineBorder key={index} color={['#A07CFE', '#FE8FB5', '#FFBE7B']}>
            <Link to={item.url}>
              <img src={item.img} alt={item.title} className="w-[400px] h-[300px]" onClick={() => {}} />
            </Link>
          </ShineBorder>
        )
      })}
    </div>
  )
}
