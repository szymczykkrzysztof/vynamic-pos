import {useEffect, useState} from "react";
import {Header} from './components/Header/Header'
import styles from './App.module.css'
import {ProductList} from "./components/Product/ProductList.tsx";
import {Cart} from "./components/Cart/Cart.tsx";
import type {CartItem} from "./components/Cart/CartItem.tsx";
import {Confirmation} from "./components/Confirmation/Confirmation.tsx";
import {CartDetail} from "./components/Cart/CartDetail.tsx";
import type {Product} from "./constants/products.ts";
import {ErrorBanner} from "./components/ErrorBanner/ErrorBanner.tsx";
import {API_URL} from "./constants/constants.ts";

type View = 'pos' | 'cart' | 'confirmation'

function App() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [basket, setBasket] = useState<CartItem[]>([]);
    const [lastOrder, setLastOrder] = useState<CartItem[]>([])
    const [view, setView] = useState<View>('pos')

    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
            .catch(() => {
                setError('Nie udało się załadować produktów')
                setLoading(false)
            })
    }, [])

    const handleAddToBasket = (newProduct: Product) => {
        const existingItem = basket.find((item) => item.id === newProduct.id);

        if (existingItem) {
            setBasket((prev) =>
                prev.map((item) =>
                    item.id === newProduct.id
                        ? {...item, quantity: item.quantity + 1}
                        : item
                )
            );
        } else {
            const newItem: CartItem = {...newProduct, quantity: 1};
            setBasket((prev) => [...prev, newItem]);
        }
    };
    const handleRemoveFromBasket = (productId: number) => {
        setBasket((prev) => prev.filter((item) => item.id !== productId));
    }
    const handleIncreaseQuantity = (productId: number) => {
        const existingItem = basket.find((item) => item.id === productId);
        if (existingItem) {
            setBasket((prev) =>
                prev.map((item) =>
                    item.id === productId
                        ? {...item, quantity: item.quantity + 1}
                        : item
                )
            );
        }
    }
    const handleDecreaseQuantity = (productId: number) => {
        const existingItem = basket.find((item) => item.id === productId);
        if (existingItem && existingItem.quantity > 1) {
            setBasket((prev) =>
                prev.map((item) =>
                    item.id === productId
                        ? {...item, quantity: item.quantity - 1}
                        : item
                )
            );
        } else {
            handleRemoveFromBasket(productId);
        }
    }
    const handlePay = () => {
        setLastOrder(basket)
        setBasket([])
        setView('confirmation')
    }

    return (
        <div className={styles.layout}>
            <Header cashierName={"Krzysztof Jarzyna"}/>
            {loading && (
                <div className={styles.loadingContainer}>
                    Trwa nawiązywanie połączenia z serwerem...
                </div>
            )}
            {error && <ErrorBanner message={error}/>}
            {!loading && !error && view === 'pos' && (
                <div className={styles.body}>
                    <ProductList products={products} onAddToBasket={handleAddToBasket}/>
                    <Cart
                        cartItems={basket}
                        onIncreaseCartItem={handleIncreaseQuantity}
                        onDecreaseCartItem={handleDecreaseQuantity}
                        onRemoveFromCart={handleRemoveFromBasket}
                        onGoToCart={() => setView('cart')}
                    />
                </div>
            )}
            {!loading && !error && view === 'cart' && (
                <CartDetail
                    cartItems={basket}
                    onIncreaseCartItem={handleIncreaseQuantity}
                    onDecreaseCartItem={handleDecreaseQuantity}
                    onRemoveFromCart={handleRemoveFromBasket}
                    onPay={handlePay}
                    onBack={() => setView('pos')}
                />
            )}
            {view === 'confirmation' && (
                <Confirmation
                    order={lastOrder}
                    onClose={() => setView('pos')}
                />
            )}
        </div>
    )
}

export default App
