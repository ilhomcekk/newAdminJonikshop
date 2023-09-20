import { cilCheckAlt, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  getCategory,
  postCreateCategory,
  postDeleteCategory,
  postUpdateCategory,
} from 'src/redux/actions/categoryActions'
const API = 'https://api.madad-service.uz/'

const Categories = () => {
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category.category)
  const now = new Date()
  const options = { timeZone: 'Asia/Tashkent' }
  const dateInUzbekistan = now.toLocaleString('ru-RU', options)

  useEffect(() => {
    dispatch(getCategory())
  }, [])

  const [showModal, setShowModal] = useState({
    show: false,
    category: '',
  })

  const [params, setParams] = useState({
    name_ru: '',
    name_uz: '',
    name_en: '',
    photo: '',
    date: dateInUzbekistan,
  })

  const handleClearParams = () => {
    setParams((prev) => {
      return {
        ...prev,
        name_ru: '',
        name_uz: '',
        name_en: '',
        photo: '',
      }
    })
  }

  const [updateContent, setUpdateContent] = useState({
    name_ru: showModal.category?.name_ru,
    name_uz: showModal.category?.name_uz,
    name_en: showModal.category?.name_en,
    photo: showModal.category?.photo,
    date: dateInUzbekistan,
  })
  useEffect(() => {
    setUpdateContent({
      name_ru: showModal.category?.name_ru,
      name_uz: showModal.category?.name_uz,
      name_en: showModal.category?.name_en,
      photo: showModal.category?.photo,
      date: dateInUzbekistan,
    })
  }, [showModal.show])

  const handleChangeContent = (e) => {
    const { name, value } = e.target
    setUpdateContent((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const onImageChange = (event, element) => {
    if (window.FileReader) {
      let newParams = {
        ...params,
        photo: event.target.files[0],
      }
      setParams(newParams)
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

  const onImageUpdate = (event, element) => {
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

  const handleChangeParams = (e) => {
    const { name, value } = e.target
    setParams((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const { step } = useSelector((state) => state.category)
  useEffect(() => {
    if (step === true) {
      dispatch(getCategory())
      setShowModal({
        show: false,
        category: '',
      })
    }
  }, [step])

  return (
    <>
      <CModal
        backdrop="static"
        visible={showModal.show}
        onClose={() => setShowModal({ show: false, category: '' })}
      >
        <CModalHeader>
          <CModalTitle>Редактирование категории</CModalTitle>
        </CModalHeader>
        <CModalBody>
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
                  id="drop-category-photo-input"
                  // accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                  multiple={false}
                  onChange={(e) => onImageUpdate(e, document.querySelector('#categoryUpdateImage'))}
                />
                <label htmlFor="drop-category-photo-input">
                  <img
                    className="card-img-top"
                    src={API + updateContent?.photo}
                    alt=""
                    id="categoryUpdateImage"
                  />
                </label>
              </div>
              {updateContent?.photo && (
                <CButton
                  className="btn btn-danger text-white w-100 d-flex align-items-center justify-content-center gap-1 mt-2"
                  onClick={() => {
                    let newContent = {
                      ...updateContent,
                      photo: '',
                    }
                    setUpdateContent(newContent)
                  }}
                >
                  <CIcon icon={cilTrash} />
                  Удалить фото
                </CButton>
              )}
              <h6 className="mt-4">Название (RU)</h6>
              <input
                value={updateContent?.name_ru}
                name="name_ru"
                onChange={handleChangeContent}
                className="form-control"
              />
              <h6 className="mt-4">Название (UZ)</h6>
              <input
                value={updateContent?.name_uz}
                name="name_uz"
                onChange={handleChangeContent}
                className="form-control"
              />
              <h6 className="mt-4">Название (EN)</h6>
              <input
                value={updateContent?.name_en}
                name="name_en"
                onChange={handleChangeContent}
                className="form-control"
              />
            </div>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal({ show: false, category: '' })}>
            Close
          </CButton>
          <CButton
            onClick={() => dispatch(postUpdateCategory(showModal.category?._id, updateContent))}
            color="primary"
          >
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>

      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-xl-8">
              <h6>Список категории</h6>
              <div className="list-group gap-1">
                {categories?.map((item, idx) => (
                  <CDropdown key={idx} color="info">
                    <CDropdownToggle
                      color="light"
                      className="d-flex align-items-center justify-content-between"
                    >
                      <div className="d-flex align-items-center gap-3">
                        <img
                          style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                          src={API + item?.photo}
                          alt=""
                        />
                        {item?.name_ru}
                      </div>
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          setShowModal({
                            show: true,
                            category: item,
                          })
                        }
                      >
                        Редактировать
                      </CDropdownItem>
                      <CDropdownItem onClick={() => dispatch(postDeleteCategory(item?._id))}>
                        Удалить
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                ))}
              </div>
            </div>
            <div className="col-xl-4">
              <h6>Добавить новую категорию</h6>
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
                      <img
                        className="card-img-top"
                        src={params.photo}
                        alt=""
                        id="newsCreateImage"
                      />
                    </label>
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
                      Удалить фото
                    </CButton>
                  )}
                  <h6 className="mt-4">Название (RU)</h6>
                  <input
                    value={params.name_ru}
                    name="name_ru"
                    onChange={handleChangeParams}
                    className="form-control"
                  />
                  <h6 className="mt-4">Название (UZ)</h6>
                  <input
                    value={params.name_uz}
                    name="name_uz"
                    onChange={handleChangeParams}
                    className="form-control"
                  />
                  <h6 className="mt-4">Название (EN)</h6>
                  <input
                    value={params.name_en}
                    name="name_en"
                    onChange={handleChangeParams}
                    className="form-control"
                  />
                  <CButton
                    onClick={() => {
                      dispatch(postCreateCategory(params))
                      handleClearParams()
                    }}
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
        </div>
      </div>
    </>
  )
}

export default Categories
