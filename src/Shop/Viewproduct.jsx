import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Viewproduct = () => {
  const id = localStorage.getItem('id');
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/shop/deleteproduct/${productId}`);
      fetchData(); // Fetch data again after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/shop/viewproduct/${id}`);
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item) => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    return (
      item?.Pname?.toLowerCase().includes(lowerSearchQuery)
    );
  });

  return (
    <div className='landing'>
      <div className='text-white pt-36 text-center mb-3 text-[30px]'> PRODUCT</div>

      {/* Search bar */}
      <div className='max-w-sm mx-auto mb-4 mt-4'>
        <input
          type='text'
          value={searchQuery}
          onChange={handleSearchChange}
          className='block w-full py-2 px-4 border border-white rounded-md bg-transparent placeholder:text-white text-white text-sm leading-tight focus:outline-none focus:bg-transparent focus:border-gray-500'
          placeholder='Search by Product name'
        />
      </div>

      {/* Table */}
      <div className='mt-5 overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-center rtl:text-right text-white'>
          <thead className='text-xs uppercase dark:bg-gray-950/90'>
            <tr>
              <th scope='col' className='px-6 py-3'>SLNO</th>
              <th>Product NAME</th>
              <th>Price</th>
              <th>DESCRIPTION</th>
              <th>IMAGE</th>
              <th>DATE</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className='dark:border-gray-700 bg-gray-950/40 hover:bg-slate-800/50'>
                <td scope='row' className='px-6 py-4'>{index + 1}</td>
                <td>{item.Pname}</td>
                <td>{item.Price}</td>
                <td>{item.Description}</td>
                <td className='flex flex-wrap justify-center pt-3'>
                  <img alt='' className='w-10 h-10' src={`http://localhost:4000/uploads/${item.Image}`} />
                </td>
                <td className='px-6 py-4'>{new Date(item.Date).toLocaleDateString()}</td>
                <td>
                  <Link to={`/shopnav/editproduct/${item._id}`}>
                    <button className='text-green-500'>Edit</button>
                  </Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(item._id)} className='text-red-500'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Viewproduct;
