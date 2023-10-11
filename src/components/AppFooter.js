import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">&copy; 2023 Все права защищены</span>
      </div>
      {/* <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://itdodasi.uz/" target="_blank" rel="noopener noreferrer">
          ITDodasi
        </a>
      </div> */}
    </CFooter>
  )
}

export default React.memo(AppFooter)
