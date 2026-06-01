import type {Product} from "../../constants/products";
import styles from './ProductCard.module.css';

interface Props {
    product: Product;
    onAddToBasket: (product: Product) => void;
}

const categoryStyles: Record<string, string> = {
    'nabiał': styles.categoryNabial,
    'pieczywo': styles.categoryPieczywo,
    'napoje': styles.categoryNapoje,
}

export const ProductCard = ({product, onAddToBasket}: Props) => {
    return (
        <div className={styles.card} onClick={() => onAddToBasket(product)}>
            <span className={styles.emoji}>{product.emoji}</span>
            <div className={styles.name}>{product.name}</div>
            <span className={`${styles.categoryBadge} ${categoryStyles[product.category]}`}>
                {product.category}
            </span>
            <div className={styles.price}>{product.price.toFixed(2)} zł</div>
        </div>
    )
}