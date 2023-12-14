import { Button } from '@atoms'

export const SafeboxContent = () => {
  const propertyAmount = 1000
  return (
    <p className="pt-4 pb-8 px-8 rounded-lg bg-slate-200">
      Safebox status:
      <span className="text-green-700 text-4xl"> {propertyAmount} </span> $$$
      <div className="flex justify-between mt-6">
        <Button label="Withdraw" onClick={() => {}} />
        <Button label="Deposit" onClick={() => {}} />
      </div>
    </p>
  )
}
