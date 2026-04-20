import { useEffect, useMemo, useState } from "react";
import { getInventory } from "../../api/inventoryApi";
import { getProduce } from "../../api/produceApi";
import { getInspections } from "../../api/inspectionApi";
import { getOrders } from "../../api/procurementApi";
import "./Inventory.css";

export default function Inventory() {
  const [activeTab, setActiveTab] = useState("SUBMITTED");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [produce, setProduce] = useState([]);
  const [inspections, setInspections] = useState([]);
  const [orders, setOrders] = useState([]);

  const loadAll = () => {
    getInventory().then((res) => setData(res.data || []));
    getProduce().then((res) => setProduce(res.data || []));
    getInspections().then((res) => setInspections(res.data || []));
    getOrders().then((res) => setOrders(res.data || []));
  };

  useEffect(() => {
    loadAll();
  }, []);

  const inspectionsByProduce = useMemo(() => {
    const map = new Map();
    inspections.forEach((inspection) => {
      const produceId = inspection?.farmProduce?.id;
      if (produceId) {
        map.set(produceId, inspection);
      }
    });
    return map;
  }, [inspections]);

  const submittedProduce = useMemo(
    () => produce.filter((item) => item.produceStatus === "SUBMITTED"),
    [produce]
  );

  const gradedProduce = useMemo(
    () => produce.filter((item) => item.produceStatus === "GRADED"),
    [produce]
  );

  const rejectedProduce = useMemo(
    () => produce.filter((item) => item.produceStatus === "REJECTED"),
    [produce]
  );

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter((order) => {
      const row = `${order.id} ${order.farmProduce?.id} ${order.procurementOfficer?.name} ${order.farmProduce?.produceCategory?.categoryName}`.toLowerCase();
      return row.includes(q);
    });
  }, [orders, search]);

  const filteredInventory = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter((item) => {
      const row = `${item.produceCategory?.categoryName} ${item.inventoryStatus}`.toLowerCase();
      return row.includes(q);
    });
  }, [data, search]);

  const totalOrderAmount = useMemo(
    () => filteredOrders.reduce((sum, order) => sum + (Number(order.totalAmount) || 0), 0),
    [filteredOrders]
  );

  const tabs = [
    { id: "SUBMITTED", label: `Submitted (${submittedProduce.length})` },
    { id: "GRADED", label: `Graded (${gradedProduce.length})` },
    { id: "REJECTED", label: `Rejected (${rejectedProduce.length})` },
    { id: "PROCURED", label: `Procured (${orders.length})` },
    { id: "INVENTORY", label: `Inventory (${data.length})` },
  ];

  const toCsv = (rows) => {
    if (!rows.length) {
      return "";
    }

    const headers = Object.keys(rows[0]);
    const escape = (value) => {
      const raw = value == null ? "" : String(value);
      return `"${raw.replace(/"/g, '""')}"`;
    };

    const lines = [
      headers.join(","),
      ...rows.map((row) => headers.map((header) => escape(row[header])).join(",")),
    ];

    return lines.join("\n");
  };

  const downloadCsv = () => {
    let rows = [];

    if (activeTab === "SUBMITTED") {
      rows = submittedProduce.map((item) => ({
        produceId: item.id,
        category: item.produceCategory?.categoryName,
        farmer: item.farmer?.name,
        quantity: item.quantity,
        unitType: item.unitType,
        status: item.produceStatus,
      }));
    }

    if (activeTab === "GRADED") {
      rows = gradedProduce.map((item) => {
        const inspection = inspectionsByProduce.get(item.id);
        return {
          produceId: item.id,
          category: item.produceCategory?.categoryName,
          inspector: inspection?.inspector?.name,
          score: inspection?.qualityScore,
          grade: inspection?.assignedGrade?.gradeName,
          status: item.produceStatus,
        };
      });
    }

    if (activeTab === "REJECTED") {
      rows = rejectedProduce.map((item) => {
        const inspection = inspectionsByProduce.get(item.id);
        return {
          produceId: item.id,
          category: item.produceCategory?.categoryName,
          inspector: inspection?.inspector?.name,
          score: inspection?.qualityScore,
          status: item.produceStatus,
        };
      });
    }

    if (activeTab === "PROCURED") {
      rows = filteredOrders.map((order) => ({
        orderId: order.id,
        produceId: order.farmProduce?.id,
        category: order.farmProduce?.produceCategory?.categoryName,
        officer: order.procurementOfficer?.name,
        quantity: order.procurementQuantity,
        unitPrice: order.unitPrice,
        totalAmount: order.totalAmount,
        status: order.orderStatus,
      }));
    }

    if (activeTab === "INVENTORY") {
      rows = filteredInventory.map((item) => ({
        category: item.produceCategory?.categoryName,
        availableQuantity: item.availableQuantity,
        status: item.inventoryStatus,
        lastUpdated: item.lastUpdated,
      }));
    }

    if (!rows.length) {
      alert("No rows available to export for this tab.");
      return;
    }

    const csv = toCsv(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `workflow-${activeTab.toLowerCase()}-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="workflowBoard">
      <div className="workflowHeader">
        <h2>Admin Workflow Board</h2>
        <div className="workflowActions">
          <input
            placeholder="Search orders or inventory"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={loadAll}>Refresh</button>
          <button className="secondary" onClick={downloadCsv}>Export CSV</button>
        </div>
      </div>

      <div className="workflowTabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "SUBMITTED" && (
        <div className="workflowList">
          {submittedProduce.map((item) => (
            <article key={item.id} className="workflowCard">
              <strong>Produce #{item.id}</strong>
              <p>Category: {item.produceCategory?.categoryName}</p>
              <p>Farmer: {item.farmer?.name}</p>
              <p>Quantity: {item.quantity} {item.unitType}</p>
              <span className="status submitted">SUBMITTED</span>
            </article>
          ))}
          {submittedProduce.length === 0 && <p>No submitted produce.</p>}
        </div>
      )}

      {activeTab === "GRADED" && (
        <div className="workflowList">
          {gradedProduce.map((item) => {
            const inspection = inspectionsByProduce.get(item.id);
            return (
              <article key={item.id} className="workflowCard">
                <strong>Produce #{item.id}</strong>
                <p>Category: {item.produceCategory?.categoryName}</p>
                <p>Grade: {inspection?.assignedGrade?.gradeName || "N/A"}</p>
                <p>Score: {inspection?.qualityScore ?? "N/A"}</p>
                <p>Inspector: {inspection?.inspector?.name || "N/A"}</p>
                <span className="status graded">GRADED</span>
              </article>
            );
          })}
          {gradedProduce.length === 0 && <p>No graded produce yet.</p>}
        </div>
      )}

      {activeTab === "REJECTED" && (
        <div className="workflowList">
          {rejectedProduce.map((item) => {
            const inspection = inspectionsByProduce.get(item.id);
            return (
              <article key={item.id} className="workflowCard">
                <strong>Produce #{item.id}</strong>
                <p>Category: {item.produceCategory?.categoryName}</p>
                <p>Score: {inspection?.qualityScore ?? "N/A"}</p>
                <p>Inspector: {inspection?.inspector?.name || "N/A"}</p>
                <span className="status rejected">REJECTED</span>
              </article>
            );
          })}
          {rejectedProduce.length === 0 && <p>No rejected produce.</p>}
        </div>
      )}

      {activeTab === "PROCURED" && (
        <div className="workflowTableWrap">
          <table className="workflowTable">
            <thead>
              <tr>
                <th>Order</th>
                <th>Produce</th>
                <th>Officer</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>#{order.farmProduce?.id} {order.farmProduce?.produceCategory?.categoryName}</td>
                  <td>{order.procurementOfficer?.name}</td>
                  <td>{order.procurementQuantity}</td>
                  <td>{order.unitPrice}</td>
                  <td>{order.totalAmount}</td>
                  <td>{order.orderStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="summary">Total Procured Amount: {totalOrderAmount.toFixed(2)}</p>
        </div>
      )}

      {activeTab === "INVENTORY" && (
        <div className="workflowTableWrap">
          <table className="workflowTable">
            <thead>
              <tr>
                <th>Category</th>
                <th>Available Qty</th>
                <th>Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.produceCategory?.categoryName}</td>
                  <td>{item.availableQuantity}</td>
                  <td>{item.inventoryStatus}</td>
                  <td>{item.lastUpdated || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}