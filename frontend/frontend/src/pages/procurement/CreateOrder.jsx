import { useEffect, useMemo, useState } from "react";
import { createOrder } from "../../api/procurementApi";
import { getProduce } from "../../api/produceApi";
import { getUsers } from "../../api/userApi";
import DashboardShell from "../../components/DashboardShell";

export default function CreateOrder() {
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [produceId, setProduceId] = useState("");
  const [officerId, setOfficerId] = useState("");
  const [produce, setProduce] = useState([]);
  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    getProduce().then((res) => setProduce(res.data || []));
    getUsers().then((res) => {
      setOfficers((res.data || []).filter((u) => u.role === "PROCUREMENT_OFFICER"));
    });
  }, []);

  const gradedProduce = useMemo(
    () => produce.filter((item) => item.produceStatus === "GRADED"),
    [produce]
  );

  const totalAmount = (Number(quantity) || 0) * (Number(price) || 0);

  const submit = async () => {
    try {
      await createOrder({
        produceId: Number(produceId),
        officerId: Number(officerId),
        procurementQuantity: Number(quantity),
        unitPrice: Number(price),
      });
      alert("Procurement order created.");
      setQuantity("");
      setPrice("");
      setProduceId("");
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to create order");
    }
  };

  return (
    <DashboardShell
      title="Create Order"
      subtitle="Purchase only graded produce and let the system calculate the order amount automatically."
    >
      <div className="formContainer">
        <select value={produceId} onChange={(e) => setProduceId(e.target.value)}>
          <option value="">Select Graded Produce</option>
          {gradedProduce.map((item) => (
            <option key={item.id} value={item.id}>
              #{item.id} {item.produceCategory?.categoryName} - {item.quantity} {item.unitType}
            </option>
          ))}
        </select>
        <select value={officerId} onChange={(e) => setOfficerId(e.target.value)}>
          <option value="">Select Procurement Officer</option>
          {officers.map((officer) => (
            <option key={officer.id} value={officer.id}>{officer.name}</option>
          ))}
        </select>
        <input placeholder="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <p>Total Amount: {totalAmount.toFixed(2)}</p>
        <button onClick={submit}>Submit</button>
      </div>
    </DashboardShell>
  );
}