import { cilCheckAlt, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import SunEditorComponent from 'src/components/SunEditorComponent'
import { postCreateFaq } from 'src/redux/actions/faqActions'

const FaqCreate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const now = new Date()
  const options = { timeZone: 'Asia/Tashkent' }
  const dateInUzbekistan = now.toLocaleString('ru-RU', options)

  const [params, setParams] = useState({
    question_ru: '',
    question_uz: '',
    question_en: '',
    answer_ru: '',
    answer_uz: '',
    answer_en: '',
    photo: '',
    date: dateInUzbekistan,
  })

  const handleChangeParams = (e) => {
    const { name, value } = e.target
    setParams((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleSunEditor = (e) => {
    const { name, value } = e
    setParams((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const onImageChange = (event, element) => {
    let newParams = {
      ...params,
      photo: event.target.files[0],
    }
    setParams(newParams)
    if (window.FileReader) {
      const targetFile = event.target.files[0]
      const fileReader = new FileReader()
      if (targetFile && targetFile.type.match('image.*')) {
        fileReader.readAsDataURL(targetFile)
      }
      fileReader.onload = function (e) {
        element.src = e.target.result
      }
    }
  }

  const { step } = useSelector((state) => state.faq)
  useEffect(() => {
    if (step === true) navigate('/faq')
  }, [step])

  return (
    <div className="card">
      <div className="card-header">Добавить</div>
      <div className="card-body">
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <h6>Главное фото</h6>
            <div className="card">
              <div className="card-body">
                <div className="drop-image">
                  {!params.photo && (
                    <>
                      + <br />
                      <span>Загрузить фото</span>
                    </>
                  )}
                  <input
                    type={'file'}
                    id="drop-photo-input"
                    accept="image/png, image/gif, image/jpeg"
                    multiple={false}
                    onChange={(e) => onImageChange(e, document.querySelector('#newsCreateImage'))}
                  />
                  <label htmlFor="drop-photo-input">
                    <img className="card-img-top" src={params.photo} alt="" id="newsCreateImage" />
                  </label>
                </div>
              </div>
            </div>
            {params.photo && (
              <CButton
                className="btn btn-danger text-white w-100 d-flex align-items-center justify-content-center gap-1 mt-2"
                onClick={() => {
                  let newParams = {
                    ...params,
                    photo: '',
                  }
                  setParams(newParams)
                }}
              >
                <CIcon icon={cilTrash} />
                Удалить
              </CButton>
            )}
          </div>
          <div className="col-xl-9">
            <h6 className="">Вопрос (RU)</h6>
            <input
              value={params.question_ru}
              name="question_ru"
              onChange={handleChangeParams}
              className="form-control"
            />
            <h6 className="mt-4">Ответ (RU)</h6>
            <input
              value={params.answer_ru}
              name="answer_ru"
              onChange={handleChangeParams}
              className="form-control"
            />
            <h6 className="mt-4">Вопрос (UZ)</h6>
            <input
              value={params.question_uz}
              name="question_uz"
              onChange={handleChangeParams}
              className="form-control"
            />
            <h6 className="mt-4">Ответ (UZ)</h6>
            <input
              value={params.answer_uz}
              name="answer_uz"
              onChange={handleChangeParams}
              className="form-control"
            />
            <h6 className="mt-4">Вопрос (EN)</h6>
            <input
              value={params.question_en}
              name="question_en"
              onChange={handleChangeParams}
              className="form-control"
            />
            <h6 className="mt-4">Ответ (EN)</h6>
            <input
              value={params.answer_en}
              name="answer_en"
              onChange={handleChangeParams}
              className="form-control"
            />
            <CButton
              onClick={() => dispatch(postCreateFaq(params))}
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

export default FaqCreate
