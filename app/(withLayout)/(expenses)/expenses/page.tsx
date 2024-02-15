import { Metadata } from "next";
import prisma from "~/lib/prisma";
import { ExpensesList } from "~/components/ItemList";
import Pagination from "~/components/Pagination";
import { number } from "~/lib/utils/formatter";

export const metadata: Metadata = {
  title: "DNR Account :: Expenses",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    limit?: string;
    query?: string;
    page?: string;
    status?: string;
    name?: string;
    no?: string;
    cat?: string;
  };
}) {
  let total = 1;
  const no = searchParams?.no || "";
  const name = searchParams?.name || "";
  const cat = searchParams?.cat || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 20;

  const count = (
    await prisma.expenses.findMany({
      include: { Contact: true },
      where: {
        no: { contains: no },
        Contact: {
          name: {
            contains: name,
          },
        },
      },
    })
  ).length;

  const expenses = await prisma.expenses.findMany({
    include: {
      ExpensesDetail: { include: { category: true } },
      Contact: { include: { company: true } },
    },
    where: {
      no: { contains: no },
      Contact: {
        name: {
          contains: name,
        },
        Expenses: {
          every: {
            ExpensesDetail: {
              every: {
                category: {
                  name: {
                    contains: cat,
                  },
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      date: "desc",
    },
    skip: (currentPage - 1) * limit,
    take: limit,
  });

  return (
    <>
      <div className="title">ค่าใช้จ่าย</div>
      <div className="table">
        <ExpensesList list={expenses} searchParams={searchParams} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(count / limit)}
      />
      <div>
        Total :{" "}
        {number.format(
          expenses
            .map((x) => Number(x.netTotal))
            .reduce((x, y) => Number(x) + Number(y))
        )}
      </div>
    </>
  );
}
