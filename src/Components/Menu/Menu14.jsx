import React, { useEffect, useState } from "react";
import useMenuStore from "../../Utils/menuStore14";
import { Select, MenuItem } from "@mui/material";
import axios from "axios";
import "./index.css";

const options = {
  "Select your Hull (single select)": [
    { name: "Finished Deck Tiller - $8400 ", price: 8400 },
    { name: "Finished Deck Side Console - $9600 ", price: 9600 },
    { name: "Finished Deck Center Console - $10000 ", price: 10000 },
  ],
  "Engine options (single select)": [
    { name: "20 HP Tohatsu - $4200 ", price: 4200 },
    { name: "25 HP Tohatsu - $5800 ", price: 5800 },
    { name: "30 HP Tohatsu - $6400 ", price: 6400 },
  ],
  "Trim options (multi-select)": [
    { name: "Pop-up cleats - $85 each", price: 85 },
    { name: "V-Marine push pole clips - $185", price: 185 },
    { name: "V-Marine platform clips - $165", price: 165 },
  ],
  "Grab bar options (multi-select)": [
    { name: "Standard grab bar - $495", price: 495 },
    { name: "Grab bar with switch box - $575", price: 575 },
  ],
  "Poling platform options (multi-select)": [
    { name: "Steak out rod holder - $90", price: 90 },
    { name: "Steak out with micro anchor plate - $90", price: 90 },
    { name: "Folding backrest - $375", price: 375 },
    { name: "Sissy bar - $475", price: 475 },
  ],
  "Accessories (multi-select)": [
    { name: "Stick it Rod with T handle 8’ - $90", price: 90 },
    { name: "Carbon fiber push pole 18’ - $420", price: 420 },
    { name: "Carbon fiber push pole 21’ - $520", price: 520 },
    { name: "Console rod holders 3-placement - $175", price: 175 },
    { name: "Rear deck cushions - $220", price: 220 },
    { name: "Folding backrest - $180", price: 180 },
    { name: "Grab bar or center console cushions - $125", price: 125 },
  ],
  "Steering kits (multi-select)": [
    { name: "Hydraulic steering - $1,350", price: 1350 },
    { name: "Tiller Arms - $650", price: 650 },
    { name: "Key switch harness and control box - $580", price: 580 },
  ],
  "Additional options (multi-select)": [
    { name: "Micro anchor - $950", price: 950 },
    { name: "6’ Power pole - $1,950 (1/2)", price: 1950 },
    { name: "6’ Power pole  - $1,950 (2/2)", price: 1950 },
    { name: "Lenco trim tabs - $1,000", price: 1000 },
    { name: "Atlas jack plate - $1,050", price: 1050 },
  ],
  "Trailer options (single select)": [
    { name: "Standard Aluminum - $1,650", price: 1650 },
    { name: "Upgraded Aluminum - $2,450", price: 2450 },
  ],
};

const defaultUser = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  streetAddress: "",
  city: "",
  state: "",
  postalZip: "",
  country: "",
};

const Menu = () => {
  // const [isModalOpen, setModalOpen] = useState(false);

  const { totalPrice, updateTotalPrice, updateSelection, selectedOptions } =
    useMenuStore();

  //form data
  const [userForm, setUserForm] = useState(defaultUser);

  //to handle single select
  const handleSingleSelectChange = (group, option) => {
    // // Update the selected option for the single-select group

    if (option === "default") {
      updateSelection({
        ...selectedOptions,
        [group]: {
          option: null,
          price: 0,
        },
      });
      return;
    }
    updateSelection({
      ...selectedOptions,
      [group]: {
        option,
        price: options[group].filter((item) => item.name === option)[0].price,
      },
    });
  };

  useEffect(() => {
    let total = 0;
    //loop through selectedOptions and update selectedOptions
    Object.entries(selectedOptions).forEach((group) => {
      if (selectedOptions[group[0]] && selectedOptions[group[0]].length > 0) {
        selectedOptions[group[0]].map((option) => {
          total += options[group[0]].filter((item) => item.name === option)[0]
            .price;
        });
        return;
      }
      total += selectedOptions[group[0]]?.price || 0;
    });
    updateTotalPrice(total);
  }, [selectedOptions]);

  //to handle multi select
  const handleMultiSelectChange = (heading, option) => {
    if (selectedOptions[heading].includes(option)) {
      updateSelection({
        ...selectedOptions,
        [heading]: selectedOptions[heading].filter((item) => item !== option),
      });
      return;
    }
    updateSelection({
      ...selectedOptions,
      [heading]: [...selectedOptions[heading], option],
    });
  };

  const handleUserFormChange = (event) => {
    const { name, value } = event.target;
    setUserForm((prevUserForm) => ({
      ...prevUserForm,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://formsubmit.co/ajax/shobhittitus@rocketmail.com", {
        //if you want to send selected options as well, uncomment this
        ...selectedOptions,
        ...userForm,
      })
      .then((res) => {
        console.log("Form Submitted");
      });
    setUserForm(defaultUser);
  };

  return (
    <div className='menu-container'>
      <div className='centered'>
        <div className='menu-header'>Total: ${totalPrice.toFixed(2)}</div>
        <div className='menu-header-feature'>Select Feature</div>
      </div>

      <div className='menu-items-container'>
        <div className='menu-items'>
          {Object.entries(options).map(([heading, items], index) => (
            <div className='menu-items-1' key={index}>
              <div className='menu-heading'>{heading.split("(")[0].trim()}</div>
              {heading.includes("(single select)") ? (
                <Select
                  value={selectedOptions[heading]?.option || "default"}
                  onChange={(e) =>
                    handleSingleSelectChange(heading, e.target.value)
                  }
                  sx={{ height: 40, minWidth: 320, mb: 2 }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        width: "200px", // Set the desired width for the pop-up menu
                      },
                    },
                  }}
                >
                  <MenuItem
                    value={"default"}
                    sx={{
                      fontSize: 14,
                    }}
                  >
                    <em>Select an option</em>
                  </MenuItem>
                  {items.map((item, idx) => (
                    <MenuItem
                      key={idx}
                      value={item.name}
                      sx={{
                        fontSize: 12,
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <>
                  {items.map((item, idx) => (
                    <div key={idx} className='menu-item'>
                      <input
                        type='checkbox'
                        checked={selectedOptions[heading].includes(item.name)}
                        onChange={(e) =>
                          handleMultiSelectChange(heading, item.name)
                        }
                      />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>

        <hr />
        <div className='centered'>
          <div className='menu-header-info'>User Information</div>
        </div>
        <div className='user-form'>
          <div className='form-field'>
            <label htmlFor='firstName'>First Name*</label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              value={userForm.firstName}
              onChange={handleUserFormChange}
              required
              placeholder='First Name'
            />
          </div>
          <div className='form-field'>
            <label htmlFor='lastName'>Last Name*</label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              value={userForm.lastName}
              onChange={handleUserFormChange}
              required
              placeholder='Last Name'
            />
          </div>
          <div className='form-field'>
            <label htmlFor='phone'>Phone*</label>
            <input
              type='tel'
              id='phone'
              name='phone'
              value={userForm.phone}
              onChange={handleUserFormChange}
              required
              placeholder='Phone Number'
            />
          </div>
          <div className='form-field'>
            <label htmlFor='email'>Email*</label>
            <input
              type='email'
              id='email'
              name='email'
              value={userForm.email}
              onChange={handleUserFormChange}
              required
              placeholder='Email'
            />
          </div>
          <div className='form-field'>
            <label htmlFor='address'>Address*</label>
            <input
              type='text'
              id='address'
              name='address'
              value={userForm.address}
              onChange={handleUserFormChange}
              required
              placeholder='Address'
            />
          </div>
          <div className='form-field'>
            <label htmlFor='streetAddress'>Street Address</label>
            <input
              type='text'
              id='streetAddress'
              name='streetAddress'
              value={userForm.streetAddress}
              onChange={handleUserFormChange}
              placeholder='Street Address'
            />
          </div>
          <div className='form-field'>
            <label htmlFor='city'>City</label>
            <input
              type='text'
              id='city'
              name='city'
              value={userForm.city}
              onChange={handleUserFormChange}
              placeholder='city'
            />
          </div>
          <div className='form-field'>
            <label htmlFor='state'>State</label>
            <input
              type='text'
              id='state'
              name='state'
              value={userForm.state}
              onChange={handleUserFormChange}
              placeholder='State'
            />
          </div>
          <div className='form-field'>
            <label htmlFor='postalZip'>Postal Zip</label>
            <input
              type='text'
              id='postalZip'
              name='postalZip'
              value={userForm.postalZip}
              onChange={handleUserFormChange}
              placeholder='Postal Zip'
            />
          </div>
          <div className='form-field'>
            <label htmlFor='country'>Country</label>
            <select
              id='country'
              name='country'
              value={userForm.country}
              onChange={handleUserFormChange}
            >
              <option value=''>Select a country</option>
              <option value='USA'>USA</option>
              <option value='Canada'>Canada</option>
              <option value='Mexico'>Mexico</option>
              <option value='Other'>Other</option>
            </select>
          </div>
        </div>
        <div className='centered'>
          <button className='submit-button' onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
