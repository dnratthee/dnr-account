import ProductList from "./ProductList";
import InvoiceList from "./InvoiceList";
import BillingNoteList from "./BillingNoteList";
import ReceiptList from "./ReceiptList";
import CashList from "./CashList";
import ContactList from "./ContactList";
import ExpensesList from "./ExpensesList";

export default ({ list }) => (
  <ul>
    {list.map((data) => (
      <li key={data.id}>{data.name}</li>
    ))}
  </ul>
);

export {
  ProductList,
  InvoiceList,
  BillingNoteList,
  ReceiptList,
  CashList,
  ContactList,
  ExpensesList,
};
