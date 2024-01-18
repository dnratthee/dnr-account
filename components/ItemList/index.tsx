import Link from "next/link";
import Image from "next/image";

import ProductList from "./ProductList";

export default ({ list }) => (
  <ul>
    {list.map((data) => (
      <li key={data.id}>{data.name}</li>
    ))}
  </ul>
);

export { ProductList };
