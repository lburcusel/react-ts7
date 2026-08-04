import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { routePaths } from "../routes";

type CoinPriceResponse = Record<string, { eur: number }>;

type CachedCoinPriceResponse = {
  data: CoinPriceResponse;
  expiresAt: number;
  updatedAt: number;
};

const CACHE_KEY = "coin-prices-cache";
const CACHE_TTL_MS = 15 * 60 * 1000;
const REFRESH_COOLDOWN_MS = 5 * 60 * 1000;
const COINGECKO_URL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=eur";

function readCachedPrices(): CachedCoinPriceResponse | null {
  try {
    const rawValue = sessionStorage.getItem(CACHE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue) as Partial<CachedCoinPriceResponse>;

    if (!parsed.data || typeof parsed.expiresAt !== "number" || typeof parsed.updatedAt !== "number") {
      return null;
    }

    if (Date.now() > parsed.expiresAt) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }

    return parsed as CachedCoinPriceResponse;
  } catch {
    sessionStorage.removeItem(CACHE_KEY);
    return null;
  }
}

function writeCachedPrices(data: CoinPriceResponse) {
  const now = Date.now();
  const payload: CachedCoinPriceResponse = {
    data,
    expiresAt: now + CACHE_TTL_MS,
    updatedAt: now,
  };

  sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
}

export default function PredictionsPage() {
  const hasFetchedRef = useRef(false);
  const [prices, setPrices] = useState<CoinPriceResponse | null>(() => readCachedPrices()?.data ?? null);
  const [updatedAt, setUpdatedAt] = useState<number | null>(() => readCachedPrices()?.updatedAt ?? null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadPrices = async (forceRefresh = false) => {
    const cached = readCachedPrices();

    if (!forceRefresh && cached) {
      setPrices(cached.data);
      setUpdatedAt(cached.updatedAt);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(COINGECKO_URL);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = (await response.json()) as CoinPriceResponse;
      const now = Date.now();

      setPrices(result);
      setUpdatedAt(now);
      writeCachedPrices(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(`Unable to load prices: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetchedRef.current) {
      return;
    }

    hasFetchedRef.current = true;
    void loadPrices();
  }, []);

  const priceEntries = [
    { key: "bitcoin", label: "Bitcoin", symbol: "₿" },
    { key: "ethereum", label: "Ethereum", symbol: "Ξ" },
    { key: "solana", label: "Solana", symbol: "◎" },
  ];

  const canRefresh = !updatedAt || Date.now() - updatedAt >= REFRESH_COOLDOWN_MS;

  return (
    <main className="predictions-page">
      <h1>Predictions</h1>

      <div>
        <button type="button" onClick={() => void loadPrices(true)} disabled={loading || !canRefresh}>
          {loading ? "Refreshing…" : "Refresh prices"}
        </button>
      </div>

      {updatedAt && (
        <p className="predictions-page__timestamp">
          Last updated at:{" "}
          {new Date(updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </p>
      )}
      {loading && !prices && <p>Loading prices…</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && prices && (
        <div className="predictions-page__cards">
          {priceEntries.map(({ key, label, symbol }) => (
            <article key={key} className="coin-card">
              <div className="coin-card__header">
                <span className="coin-card__symbol" aria-hidden="true">
                  {symbol}
                </span>
                <h2>{label}</h2>
              </div>
              <p>€{prices[key]?.eur ?? "N/A"}</p>
            </article>
          ))}
        </div>
      )}

      <Link to={routePaths.home} className="predictions-link">
        Go Home
      </Link>
    </main>
  );
}
