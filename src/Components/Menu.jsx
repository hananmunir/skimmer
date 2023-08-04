import React, {useState} from "react";
import useMenuStore from "../Utils/menuStore"; 

const options = {
    "Select your Hull (single select)": [
      { name: "Finished Deck Tiller", price: 8400 },
      { name: "Finished Deck Side Console", price: 9600 },
      { name: "Finished Deck Center Console", price: 10000 },
    ],
    "Engine options (single select)": [
      { name: "20 HP Tohatsu", price: 4200 },
      { name: "25 HP Tohatsu", price: 5800 },
      { name: "30 HP Tohatsu", price: 6400 },
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
      { name: "6’ Power pole - $1,950", price: 1950 },
      { name: "Lenco trim tabs - $1,000", price: 1000 },
      { name: "Atlas jack plate - $1,050", price: 1050 },
    ],
    "Trailer options (single select)": [
      { name: "Standard Aluminum - $1,650", price: 1650 },
      { name: "Upgraded Aluminum - $2,450", price: 2450 },
    ],
  };
  
  
  const Menu = () => {
    const totalPrice = useMenuStore((state) => state.totalPrice);
    const selectedOptions = useMenuStore((state) => state.selectedOptions);
    const updateTotalPrice = useMenuStore((state) => state.updateTotalPrice);
    const toggleOption = useMenuStore((state) => state.toggleOption);
  
    const [singleSelectGroups, setSingleSelectGroups] = useState({});
    
     //form data
     const [userForm, setUserForm] = useState({
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
      });

    //to handle single select
    const handleSingleSelectChange = (group, option) => {
        // Check if the clicked option is already selected
        const isAlreadySelected = singleSelectGroups[group] === option;
      
        // If the option is already selected, uncheck it by setting the selected option to null
        if (isAlreadySelected) {
          setSingleSelectGroups({ ...singleSelectGroups, [group]: null });
          updateTotalPrice(-option.price);
        } else {
          // Update the selected option for the single-select group
          setSingleSelectGroups({ ...singleSelectGroups, [group]: option });
          // Update the totalPrice state based on the selected option's price
          updateTotalPrice(option.price - (singleSelectGroups[group]?.price || 0));
        }
      };
      
    //to handle multi select
    const handleMultiSelectChange = (option, isChecked) => {
      toggleOption(option, isChecked);
      updateTotalPrice(isChecked ? option.price : -option.price);
    };

    const handleUserFormChange = (event) => {
        const { name, value } = event.target;
        setUserForm((prevUserForm) => ({
          ...prevUserForm,
          [name]: value,
        }));
    };

    
      const handleSubmit = () => {
        // Here you can implement the logic to submit the user's selections and form data.
        // You can access the selectedOptions and userForm state variables here and send them to your server or perform any other actions.
        console.log("Selected Options:", selectedOptions);
        console.log("User Form Data:", userForm);
      };
  
    return (
      <div className="menu-container">
        <div className="centered">
          <div className="menu-header">Total Price: ${totalPrice.toFixed(2)}</div>
          <div className="menu-header-feature">Select Feature</div>
        </div>

        <div className="menu-items-container">
        <div className="menu-items">
          {Object.entries(options).map(([heading, items], index) => (
            <div key={index}>
              <div className="menu-heading">{heading}</div>
              {items.map((item, idx) => (
                <div key={idx} className="menu-item">
                  {heading.includes("(single select)") ? (
                    <>
                      <input
                        type="checkbox"
                        checked={singleSelectGroups[heading] === item}
                        onChange={() =>
                          handleSingleSelectChange(heading, item)
                        }
                      />
                      <label>{item.name} - Price: ${item.price.toFixed(2)}</label>
                    </>
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(item)}
                        onChange={(e) =>
                          handleMultiSelectChange(item, e.target.checked)
                        }
                      />
                      <label>{item.name} - Price: ${item.price.toFixed(2)}</label>
                      {item.name === "6’ Power pole - $1,950" && (
                        <div className="quantity-input">
                        <label>Quantity:</label>
                        <input
                          type="number"
                          min="0"
                          max="2"
                          value={selectedOptions.filter(
                            (option) => option.name === item.name
                          ).length}
                          onChange={(e) =>
                            handleQuantityChange(item, parseInt(e.target.value))
                          }
                        />
                      </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        
      <hr />
      <div className="user-form">
        <h2 className="user-form-heading">User Form</h2>
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
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
        </div>

      </div>
    );
  };
  
  export default Menu;
  