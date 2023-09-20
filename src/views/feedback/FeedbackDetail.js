import { cilCheckAlt, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDetailFaq, postDeleteFaq } from 'src/redux/actions/faqActions'
import { getDetailFeedback, postDeleteFeedback } from 'src/redux/actions/feedbackActions'

const FeedbackDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  const { data } = useSelector((state) => state.feedback)

  useEffect(() => {
    dispatch(getDetailFeedback(id))
  }, [id])

  const { step } = useSelector((state) => state.feedback)
  useEffect(() => {
    if (step === true) navigate('/feedback')
  }, [step])

  return (
    <div className="card">
      <div className="card-header d-flex flex-wrap align-items-center">
        Обратная связь
        <CButton
          onClick={() => dispatch(postDeleteFeedback(data?._id))}
          className="btn btn-danger text-white d-flex align-items-center justify-content-center gap-1 ms-auto"
        >
          <CIcon icon={cilTrash} />
          Удалить
        </CButton>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            <h6>Имя</h6>
            <div className="border p-3">{data?.name}</div>
            <h6 className="mt-4">Телефон номер</h6>
            <div className="border p-3">{data?.phone}</div>
            <h6 className="mt-4">Комментария</h6>
            <div className="border p-3">{data?.description}</div>
            <h6 className="mt-4">Дата</h6>
            <div className="border p-3">{data?.date}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackDetail
