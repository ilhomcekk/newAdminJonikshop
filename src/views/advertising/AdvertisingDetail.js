import { cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDetailAdvertising, postDeleteAdvertising } from 'src/redux/actions/advertisingActions'
import HTMLReactParser from 'html-react-parser'
const API = 'https://api.madad-service.uz/'

const AdvertisingDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  const { data } = useSelector((state) => state.advertising)

  useEffect(() => {
    dispatch(getDetailAdvertising(id))
  }, [id])

  const { step } = useSelector((state) => state.news)
  useEffect(() => {
    if (step === true) navigate('/advertising')
  }, [step])

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card">
              <img className="card-img-top" src={data?.photo} alt="" />
              <div className="card-body">
                <h5 className="card-title">{data?.name_ru}</h5>
                <p className="card-text">{HTMLReactParser(String(data?.description_ru))}</p>
                <Link
                  to={`/advertising/update/${data?._id}`}
                  className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-1 mb-2"
                >
                  <CIcon icon={cilPencil} />
                  Редактировать
                </Link>
                <CButton
                  onClick={() => dispatch(postDeleteAdvertising(data?._id))}
                  className="btn btn-danger text-white w-100 d-flex align-items-center justify-content-center gap-1"
                >
                  <CIcon icon={cilTrash} />
                  Удалить
                </CButton>
              </div>
            </div>
          </div>
          <div className="col-xl-9">
            <table className="table table-hover table-striped">
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>{data?._id}</td>
                </tr>
                <tr>
                  <td>Название</td>
                  <td>{data?.name_ru}</td>
                </tr>
                <tr>
                  <td>Линк</td>
                  <td>
                    <a href={data?.link}>{data?.link}</a>
                  </td>
                </tr>
                <tr>
                  <td>Дата</td>
                  <td>{data?.date}</td>
                </tr>
              </tbody>
            </table>
            <h6 className="mt-4">Описание</h6>
            <div className="border p-3">{HTMLReactParser(String(data?.description_ru))}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvertisingDetail
