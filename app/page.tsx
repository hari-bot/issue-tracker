import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import LatestIssue from "./LatestIssue";

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssue />
    </Grid>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};

// export const metadata: Metadata = {
//   title: "Issue Tracker - Dashboard",
//   description: "View a summary of project issue",
//   // openGraph: {
//   //   title: "Issue Tracker - Dashboard",
//   //   description: "View a summary of project issues",
//   //   url: "https://yourwebsite.com/dashboard", // Replace with your actual URL
//   //   siteName: "Issue Tracker",
//   //   images: [
//   //     {
//   //       url: "https://yourwebsite.com/images/issue-tracker-dashboard.png", // Replace with your image URL
//   //       width: 1200,
//   //       height: 630,
//   //       alt: "Issue Tracker Dashboard",
//   //     },
//   //   ],
//   //   type: "website",
//   // },
// };
