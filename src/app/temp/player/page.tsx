'use client'

import { useGetBuildingsQuery, useGetPlayerInfoQuery } from '@/api'

import React from 'react'
import { SafeboxContent } from '@/components/organisms/SafeboxContent'

export default function Player() {
  const { data: buildingsData } = useGetBuildingsQuery({
    propertyId: 100001,
  })
  const { data, isLoading } = useGetPlayerInfoQuery()

  return (
    <div className="h-screen bg-slate-700 flex flex-col items-center justify-center gap-5">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-h-96 overflow-y-scroll">
          {data?.player && <pre>{JSON.stringify(buildingsData, null, 2)}</pre>}
        </div>
      )}
      <SafeboxContent />
    </div>
  )
}
