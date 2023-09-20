import { cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDetailAboutUs, postDeleteAboutUs } from 'src/redux/actions/aboutUsActions'
const API = 'https://api.madad-service.uz/'

const AboutUsDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  const { data } = useSelector((state) => state.aboutUs)

  useEffect(() => {
    dispatch(getDetailAboutUs(id))
  }, [id])

  const { step } = useSelector((state) => state.news)
  useEffect(() => {
    if (step === true) navigate('/about-us')
  }, [step])

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card">
              <img className="card-img-top" src={API + data?.photo} alt="" />
              <div className="card-body">
                <Link
                  to={`/about-us/update/${data?._id}`}
                  className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-1 mb-2"
                >
                  <CIcon icon={cilPencil} />
                  Редактировать
                </Link>
                <CButton
                  onClick={() => dispatch(postDeleteAboutUs(data?._id))}
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
                  <td>Дата</td>
                  <td>{data?.date}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsDetail
