import React, { useState, useEffect } from "react";

function PizzaForm({ selectedPizza, onSubmit }) {
  const [pizzaData, setPizzaData] = useState({
    topping: "",
    size: "Small",
    vegetarian: false,
  });

  useEffect(() => {
    if (selectedPizza) {
      setPizzaData(selectedPizza);
    } else {
      setPizzaData({
        topping: "",
        size: "Small",
        vegetarian: false,
      });
    }
  }, [selectedPizza]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setPizzaData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedPizza) {
      // Editing an existing pizza
      onSubmit(pizzaData);
      setPizzaData({
        topping: "",
        size: "Small",
        vegetarian: false,
      });
    } else {
      // Adding a new pizza
      fetch(`http://localhost:3001/pizzas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pizzaData),
      })
        .then((response) => response.json())
        .then((data) => {
          onSubmit(data); // Update list with new data
          setPizzaData({
            topping: "",
            size: "Small",
            vegetarian: false,
          });
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            value={pizzaData.topping}
            onChange={handleInputChange}
            placeholder="Pizza Topping"
          />
        </div>
        <div className="col">
          <select
            className="form-control"
            name="size"
            value={pizzaData.size}
            onChange={handleInputChange}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="vegetarian"
              checked={pizzaData.vegetarian}
              onChange={handleInputChange}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
