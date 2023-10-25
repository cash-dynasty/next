'use client'

import { Button, TextInput } from '@atoms'
import { ChangeEvent, useState } from 'react'
import { setGameStartNickname } from '@/store/slices/game/game.slice'
import { useDispatch } from 'react-redux'
import { useLazyGetPlayerAlreadyExistQuery } from '@/api'

type NicknameContentProp = {
  setSectorShowContnt: (SectorShowContent: boolean) => void
}

export const NicknameContent = ({ setSectorShowContnt }: NicknameContentProp) => {
  const dispatch = useDispatch()
  const [getPlayerAlreadyExist, { data }] = useLazyGetPlayerAlreadyExistQuery()
  const [nickname, setNickname] = useState('')
  const [isNicknameValid, setIsNicknameValid] = useState(true)

  const handleConfirmNickname = async () => {
    const player = (await getPlayerAlreadyExist({ nickname })).data
    if (player?.canBeCreated) {
      dispatch(setGameStartNickname(nickname))
      setSectorShowContnt(false)
    } else {
      setIsNicknameValid(false)
    }
  }

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
    setIsNicknameValid(true)
  }

  return (
    <div>
      <div className="w-full mb-2">
        {!isNicknameValid && data && data.canBeCreated === false ? (
          <p>Uzytkownik istnieje</p>
        ) : null}
        <span className="text-white text-sm">Create a nickname:</span>
        <TextInput fullWidth placeholder="Nickname" onChange={(e) => handleNicknameChange(e)} />
      </div>

      <Button
        label={'Confirm'}
        onClick={handleConfirmNickname}
        disabled={nickname.length > 2 ? false : true}
      />
    </div>
  )
}
