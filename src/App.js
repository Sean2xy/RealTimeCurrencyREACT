import { useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState(1);
  const [fCur, setfCur] = useState("EUR");
  const [sCur, setsCur] = useState("CNY");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getCur() {
      try {
        setIsLoading(true);
        const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${input}&from=${fCur}&to=${sCur}`
        );
        if (!res.ok) throw new Error("something went wrong with fetch");
        const data = await res.json();

        const money = data?.rates[sCur];
        setOutput(money);
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    getCur();
  }, [input, fCur, sCur]);

  return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <input
            type="text"
            disabled={isLoading}
            value={input}
            onChange={(e) => setInput(+e.target.value)}
        />
        <select
            value={fCur}
            disabled={isLoading}
            onChange={(e) => setfCur(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="CNY">CNY</option>
        </select>
        <select
            value={sCur}
            disabled={isLoading}
            onChange={(e) => setsCur(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="CNY">CNY</option>
        </select>
        <p>
          -- OUTPUT {output} {sCur} ->
        </p>
        <p>
          Seen in: <a href="https://github.com/Sean2xy/RealTimeCurrencyREACT" target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </div>
  );
}
