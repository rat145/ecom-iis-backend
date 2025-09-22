import { useState } from 'react'
import CategoryContext from './index';

const CategoryProvider = (props) => {
    const [categoryState, setCategoryState] = useState([])
    return (
        <CategoryContext.Provider value={{ categoryState, setCategoryState, ...props }}>
            {props.children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider