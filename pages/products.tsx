import { Typography, Grid, Pagination, CircularProgress } from '@mui/material'
import Layout from '../layouts/Layout'
import Product from '../components/Product'
import CustomSelect from '../components/CustomSelect'
import { NextPage } from 'next'
import { useTypedSelector } from '../utils/hooks/useTypedSelector'
import { productsSelectValues } from '../data/data'
import { useActions } from '../utils/hooks/useActions'
import { useEffect } from 'react'
import { useRouter } from 'next/router';
import Router from 'next/router';


const Products: NextPage = () => {
    const { items, isLoading, filter, currentPage, pages, countOnPage } = useTypedSelector(state => state.products);
    const { setFilter, setCurrentPage, getProducts } = useActions();
    const router = useRouter();
    useEffect(() => {
        let actualFilter = { ...filter };
        let actualCurrentPage = currentPage;
        if (!!router.query.type) actualFilter = { ...actualFilter, type: router.query.type as string };
        if (!!router.query.sort) actualFilter = { ...actualFilter, sort: router.query.sort as string };
        if (!!router.query.category) actualFilter = { ...actualFilter, category: router.query.category as string };
        if (!!router.query.currentPage) actualCurrentPage = +router.query.currentPage as number;
        setFilter(actualFilter);
        setCurrentPage(actualCurrentPage);
        getProducts(actualFilter, actualCurrentPage, countOnPage);
    }, [router.query])

    const setFilterSort = (sort: string) => {
        setFilter({
            ...filter,
            sort
        })
        Router.push({
            pathname: '/products',
            query: { ...Router.query, sort },
        });
    }
    const setFilterCategory = (category: string) => {
        setFilter({
            ...filter,
            category
        })
        Router.push({
            pathname: '/products',
            query: { ...Router.query, category },
        });
    }
    const setFilterType = (type: string) => {
        setFilter({
            ...filter,
            type
        })
        Router.push({
            pathname: '/products',
            query: { ...Router.query, type },
        });
    }
    const handleCurrentPage = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
        Router.push({
            pathname: '/products',
            query: { ...Router.query, currentPage: page },
        });
    }

    return (
        <Layout title='Товары'>
            <div className='sort'>
                <CustomSelect
                    label='Тип'
                    value={filter.type}
                    setValue={setFilterType}
                    arrayValues={productsSelectValues.type}
                />
                <CustomSelect
                    label='Стиль'
                    value={filter.category}
                    setValue={setFilterCategory}
                    arrayValues={productsSelectValues.category}
                />
                <CustomSelect
                    label='Cортировка по '
                    value={filter.sort}
                    setValue={setFilterSort}
                    arrayValues={productsSelectValues.sort}
                />
            </div>
            <Typography variant='h6' className='bolder' style={{ marginBottom: 10 }}>
                Товары:
            </Typography>
            {isLoading ? <CircularProgress /> : (items?.length != 0) ? (<Grid container spacing={1} >
                {
                    items?.map(product => <Product
                        key={product._id}
                        product={product}
                    />)
                }
            </Grid>) : <Typography>Ничего не найдено</Typography>}
            {pages > 1 &&
                <Pagination
                    count={pages}
                    page={currentPage}
                    onChange={handleCurrentPage}
                    variant="outlined"
                    color="primary"
                    className='pagination'
                />
            }
        </Layout>
    )
}

export default Products;
