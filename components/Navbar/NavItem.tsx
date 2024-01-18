import Link from "next/link";

const NavItem = ({ text, href, icon, active }) => {
  return (
    <Link href={href} className={`nav-item ${active ? "active" : ""}`}>
      <i className={`bx bx-${icon}`}></i>
      <span className="links_name">{text}</span>
    </Link>
  );
};

export default NavItem;
