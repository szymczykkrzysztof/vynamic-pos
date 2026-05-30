import type {Product} from "../../constants/products.ts";
import styles from './ProductList.module.css'
import {useState} from "react";
import {ProductCard} from "./ProductCard.tsx";

interface Props {
    products: Product[]
    onAddToBasket: (product: Product) => void
}

export const ProductList = ({products, onAddToBasket}: Props) => {
    const [filteredCategory, setFilteredCategory] = useState<string>('Wszystkie')
    const getCategories = (products: Product[]) => {
        const categories = products.map(product => product.category)
        return ['Wszystkie', ...new Set(categories)]
    }
    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                {getCategories(products).map((category) => (
                    <span key={category}
                          className={`${styles.filterPill} ${filteredCategory === category ? styles.filterPillActive : ''}`}
                          onClick={() => setFilteredCategory(category)}
                    >{category}</span>
                ))}
            </div>
            <div className={styles.grid}>
                {products.filter(product => filteredCategory === 'Wszystkie' || product.category === filteredCategory).map((product) => (
                    <ProductCard key={product.id} product={product} onAddToBasket={onAddToBasket}/>
                ))}
            </div>

        </div>)
}