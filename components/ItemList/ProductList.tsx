export default ({ list }) => (
  <ul>
    {list.map((data) => (
      <li key={data.id}>
        {data.name} {data.nameForeign} {data.code}{" "}
        {data.sellingPrice.toString()}
      </li>
    ))}
  </ul>
);
