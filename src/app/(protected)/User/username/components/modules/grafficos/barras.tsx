"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { BarChart, BarSeriesOption } from "echarts/charts";
import {
  GridComponent,
  GridComponentOption,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import { SVGRenderer } from "echarts/renderers";

echarts.use([
  BarChart,
  GridComponent,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  SVGRenderer,
]);

type EChartsOption = echarts.ComposeOption<
  BarSeriesOption | GridComponentOption
>;

const MyChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current, "dark", { renderer: "svg" });

    const option: EChartsOption = {
      title: {
        text: "Rendimiento Semanal ",

        subtext: "Datos totales en Bachillerato",
        subtextStyle: {
          color: "#ccc",
          fontSize: 18,
          fontFamily: "Montserrat",
        },
        left: "center",
        textStyle: {
          color: "#38bdf8",
          fontWeight: "bold",
          fontSize: 35,
          fontFamily: "Montserrat",
        },
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
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
      🟩 Asistencias: ${hombres}<br/>
      🟥 Faltas: ${mujeres}<br/>
      📊 Total: <strong>${total}</strong>
    `;
        },
      },
      legend: {
        data: ["Asistencias", "Faltas"],
        top: "15%",
        textStyle: { color: "#ccc", fontSize: 20 },
      },

      xAxis: {
        type: "category",
        data: ["Lun", "Mar", "Mié", "Jue", "Vie"],
        axisLine: { lineStyle: { color: "#1e1e2f" } },
        axisLabel: { color: "#ccc", fontWeight: "bold", fontSize: 20 },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        splitLine: { lineStyle: { color: "#333" } },
        axisLabel: { color: "#ccc", fontWeight: "bold", fontSize: 17 },
      },
      series: [
        {
          name: "Asistencias",
          type: "bar",
          data: [661, 634, 477, 619, 652],
          itemStyle: {
            color: "#4ade80", // verde
            borderRadius: [6, 6, 0, 0],
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowColor: "rgba(0, 255, 100, 0.6)",
              shadowOffsetX: 10,
            },
          },
          barWidth: "35%",
        },
        {
          name: "Faltas",
          type: "bar",
          data: [57, 84, 241, 99, 66, 0, 0],
          itemStyle: {
            color: "#f87171", // rojo suave
            borderRadius: [6, 6, 0, 0],
          },

          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowColor: "rgba(255, 0, 0, 0.5)",
              shadowOffsetX: 10,
            },
          },
          barWidth: "35%",
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

    chart.setOption(option);

    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.dispose();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{
        width: 980,
        height: 520,
        borderRadius: "20px",
        overflow: "hidden", // importante para que el borde redondo se respete
        backgroundColor: "#1e293b", // opcional para destacar el borde
      }}
    />
  );
};

export default MyChart;
