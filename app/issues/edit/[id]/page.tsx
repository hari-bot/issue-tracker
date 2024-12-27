import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import ClientIssueForm from "../../_components/ClientIssueForm";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <ClientIssueForm issue={issue} />;
};

export default EditIssuePage;
