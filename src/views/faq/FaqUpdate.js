import { cilCheckAlt, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SunEditorComponent from 'src/components/SunEditorComponent'
import { getDetailFaq, postUpdateFaq } from 'src/redux/actions/faqActions'

const FaqUpdate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { data } = useSelector((state) => state.faq)
  const { loading } = useSelector((state) => state.faq)
  const now = new Date()
  const options = { timeZone: 'Asia/Tashkent' }
  const dateInUzbekistan = now.toLocaleString('ru-RU', options)

  const [updateContent, setUpdateContent] = useState({
    question_ru: data?.question_ru,
    question_uz: data?.question_uz,
    question_en: data?.question_en,
    answer_ru: data?.answer_ru,
    answer_uz: data?.answer_uz,
    answer_en: data?.answer_en,
    photo: '',
    date: dateInUzbekistan,
  })

  const handleChangeParams = (e) => {
    const { name, value } = e.target
    setUpdateContent((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleSunEditor = (e) => {
    const { name, value } = e
    setUpdateContent((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const [photo, setPhoto] = useState('https://picsum.photos/200/200')
  const onImageChange = (event, element) => {
    if (window.FileReader) {
      const targetFile = event.target.files[0]
      const fileReader = new FileReader()
      if (targetFile && targetFile.type.match('image.*')) {
        fileReader.readAsDataURL(targetFile)
      }
      fileReader.onload = function (e) {
        element.src = e.target.result
        setPhoto(e.target.result)
      }
    }
  }

  useEffect(() => {
    setUpdateContent({
      question_ru: data?.question_ru,
      question_uz: data?.question_uz,
      question_en: data?.question_en,
      answer_ru: data?.answer_ru,
      answer_uz: data?.answer_uz,
      answer_en: data?.answer_en,
      photo: '',
      date: dateInUzbekistan,
    })
  }, [id, data])

  useEffect(() => {
    dispatch(getDetailFaq(id))
  }, [id])

  const { step } = useSelector((state) => state.faq)
  useEffect(() => {
    if (step === true) navigate('/faq')
  }, [step])

  return (
    <div className="card">
      <div className="card-header">Изменить</div>
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            <h6 className="">Вопрос (RU)</h6>
            <input
              value={updateContent.question_ru}
              name="question_ru"
              onChange={handleChangeParams}
              className="form-control"
            />
            <h6 className="mt-4">Ответ (RU)</h6>
            <input
              value={updateContent.answer_ru}
              name="answer_ru"
              onChange={handleChangeParams}
              className="form-control"
            />
            <h6 className="mt-4">Вопрос (UZ)</h6>
            <input
              value={updateContent.question_uz}
              name="question_uz"
              onChange={handleChangeParams}
              className="form-control"
            />
            <h6 className="mt-4">Ответ (UZ)</h6>
            <input
              value={updateContent.answer_uz}
              name="answer_uz"
              onChange={handleChangeParams}
              className="form-control"
            />
            <h6 className="mt-4">Вопрос (EN)</h6>
            <input
              value={updateContent.question_en}
              name="question_en"
              onChange={handleChangeParams}
              className="form-control"
            />
            <h6 className="mt-4">Ответ (EN)</h6>
            <input
              value={updateContent.answer_en}
              name="answer_en"
              onChange={handleChangeParams}
              className="form-control"
            />
            <CButton
              onClick={() => dispatch(postUpdateFaq(id, updateContent))}
              color="primary"
              className="float-end ms-auto mt-4"
            >
              <CIcon icon={cilCheckAlt} className="me-1" />
              Сохранить
            </CButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FaqUpdate
