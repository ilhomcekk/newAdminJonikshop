import { cilCheckAlt, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SunEditorComponent from 'src/components/SunEditorComponent'
import { getDetailAboutUs, postUpdateAboutUs } from 'src/redux/actions/aboutUsActions'
const API = 'https://api.madad-service.uz/'

const AboutUsUpdate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { data } = useSelector((state) => state.aboutUs)
  const { loading } = useSelector((state) => state.aboutUs)
  const now = new Date()
  const options = { timeZone: 'Asia/Tashkent' }
  const dateInUzbekistan = now.toLocaleString('ru-RU', options)

  const [updateContent, setUpdateContent] = useState({
    photo: data?.photo,
    date: dateInUzbekistan,
  })

  const handleChangeContent = (e) => {
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

  const onImageChange = (event, element) => {
    if (window.FileReader) {
      let newContent = {
        ...updateContent,
        photo: event.target.files[0],
      }
      setUpdateContent(newContent)
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

  useEffect(() => {
    setUpdateContent({
      photo: data?.photo,
      date: dateInUzbekistan,
    })
  }, [id, data])

  const handleUpdateSubmit = () => {
    dispatch(postUpdateAboutUs(id, updateContent))
  }

  useEffect(() => {
    dispatch(getDetailAboutUs(id))
  }, [id])

  const { step } = useSelector((state) => state.aboutUs)
  useEffect(() => {
    if (step === true) navigate('/about-us')
  }, [step])

  return (
    <div className="card">
      <div className="card-header">Изменить</div>
      <div className="card-body">
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <h6>Главное фото</h6>
            <div className="card">
              <div className="card-body">
                <div className="drop-image">
                  {!updateContent?.photo && (
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
                    <img
                      className="card-img-top"
                      src={API + updateContent?.photo}
                      alt=""
                      id="newsCreateImage"
                    />
                  </label>
                </div>
              </div>
            </div>
            {updateContent?.photo && (
              <CButton
                className="btn btn-danger text-white w-100 d-flex align-items-center justify-content-center gap-1 mt-2"
                onClick={() =>
                  setUpdateContent((prev) => {
                    return {
                      ...prev,
                      photo: '',
                    }
                  })
                }
              >
                <CIcon icon={cilTrash} />
                Удалить
              </CButton>
            )}
          </div>
          <div className="col-xl-9">
            <CButton
              onClick={handleUpdateSubmit}
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

export default AboutUsUpdate
