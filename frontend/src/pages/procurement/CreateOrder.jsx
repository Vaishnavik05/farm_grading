import { useState } from "react";
import { createOrder } from "../../api/procurementApi";

export default function CreateOrder() {
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const submit = async () => {
    await createOrder({
      procurementQuantity: quantity,
      unitPrice: price,
    });
    alert("Order created");
  };

  return (
    <div>
      <h2>Create Order</h2>
      <input placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />
      <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
      <button onClick={submit}>Submit</button>
    </div>
  );
}