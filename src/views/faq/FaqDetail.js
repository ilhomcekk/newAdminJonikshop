import { cilCheckAlt, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDetailFaq, postDeleteFaq } from 'src/redux/actions/faqActions'

const FaqDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  const { data } = useSelector((state) => state.faq)

  useEffect(() => {
    dispatch(getDetailFaq(id))
  }, [id])

  const { step } = useSelector((state) => state.faq)
  useEffect(() => {
    if (step === true) navigate('/faq')
  }, [step])

  return (
    <div className="card">
      <div className="card-header d-flex flex-wrap align-items-center">
        Вопрос и ответ
        <Link
          to={`/faq/update/${data?._id}`}
          className="btn btn-primary d-flex align-items-center justify-content-center gap-1 ms-auto me-2"
        >
          <CIcon icon={cilPencil} />
          Редактировать
        </Link>
        <CButton
          onClick={() => dispatch(postDeleteFaq(data?._id))}
          className="btn btn-danger text-white d-flex align-items-center justify-content-center gap-1"
        >
          <CIcon icon={cilTrash} />
          Удалить
        </CButton>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            <h6>Вопрос (RU)</h6>
            <div className="border p-3">{data?.question_ru}</div>
            <h6 className="mt-4">Ответ (RU)</h6>
            <div className="border p-3">{data?.answer_ru}</div>
            <h6 className="mt-4">Вопрос (UZ)</h6>
            <div className="border p-3">{data?.question_uz}</div>
            <h6 className="mt-4">Ответ (UZ)</h6>
            <div className="border p-3">{data?.answer_uz}</div>
            <h6 className="mt-4">Вопрос (EN)</h6>
            <div className="border p-3">{data?.question_en}</div>
            <h6 className="mt-4">Ответ (EN)</h6>
            <div className="border p-3">{data?.answer_en}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FaqDetail
