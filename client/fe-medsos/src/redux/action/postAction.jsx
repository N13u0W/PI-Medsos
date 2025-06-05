import { APISERVICE } from "../../utils"

export const storePosting = (token, data) => (dispatch) =>
    APISERVICE().post('/post/create', data, config(token)).then((response) => {
        
    })  
        dispatch({ type:

            dispatch({
                type: 'POST_MESSAGE_SUCCESS',
                payload: {
                    data: response?.data?.message
                }
            })
        })
        .catch((err) => {
            if (err.response.status === 401) {
                window.location.href = '/login'
            }
            dispatch({
                type: 'POST_FAIL',
                payload: {
                    err: err.response
                }
            })
        })
