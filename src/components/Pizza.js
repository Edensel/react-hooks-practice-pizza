import React from "react";

function Pizza({ pizza, onEditPizza, onDeletePizza }) {
  const handleEdit = () => {
    onEditPizza(pizza);
  };

  const handleDelete = () => {
    onDeletePizza(pizza.id);
  };

  return (
    <tr>
      <td>{pizza.topping}</td>
      <td>{pizza.size}</td>
      <td>{pizza.vegetarian ? "Yes" : "No"}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={handleEdit}>
          Edit Pizza
        </button>
        <button type="button" className="btn btn-danger ml-2" onClick={handleDelete}>
          Delete Pizza
        </button>
      </td>
    </tr>
  );
}

export default Pizza;
