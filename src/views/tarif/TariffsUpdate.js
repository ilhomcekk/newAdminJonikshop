import { cilCheckAlt, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SunEditorComponent from 'src/components/SunEditorComponent'
import { getCategory } from 'src/redux/actions/categoryActions'
import {
  getDetailServices,
  getServices,
  postUpdateServices,
} from 'src/redux/actions/servicesActions'
import { getDetailTarif, postUpdateTarif } from 'src/redux/actions/tarifActions'

const TariffsUpdate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { data } = useSelector((state) => state.tarif)
  const { loading } = useSelector((state) => state.tarif)
  const now = new Date()
  const options = { timeZone: 'Asia/Tashkent' }
  const dateInUzbekistan = now.toLocaleString('ru-RU', options)

  const [updateContent, setUpdateContent] = useState({
    name_ru: data?.name_ru,
    name_uz: data?.name_uz,
    name_en: data?.name_en,
    category: data?.category,
    service_id: data?.service_id,
    price: data?.price,
    tariffs: data?.tariffs,
    tariffs_uz: data?.tariffs_uz,
    tariffs_en: data?.tariffs_en,
    date: dateInUzbekistan,
  })
  const [countRu, setCountRu] = useState()
  const [countUz, setCountUz] = useState()
  const [countEn, setCountEn] = useState()

  const handleChangeContent = (e) => {
    const { name, value } = e.target
    setUpdateContent((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const [arrRu, setArrRu] = useState([data?.tariffs])
  const [arrUz, setArrUz] = useState([data?.tariffs_uz])
  const [arrEn, setArrEn] = useState([data?.tariffs_en])
  useEffect(() => {
    setUpdateContent({
      name_ru: data?.name_ru,
      name_uz: data?.name_uz,
      name_en: data?.name_en,
      category: data?.category,
      service_id: data?.service_id,
      price: data?.price,
      tariffs: data?.tariffs,
      tariffs_uz: data?.tariffs_uz,
      tariffs_en: data?.tariffs_en,
      date: dateInUzbekistan,
    })
    setCountRu(data?.tariffs?.length)
    setArrRu(data?.tariffs)
    setCountUz(data?.tariffs_uz?.length)
    setArrUz(data?.tariffs_uz)
    setCountEn(data?.tariffs_en?.length)
    setArrEn(data?.tariffs_en)
  }, [id, data])

  useEffect(() => {
    dispatch(getDetailTarif(id))
    dispatch(getCategory())
    dispatch(getServices({ page: 1, limit: 50 }))
  }, [id])

  const handleInputChangeRu = (index, event) => {
    const newValue = event.target.value
    setArrRu((prevArray) => {
      const updatedArray = [...prevArray]
      updatedArray[index] = newValue
      return updatedArray
    })
  }
  const handleInputChangeUz = (index, event) => {
    const newValue = event.target.value
    setArrUz((prevArray) => {
      const updatedArray = [...prevArray]
      updatedArray[index] = newValue
      return updatedArray
    })
  }
  const handleInputChangeEn = (index, event) => {
    const newValue = event.target.value
    setArrEn((prevArray) => {
      const updatedArray = [...prevArray]
      updatedArray[index] = newValue
      return updatedArray
    })
  }

  const handleAddRu = () => {
    setCountRu((prev) => prev + 1)
  }
  const handleAddUz = () => {
    setCountUz((prev) => prev + 1)
  }
  const handleAddEn = () => {
    setCountEn((prev) => prev + 1)
  }
  const handleRemoveRu = (idx) => {
    let oldArr = [...arrRu]
    let filter = oldArr.filter((item) => item != arrRu[idx])
    setArrRu(filter)
    setCountRu(filter?.length)
  }
  const handleRemoveUz = (idx) => {
    let oldArr = [...arrUz]
    let filter = oldArr.filter((item) => item != arrUz[idx])
    setArrUz(filter)
    setCountUz(filter?.length)
  }
  const handleRemoveEn = (idx) => {
    let oldArr = [...arrEn]
    let filter = oldArr.filter((item) => item != arrEn[idx])
    setArrEn(filter)
    setCountEn(filter?.length)
  }

  const categories = useSelector((state) => state.category.category)
  const services = useSelector((state) => state.services.services)

  const handleSubmit = () => {
    const { name_ru, name_uz, name_en, category, service_id, price, tariffs, date } = updateContent
    dispatch(
      postUpdateTarif(id, {
        name_ru,
        name_uz,
        name_en,
        category: category?._id ? category?._id : category,
        service_id,
        price,
        tariffs: arrRu,
        tariffs_uz: arrUz,
        tariffs_en: arrEn,
        date,
      }),
    )
  }

  const { step } = useSelector((state) => state.tarif)
  useEffect(() => {
    if (step === true) navigate('/tariffs')
  }, [step])

  return (
    <div className="card">
      <div className="card-header">Изменить</div>
      <div className="card-body">
        <div className="row">
          <div>
            <h6 className="">Название (RU)</h6>
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
            <h6 className="mt-4">Категория</h6>
            <select name="category" onChange={handleChangeContent} className="form-select">
              {categories?.map((item, idx) => (
                <option
                  selected={item?._id === updateContent?.category?._id}
                  key={idx}
                  value={item?._id}
                >
                  {item?.name_ru}
                </option>
              ))}
            </select>
            <h6 className="mt-4">Услуга</h6>
            <select name="service_id" onChange={handleChangeContent} className="form-select">
              {services?.map((item, idx) => (
                <option
                  selected={item?._id === updateContent?.service_id}
                  key={idx}
                  value={item?._id}
                >
                  {item?.name_ru}
                </option>
              ))}
            </select>
            <h6 className="mt-4">Сумма</h6>
            <input
              value={updateContent?.price}
              name="price"
              onChange={handleChangeContent}
              className="form-control"
            />
            <h6 className="mt-4">Характеристика (RU)</h6>
            {arrRu &&
              [...Array(countRu)]?.map((item, idx) => (
                <div key={idx} className="d-flex align-items-center gap-4 mb-3">
                  <input
                    name="name"
                    value={arrRu[idx]}
                    onChange={(e) => handleInputChangeRu(idx, e)}
                    className="form-control"
                  />
                  <CButton
                    onClick={() => handleRemoveRu(idx)}
                    color="danger"
                    className="text-white"
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </div>
              ))}
            <CButton onClick={handleAddRu} color="primary" className="ms-auto mt-4">
              <CIcon icon={cilCheckAlt} className="me-1" />
              Добавить характеристику
            </CButton>
            <h6 className="mt-4">Характеристика (UZ)</h6>
            {arrUz &&
              [...Array(countUz)]?.map((item, idx) => (
                <div key={idx} className="d-flex align-items-center gap-4 mb-3">
                  <input
                    name="name"
                    value={arrUz[idx]}
                    onChange={(e) => handleInputChangeUz(idx, e)}
                    className="form-control"
                  />
                  <CButton
                    onClick={() => handleRemoveUz(idx)}
                    color="danger"
                    className="text-white"
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </div>
              ))}
            <CButton onClick={handleAddUz} color="primary" className="ms-auto mt-4">
              <CIcon icon={cilCheckAlt} className="me-1" />
              Добавить характеристику
            </CButton>
            <h6 className="mt-4">Характеристика (EN)</h6>
            {arrEn &&
              [...Array(countEn)]?.map((item, idx) => (
                <div key={idx} className="d-flex align-items-center gap-4 mb-3">
                  <input
                    name="name"
                    value={arrEn[idx]}
                    onChange={(e) => handleInputChangeEn(idx, e)}
                    className="form-control"
                  />
                  <CButton
                    onClick={() => handleRemoveEn(idx)}
                    color="danger"
                    className="text-white"
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </div>
              ))}
            <CButton onClick={handleAddEn} color="primary" className="ms-auto mt-4">
              <CIcon icon={cilCheckAlt} className="me-1" />
              Добавить характеристику
            </CButton>
            <CButton onClick={handleSubmit} color="primary" className="float-end ms-auto mt-4">
              <CIcon icon={cilCheckAlt} className="me-1" />
              Сохранить
            </CButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TariffsUpdate
