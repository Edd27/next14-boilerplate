"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const reportData = [
  { day: "Mon", total: 12 },
  { day: "Tue", total: 18 },
  { day: "Wed", total: 24 },
  { day: "Thu", total: 30 },
  { day: "Fri", total: 26 },
  { day: "Sat", total: 14 },
  { day: "Sun", total: 8 },
];

const chartConfig = {
  total: {
    label: "Reports",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const recentReports = [
  {
    id: 1,
    content: "Inappropriate language in post",
    user: "user123",
    status: "Pending",
  },
  { id: 2, content: "Spam content", user: "spammer456", status: "Resolved" },
  {
    id: 3,
    content: "Copyright infringement",
    user: "creator789",
    status: "Under Review",
  },
  {
    id: 4,
    content: "Harassment in comments",
    user: "troll101",
    status: "Pending",
  },
  {
    id: 5,
    content: "Misleading information",
    user: "fakeposter",
    status: "Resolved",
  },
];

export default function DashboardReports() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Report Trends</CardTitle>
          <CardDescription>
            Daily report submissions over the past week
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ChartContainer
            config={chartConfig}
            className="min-h-[200px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={reportData}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="total"
                fill="var(--color-total)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>
            Latest content reports submitted by users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">
                    {report.content}
                  </TableCell>
                  <TableCell>{report.user}</TableCell>
                  <TableCell>{report.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
