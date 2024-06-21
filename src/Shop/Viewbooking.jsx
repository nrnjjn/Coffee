import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Viewbooking = () => {
  const id2 = localStorage.getItem('id');
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/shop/viewbooking/${id2}`);
        console.log('Fetched data:', response.data);
        if (response.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id2, refresh]);

  const handlesubmit = async (status, reqId) => {
    try {
      const response = await axios.put(`http://localhost:4000/shop/managebooking/${reqId}`, { Status: status });
      console.log('Update response:', response.data);
      // Toggle refresh to trigger useEffect to fetch updated data
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredData = Array.isArray(data) ? data.filter(item =>
    item?.product?.Pname?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className='landing'>
      <div className='text-white pt-36 text-center mb-5 text-[30px]'>BOOKING</div>

      <div className="shadow-md sm:rounded-lg">
        <div className="flex items-center justify-center pb-4">
          <input
            type="text"
            placeholder="Search Product name"
            className="p-2.5 text-sm w-64 text-white bg-transparent border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder:text-white"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 dark:bg-gray-950/50">
          <thead className="text-xs text-white uppercase dark:bg-gray-950/90 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3">SLNO</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>STATUS</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="dark:border-gray-700 text-white bg-gray-950-950/40 hover:bg-slate-800/50">
                <td scope="row" className="px-1 py-4">{index + 1}</td>
                <td>{item.product?.Pname}</td>
                <td>{item.req?.Quantity}</td>
                <td>{item.req?.totalAmount}</td>
                <td>{item.req?.Status}</td>
                <td><button onClick={() => handlesubmit('Accepted', item.req._id)} className='text-green-500'>Accept</button></td>
                <td><button onClick={() => handlesubmit('Rejected', item.req._id)} className='text-red-500'>Reject</button></td>
                <td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Viewbooking;
