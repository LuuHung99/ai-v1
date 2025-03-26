import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "../providers/ThemeProvider";

interface StatisticsChartProps {
  title?: string;
  type?: "line" | "bar" | "pie";
  data?: any;
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({
  title = "Statistics Chart",
  type = "line",
  data = {
    dates: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [820, 932, 901, 934, 1290, 1330, 1320],
  },
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const getChartOption = () => {
    const textColor = isDark ? "#fff" : "#000";
    const axisLineColor = isDark ? "#666" : "#ddd";
    const splitLineColor = isDark ? "#333" : "#eee";
    const primaryColor = isDark ? "#60a5fa" : "#3b82f6";
    const secondaryColor = isDark ? "#34d399" : "#10b981";
    const tertiaryColor = isDark ? "#f59e0b" : "#d97706";

    switch (type) {
      case "line":
        return {
          title: {
            text: title,
            left: "center",
            textStyle: { color: textColor },
          },
          tooltip: {
            trigger: "axis",
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            textStyle: { color: textColor },
          },
          xAxis: {
            type: "category",
            data: data.dates,
            axisLine: { lineStyle: { color: axisLineColor } },
            axisLabel: { color: textColor },
          },
          yAxis: {
            type: "value",
            axisLine: { lineStyle: { color: axisLineColor } },
            splitLine: { lineStyle: { color: splitLineColor } },
            axisLabel: { color: textColor },
          },
          series: [
            {
              data: data.values,
              type: "line",
              smooth: true,
              itemStyle: { color: primaryColor },
              areaStyle: {
                opacity: 0.3,
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: isDark
                        ? "rgba(96, 165, 250, 0.3)"
                        : "rgba(59, 130, 246, 0.3)",
                    },
                    {
                      offset: 1,
                      color: isDark
                        ? "rgba(96, 165, 250, 0)"
                        : "rgba(59, 130, 246, 0)",
                    },
                  ],
                },
              },
            },
          ],
        };

      case "bar":
        return {
          title: {
            text: title,
            left: "center",
            textStyle: { color: textColor },
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            textStyle: { color: textColor },
          },
          xAxis: {
            type: "category",
            data: data.dates,
            axisLine: { lineStyle: { color: axisLineColor } },
            axisLabel: { color: textColor },
          },
          yAxis: {
            type: "value",
            axisLine: { lineStyle: { color: axisLineColor } },
            splitLine: { lineStyle: { color: splitLineColor } },
            axisLabel: { color: textColor },
          },
          series: [
            {
              data: data.values,
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: isDark
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
              },
              itemStyle: { color: primaryColor },
            },
          ],
        };

      case "pie":
        return {
          title: {
            text: title,
            left: "center",
            textStyle: { color: textColor },
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            textStyle: { color: textColor },
          },
          legend: {
            orient: "vertical",
            left: "left",
            textStyle: { color: textColor },
          },
          series: [
            {
              name: "Distribution",
              type: "pie",
              radius: "50%",
              data: data.values,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: isDark
                    ? "rgba(0, 0, 0, 0.5)"
                    : "rgba(0, 0, 0, 0.2)",
                },
              },
              itemStyle: {
                color: (params: any) => {
                  const colors = [primaryColor, secondaryColor, tertiaryColor];
                  return colors[params.dataIndex % colors.length];
                },
              },
            },
          ],
        };

      default:
        return {};
    }
  };

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ReactECharts
          option={getChartOption()}
          style={{ height: "400px" }}
          opts={{ renderer: "svg" }}
        />
      </CardContent>
    </Card>
  );
};

export default StatisticsChart;
