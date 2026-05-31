import type {Product} from "../../constants/products.ts";
import styles from './CartItem.module.css'

export interface CartItem extends Product {
    quantity: number;
}

interface Props {
    item: CartItem
    onIncreaseCartItem: (productId: number) => void
    onDecreaseCartItem: (productId: number) => void
    onRemoveFromCart: (productId: number) => void
}

export const CartItem = ({item, onIncreaseCartItem, onDecreaseCartItem, onRemoveFromCart}: Props) => {
    return (
        <div className={styles.item}>
            <div className={styles.emoji}>{item.emoji}</div>
            <div className={styles.info}>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.unitPrice}>{item.price.toFixed(2)} zł/szt.</div>
            </div>
            <div className={styles.qtyControls}>
                <button className={styles.qtyBtn} onClick={() => onDecreaseCartItem(item.id)}>-</button>
                <span className={styles.qtyNum}>{item.quantity}</span>
                <button className={styles.qtyBtn} onClick={() => onIncreaseCartItem(item.id)}>+</button>
            </div>
            <button className={styles.removeBtn} onClick={() => onRemoveFromCart(item.id)}>x</button>
        </div>
    )
}