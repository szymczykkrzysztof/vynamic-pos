import type {Product} from "../../constants/products.ts";
import styles from './ProductList.module.css'
import {useState} from "react";
import {ProductCard} from "./ProductCard.tsx";
import {SearchProduct} from "./SearchProduct.tsx";

interface Props {
    products: Product[]
    onAddToBasket: (product: Product) => void
}

export const ProductList = ({products, onAddToBasket}: Props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredCategory, setFilteredCategory] = useState<string>('Wszystkie')
    const getCategories = (products: Product[]) => {
        const categories = products.map(product => product.category)
        return ['Wszystkie', ...new Set(categories)]
    }
    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                <div className={styles.filtersLeft}>
                    {getCategories(products).map((category) => (
                        <span key={category}
                              className={`${styles.filterPill} ${filteredCategory === category ? styles.filterPillActive : ''}`}
                              onClick={() => setFilteredCategory(category)}
                        >{category}</span>
                    ))}
                </div>
                <div>
                    <SearchProduct onChange={setSearchTerm} value={searchTerm} className={styles.searchInput}/>
                </div>
            </div>
            <div className={styles.grid}>
                {products
                    .filter(p => filteredCategory === 'Wszystkie' || p.category === filteredCategory)
                    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((product) => (
                        <ProductCard key={product.id} product={product} onAddToBasket={onAddToBasket}/>
                    ))}
            </div>

        </div>)
}