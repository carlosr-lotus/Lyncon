import MenuBar from "../../components/MenuBar"
import ListProducts from "../../components/ListProducts";
import AppProvider from "../../contexts/Provider";

import styles from '../../styles/pages/Vestimentas.module.css';

export default function VestimentasPage() {
    return (
        <AppProvider>
            <MenuBar />
            <ListProducts />
        </AppProvider>
    )
}