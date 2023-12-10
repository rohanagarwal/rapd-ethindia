<<<<<<< HEAD
/* eslint-disable */
import React, { useState } from 'react';

// eslint-disable-next-line
const Table = ({ data }: {data: any}) => {
  const [sortedData, setSortedData] = useState(data);
  const [sortOrder, setSortOrder] = useState('asc');

  // eslint-disable-next-line
  const handleSort = (key: any) => {
=======
// import React, { useState } from 'react';

// const Table = ({ data }) => {
//   const [sortedData, setSortedData] = useState(data);
//   const [sortOrder, setSortOrder] = useState('asc');

//   const handleSort = (key: any) => {
//     const order = sortOrder === 'asc' ? 'desc' : 'asc';
//     const sorted = [...sortedData].sort((a, b) => {
//       if (order === 'asc') {
//         return a[key] - b[key];
//       } else {
//         return b[key] - a[key];
//       }
//     });
//     setSortedData(sorted);
//     setSortOrder(order);
//   };

//   return (
//     <table className="text-black min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
//     <thead className="bg-gray-100">
//       <tr>
//         <th
//           className="p-3 cursor-pointer text-left"
//           onClick={() => handleSort('referrer')}
//         >
//           Referrer
//         </th>
//         <th
//           className="p-3 cursor-pointer text-left"
//           onClick={() => handleSort('rewards')}
//         >
//           Rewards
//         </th>
//         <th
//           className="p-3 cursor-pointer text-left"
//           onClick={() => handleSort('totalReferrals')}
//         >
//           Total Referrals
//         </th>
//         <th
//           className="p-3 cursor-pointer text-left"
//           onClick={() => handleSort('campaignAddress')}
//         >
//           Campaign Address
//         </th>
//       </tr>
//     </thead>
//     <tbody>
//       {sortedData.map((item: any) => (
//         <tr key={item.id} className="hover:bg-gray-50">
//           <td className="border px-4 py-2">{item.referrer}</td>
//           <td className="border px-4 py-2">{item.rewards}</td>
//           <td className="border px-4 py-2">{item.totalReferrals}</td>
//           <td className="border px-4 py-2">{item.campaignAddress}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
  
//   );
// };

// export default Table;


import React, { useState } from 'react';

interface TableProps {
  data: Array<{
    id: number;
    referrer: string;
    rewards: number;
    totalReferrals: number;
    campaignAddress: string;
  }>;
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [sortedData, setSortedData] = useState(data);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: keyof typeof sortedData[0]) => {
>>>>>>> 8e3c42c (fixed deployment issues and home page built)
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    const sorted = [...sortedData].sort((a, b) => {
      // Type assertion to indicate that a[key] and b[key] are numbers
      const aValue = a[key] as number;
      const bValue = b[key] as number;
  
      if (order === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
    setSortedData(sorted);
    setSortOrder(order);
  };

  return (
    <table className="text-black min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th
            className="p-3 cursor-pointer text-left"
            onClick={() => handleSort('referrer')}
          >
            Referrer
          </th>
          <th
            className="p-3 cursor-pointer text-left"
            onClick={() => handleSort('rewards')}
          >
            Rewards
          </th>
          <th
            className="p-3 cursor-pointer text-left"
            onClick={() => handleSort('totalReferrals')}
          >
            Total Referrals
          </th>
          <th
            className="p-3 cursor-pointer text-left"
            onClick={() => handleSort('campaignAddress')}
          >
            Campaign Address
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50">
            <td className="border px-4 py-2">{item.referrer}</td>
            <td className="border px-4 py-2">{item.rewards}</td>
            <td className="border px-4 py-2">{item.totalReferrals}</td>
            <td className="border px-4 py-2">{item.campaignAddress}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
/* eslint-disable */