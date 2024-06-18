import React, { ReactNode } from "react";
import { IconType } from "react-icons";

interface CardDataStatsProps {
  title: string;
  total: number;
  icon: IconType
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  icon: Icon
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          {/* {children} */}
          <Icon size={30}/>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
