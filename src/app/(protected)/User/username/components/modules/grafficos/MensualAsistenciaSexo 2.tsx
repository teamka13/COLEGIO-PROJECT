"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const MensualAsistenciasSEX = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current, "dark");

    const semanas = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];
    const asistenciaHombres = [1580, 1450, 1340, 1500];
    const asistenciaMujeres = [1463, 1403, 1338, 1492];

    const option: echarts.EChartsOption = {
      title: {
        text: "Asistencia Mensual de Junio",
        subtext: "Distribución semanal de hombres y mujeres",

        left: "center",
        textStyle: {
          color: "#38bdf8",
          fontSize: 30,
          fontWeight: "bold",
        },
        subtextStyle: {
          color: "#ccc",
          fontSize: 16,
          fontFamily: "Montserrat",
        },
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
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: (params: any) => {
          const hombres = params[0].data;
          const mujeres = params[1].data;
          const total = hombres + mujeres;
          return `
      <strong>${params[0].axisValue}</strong><br/>
      👨 Hombres: ${hombres}<br/>
      👩 Mujeres: ${mujeres}<br/>
      📊 Total: <strong>${total}</strong>
    `;
        },
      },
      legend: {
        top: "15%",
        data: ["Asistencia Hombres", "Asistencia Mujeres"],
        textStyle: { color: "#ccc", fontSize: 18 },
      },
      xAxis: {
        type: "category",
        data: semanas,
        axisLabel: { color: "#ccc", fontWeight: "bold", fontSize: 18 },
        axisLine: { lineStyle: { color: "#555" } },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: "#ccc", fontWeight: "bold", fontSize: 16 },
        splitLine: { lineStyle: { color: "#333" } },
      },
      series: [
        {
          name: "Asistencia Hombres",
          type: "bar",

          data: asistenciaHombres,
          itemStyle: { color: "#3b82f6", borderRadius: [6, 6, 0, 0] },
          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowColor: "rgba(59, 130, 246, 0.6)",
              shadowOffsetX: 10,
            },
          },
          barWidth: "35%",
          // azul
        },
        {
          name: "Asistencia Mujeres",
          type: "bar",
          data: asistenciaMujeres,
          itemStyle: { color: "#ec4899", borderRadius: [6, 6, 0, 0] },
          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowColor: "rgba(236, 72, 153, 0.6)",
              shadowOffsetX: 10,
            },
          },
          barWidth: "35%", // morado
        },
      ],
      backgroundColor: "#1e1e2f",
      grid: {
        left: "8%",
        right: "6%",
        bottom: "12%",
        top: "28%",
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
        width: 980,
        height: 520,
        margin: "0 auto",
        borderRadius: "20px",
        overflow: "hidden", // importante para que el borde redondo se respete
        backgroundColor: "#1e293b", // opcional para destacar el borde
      }}
    />
  );
};

export default MensualAsistenciasSEX;
