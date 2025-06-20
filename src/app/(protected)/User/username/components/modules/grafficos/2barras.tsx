"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const AttendanceChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current, "dark");

    const months = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];

    const asistenciaMensual = [
      12034, 11789, 11327, 12110, 11845, 12076, 11580, 11795, 11470, 12334,
      12190, 11542,
    ];

    const faltasMensuales = [
      5566, 5811, 4895, 5604, 5712, 5548, 5220, 5760, 5310, 5142, 5380, 5290,
    ];

    const option: echarts.EChartsOption = {
      title: {
        text: "Rendimiento por Año ",
        subtext: "Datos totales en Bachillerato",

        subtextStyle: {
          color: "#ccc",
          fontSize: 18,
          fontFamily: "Montserrat",
        },
        left: "center",
        textStyle: { color: "#38bdf8", fontSize: 35, fontWeight: "bold" },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      legend: {
        top: "15%",
        data: ["Asistencias", "Faltas"],
        textStyle: { color: "#ccc", fontSize: 20 },
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      xAxis: {
        type: "category",
        data: months,
        axisLabel: { color: "#ccc", fontWeight: "bold", fontSize: 20 },
        axisLine: { lineStyle: { color: "#555" } },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: "#ccc", fontWeight: "bold", fontSize: 17 },
        splitLine: { lineStyle: { color: "#333" } },
      },
      series: [
        {
          name: "Asistencias",
          type: "bar",
          data: asistenciaMensual,
          itemStyle: {
            color: "#4ade80",
            borderRadius: [4, 4, 0, 0],
          },
          markLine: {
            symbolSize: [10, 25],
            lineStyle: {
              width: 5,
              type: "dotted",
            },
            data: [{ type: "average", name: "Promedio" }],
          },
        },
        {
          name: "Faltas",
          type: "bar",
          data: faltasMensuales,
          itemStyle: {
            color: "#f87171",
            borderRadius: [4, 4, 0, 0],
          },

          markLine: {
            symbolSize: [10, 25],
            lineStyle: {
              width: 5,
              type: "dotted",
            },
            data: [{ type: "average", name: "Promedio" }],
          },
        },
      ],
      backgroundColor: "#1e1e2f",
      grid: {
        left: "5%",
        right: "5%",
        bottom: "10%",
        top: "22%",
        containLabel: true,
      },
      animation: true,
      animationDuration: 1000,
      animationDurationUpdate: 500,
      animationEasing: "cubicOut",
    };

    chartInstance.setOption(option);

    const resizeObserver = new ResizeObserver(() => chartInstance.resize());
    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      chartInstance.dispose();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{
        width: 1340,
        height: 520,
        borderRadius: "20px",
        overflow: "hidden", // importante para que el borde redondo se respete
        backgroundColor: "#1e293b", // opcional para destacar el borde
      }}
    />
  );
};

export default AttendanceChart;
