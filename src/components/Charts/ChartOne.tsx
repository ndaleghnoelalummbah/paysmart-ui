import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import ChartVariable from "../ChartVariable/ChartVariable";

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

type ChartOneProps = {
  options: ApexOptions;
  series: { name: string; data: number[] }[];
  chartLabel: { color: string; name: string }[];
  heading: string;
};
const ChartOne: React.FC<ChartOneProps> = ({
  options,
  series,
  chartLabel,
  heading,
}) => {

  const [state, setState] = useState<ChartOneState>({
    series: series,
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 mt-8 rounded-sm border border-stroke bg-white px-5 pb-5 pt-12 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div>
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          {heading}
        </h4>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <ChartVariable chartLabel={chartLabel} />
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;

