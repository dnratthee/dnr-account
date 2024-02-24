import Link from "next/link";

export default ({
  currentPage,
  totalPages,
  searchParams = {},
}: {
  currentPage: number;
  totalPages: number;
  searchParams?: {};
}) => {
  return (
    <div className="pagination">
      Page : {currentPage} ||
      {[...Array(totalPages)].map((object, i) => {
        return (
          <Link
            key={i}
            href={{
              pathname: "",
              query: { ...searchParams, page: i + 1 },
            }}
          >
            {i + 1}
          </Link>
        );
      })}
    </div>
  );
};
