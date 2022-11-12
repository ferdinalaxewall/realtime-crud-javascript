import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import useSWR, { useSWRConfig } from 'swr';

const ProductList = () => {
    const { mutate } = useSWRConfig();
  
    const fetcher = async () => {
        const response = await axios.get("http://localhost:5000/products");
        return response.data;
    }

    const { data } = useSWR('products', fetcher);
    if(!data) return <h2>Loading...</h2>

    const deleteProduct = async (productId) => {
        await axios.delete(`http://localhost:5000/products/${productId}`);
        mutate('products')
    }

    return (
    <div className='flex flex-col mt-5'>
        <div className="w-full">
            <div className="relative mt-3">
                <Link to="/add" className='bg-purple-500 text-sm hover:bg-purple-400 border border-slate-200 text-white font-medium py-2 px-4 rounded-lg'>Add New Product</Link>
                <table className="table shadow rounded-lg w-full text-sm text-left text-gray-500 mt-5">
                    <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
                        <tr>
                            <th className='py-3 px-1 text-center'>No.</th>
                            <th className='py-3 px-6'>Product Name</th>
                            <th className='py-3 px-6'>Price</th>
                            <th className='py-3 px-6'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((product, index) => (
                                <tr className='bg-white border-b' key={product.id}>
                                    <td className='py-3 px-1 text-center'>{index+1}</td>
                                    <td className='py-3 px-6 font-medium text-gray-900'>{product.name}</td>
                                    <td className='py-3 px-6'>{product.price}</td>
                                    <td className='py-3 px-6'>
                                        <Link to={`/edit/${product.id}`} className="font-medium bg-blue-400 hover:bg-blue-300 text-white py-1 px-3 mx-0.5 rounded">Edit</Link>
                                        <button onClick={() => deleteProduct(product.id)} className="font-medium bg-red-400 hover:bg-red-300 text-white py-1 px-3 mx-0.5 rounded">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default ProductList