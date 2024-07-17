"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import MapOne from "../Maps/MapOne";
import {
  FaMoneyBillWave,
  FaClock,
  FaHourglassHalf,
  FaDollarSign,
  FaChartLine,
  FaCoins,
  FaHome,
  FaAward,
  FaHandHoldingUsd,
  FaUserClock,
  FaUserCheck,
  FaUsers,
  FaUserTimes,
  FaUserSecret,
  FaQuestionCircle,
} from "react-icons/fa";


const ECommerce: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Total views"
          total={3.456}
          icon={FaMoneyBillWave}
         />
       
      </div>
    </>
  );
};

export default ECommerce;
