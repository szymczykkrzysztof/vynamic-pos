import styles from './Header.module.css'
import {useEffect, useState} from "react";
interface Props {
    cashierName:string
}
export const Header = ({cashierName}:Props) => {
    const [date, setDate] = useState(new Date())
    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date())
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <div className={styles.topbar}>
            <div className={styles.topbarLogo}>
                <div className={styles.topbarLogoDot}/>
                Vynamic POS
            </div>
            <div className={styles.topbarMeta}>
                <span className={styles.topbarTime}>{date.toLocaleDateString('pl-PL')} : {date.toLocaleTimeString('pl-PL')}</span>
                <span className={styles.topbarCashier}>Kasjer: {cashierName}</span>
            </div>
        </div>)

}