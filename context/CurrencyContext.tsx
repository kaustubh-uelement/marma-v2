"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type CurrencyContextType = {
  currency: string;
  exchangeRate: number;
  formatPrice: (priceInUsd: number) => string;
  isLoaded: boolean;
};

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  exchangeRate: 1,
  formatPrice: (price: number) => `$${price.toFixed(2)}`,
  isLoaded: false,
});

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchCurrencyAndRate() {
      try {
        // 1. Fetch user's country and currency
        let userCurrency = "USD";
        try {
          // Primary: ipapi.is (reliable, no Cloudflare blocking)
          const primaryResponse = await fetch("https://api.ipapi.is/");
          if (primaryResponse.ok) {
            const primaryData = await primaryResponse.json();
            if (primaryData.location?.currency_code) {
              userCurrency = primaryData.location.currency_code;
            } else if (primaryData.location?.currency) {
              userCurrency = primaryData.location.currency;
            }
          }
        } catch (e) {
          console.warn("Primary currency API failed, trying fallback...", e);
        }

        // Fallback: ipapi.co (can be blocked by Cloudflare)
        if (userCurrency === "USD") {
          try {
            const fallbackResponse = await fetch("https://ipapi.co/json/");
            if (fallbackResponse.ok) {
              const text = await fallbackResponse.text();
              // Guard against Cloudflare HTML captcha pages
              const fallbackData = JSON.parse(text);
              if (fallbackData.currency) {
                userCurrency = fallbackData.currency;
              }
            }
          } catch (e) {
            console.warn("Fallback currency API also failed, using USD", e);
          }
        }

        // 2. Fetch exchange rates
        if (userCurrency !== "USD") {
          const rateResponse = await fetch("https://open.er-api.com/v6/latest/USD");
          if (rateResponse.ok) {
            const rateData = await rateResponse.json();
            if (rateData.rates && rateData.rates[userCurrency]) {
              setExchangeRate(rateData.rates[userCurrency]);
              setCurrency(userCurrency);
            }
          }
        }
      } catch (error) {
        console.error("Error setting up currency:", error);
      } finally {
        setIsLoaded(true);
      }
    }

    fetchCurrencyAndRate();
  }, []);

  const formatPrice = (priceInUsd: number) => {
    const converted = priceInUsd * exchangeRate;
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currency,
      }).format(converted);
    } catch (e) {
      // Fallback if Intl fails
      return `${currency} ${converted.toFixed(2)}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, exchangeRate, formatPrice, isLoaded }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
