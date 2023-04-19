import { createContext, useContext, useReducer } from "react";

const CartContext = createContext([]);
const CartDispatchContext = createContext([])
export function useCartContext() {
    return useContext(CartContext)
}

export function useCartDispatch() {
    return useContext(CartDispatchContext)
}

const initialValue = [];

export function CartItemProvider({children}) {
    const [task, dispatch] = useReducer(cartReducer, initialValue)

    return (
        <CartContext.Provider value={task}>
          <CartDispatchContext.Provider value={dispatch}>
            {children}
          </CartDispatchContext.Provider>
        </CartContext.Provider>
      );
}

function cartReducer(task, action) {
    switch (action.type) {
        case 'add': {
            return [...task, action.data]
        }
    }
}