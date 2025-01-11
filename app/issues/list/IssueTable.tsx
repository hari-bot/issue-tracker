import { Table } from "@radix-ui/themes";
import React from "react";
import { Link, IssueStatusBadge } from "@/app/components";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Issue, Status } from "@prisma/client";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: Promise<IssueQuery>;
  issues: Issue[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  const params = await searchParams;
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {colums.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: { ...params, orderBy: column.value },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === params.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const colums: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = colums.map((column) => column.value);

export default IssueTable;
