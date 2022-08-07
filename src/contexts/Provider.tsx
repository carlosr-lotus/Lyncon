import { useContext, createContext } from "react";

interface ContextData {
    testeProvider: () => void
}

export const AppContext = createContext({} as ContextData);

const AppProvider = ({ children }: any) => {

    function testeProvider() {
        console.log('Retorno do provider!')
    }

    return (
        <AppContext.Provider value={{
            testeProvider
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;