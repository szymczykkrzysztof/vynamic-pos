import type {CartItem} from "./CartItem.tsx";

interface Props {
    cartItems: CartItem[]
    onIncreaseCartItem: (productId: number) => void
    onDecreaseCartItem: (productId: number) => void
    onRemoveFromCart: (productId: number) => void
}

export const Cart = ({cartItems, onIncreaseCartItem, onDecreaseCartItem, onRemoveFromCart}: Props) => {
    console.log(cartItems)
    return <div>Cart</div>
}