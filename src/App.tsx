import products, {type Product} from "./constants/products";
import {useState} from "react";
import {Header} from './components/Header/Header'
import styles from './App.module.css'
import {ProductList} from "./components/Product/ProductList.tsx";
import {Cart} from "./components/Cart/Cart.tsx";
import type {CartItem} from "./components/Cart/CartItem.tsx";
import {Confirmation} from "./components/Confirmation/Confirmation.tsx";
import {CartDetail} from "./components/Cart/CartDetail.tsx";

type View = 'pos' | 'cart' | 'confirmation'

function App() {
    const [basket, setBasket] = useState<CartItem[]>([]);
    const [lastOrder, setLastOrder] = useState<CartItem[]>([])
    const [view, setView] = useState<View>('pos')

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
    const handleInreaseQuantity = (productId: number) => {
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
            <Header/>
            {view === 'pos' && (
                <div className={styles.body}>
                    <ProductList products={products} onAddToBasket={handleAddToBasket}/>
                    <Cart
                        cartItems={basket}
                        onIncreaseCartItem={handleInreaseQuantity}
                        onDecreaseCartItem={handleDecreaseQuantity}
                        onRemoveFromCart={handleRemoveFromBasket}
                        onGoToCart={() => setView('cart')}
                    />
                </div>
            )}
            {view === 'cart' && (
                <CartDetail
                    cartItems={basket}
                    onIncreaseCartItem={handleInreaseQuantity}
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
