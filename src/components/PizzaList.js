import React, { useState, useEffect } from "react";
import Pizza from "./Pizza";

function PizzaList() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    // Fetch the data from the server when the component mounts
    fetch("http://localhost:3001/pizzas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPizzas(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to fetch data only once on mount

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Topping</th>
          <th scope="col">Size</th>
          <th scope="col">Vegetarian?</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>
        {pizzas.map((pizza) => (
          <Pizza key={pizza.id} pizza={pizza} />
        ))}
      </tbody>
    </table>
  );
}

export default PizzaList;
