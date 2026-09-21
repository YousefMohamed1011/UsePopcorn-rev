
import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [rate, setRate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchRate() {
      if (fromCurrency === toCurrency) {
        setRate(1);
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://api.frankfurter.dev/v2/rate/${fromCurrency.toLowerCase()}/${toCurrency.toLowerCase()}`,
          { signal: abortController.signal }
        );
        if (!res.ok) throw new Error("Could not fetch the exchange rate.");

        const data = await res.json();
        setRate(data.rate);
      } catch (error) {
        if (error.name !== "AbortError") setError(error.message);
      } finally {
        if (!abortController.signal.aborted) setIsLoading(false);
      }
    }

    fetchRate();

    return () => abortController.abort();
  }, [fromCurrency, toCurrency]);

  const convertedAmount = rate === null ? null : amount * rate;

  return (
    <div className="currency-converter">
      <input
        type="number"
        min="0"
        step="any"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {isLoading
          ? "Loading..."
          : error || `OUTPUT: ${convertedAmount?.toFixed(2) ?? "—"} ${toCurrency}`}
      </p>
    </div>
  );
}
