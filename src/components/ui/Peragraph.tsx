import type { PeragraphProps } from "../../types/alltypes";


export default function Peragraph({className, text, label}: PeragraphProps) {
    return (
        <p className={className}>
            {label && <span className="font-medium">{label}: </span>}
            {text}
        </p>
    )
}