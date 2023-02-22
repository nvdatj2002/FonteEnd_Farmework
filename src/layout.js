import Header from "./header"
import { Container } from "react-bootstrap"
import { useEffect, useState, useReducer } from "react"
import { useLocation } from "react-router-dom"
import { cartContext, searchContext } from "./ThemeProvider"
import { ACTION } from "./ACTION"
import { reducerSearch } from "./reducer"
import Footer from "./footer"
const cartInit = () => {
  const carts = JSON.parse(localStorage.getItem('carts'))
  return carts
};



function reducer(state, action) {

  switch (action.type) {
    case ACTION.ADD_ITEM:
      const { item = {} } = action.payload;
      const index = state.items.findIndex((cart) => cart.id === item.id);
      if (index === -1) {
        //them moi
        return {
          ...state,
          items: [...state.items, item]
        };
      }
      const newItems = [...state.items];
      newItems[index] = {
        ...newItems[index],
        quantity: newItems[index].quantity + 1,
      };
      return {
        ...state,
        items: newItems,
        sum: newItems.reduce(
          (accumulator, item) => accumulator + item.price * item.quantity,
          0
        ),
      };
    case ACTION.REMOVE_ITEM:
      const { id } = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== id),
      };
    default:
      return state;
  }
}

function reducer2(state, action) {
  let data
  switch (action.type) {
    case ACTION.ADD_ITEM:
      const { item = {} } = action.payload;
      let index
      if (!state) {
        data = {
          items: [item],
          sum: (item.price * item.quantity)
        }
        const dataSave = JSON.stringify(data)
        localStorage.setItem('carts', dataSave)
        return data
      }
      index = state.items.findIndex((cart) => cart.id === item.id);
      if (index === -1) {
        //them moi
        data = {
          ...state,
          items: [...state.items, item],
          sum: state.sum + (item.price * item.quantity)
        }
        // save data to local
        const dataSave = JSON.stringify(data)
        localStorage.setItem('carts', dataSave)
        return data
      }
      // update lai so luong
      const newItems = [...state.items];
      newItems[index] = {
        ...newItems[index],
        quantity: newItems[index].quantity + 1,
      };

      data = {
        ...state,
        items: newItems,
        sum: newItems.reduce(
          (accumulator, item) => accumulator + (item.price * item.quantity),
          0
        ),

      }
      const save = JSON.stringify(data)
      localStorage.setItem('carts', save)
      return data


    case ACTION.REMOVE_ITEM:

      const { id } = action.payload;
      let minus = state.items.find((item) => item.id === id)
      let totalMinus = minus.price * minus.quantity
      data = {
        ...state,
        items: state.items.filter((item) => item.id !== id),
        sum: state.sum - totalMinus
      };
      const dataSave = JSON.stringify(data)
      localStorage.setItem('carts', dataSave)
      return data


    case ACTION.UPDATE_ITEM: {
      const { id, typePayload } = action.payload;
      let index = state.items.findIndex((cart) => cart.id === id);
      const newItems = [...state.items];
      if (typePayload === 'minus') {
        newItems[index] = {
          ...newItems[index],
          quantity: newItems[index].quantity - 1
        };
        data = {
          items: newItems,
          sum: state.sum - newItems[index].price
        }
      } else {
        newItems[index] = {
          ...newItems[index],
          quantity: newItems[index].quantity + 1
        }
        data = {
          items: newItems,
          sum: state.sum + parseInt(newItems[index].price)
        }
      }
      const dataSave = JSON.stringify(data)
      localStorage.setItem('carts', dataSave)
      return data
    }
    case ACTION.REMOVE_ALL:
      state.items = []
      state.sum = 0
    default:
      return state;
  }

}


const initState = {
  search: ''
}
const Layout = (props) => {
  const location = useLocation();
  const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem("user")))
  const [state, dispatch] = useReducer(reducer2, JSON.parse(localStorage.getItem("carts")));
  const [stateSearch, dispatchSearch] = useReducer(reducerSearch, initState);
  useEffect(() => {
    setUserLogin(JSON.parse(localStorage.getItem("user")))
  }, [location])

  const getDataCarts = () => {
    const carts = JSON.parse(localStorage.getItem('carts'))
    return carts
  }
  return (
    <div >
      <cartContext.Provider value={{
        cartReducer: state,
        cartDispatch: dispatch
      }}>
        <searchContext.Provider
          value={{
            searchReducer: stateSearch,
            dispatchSearch: dispatchSearch
          }}>
          <Header auth={userLogin}/>
          {props.children}
          
          <Footer />
        </searchContext.Provider>
      </cartContext.Provider>
    </div>
  )
}
export default Layout