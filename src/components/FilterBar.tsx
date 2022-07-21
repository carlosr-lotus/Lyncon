// Icons //
import { FiFilter, FiSearch } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';

import styles from '../styles/components/FilterBar.module.css';

export default function FilterBar() {
    return (
        <div className={styles.filterBarContainer}>

            <div>
                <FiFilter size={23} />
            </div>
            <div className={styles.filterOptions}>
                <p>Gorros</p>
                <p>Camisas</p>
                <p>Camisetas</p>
                <IoIosArrowForward size={13} />
            </div>
            <div>
                <FiSearch size={23} />
            </div>

        </div>
    )
}