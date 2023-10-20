'use client'

import { Button, TextInput } from '@/components/atoms'
import { useState } from 'react'
import { setGameStartNickname } from '@/store/slices/game/game.slice'
import { useDispatch } from 'react-redux'

type NicknameContentProp = {
  setSectorShowContnt: (SectorShowContent: boolean) => void
}

export const NicknameContent = ({ setSectorShowContnt }: NicknameContentProp) => {
  const dispatch = useDispatch()

  const [createNickname, setCreateNickname] = useState('')

  const handleConfirmButton = () => {
    dispatch(setGameStartNickname(createNickname))
    setSectorShowContnt(false)
  }

  return (
    <div>
      <div className="w-full mb-2">
        <span className="text-white text-sm">Create a nickname:</span>
        <TextInput
          fullWidth
          placeholder="Nickname"
          onChange={(e) => setCreateNickname(e.target.value)}
        />
      </div>
      {/* <p>{nickname}</p> */}
      <Button label={'Confirm'} onClick={() => handleConfirmButton()} />
    </div>
  )
}
