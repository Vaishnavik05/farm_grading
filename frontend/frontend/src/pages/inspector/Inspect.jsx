import { useEffect, useMemo, useState } from "react";
import { addInspection } from "../../api/inspectionApi";
import { getProduce } from "../../api/produceApi";
import { getUsers } from "../../api/userApi";
import DashboardShell from "../../components/DashboardShell";

export default function Inspect() {
  const [score, setScore] = useState("");
  const [produceId, setProduceId] = useState("");
  const [inspectorId, setInspectorId] = useState("");
  const [produce, setProduce] = useState([]);
  const [inspectors, setInspectors] = useState([]);

  useEffect(() => {
    getProduce().then((res) => setProduce(res.data || []));
    getUsers().then((res) => {
      setInspectors((res.data || []).filter((u) => u.role === "QUALITY_INSPECTOR"));
    });
  }, []);

  const inspectableProduce = useMemo(
    () => produce.filter((p) => p.produceStatus === "SUBMITTED" || p.produceStatus === "UNDER_INSPECTION"),
    [produce]
  );

  const submit = async () => {
    try {
      await addInspection({
        produceId: Number(produceId),
        inspectorId: Number(inspectorId),
        qualityScore: Number(score),
      });
      alert("Inspection saved with grade decision.");
      setScore("");
      setProduceId("");
      getProduce().then((res) => setProduce(res.data || []));
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to save inspection");
    }
  };

  return (
    <DashboardShell
      title="Inspection"
      subtitle="Select a submitted batch, assign the inspector, and save the quality score for grading."
    >
      <div className="formContainer">
        <select value={produceId} onChange={(e) => setProduceId(e.target.value)}>
          <option value="">Select Submitted Produce</option>
          {inspectableProduce.map((item) => (
            <option key={item.id} value={item.id}>
              #{item.id} {item.produceCategory?.categoryName} - {item.quantity} {item.unitType}
            </option>
          ))}
        </select>
        <select value={inspectorId} onChange={(e) => setInspectorId(e.target.value)}>
          <option value="">Select Inspector</option>
          {inspectors.map((inspector) => (
            <option key={inspector.id} value={inspector.id}>{inspector.name}</option>
          ))}
        </select>
        <input
          placeholder="Score (0-100)"
          type="number"
          min="0"
          max="100"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <button onClick={submit}>Submit</button>
      </div>
    </DashboardShell>
  );
}