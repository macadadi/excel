import React from 'react'
import { IconProps } from '../types'

function CloseIcon(props?: IconProps) {
  return (
<svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
{...props}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
  )
}

export default CloseIcon