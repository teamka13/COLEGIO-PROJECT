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

const FaltasSexo = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current, "dark", { renderer: "svg" });

    const option: EChartsOption = {
      title: {
        text: "Faltistas Semanales en Bachillerato",
        subtext: "Datos totales de faltas en  Bachillerato",

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
      👨 Hombres: ${hombres}<br/>
      👩 Mujeres: ${mujeres}<br/>
      📊 Total: <strong>${total}</strong>
    `;
        },
      },
      legend: {
        data: ["Hombres", "Mujeres"],
        top: "18%",
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
          name: "Hombres",
          type: "bar",
          data: [35, 51, 144, 64, 57],
          itemStyle: {
            color: "#3b82f6",
            borderRadius: [6, 6, 0, 0],
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowColor: "rgba(59, 130, 246, 0.6)",
              shadowOffsetX: 10,
            },
          },
          barWidth: "35%",
        },
        {
          name: "Mujeres",
          type: "bar",
          data: [22, 33, 97, 35, 27],
          itemStyle: {
            color: "#ec4899",
            borderRadius: [6, 6, 0, 0],
          },

          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowColor: "rgba(236, 72, 153, 0.6)",
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
        margin: "0 auto",
        borderRadius: "20px",
        overflow: "hidden", // importante para que el borde redondo se respete
        backgroundColor: "#1e293b", // opcional para destacar el borde
      }}
    />
  );
};

export default FaltasSexo;
