import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://programiqsolutions.com" target="_blank" rel="noopener noreferrer">Programiq Solutions</a>
        <span className="ml-1">&copy; 2020</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Developed by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">Morris Wanyonyi</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
