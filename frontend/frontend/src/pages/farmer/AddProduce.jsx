import { useEffect, useState } from "react";
import { addProduce, getProduceCategories } from "../../api/produceApi";
import { getUsers } from "../../api/userApi";
import DashboardShell from "../../components/DashboardShell";
import "./Produce.css";

export default function AddProduce() {
  const [form, setForm] = useState({
    farmerId: "",
    categoryId: "",
    quantity: "",
    unitType: "KG",
    harvestDate: "",
  });
  const [farmers, setFarmers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getUsers().then((res) => {
      setFarmers((res.data || []).filter((u) => u.role === "FARMER"));
    });
    getProduceCategories().then((res) => setCategories(res.data || []));
  }, []);

  const submit = async () => {
    try {
      await addProduce({
        farmerId: Number(form.farmerId),
        categoryId: Number(form.categoryId),
        quantity: Number(form.quantity),
        unitType: form.unitType,
        harvestDate: form.harvestDate,
      });
      alert("Produce submitted to admin workflow.");
      setForm({ farmerId: "", categoryId: "", quantity: "", unitType: "KG", harvestDate: "" });
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to submit produce");
    }
  };

  return (
    <DashboardShell
      title="Add Produce"
      subtitle="Record a new harvest so the admin board can track it through inspection and procurement."
    >
      <div className="formContainer">
        <select value={form.farmerId} onChange={(e) => setForm({ ...form, farmerId: e.target.value })}>
          <option value="">Select Farmer</option>
          {farmers.map((farmer) => (
            <option key={farmer.id} value={farmer.id}>{farmer.name}</option>
          ))}
        </select>
        <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.categoryName}</option>
          ))}
        </select>
        <input
          placeholder="Quantity"
          type="number"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
        <select value={form.unitType} onChange={(e) => setForm({ ...form, unitType: e.target.value })}>
          <option value="KG">KG</option>
          <option value="QUINTAL">QUINTAL</option>
          <option value="TON">TON</option>
        </select>
        <input
          type="date"
          value={form.harvestDate}
          onChange={(e) => setForm({ ...form, harvestDate: e.target.value })}
        />
        <button onClick={submit}>Submit</button>
      </div>
    </DashboardShell>
  );
}