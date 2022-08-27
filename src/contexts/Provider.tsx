import { useContext, createContext, useState } from "react";
import { useRouter } from 'next/router';

// import { ProductProps } from '../pages/produto';

interface ContextData {
    onClickProduct: (product: any) => void,
}

export const AppContext = createContext({} as ContextData);

const AppProvider = ({ children }: any) => {

    const router = useRouter();

    const [productDetails, setProductDetails] = useState<any>();

    function onClickProduct(product: object) {
        setProductDetails(product);
        localStorage.setItem('product', JSON.stringify(product))

        router.push('/produto')
    };

    return (
        <AppContext.Provider value={{
            onClickProduct
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;