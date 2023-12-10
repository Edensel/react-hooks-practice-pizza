import React, { useState, useEffect } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/pizzas")
      .then((response) => response.json())
      .then((data) => setPizzas(data));
  }, []);

  const handleEditPizza = (pizza) => {
    setSelectedPizza(pizza);
  };

  const handleFormSubmit = (editedPizza) => {
    const updatedPizzas = pizzas.map((pizza) =>
      pizza.id === editedPizza.id ? editedPizza : pizza
    );

    fetch(`http://localhost:3001/pizzas/${editedPizza.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedPizza),
    })
      .then((response) => response.json())
      .then(() => {
        setPizzas(updatedPizzas);
        setSelectedPizza(null);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleAddPizza = (newPizza) => {
    fetch(`http://localhost:3001/pizzas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPizza),
    })
      .then((response) => response.json())
      .then((data) => {
        setPizzas((prevPizzas) => [...prevPizzas, data]);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDeletePizza = (id) => {
    fetch(`http://localhost:3001/pizzas/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedPizzas = pizzas.filter((pizza) => pizza.id !== id);
        setPizzas(updatedPizzas);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <Header />
      <PizzaForm
        selectedPizza={selectedPizza}
        onSubmit={selectedPizza ? handleFormSubmit : handleAddPizza}
      />
      <PizzaList pizzas={pizzas} onEditPizza={handleEditPizza} onDeletePizza={handleDeletePizza} />
    </>
  );
}

export default App;
