import type {CartItem} from "../Cart/CartItem.tsx";
import styles from './Confirmation.module.css'
import {useState} from "react";

interface Props {
    order: CartItem[]
    onClose: () => void
}

export const Confirmation = ({order, onClose}: Props) => {
    const brutto = order.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const netto = brutto / 1.23
    const vat = brutto - netto
    const [printed, setPrinted] = useState(false)
    const handlePrintReceipt = () => {
        if (printed) return
        setPrinted(true)
    }
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.checkIcon}>✓</div>
                <div className={styles.title}>Transakcja zakończona</div>
                <div className={styles.subtitle}>
                    {printed ? `Paragon został wydrukowany` : `Paragon nie został wydrukowany`}<br/>
                    Dziękujemy za zakupy.
                </div>

                <div className={styles.receipt}>
                    <div className={styles.receiptMeta}>
                        PARAGON · {new Date().toLocaleDateString('pl-PL')}
                    </div>

                    {order.map(item => (
                        <div key={item.id} className={styles.receiptRow}>
                            <span>{item.name} ×{item.quantity}</span>
                            <span className={styles.receiptVal}>
                                {(item.price * item.quantity).toFixed(2)} zł
                            </span>
                        </div>
                    ))}

                    <div className={styles.receiptDivider}/>

                    <div className={styles.receiptRow}>
                        <span>Netto</span>
                        <span className={styles.receiptVal}>{netto.toFixed(2)} zł</span>
                    </div>
                    <div className={styles.receiptRow}>
                        <span>VAT 23%</span>
                        <span className={styles.receiptVal}>{vat.toFixed(2)} zł</span>
                    </div>

                    <div className={styles.receiptDivider}/>

                    <div className={styles.receiptTotal}>
                        <span>Razem</span>
                        <span className={styles.receiptTotalVal}>{brutto.toFixed(2)} zł</span>
                    </div>
                </div>

                <div className={styles.actions}>
                    {!printed &&<button className={styles.btnSecondary} onClick={handlePrintReceipt} disabled={printed}>
                        Drukuj paragon
                    </button>}
                    <button className={styles.btnPrimary} onClick={onClose}>
                        Nowa transakcja →
                    </button>
                </div>
            </div>
        </div>
    )
}