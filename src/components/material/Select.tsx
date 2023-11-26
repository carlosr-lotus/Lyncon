import { useEffect, useState } from 'react';
import styles from '../../styles/components/materialStyle/Select.module.css';

type OptionT = {
    label: string,
    value: number
}

type SelectProps = {
    options: OptionT[],
    value?: OptionT | undefined,
    onChange: (value: OptionT | undefined) => void
}

export default function Select({ options, value, onChange }: SelectProps): JSX.Element {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

    function clearOptions(): void {
        onChange(undefined);
    }

    function selectOption(option: OptionT): void {
        if (option.value !== value?.value) onChange(option);
    }

    function isOptionSelected(option: OptionT): boolean {
        return option.value === value?.value;
    }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0);
    }, [isOpen]);

    return (
        <div
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prev => !prev)}
            tabIndex={0}
            className={styles.selectContainer}
        >
            <span className={styles.value}>{value?.label}</span>

            <button
                onClick={e => {
                    e.stopPropagation()
                    clearOptions()
                }}
                className={styles.clearBtn}
            >
                &times;
            </button>

            <div className={styles.divider}></div>

            <div className={styles.caret}></div>

            <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
                {options.map((option, index) => (
                    <li
                        onClick={e => {
                            e.stopPropagation()
                            selectOption(option)
                            setIsOpen(false)
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        key={option.value}
                        className={`
                            ${styles.option} 
                            ${isOptionSelected(option) ? styles.selected : ""}
                            ${highlightedIndex === index ? styles.highlighted : ""}
                        `
                        }
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    )
}