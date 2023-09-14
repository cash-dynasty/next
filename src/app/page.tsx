import { Button } from '@atoms/Button'
import { MenuBar } from '@molecules/MenuBar'

export default function Home() {
  return (
    <div className="h-[100vh]">
      <Button label="ATAKUJ" />
      <MenuBar />
    </div>
  )
}
