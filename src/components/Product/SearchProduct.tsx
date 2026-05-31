interface Props {
    onChange: (value: string) => void
    value: string
    className?: string
}

export const SearchProduct = ({onChange, value, className}: Props) => <input className={className} type="text"
                                                                             placeholder="Szukaj produktu..."
                                                                             onChange={(e) => onChange(e.target.value)}
                                                                             value={value}/>