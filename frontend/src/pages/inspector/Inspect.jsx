import { useState } from "react";
import { addInspection } from "../../api/inspectionApi";

export default function Inspect() {
  const [score, setScore] = useState("");

  const submit = async () => {
    await addInspection({
      qualityScore: score,
    });
    alert("Inspection done");
  };

  return (
    <div>
      <h2>Inspection</h2>
      <input placeholder="Score" onChange={(e) => setScore(e.target.value)} />
      <button onClick={submit}>Submit</button>
    </div>
  );
}