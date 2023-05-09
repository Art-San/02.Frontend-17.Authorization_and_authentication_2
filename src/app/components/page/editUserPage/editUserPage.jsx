import React, { useEffect, useState } from 'react'
// import { useHistory, useParams } from 'react-router-dom'
import { validator } from '../../../utils/validator'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import BackHistoryButton from '../../common/backButton'
import { useAuth } from '../../../hooks/useAuth'
import { useQualities } from '../../../hooks/useQualities'
import { useProfessions } from '../../../hooks/useProfession'

const EditUserPage = () => {
    // Это пака не используем, ЗАКАМЕНТИРУЕМ
    // const { userId } = useParams()
    // const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()
    const { currentUser } = useAuth() // обновляем форму обновления пользователя
    const { qualities, isLoading: qualitiesLoading } = useQualities() // обновляем форму обновления пользователя
    const { professions, isLoading: professionLoading } = useProfessions() // обновляем форму обновления пользователя
    const [errors, setErrors] = useState({})
    // обновляем форму обновления пользователя
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }))
    // обновляем форму обновления пользователя
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }))
    // Это пака не используем, ЗАКАМЕНТИРУЕМ
    // const getProfessionById = (id) => {
    //     for (const prof of professions) {
    //         if (prof.value === id) {
    //             return { _id: prof.value, name: prof.label }
    //         }
    //     }
    // }
    // const getQualities = (elements) => {
    //     const qualitiesArray = []
    //     for (const elem of elements) {
    //         for (const quality in qualities) {
    //             if (elem.value === qualities[quality].value) {
    //                 qualitiesArray.push({
    //                     _id: qualities[quality].value,
    //                     name: qualities[quality].label,
    //                     color: qualities[quality].color
    //                 })
    //             }
    //         }
    //     }
    //     return qualitiesArray
    // }
    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        // Это пака не используем, ЗАКАМЕНТИРУЕМ
        // const { profession, qualities } = data
        // api.users
        //     .update(userId, {
        //         ...data,
        //         profession: getProfessionById(profession),
        //         qualities: getQualities(qualities)
        //     })
        //     .then((data) => history.push(`/users/${data._id}`))
        console.log(data)
    }
    // обновляем форму обновления пользователя
    function getQualitiesListByIds(qualitiesIds) {
        const qualitiesArray = []
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality)
                    break
                }
            }
        }
        return qualitiesArray
    }
    const transformData = (data) => {
        console.log('data', data)
        const result = getQualitiesListByIds(data).map((qual) => ({
            // обновляем форму обновления пользователя
            label: qual.name,
            value: qual._id
        }))
        console.log('result', result)
        return result
    }
    // обновляем форму обновления пользователя
    useEffect(() => {
        if (!professionLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            })
        }
    }, [professionLoading, qualitiesLoading, currentUser, data])
    // обновляем форму обновления пользователя
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false)
        }
    }, [data])

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Email введен некорректно'
            }
        },
        name: {
            isRequired: {
                message: 'Введите ваше имя'
            }
        }
    }
    useEffect(() => {
        validate()
    }, [data])
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professionsList} // обновляем форму обновления пользователя
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: 'Male', value: 'male' },
                                    { name: 'Female', value: 'female' },
                                    { name: 'Other', value: 'other' }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualitiesList} // обновляем форму обновления пользователя
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        'Loading...'
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditUserPage
