import { useEffect, useState } from "react";
import { getInventory } from "../../api/inventoryApi";

export default function Inventory() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getInventory().then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Inventory</h2>
      {data.map(item => (
        <div key={item.id}>
          {item.produceCategory?.categoryName} - {item.availableQuantity}
        </div>
      ))}
    </div>
  );
}