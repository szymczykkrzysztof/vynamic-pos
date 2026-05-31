interface Props {
    message: string
}

export const ErrorBanner = ({message}: Props) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            gap: 12
        }}>
            <span style={{ fontSize: 32 }}>⚠️</span>
            <p style={{
                fontSize: 14,
                color: '#DC2626',
                fontWeight: 500
            }}>{message}</p>
        </div>
    )
}