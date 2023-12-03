import { AuthContainer } from '@organisms'
import { CurrentMoneyIndicator } from '@molecules'

export default function Home() {
  return (
    <div className="w-full min-h-screen flex justify-center lg:justify-start items-center">
      <div
        className="bg-no-repeat bg-center bg-cover w-full min-h-screen absolute top-0 left-0 -z-10"
        style={{ backgroundImage: 'url(/city.png)' }}
      />
      <AuthContainer />
      <CurrentMoneyIndicator />
    </div>
  )
}
