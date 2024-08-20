// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// const AddressDetailsTable = () => {
//     const [editingAddress, setEditingAddress] = useState(null);
//     const [updatedAddress, setUpdatedAddress] = useState({});
//     const [addresses, setAddresses] = useState([]);

//     const handleEditClick = (address) => {
//         setEditingAddress(address.id);
//         console.log(address.id);
//         setUpdatedAddress(address);
//     };


//     const handleDeleteAddress = (addressId) => {
//         setAddresses((prev) => prev.filter(addr => addr.id !== addressId));
//         toast.success("Address deleted successfully!");
//     };

//     const fetchUserAddresses = async () => {
//         try {
//             const userAddresses = await userService.fetchUserAddressDetails(userId);
//             if(userAddresses === null)
//                 user = await userService.addUserAddress(userId);
//             setAddresses(userAddresses);
//         } catch (err) {
//             toast.error(err.message || "Failed to fetch addresses."); // Enhanced error handling
//         }
//     };


//     const handleUpdateAddress = async (updatedAddress) => {
//         try {
//           const response = await userService.updateAddressDetails(updatedAddress.id, updatedAddress);
//           setAddresses((prev) => prev.map(addr => addr.id === updatedAddress.id ? response : addr));
//         } catch (error) {
//           setAddresses((prev) => prev.map(addr => addr.id === updatedAddress.id ? updatedAddress : addr));
//           toast.error(error.message || "Failed to update address.");
//         }
//       };

//     const handleUpdateChange = (e) => {
//         const { name, value } = e.target;
//         setUpdatedAddress({ ...updatedAddress, [name]: value });
//     };

//     const handleUpdateSubmit = (e) => {
//         e.preventDefault();
//         onUpdate(updatedAddress); // Call the update function passed as a prop
//         setEditingAddress(null);
//     };

//     return (
//         <div className="container mt-5">
//             <h2 className="text-center">Address Details</h2>
//             <table className="table table-bordered">
//                 <thead className="table-light">
//                     <tr>
//                         <th>id</th>
//                         <th>Addr Line1</th>
//                         <th>Addr Line2</th>
//                         <th>Pin Code</th>
//                         <th>City</th>
//                         <th>State</th>
//                         <th>Country</th>
//                         <th>Update</th>
//                         <th>Delete</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {addresses.map((address) => (
//                         <tr key={address.id}>
//                             <td>{address.id}</td>
//                             <td>
//                                 {editingAddress === address.id ? (
//                                     <input
//                                         type="text"
//                                         name="adrLine1"
//                                         value={updatedAddress.adrLine1}
//                                         onChange={handleUpdateChange}
//                                     />
//                                 ) : (
//                                     address.adrLine1
//                                 )}
//                             </td>
//                             <td>
//                                 {editingAddress === address.id ? (
//                                     <input
//                                         type="text"
//                                         name="adrLine2"
//                                         value={updatedAddress.adrLine2}
//                                         onChange={handleUpdateChange}
//                                     />
//                                 ) : (
//                                     address.adrLine2
//                                 )}
//                             </td>
//                             <td>
//                                 {editingAddress === address.id ? (
//                                     <input
//                                         type="text"
//                                         name="pincode"
//                                         value={updatedAddress.pincode}
//                                         onChange={handleUpdateChange}
//                                     />
//                                 ) : (
//                                     address.pincode
//                                 )}
//                             </td>
//                             <td>
//                                 {editingAddress === address.id ? (
//                                     <input
//                                         type="text"
//                                         name="city"
//                                         value={updatedAddress.city}
//                                         onChange={handleUpdateChange}
//                                     />
//                                 ) : (
//                                     address.city
//                                 )}
//                             </td>
//                             <td>
//                                 {editingAddress === address.id ? (
//                                     <input
//                                         type="text"
//                                         name="state"
//                                         value={updatedAddress.state}
//                                         onChange={handleUpdateChange}
//                                     />
//                                 ) : (
//                                     address.state
//                                 )}
//                             </td>
//                             <td>
//                                 {editingAddress === address.id ? (
//                                     <input
//                                         type="text"
//                                         name="country"
//                                         value={updatedAddress.country}
//                                         onChange={handleUpdateChange}
//                                     />
//                                 ) : (
//                                     address.country
//                                 )}
//                             </td>
                          
//                             <td>
//                                 {editingAddress === address.id ? (
//                                     <button className="btn btn-success" onClick={handleUpdateSubmit}>
//                                         Save
//                                     </button>
//                                 ) : (
//                                     <button className="btn btn-primary" onClick={() => handleEditClick(address)}>
//                                         Update
//                                     </button>
//                                 )}
//                             </td>
//                             <td>
//                                 <button className="btn btn-danger" onClick={() => onDelete(address.id)}>
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AddressDetailsTable;