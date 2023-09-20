import { cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDetailPartners, postDeletePartners } from 'src/redux/actions/partnersActions'
const API = 'https://api.madad-service.uz/'

const PartnersDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  const { data } = useSelector((state) => state.partners)

  useEffect(() => {
    dispatch(getDetailPartners(id))
  }, [id])

  const { step } = useSelector((state) => state.partners)
  useEffect(() => {
    if (step === true) navigate('/partners')
  }, [step])

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card">
              <img className="card-img-top" src={data?.photo} alt="" />
              <div className="card-body">
                <h5 className="card-title">{data?.name}</h5>
                <Link
                  to={`/partners/update/${data?._id}`}
                  className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-1 mb-2"
                >
                  <CIcon icon={cilPencil} />
                  Редактировать
                </Link>
                <CButton
                  onClick={() => dispatch(postDeletePartners(data?._id))}
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
                  <td>{data?.name}</td>
                </tr>
                <tr>
                  <td>Линк</td>
                  <td>
                    <a href={data?.link}>{data?.link}</a>
                  </td>
                </tr>
                <tr>
                  <td>Дата</td>
                  <td>{data?.date?.split(',')[0]}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnersDetail
