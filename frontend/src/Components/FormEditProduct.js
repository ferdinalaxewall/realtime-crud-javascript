import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const FormEditProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();
    const { id } = useParams()

    useEffect(() => {
        
        const getProductById = async () => {
            const response = await axios.get(`http://localhost:5000/products/${id}`);
            setName(response.data.name);
            setPrice(response.data.price);
        }
        getProductById();
    }, [id]);
    
    const updateProduct = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/products/${id}`, {
            name : name,
            price : parseInt(price)
        });
        navigate("/")
    }

    return (
    <div className='max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow-lg shadow-slate-300'>
        <form onSubmit={updateProduct} className="my-10">
            <div className="flex flex-col">
                <div className="mb-5 flex flex-col gap-2">
                    <label className="font-bold text-slate-700">Product Name:</label>
                    <input type="text" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" value={name} onChange={(e) => setName(e.target.value)} placeholder='e.g. Product 1' />
                </div>
                <div className="mb-5 flex flex-col gap-2">
                    <label className="font-bold text-slate-700">Price:</label>
                    <input type="text" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='e.g.699' />
                </div>
                <button type="submit" className='w-full py-3 font-bold text-white bg-purple-600 hover:bg-purple-400 rounded-lg border-purple-400 hover:shadow'>Update</button>
            </div>
        </form>
    </div>
  )
}

export default FormEditProduct