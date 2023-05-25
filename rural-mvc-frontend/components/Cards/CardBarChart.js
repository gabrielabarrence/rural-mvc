import React from "react";
import Chart from "chart.js";
import { analiseDataApi } from "@/services/api";

export default function CardBarChart() {
  const [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    const analiseProductsByBaseUnit = async () => {
      await analiseDataApi
        .get("/getProductsPerBaseUnit")
        .then((res) => {
          console.log(res.data);
          const baseUnit = res.data;
          setChartData([
            baseUnit?.kg?.length,
            baseUnit?.litros?.length,
            baseUnit?.folhas?.length,
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    analiseProductsByBaseUnit();
  }, []);

  React.useEffect(() => {
    let config = {
      type: "bar",
      data: {
        labels: ["Kg", "Litros", "Folhas"],
        datasets: [
          {
            label: "Produtos",
            backgroundColor: ["#ed64a6", "#BDE0FF", "#D1F0E0"],
            borderColor: ["#ed64a6", "#BDE0FF", "#D1F0E0"],
            data: chartData,
            fill: false,
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          display: false,
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: "Unidade de Medida",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, [chartData]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Performance
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Produtos por Categoria
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
