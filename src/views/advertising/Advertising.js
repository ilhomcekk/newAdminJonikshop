import { cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { getAdvertising, postDeleteAdvertising } from 'src/redux/actions/advertisingActions'
const API = 'https://api.madad-service.uz/'

const Advertising = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { search } = location
  const metaNumber = search ? parseInt(search?.match(/\d+/)[0]) : 1
  const advertising = useSelector((state) => state.advertising.advertising)
  const _meta = useSelector((state) => state.advertising.pagination)
  const [pagination, setPagination] = useState({
    page: metaNumber,
    limit: 12,
  })
  useEffect(() => {
    let newPagination = {
      ...pagination,
      page: metaNumber,
    }
    setPagination(newPagination)
    dispatch(getAdvertising(newPagination))
  }, [metaNumber])
  const [pageNumbers, setPageNumbers] = useState([...Array(_meta?.pageCount)])
  useEffect(() => {
    setPageNumbers([...Array(_meta?.pageCount)])
  }, [_meta])
  const lastPage = pageNumbers?.length

  return (
    <div className="card mb-4">
      <div className="card-header d-flex flex-wrap align-items-center">
        Реклама
        <Link to={'/advertising/create'} className="btn btn-success ms-auto text-white">
          Добавить
        </Link>
      </div>
      <div className="card-body">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col" className="table-photo">
                Фото
              </th>
              <th scope="col">Название</th>
              <th scope="col">Категория</th>
              <th scope="col">Дата</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {advertising?.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">
                  <Link to={`/advertising/${item?._id}`} className="table-link"></Link>
                  {item?._id}
                </th>
                <td>
                  {' '}
                  <img src={API + item?.photo} alt="" />{' '}
                </td>
                <td>{item?.name_ru}</td>
                <td>{item?.category?.name_ru}</td>
                <td>{item?.date?.split(',')[0]}</td>
                <td className="table-icons-block">
                  <div className="table-icons">
                    <CButton
                      onClick={() => dispatch(postDeleteAdvertising(item?._id))}
                      color="danger"
                      className="text-white"
                    >
                      <CIcon icon={cilTrash} />
                    </CButton>
                    <Link to={`/advertising/update/${item?._id}`}>
                      <CButton color="warning" className="text-white">
                        <CIcon icon={cilPencil} />
                      </CButton>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav aria-label="..." className="pt-4">
          <ul className="pagination mt-4">
            <li className={`page-item ${pagination.page <= 1 ? 'disabled' : ''}`}>
              <Link
                to={`?page=${pagination.page > 1 && pagination.page - 1}`}
                className="page-link"
              >
                Previous
              </Link>
            </li>
            {pageNumbers?.map((item, idx) => (
              <li key={idx} className={`page-item ${idx + 1 === pagination.page ? 'active' : ''}`}>
                <Link to={`?page=${idx + 1}`} className="page-link">
                  {idx + 1}
                </Link>
              </li>
            ))}
            <li className={`page-item ${pagination.page === lastPage ? 'disabled' : ''}`}>
              <Link
                to={`?page=${pagination.page !== lastPage && pagination.page + 1}`}
                className="page-link"
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Advertising
