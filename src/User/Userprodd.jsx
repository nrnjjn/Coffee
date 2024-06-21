import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Userprodd = () => {
  const [data, setData] = useState({});
  const [data1, setData1] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [shopId, setShopId] = useState('');
  const id2 = localStorage.getItem('id');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/viewprodd/${id}`);
        if (response.data) {
          setData(response.data);
          setShopId(response.data.shopId); 
          setQuantity(1); 
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (event) => {
    setData1({ ...data1, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const totalAmount = quantity * data.Price;
    try {
      const response = await axios.post('http://localhost:4000/user/postbooking', {
        ...data1,
        userId: id2,
        productId: id,
        shopId: shopId,
        Quantity: quantity, 
        totalAmount: totalAmount 
      });
      console.log(response);
    } catch (error) {
      console.error('Error posting booking:', error);
    }
  };

  const handleQuantityChange = (action) => {
    setQuantity(prevQuantity => {
      if (action === 'increase') {
        return prevQuantity + 1;
      } else if (action === 'decrease' && prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  return (
    <div className='pt-40 landing'>
      <div className='bg-slate-950/50 w-[600px] h-[370px] m-auto flex gap-2'>
        <img src={`http://localhost:4000/uploads/${data.Image}`} alt="" className='w-80 h-80 ps-3 pt-3' />
        <div className='flex flex-wrap flex-col'>
          <div className='flex flex-wrap text-white gap-12 pt-3 text-center'>
            <p className='font-bold'>Film Name:</p>
            <p>{data.Pname}</p>
          </div>
          <div className='flex flex-wrap text-white gap-10 pt-3 text-center'>
            <p className='font-bold'>Details:</p>
            <p className='text-left'>{data.Description}</p>
          </div>
          <div className='flex flex-wrap text-white gap-10 pt-3 text-center'>
            <p className='font-bold'>Price:</p>
            <p className='text-left'>{data.Price}</p>
          </div>
          <div className='flex flex-wrap text-white gap-10 pt-3 text-center'>
            <p className='font-bold'>Quantity:</p>
            <p className='text-left'>{quantity}</p> {/* Display quantity */}
            <button className='text-red-500' onClick={() => handleQuantityChange('increase')}>+</button>
            <button className='text-green-600' onClick={() => handleQuantityChange('decrease')}>-</button>
          </div>
          <div className='flex flex-wrap text-white gap-10 pt-3 text-center'>
            <p className='font-bold'>Total Amount:</p>
            <p className='text-left'>{quantity * data.Price}</p> {/* Display total amount */}
          </div>
          <div className='pt-10 flex flex-wrap justify-center'>
            <Link to={`/user/uviewbooking`}>
              <button onClick={handleSubmit} type='submit' className='text-green-400'>Buy</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userprodd;
