import { cilCheckAlt, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import SunEditorComponent from 'src/components/SunEditorComponent'
import { getCategory } from 'src/redux/actions/categoryActions'
import {
  getServices,
  getServicesByCategory,
  postCreateServices,
} from 'src/redux/actions/servicesActions'
import { postCreateTarif } from 'src/redux/actions/tarifActions'

const TariffsCreate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const now = new Date()
  const options = { timeZone: 'Asia/Tashkent' }
  const dateInUzbekistan = now.toLocaleString('ru-RU', options)

  const [params, setParams] = useState({
    name_ru: '',
    name_uz: '',
    name_en: '',
    price: 0,
    category_id: '',
    service_id: '',
    tariffs: [],
    tariffs_uz: [],
    tariffs_en: [],
    date: dateInUzbekistan,
  })
  const [countRu, setCountRu] = useState(1)
  const [countUz, setCountUz] = useState(1)
  const [countEn, setCountEn] = useState(1)

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

  const [arrRu, setArrRu] = useState([])
  const [arrUz, setArrUz] = useState([])
  const [arrEn, setArrEn] = useState([])

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
  useEffect(() => {
    setParams((prev) => {
      return {
        ...prev,
        tariffs: arrRu,
      }
    })
  }, [arrRu])
  useEffect(() => {
    setParams((prev) => {
      return {
        ...prev,
        tariffs_uz: arrUz,
      }
    })
  }, [arrUz])
  useEffect(() => {
    setParams((prev) => {
      return {
        ...prev,
        tariffs_en: arrEn,
      }
    })
  }, [arrEn])

  const handleSubmit = () => {
    dispatch(postCreateTarif(params))
  }

  const { step } = useSelector((state) => state.tarif)
  useEffect(() => {
    if (step === true) navigate('/tariffs')
  }, [step])

  useEffect(() => {
    dispatch(getCategory())
    dispatch(getServices({ page: 1, limit: 50 }))
  }, [])

  const categories = useSelector((state) => state.category.category)
  const services = useSelector((state) => state.services.services)

  return (
    <div className="card">
      <div className="card-header">Добавить</div>
      <div className="card-body">
        <div className="row">
          <div>
            <h6 className="">Название (RU)</h6>
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
            <h6 className="mt-4">Категория</h6>
            <select name="category_id" onChange={handleChangeParams} className="form-select">
              <option value="">Выбрать</option>
              {categories?.map((item, idx) => (
                <option key={idx} value={item?._id}>
                  {item?.name_ru}
                </option>
              ))}
            </select>
            <h6 className="mt-4">Услуга</h6>
            <select name="service_id" onChange={handleChangeParams} className="form-select">
              <option value="">Выбрать</option>
              {services?.map((item, idx) => (
                <option key={idx} value={item?._id}>
                  {item?.name_ru}
                </option>
              ))}
            </select>
            <h6 className="mt-4">Сумма</h6>
            <input
              value={params.price}
              name="price"
              onChange={handleChangeParams}
              className="form-control"
            />
            <h6 className="mt-4">Характеристика (RU)</h6>
            {[...Array(countRu)].map((item, idx) => (
              <div key={idx} className="d-flex align-items-center gap-4 mb-3">
                <input
                  value={arrRu[idx] && arrRu[idx]}
                  onChange={(e) => handleInputChangeRu(idx, e)}
                  className="form-control"
                />
                <CButton onClick={() => handleRemoveRu(idx)} color="danger" className="text-white">
                  <CIcon icon={cilTrash} />
                </CButton>
              </div>
            ))}
            <CButton
              onClick={() => setCountRu((prev) => prev + 1)}
              color="primary"
              className="ms-auto mt-4"
            >
              <CIcon icon={cilCheckAlt} className="me-1" />
              Добавить характеристику
            </CButton>
            <h6 className="mt-4">Характеристика (UZ)</h6>
            {[...Array(countUz)].map((item, idx) => (
              <div key={idx} className="d-flex align-items-center gap-4 mb-3">
                <input
                  value={arrUz[idx] && arrUz[idx]}
                  onChange={(e) => handleInputChangeUz(idx, e)}
                  className="form-control"
                />
                <CButton onClick={() => handleRemoveUz(idx)} color="danger" className="text-white">
                  <CIcon icon={cilTrash} />
                </CButton>
              </div>
            ))}
            <CButton
              onClick={() => setCountUz((prev) => prev + 1)}
              color="primary"
              className="ms-auto mt-4"
            >
              <CIcon icon={cilCheckAlt} className="me-1" />
              Добавить характеристику
            </CButton>
            <h6 className="mt-4">Характеристика (EN)</h6>
            {[...Array(countEn)].map((item, idx) => (
              <div key={idx} className="d-flex align-items-center gap-4 mb-3">
                <input
                  value={arrEn[idx] && arrEn[idx]}
                  onChange={(e) => handleInputChangeEn(idx, e)}
                  className="form-control"
                />
                <CButton onClick={() => handleRemoveEn(idx)} color="danger" className="text-white">
                  <CIcon icon={cilTrash} />
                </CButton>
              </div>
            ))}
            <CButton
              onClick={() => setCountEn((prev) => prev + 1)}
              color="primary"
              className="ms-auto mt-4"
            >
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

export default TariffsCreate
