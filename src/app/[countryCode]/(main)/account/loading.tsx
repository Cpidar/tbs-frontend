import Spinner from "@modules/common/icons/spinner"
import React, { Component } from 'react'

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full text-ui-fg-base">
      <Spinner size={36} />
    </div>
  )
}
