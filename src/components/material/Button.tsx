import { CSSProperties } from 'react';

import styles from '../../styles/components/materialStyle/Button.module.css';

interface ButtonProps {
    name: string,
    type: 'button' | 'submit' | 'reset',
    style?: CSSProperties,
    onClick?: () => any
}

export default function Button(props: ButtonProps): JSX.Element {
    return (
        <button
            className={styles.buttonClass}
            type={props.type}
            onClick={() => props.onClick ? props.onClick() : null}
            style={props.style ? props.style : {}}
        >
            {props.name}
        </button>
    )
}