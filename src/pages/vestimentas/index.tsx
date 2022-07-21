import MenuBar from "../../components/MenuBar"
import FilterBar from "../../components/FilterBar";
import ListProducts from "../../components/ListProducts";

import styles from '../../styles/pages/Vestimentas.module.css';

export default function VestimentasPage() {
    return (
        <>
            <MenuBar />
            <FilterBar />
            <ListProducts />
        </>
    )
}