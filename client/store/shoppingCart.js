import axios from 'axios'

const POST_ITEM = 'POST_ITEM'
const GET_ITEMS = 'GET_ITEMS'
const EDIT_ITEM_QUANTITY = 'EDIT_ITEM_QUANTITY'
const DELETE_ITEM = 'DELETE_ITEM'

export const postItem = items => ({
  type: POST_ITEM,
  items
})

export const getItems = items => ({
  type: GET_ITEMS,
  items
})

export const editItem = items => ({
  type: EDIT_ITEM_QUANTITY,
  items
})

export const deleteItem = items => ({
  type: DELETE_ITEM,
  items
})

export const addToCart = item => async dispatch => {
  try {
    const {data} = await axios.post('/api/orderItems', item)
    return dispatch(postItem(data))
  } catch (error) {
    console.log(error)
  }
}

export const getCartItems = orderId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orderItems/${orderId}`)
    return dispatch(getItems(data))
  } catch (error) {
    console.log(error)
  }
}

export const editItemQuantity = (
  orderId,
  productId,
  quantityObj
) => async dispatch => {
  try {
    const {data} = await axios.patch(
      `api/orderItems/${orderId}/product/${productId}`,
      quantityObj
    )
    return dispatch(editItem(data))
  } catch (error) {
    console.error(error)
  }
}

export const deleteOrderItem = (orderId, productId) => async dispatch => {
  try {
    const {data} = await axios.delete(
      `api/orderItems/${orderId}/product/${productId}`
    )
    return dispatch(deleteItem(data))
  } catch (error) {
    console.error(error)
  }
}

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case POST_ITEM:
      // return [...state, action.item]
      return action.items
    case GET_ITEMS:
      return action.items
    case EDIT_ITEM_QUANTITY:
      return action.items
    case DELETE_ITEM:
      return action.items
    default:
      return state
  }
}
