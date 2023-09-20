import { cilCheckAlt, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SunEditorComponent from 'src/components/SunEditorComponent'
import { getCategory } from 'src/redux/actions/categoryActions'
import { getDetailOffers, postUpdateOffers } from 'src/redux/actions/offersActions'
const API = 'https://api.madad-service.uz/'

const OffersUpdate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { data } = useSelector((state) => state.offers)
  const { loading } = useSelector((state) => state.news)
  const now = new Date()
  const options = { timeZone: 'Asia/Tashkent' }
  const dateInUzbekistan = now.toLocaleString('ru-RU', options)

  const [updateContent, setUpdateContent] = useState({
    name_ru: data?.name_ru,
    name_uz: data?.name_uz,
    name_en: data?.name_en,
    category: data?.category,
    description_ru: data?.description_ru,
    description_uz: data?.description_uz,
    description_en: data?.description_en,
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
      name_ru: data?.name_ru,
      name_uz: data?.name_uz,
      name_en: data?.name_en,
      category: data?.category,
      description_ru: data?.description_ru,
      description_uz: data?.description_uz,
      description_en: data?.description_en,
      photo: data?.photo,
      date: dateInUzbekistan,
    })
  }, [id, data])

  useEffect(() => {
    dispatch(getDetailOffers(id))
    dispatch(getCategory())
  }, [id])

  const categories = useSelector((state) => state.category.category)

  const { step } = useSelector((state) => state.offers)
  useEffect(() => {
    if (step === true) navigate('/offers')
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
            <h6 className="">Название (RU)</h6>
            <input
              name="name_ru"
              onChange={handleChangeContent}
              value={updateContent.name_ru}
              className="form-control"
            />
            <h6 className="mt-4">Название (UZ)</h6>
            <input
              name="name_uz"
              onChange={handleChangeContent}
              value={updateContent.name_uz}
              className="form-control"
            />
            <h6 className="mt-4">Название (EN)</h6>
            <input
              name="name_en"
              onChange={handleChangeContent}
              value={updateContent.name_en}
              className="form-control"
            />
            <h6 className="mt-4">Категория</h6>
            <select name="category_id" onChange={handleChangeContent} className="form-select">
              {categories?.map((item, idx) => (
                <option
                  selected={item?._id === updateContent.category?._id}
                  key={idx}
                  value={item?._id}
                >
                  {item?.name_ru}
                </option>
              ))}
            </select>
            <h6 className="mt-4">Описание (RU)</h6>
            <SunEditorComponent
              name="description_ru"
              defaultValue={updateContent.description_ru}
              onChangeValue={handleSunEditor}
            />
            <h6 className="mt-4">Описание (UZ)</h6>
            <SunEditorComponent
              name="description_uz"
              defaultValue={updateContent.description_uz}
              onChangeValue={handleSunEditor}
            />
            <h6 className="mt-4">Описание (EN)</h6>
            <SunEditorComponent
              name="description_en"
              defaultValue={updateContent.description_en}
              onChangeValue={handleSunEditor}
            />
            <CButton
              onClick={() => dispatch(postUpdateOffers(id, updateContent))}
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

export default OffersUpdate
