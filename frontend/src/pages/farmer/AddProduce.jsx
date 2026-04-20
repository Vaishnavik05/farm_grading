import { useState } from "react";
import { addProduce } from "../../api/produceApi";
import "./Produce.css";
export default function AddProduce() {
  const [quantity, setQuantity] = useState("");

  const submit = async () => {
    await addProduce({
      quantity,
      unitType: "KG",
    });
    alert("Submitted");
  };

  return (
    <div className="formContainer">
      <h2>Add Produce</h2>
      <input placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />
      <button onClick={submit}>Submit</button>
    </div>
  );
}