import { cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDetailServices, postDeleteServices } from 'src/redux/actions/servicesActions'
import HTMLReactParser from 'html-react-parser'
import { getDetailTarif, postDeleteTarif } from 'src/redux/actions/tarifActions'

const TariffsDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  const { data } = useSelector((state) => state.tarif)

  useEffect(() => {
    dispatch(getDetailTarif(id))
  }, [id])

  const { step } = useSelector((state) => state.tarif)
  useEffect(() => {
    if (step === true) navigate('/tariffs')
  }, [step])

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
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
                <td>Категория</td>
                <td>{data?.category?.name_ru}</td>
              </tr>
              <tr>
                <td>Сумма</td>
                <td>{data?.price?.toLocaleString('de-DE')}</td>
              </tr>
              <tr>
                <td>Дата</td>
                <td>{data?.date}</td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex align-items-center justify-content-start gap-3">
            <Link
              to={`/tariffs/update/${data?._id}`}
              className="btn btn-primary d-flex align-items-center justify-content-center gap-1"
            >
              <CIcon icon={cilPencil} />
              Редактировать
            </Link>
            <CButton
              onClick={() => dispatch(postDeleteTarif(data?._id))}
              className="btn btn-danger text-white d-flex align-items-center justify-content-center gap-1"
            >
              <CIcon icon={cilTrash} />
              Удалить
            </CButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TariffsDetail
