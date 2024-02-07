import Link from "next/link";

export default ({ currentPage, totalPages }) => {
  return (
    <div className="pagination">
      Page : {currentPage} ||
      {[...Array(totalPages)].map((object, i) => (
        <Link key={i} href={`?page=${i + 1}`}>
          {i + 1}
        </Link>
      ))}
    </div>
  );
};
