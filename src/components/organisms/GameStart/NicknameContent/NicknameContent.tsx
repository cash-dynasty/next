'use client'

import { Button, TextInput } from '@atoms'
import { ChangeEvent, useState } from 'react'
import { setGameStartNickname } from '@/store/slices/game.slice'
import { useDispatch } from 'react-redux'
import { useGetPlayerInfoQuery, useLazyGetPlayerAlreadyExistQuery } from '@/api'
import { useRouter } from 'next/navigation'
import { FaArrowRight } from 'react-icons/fa'
import { IoPersonOutline } from 'react-icons/io5'

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
    <div className=" flex flex-col justify-start items-start  w-full min-h-screen absolute  bg-opacity-10 top-0 left-0 z-0 p-32">
      <div className="flex flex-col">
        <div className="my-5">
          {!isNicknameValid ? <p>Uzytkownik istnieje</p> : null}
          <p className="text-white opacity-50 text-sm tracking-widest">1/2</p>
          <p className="text-white text-2xl">Nazwa Twojej postaci</p>
          <span className="text-white opacity-50 text-sm">
            Wybierz nazwę postaci, która będzie używana jako nazwa właściciela firmy.
          </span>
        </div>
        <div className="mb-5">
          <TextInput
            fullWidth
            placeholder="Pseudonim"
            onChange={handleNicknameChange}
            leftIcon={'person'}
          />
          <span className="text-white opacity-30 text-xs">Helper text</span>
        </div>

        <Button onClick={handleConfirmNickname} disabled={nickname.length > 2 ? false : true}>
          Dalej <FaArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  )
}
