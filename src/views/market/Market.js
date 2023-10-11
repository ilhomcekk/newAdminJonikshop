import React, { useEffect, useState } from 'react'
import { cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import MarketCard from '../base/cards/MarketCard'
import { useDispatch, useSelector } from 'react-redux'
import StreamCreateModal from '../modal/StreamCreateModal'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getMarketProducts } from 'src/redux/actions/productActions'

const Market = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const offset = searchParams.get('offset') || 0
  const search = searchParams.get('search') || ''
  const limit = searchParams.get('limit') || 25
  const marketProducts = useSelector((state) => state.product.marketProducts?.data)
  let pageCount = Math.ceil(+marketProducts?.count / +limit)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [productId, setProductId] = useState('')

  const [query, setQuery] = useState(search)

  const handleSearch = (value) => {
    navigate(`?search=${value}`)
  }

  const handleShowModal = () => {
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    dispatch(getMarketProducts({ search, offset: offset, limit: limit }))
  }, [offset])

  useEffect(() => {
    dispatch(getMarketProducts({ search, offset: 0, limit: limit }))
  }, [search])

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="fw-bold fs-4 mb-3">Mahsulotlar</div>
          <div className="input-group">
            <input
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              type="text"
              className="form-control"
              placeholder="Mahsulot qidirish"
            />
            <button
              onClick={() => handleSearch(query)}
              className="btn btn-success input-group-text"
              id="basic-addon1"
            >
              <CIcon icon={cilSearch} style={{ color: '#fff' }} />
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="market-cards">
            {marketProducts?.results?.map((item, idx) => (
              <MarketCard
                card={item}
                onClick={() => {
                  setProductId(item.id)
                  handleShowModal()
                }}
                key={idx}
              />
            ))}
          </div>
          <StreamCreateModal show={showModal} handleClose={handleCloseModal} data={productId} />
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center mt-4">
              {/* <li className="page-item">
                <Link className="page-link" to={`?offset=4`} aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li> */}
              {pageCount > 0 &&
                [...Array(pageCount)].map((item, idx) => (
                  <li key={idx} className="page-item">
                    <Link
                      className="page-link"
                      to={`?search=${search}&offset=${idx * 25}&limit=25`}
                    >
                      {idx + 1}
                    </Link>
                  </li>
                ))}
              {/* <li className="page-item">
                <Link className="page-link" to={`?offset=4`} aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Market
