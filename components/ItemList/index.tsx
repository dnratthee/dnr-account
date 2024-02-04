import Link from "next/link";
import Image from "next/image";

import ProductList from "./ProductList";
import InvoiceList from "./InvoiceList";
import BillingNoteList from "./BillingNoteList";

export default ({ list }) => (
  <ul>
    {list.map((data) => (
      <li key={data.id}>{data.name}</li>
    ))}
  </ul>
);

export { ProductList, InvoiceList, BillingNoteList };
