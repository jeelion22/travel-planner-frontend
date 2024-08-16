import React from "react";
import { Field, ErrorMessage } from "formik";

const currencyOptions = [
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "ANG",
  "AOA",
  "ARS",
  "AUD",
  "AWG",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "BGN",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BRL",
  "BSD",
  "BTN",
  "BWP",
  "BYN",
  "BZD",
  "CAD",
  "CDF",
  "CHF",
  "CLP",
  "CNY",
  "COP",
  "CRC",
  "CUP",
  "CVE",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ERN",
  "ETB",
  "EUR",
  "FJD",
  "FKP",
  "FOK",
  "GBP",
  "GEL",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HRK",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "IQD",
  "IRR",
  "ISK",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "KID",
  "KMF",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "MAD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRU",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MYR",
  "MZN",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLL",
  "SOS",
  "SRD",
  "SSP",
  "STN",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TVD",
  "TZS",
  "UAH",
  "UGX",
  "USD",
  "UYU",
  "UZS",
  "VES",
  "VND",
  "VUV",
  "WST",
  "XAF",
  "XCD",
  "XDR",
  "XOF",
  "XPF",
  "YER",
  "ZAR",
  "ZMW",
  "ZWL",
];

const Budget = ({ field, form }) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  const handleCurrencyChange = (e) => {
    setFieldValue(`${name}.currency`, e.target.value);
  };

  const handleAmountChange = (e) => {
    setFieldValue(`${name}.amount`, e.target.value);
  };

  return (
    <div className="mb-3">
      <div className="row">
        <div className="col form-floating">
          <select
            className="form-select"
            value={value.currency}
            onChange={handleCurrencyChange}
            id="budgetCurrency"
            name="currency"
            placeholder=""
          >
            {currencyOptions.map((cur, index) => (
              <option key={index} value={cur}>
                {cur}
              </option>
            ))}
          </select>

          <label htmlFor="currency" className="ms-2">
            Currency
          </label>

          <ErrorMessage
            name={`${name}.currency`}
            component="div"
            className="text-danger"
          />
        </div>
        <div className="col form-floating">
          <Field
            type="number"
            className="form-control"
            value={value.amount}
            onChange={handleAmountChange}
            id="budgetAmount"
            placeholder="amount"
            name="amount"
          />

          <label htmlFor="amount" className="ms-2">
            Amount
          </label>

          <ErrorMessage
            name={`${name}.amount`}
            component="div"
            className="text-danger"
          />
        </div>
      </div>
    </div>
  );
};

export default Budget;
