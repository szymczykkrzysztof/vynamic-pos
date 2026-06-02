import styles from './ErrorBanner.module.css';

interface Props {
    message: string
}

export const ErrorBanner = ({message}: Props) => {
    return (
        <div className={styles.container}>
            <span className={styles.icon}>❌</span>
            <p className={styles.message}>{message}</p>
        </div>
    );
};