import {CartItem} from "./CartItem.tsx";
import styles from './CartDetail.module.css'

interface Props {
    cartItems: CartItem[]
    onIncreaseCartItem: (productId: number) => void
    onDecreaseCartItem: (productId: number) => void
    onRemoveFromCart: (productId: number) => void
    onPay: () => void
    onBack: () => void
}

export const CartDetail = ({
                               cartItems,
                               onIncreaseCartItem,
                               onDecreaseCartItem,
                               onRemoveFromCart,
                               onPay,
                               onBack
                           }: Props) => {
    const brutto = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const netto = brutto / 1.23
    const vat = brutto - netto

    return (
        <div className={styles.container}>
            <button className={styles.backBtn} onClick={onBack}>
                ← Wróć do kasy
            </button>
            <div className={styles.grid}>
                <div className={styles.items}>
                    <div className={styles.itemsHeader}>
                        <span>Produkt</span>
                        <span>Ilość</span>
                        <span>Suma</span>
                    </div>
                    {cartItems.map(item => (
                        <div key={item.id} className={styles.itemRow}>
                            <CartItem
                                item={item}
                                onIncreaseCartItem={onIncreaseCartItem}
                                onDecreaseCartItem={onDecreaseCartItem}
                                onRemoveFromCart={onRemoveFromCart}
                            />
                            <span className={styles.subtotal}>
                                {(item.price * item.quantity).toFixed(2)} zł
                            </span>
                        </div>
                    ))}
                </div>

                <div className={styles.sidebar}>
                    <div className={styles.sidebarTitle}>Podsumowanie</div>
                    <div className={styles.summaryRow}>
                        <span>Netto</span>
                        <span>{netto.toFixed(2)} zł</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>VAT 23%</span>
                        <span>{vat.toFixed(2)} zł</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Pozycji</span>
                        <span>{cartItems.length}</span>
                    </div>
                    <div className={styles.totalRow}>
                        <span>Do zapłaty</span>
                        <span>{brutto.toFixed(2)} zł</span>
                    </div>
                    <button
                        className={styles.payBtn}
                        onClick={onPay}
                        disabled={cartItems.length === 0}
                    >
                        Finalizuj transakcję →
                    </button>
                </div>
            </div>
        </div>
    )
}