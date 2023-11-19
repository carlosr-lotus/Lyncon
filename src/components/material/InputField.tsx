import { CSSProperties, ChangeEvent, LegacyRef, FormEvent } from "react";
import styles from '../../styles/components/materialStyle/InputField.module.css';

type InputFieldProps = {
    name: string,
    type: 'text' | 'password',
    required?: boolean,
    placeholder: string,
    className?: string,
    ref?: LegacyRef<HTMLInputElement> | undefined,
    register: any,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    onInput?: (e: FormEvent<HTMLInputElement>) => void,
    style?: CSSProperties
}

export default function InputField(
    {
        name,
        type,
        placeholder,
        required,
        className,
        ref,
        register,
        onChange,
        onInput,
        style
    }: InputFieldProps): JSX.Element {

    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            className={className ? className : styles.inputFieldBorderAround}
            onChange={onChange}
            style={style}
            ref={ref}
            onInput={(e) => onInput ? onInput(e) : null}
            {...register(name, { required })}
        />
    )
}