import React from "react";
import Pizza from "./Pizza";

function PizzaList({ pizzas, onEditPizza, onDeletePizza }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Topping</th>
          <th scope="col">Size</th>
          <th scope="col">Vegetarian?</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {pizzas.map((pizza) => (
          <Pizza
            key={pizza.id}
            pizza={pizza}
            onEditPizza={onEditPizza}
            onDeletePizza={onDeletePizza}
          />
        ))}
      </tbody>
    </table>
  );
}

export default PizzaList;
