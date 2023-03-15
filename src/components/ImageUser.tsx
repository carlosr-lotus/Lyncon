interface ImageProps {
    nome: string,
    height: string,
    width: string,
    urlImagem?: string,
}

export default function ImageUser(props: ImageProps): JSX.Element {

    function getInitials(name: string): string {
        let initials: RegExpMatchArray | never[] | string = name.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
        return initials;
    }

    return (
        <div
            style={{
                backgroundColor: 'var(--Main-Black)',
                display: 'grid',
                borderRadius: '100%',
                height: props.height,
                width: props.width,
                placeItems: 'center'
            }}
        >
            {
                props.urlImagem ?
                    <img
                        src={props.urlImagem}
                        alt="imagem-ou-iniciais-do-usuario"
                        style={{
                            width: props.width,
                            height: props.height,
                            borderRadius: '100%',
                            objectFit: 'cover',
                            boxShadow: '0px 3px 6px var(--Box-Shadow-Default)'
                        }}
                    />
                    :
                    <p
                        style={{
                            color: 'var(--Main-White)',
                            fontSize: `${parseInt(props.width.replace('rem', '')) / 2.5}rem`
                        }}
                    >
                        {getInitials(props.nome)}
                    </p>
            }

        </div>
    )
}