import { CSSProperties, ChangeEvent, LegacyRef, FormEvent, KeyboardEvent } from "react";
import styles from '../../styles/components/materialStyle/InputField.module.css';

type InputFieldProps = {
    name: string,
    type: 'text' | 'password' | 'number',
    required?: boolean,
    placeholder?: string,
    pattern?: string,
    className?: string,
    defaultValue?: string,
    ref?: LegacyRef<HTMLInputElement> | undefined,
    register: any,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    onInput?: (e: FormEvent<HTMLInputElement>) => void,
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void,
    style?: CSSProperties
}

export default function InputField(
    {
        name,
        type,
        placeholder,
        pattern,
        required,
        className,
        defaultValue,
        ref,
        register,
        onChange,
        onInput,
        onKeyDown,
        style
    }: InputFieldProps): JSX.Element {

    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            pattern={pattern}
            className={className ? className : styles.inputFieldBorderAround}
            onChange={onChange}
            onKeyDown={onKeyDown}
            defaultValue={defaultValue}
            style={style}
            ref={ref}
            onInput={(e) => onInput ? onInput(e) : null}
            {...register(name, { required })}
        />
    )
}