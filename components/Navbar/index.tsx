"use client";
import React, { useState } from "react";
import NavItem from "./NavItem";

const MENU_LIST = [
  { text: "Dashboard", href: "/dashboard", icon: "grid-alt" },

  // { text: "Quotations", href: "/quotations", icon: "spreadsheet" },
  { text: "Billing Note", href: "/billing-notes", icon: "spreadsheet" },
  { text: "Invoice", href: "/invoices", icon: "package" },
  { text: "Receipt", href: "/receipts", icon: "receipt" },
  { text: "Cash", href: "/cash-invoices", icon: "money" },

  // {
  //   text: "Purchase Order",
  //   href: "/purchase-orders",
  //   icon: "purchase-tag",
  // },
  // { text: "Purchases", href: "/purchases", icon: "cart" },

  { text: "Expenses", href: "/expenses", icon: "dollar" },
  // { text: "Withholding TAX", href: "/withholding-tax", icon: "dollar" },
  // { text: "Payment Slip", href: "/payment-slip", icon: "receipt" },

  { text: "Product", href: "/products", icon: "box" },

  { text: "Contact", href: "/contacts", icon: "user" },

  // { text: "Reports", href: "/reports", icon: "file" },
  // { text: "Sales", href: "/reports/sales", icon: "line-chart" },
];
const Navbar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header>
      <nav className={`sidebar`}>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`logo-details`}
        >
          <div className="logo_name">DNR</div>
        </div>
        <ul className={`${navActive ? "active" : ""} nav-list`}>
          {MENU_LIST.map((menu, idx) => (
            <li
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
              <span className="tooltip">{menu.text}</span>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
