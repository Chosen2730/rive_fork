import React from "react";
import { Text } from "./index";

function CurrencyFormatter({
  value,
  color,
}: {
  value: number;
  color?: string;
}) {
  const formattedNumber = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(value);
  const formattedCurrency = formattedNumber.replace("NGN", "₦");

  return <Text color={color} text={formattedCurrency} />;
}

export default CurrencyFormatter;
