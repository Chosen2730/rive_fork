import React from "react";
import { Text } from "./index";

function CurrencyFormatter({ value }: { value: number }) {
  const formattedNumber = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(value);
  const formattedCurrency = formattedNumber.replace("NGN", "₦");

  return <Text text={formattedCurrency} />;
}

export default CurrencyFormatter;
