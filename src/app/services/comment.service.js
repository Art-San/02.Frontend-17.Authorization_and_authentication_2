import httpService from './http.service'
const commentEndpoint = 'comment/'
// Добавляем запрос добавления комментария
const commentService = {
    createComment: async (payLoad) => {
        const { data } = await httpService.put(
            commentEndpoint + payLoad._id,
            payLoad
        )
        return data
    }
}
export default commentService
