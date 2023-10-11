import { CButton } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import TransactionCard from 'src/views/base/cards/TransactionCard'
import PayAdminModal from 'src/views/modal/PayAdminModal'
import ProfileUpdate from 'src/views/modal/ProfileUpdate'
import Avatar from '../../assets/images/avatars/avatar.png'
import { getTransactionAdmin } from 'src/redux/actions/transactionActions'

const Profile = () => {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.auth.profile?.data)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const offset = searchParams.get('offset') || 0
  const limit = searchParams.get('limit') || 25
  const transactionAdmin = useSelector((state) => state.transaction.transactionAdmin?.data)
  let pageCount = Math.ceil(+transactionAdmin?.count / +limit)

  const [show, setShow] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)

  const handleClose = () => {
    setShow(false)
  }
  const handleOpen = () => {
    setShow(true)
  }
  const handleCloseProfileModal = () => {
    setShowProfileModal(false)
  }
  const handleOpenProfileModal = () => {
    setShowProfileModal(true)
  }

  useEffect(() => {
    dispatch(getTransactionAdmin({ offset: offset, limit: limit }))
  }, [offset])

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center gap-2">
            <img
              src={profile?.image || Avatar}
              alt=""
              style={{
                width: '50px',
                height: '50px',
                minWidth: '50px',
                borderRadius: '50%',
                objectFit: 'contain',
              }}
            />
            {profile?.first_name} {profile?.last_name}
          </div>
          <ul className="list-group mt-4">
            <li className="list-group-item">Telefon raqamingiz: {profile?.phone_number}</li>
            <li className="list-group-item">
              Hisobingizdagi mablag`: {profile?.wallet?.toLocaleString('ru-RU')} UZS
            </li>
          </ul>
          <CButton color="primary" className="mt-3" onClick={handleOpen}>
            Mablag`ni yechish
          </CButton>
          <CButton
            color="warning"
            className="text-white mt-3 ms-md-3"
            onClick={handleOpenProfileModal}
          >
            Profilni O`zgartirish
          </CButton>
          <div className="fs-5 mt-4 mb-2">Arizalaringiz</div>
          <div className="stream-cards">
            {transactionAdmin?.results?.map((item, idx) => (
              <TransactionCard card={item} key={idx} />
            ))}
          </div>
          {transactionAdmin?.count !== 0 && (
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center mt-4">
                {/* <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li> */}
                {pageCount &&
                  [...Array(pageCount)].map((item, idx) => (
                    <li key={idx} className="page-item">
                      <Link className="page-link" to={`?offset=${idx * 25}&limit=25`}>
                        {idx + 1}
                      </Link>
                    </li>
                  ))}
                {/* <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li> */}
              </ul>
            </nav>
          )}
        </div>
      </div>
      <PayAdminModal show={show} handleClose={handleClose} />
      <ProfileUpdate show={showProfileModal} handleClose={handleCloseProfileModal} />
    </div>
  )
}

export default Profile
