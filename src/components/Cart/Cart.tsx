import {CartItem} from "./CartItem.tsx";
import styles from './Cart.module.css'

interface Props {
    cartItems: CartItem[]
    onIncreaseCartItem: (productId: number) => void
    onDecreaseCartItem: (productId: number) => void
    onRemoveFromCart: (productId: number) => void
    onGoToCart: () => void
}

export const Cart = ({
                         cartItems,
                         onIncreaseCartItem,
                         onDecreaseCartItem,
                         onRemoveFromCart,
                         onGoToCart
                     }: Props) => {
    const brutto = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const netto = brutto / 1.23
    const vat = brutto - netto
    return (
        <div className={styles.panel}>
            <div className={styles.header}>
                <span className={styles.title}>Koszyk</span>
                {cartItems.length > 0 && (
                    <span className={styles.count}>{cartItems.length} poz.</span>
                )}
            </div>

            {cartItems.length === 0 ? (
                <div className={styles.empty}>
                    <span className={styles.emptyIcon}>🛒</span>
                    <span>Koszyk jest pusty</span>
                </div>
            ) : (
                <div className={styles.items}>
                    {cartItems.map(item => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onIncreaseCartItem={onIncreaseCartItem}
                            onDecreaseCartItem={onDecreaseCartItem}
                            onRemoveFromCart={onRemoveFromCart}
                        />
                    ))}
                </div>
            )}
            <div className={styles.divider}></div>
            <div className={styles.footer}>
                <div className={styles.divider}/>
                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Netto</span>
                    <span className={styles.summaryValue}>{netto.toFixed(2)} zł</span>
                </div>
                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>VAT 23%</span>
                    <span className={styles.summaryValue}>{vat.toFixed(2)} zł</span>
                </div>
                <div className={styles.totalRow}>
                    <span className={styles.totalLabel}>Do zapłaty</span>
                    <span className={styles.totalValue}>{brutto.toFixed(2)} zł</span>
                </div>
                <button
                    className={styles.payBtn}
                    disabled={cartItems.length === 0}
                    onClick={onGoToCart}
                >
                    Przejrzyj koszyk →
                </button>
            </div>
        </div>
    )
}