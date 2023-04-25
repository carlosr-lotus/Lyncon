import { CSSProperties, ChangeEvent, LegacyRef, FormEvent } from "react";
import styles from '../../styles/components/materialStyle/InputField.module.css';

interface InputFieldProps {
    name: string,
    type: 'text' | 'password'
    placeholder: string,
    className?: string,
    ref?: LegacyRef<HTMLInputElement> | undefined,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    onInput?: (e: FormEvent<HTMLInputElement>) => void,
    style?: CSSProperties
}

export default function InputField(props: InputFieldProps): JSX.Element {
    return (
        <input
            name={props.name}
            placeholder={props.placeholder}
            className={props.className ? props.className : styles.inputFieldBorderAround}
            onChange={props.onChange}
            style={props.style}
            ref={props.ref}
            onInput={(e) => props.onInput ? props.onInput(e) : null}
        />
    )
}