import { cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDetailServices, postDeleteServices } from 'src/redux/actions/servicesActions'
import HTMLReactParser from 'html-react-parser'
import { getDetailTarif, postDeleteTarif } from 'src/redux/actions/tarifActions'
import {
  getDetailTarifServices,
  postDeleteTarifServices,
} from 'src/redux/actions/tarifServicesActions'
const API = 'https://api.madad-service.uz/'

const TariffsDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  const { data } = useSelector((state) => state.tarifServices)

  useEffect(() => {
    dispatch(getDetailTarifServices(id))
  }, [id])

  const { step } = useSelector((state) => state.tarifServices)
  useEffect(() => {
    if (step === true) navigate('/tariffs-services')
  }, [step])

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card">
              <img className="card-img-top" src={API + data?.photo} alt="" />
              <div className="card-body">
                <h5 className="card-title">{data?.name_ru}</h5>
                <p className="card-text">{HTMLReactParser(String(data?.description_ru))}</p>
                <Link
                  to={`/tariffs-services/update/${data?._id}`}
                  className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-1 mb-2"
                >
                  <CIcon icon={cilPencil} />
                  Редактировать
                </Link>
                <CButton
                  onClick={() => dispatch(postDeleteTarifServices(data?._id))}
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
                  <td>Описание</td>
                  <td>{data?.description_ru}</td>
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

export default TariffsDetail
