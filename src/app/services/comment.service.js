import httpService from './http.service'
const commentEndpoint = 'comment/'

const commentService = {
    createComment: async (payLoad) => {
        const { data } = await httpService.put(
            commentEndpoint + payLoad._id,
            payLoad
        )
        return data
    },
    // Получение комментариев
    getComments: async (pageId) => {
        const { data } = await httpService.get(commentEndpoint, {
            params: {
                orderBy: '"pageId"', // ковычки обязательны
                equalTo: `"${pageId}"` // ковычки обязательны
            }
        })
        return data
    }
}
export default commentService
