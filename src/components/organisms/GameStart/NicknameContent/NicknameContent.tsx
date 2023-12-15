'use client'

import { Button, TextInput } from '@atoms'
import { ChangeEvent, useState } from 'react'
import { setGameStartNickname } from '@/store/slices/game.slice'
import { useDispatch } from 'react-redux'
import { useGetPlayerInfoQuery, useLazyGetPlayerAlreadyExistQuery } from '@/api'
import { useRouter } from 'next/navigation'

type NicknameContentProp = {
  setSectorShowContent: (SectorShowContent: boolean) => void
}

export const NicknameContent = (props: NicknameContentProp) => {
  const dispatch = useDispatch()
  const [getPlayerAlreadyExist] = useLazyGetPlayerAlreadyExistQuery()
  const { data: playerInfo, isLoading } = useGetPlayerInfoQuery()
  const [nickname, setNickname] = useState('')
  const [isNicknameValid, setIsNicknameValid] = useState(true)
  const router = useRouter()

  const handleConfirmNickname = async () => {
    getPlayerAlreadyExist({ nickname })
      .unwrap()
      .then((res) => {
        if (res.nicknameAvailable === true) {
          dispatch(setGameStartNickname(nickname))
          props.setSectorShowContent(false)
        } else {
          setIsNicknameValid(false)
        }
      })
  }

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
    setIsNicknameValid(true)
  }

  if (isLoading) return <p>Loading...</p>

  if (!isLoading && playerInfo?.player?.id) {
    const navigateToGameScreen = () => router.push('/game')

    setTimeout(navigateToGameScreen, 5000)

    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-white text-xl">Witaj {playerInfo.player.nickname}!</p>
        <p className="text-white text-xl">
          Rozpocząłeś już grę. Zostaniesz przeniesiony na ekran główny za 5 sekund
        </p>
        <Button label="Przenieś teraz" onClick={navigateToGameScreen} />
      </div>
    )
  }

  return (
    <div>
      <div className="w-full mb-2">
        {!isNicknameValid ? <p>Uzytkownik istnieje</p> : null}
        <span className="text-white text-sm">Wybierz pseudonim swojego CEO:</span>
        <TextInput fullWidth placeholder="Pseudonim" onChange={handleNicknameChange} />
      </div>

      <Button
        label={'Confirm'}
        onClick={handleConfirmNickname}
        disabled={nickname.length > 2 ? false : true}
      />
    </div>
  )
}
