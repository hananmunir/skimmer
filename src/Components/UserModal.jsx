import React, {useState} from "react";
import { Modal, Box, Paper, Typography } from '@mui/material';

export default function UserModal({ userForm, handleUserFormChange, isModalOpen, handleModalClose,  handleSubmit }) {
  
  return (
    <>
    <Modal open={isModalOpen} onClose={handleModalClose}>
    <Box  sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      maxHeight: '40vh',
      overflowY: 'auto', 
    }}>
   <Typography variant="h6">User Form</Typography>
  <div className="user-form">
    <div className="form-field">
      <label htmlFor="firstName">First Name*</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={userForm.firstName}
        onChange={handleUserFormChange}
        required
      />
    </div>
    <div className="form-field">
      <label htmlFor="lastName">Last Name*</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={userForm.lastName}
        onChange={handleUserFormChange}
        required
      />
    </div>
    <div className="form-field">
      <label htmlFor="phone">Phone*</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={userForm.phone}
        onChange={handleUserFormChange}
        required
      />
    </div>
    <div className="form-field">
      <label htmlFor="email">Email*</label>
      <input
        type="email"
        id="email"
        name="email"
        value={userForm.email}
        onChange={handleUserFormChange}
        required
      />
    </div>
    <div className="form-field">
      <label htmlFor="address">Address*</label>
      <input
        type="text"
        id="address"
        name="address"
        value={userForm.address}
        onChange={handleUserFormChange}
        required
      />
    </div>
    <div className="form-field">
      <label htmlFor="streetAddress">Street Address</label>
      <input
        type="text"
        id="streetAddress"
        name="streetAddress"
        value={userForm.streetAddress}
        onChange={handleUserFormChange}
      />
    </div>
    <div className="form-field">
      <label htmlFor="city">City</label>
      <input
        type="text"
        id="city"
        name="city"
        value={userForm.city}
        onChange={handleUserFormChange}
      />
    </div>
    <div className="form-field">
      <label htmlFor="state">State</label>
      <input
        type="text"
        id="state"
        name="state"
        value={userForm.state}
        onChange={handleUserFormChange}
      />
    </div>
    <div className="form-field">
      <label htmlFor="postalZip">Postal Zip</label>
      <input
        type="text"
        id="postalZip"
        name="postalZip"
        value={userForm.postalZip}
        onChange={handleUserFormChange}
      />
    </div>
    <div className="form-field">
      <label htmlFor="country">Country</label>
      <select
        id="country"
        name="country"
        value={userForm.country}
        onChange={handleUserFormChange}
      >
        <option value="">Select a country</option>
        <option value="USA">USA</option>
        <option value="Canada">Canada</option>
        <option value="Mexico">Mexico</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <button className="submit-button" onClick={handleModalClose}>Submit</button>
  </div>
    </Box>
  </Modal>
  <button className="submit-button" onClick={handleSubmit}>Add User Information</button>
 </>
  )
}
