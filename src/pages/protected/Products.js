import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Product from '../../features/products'
import Products from '../../features/products'
// import Integration from '../../features/products'

function InternalPage(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Products"}))
      }, [])
      
    return(
        <Product />
    )
}

export default InternalPage