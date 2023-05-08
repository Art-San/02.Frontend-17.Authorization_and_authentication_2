import React, { useState } from 'react'
import TextAreaField from '../form/textAreaField'
import { validator } from '../../../utils/validator'
import PropTypes from 'prop-types'

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({}) // добавили пустой объект и заработало
    const [errors, setErrors] = useState({})
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }
    const validatorConfig = {
        content: {
            isRequired: {
                message: 'Сообщение не может быть пустым'
            }
        }
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const clearForm = () => {
        setData({}) // Добавляем метод создания комментария // добавили пустой объект и заработало
        setErrors({})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        onSubmit(data)
        clearForm()
    }

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <TextAreaField
                    value={data.content || ''} // Добавляем метод создания комментария
                    onChange={handleChange}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    )
}
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
}

export default AddCommentForm
