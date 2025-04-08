"use client";

import { useEffect, useState } from "react";
import { usePlayer } from "@/context/PlayerContext";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./Statistics.module.css";
import { useRouter } from "next/navigation";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatisticsPage() {
  const { players, addPlayer } = usePlayer();
  const router = useRouter();
  const [positionData, setPositionData] = useState(null);
  const [ageData, setAgeData] = useState(null);
  const [ratingData, setRatingData] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState('All');

  const handleGoBack = () => {
    router.push('/');
  };

  useEffect(() => {
    if (!players) return;

    const positionCounts = players.reduce((acc, player) => {
      const position = player.position;
      acc[position] = (acc[position] || 0) + 1;
      return acc;
    }, {});

    setPositionData({
      labels: Object.keys(positionCounts),
      datasets: [
        {
          data: Object.values(positionCounts),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#21b64b",
            "#C9CBCF",
            "#8E5EA2",
            "#00A950",
            "#FF6B6B",
            "#FDB45C",
            "#5AD3D1",
          ],
        },
      ],
    });

    const ageRanges = {
      "0-19": 0,
      "20-29": 0,
      "30-39": 0,
      "40-49": 0,
      "50-99": 0,
    };

    players.forEach((player) => {
      const age = parseInt(player.age);
      if (age <= 19) ageRanges["0-19"]++;
      else if (age <= 29) ageRanges["20-29"]++;
      else if (age <= 39) ageRanges["30-39"]++;
      else if (age <= 49) ageRanges["40-49"]++;
      else ageRanges["50-99"]++;
    });

    setAgeData({
      labels: Object.keys(ageRanges),
      datasets: [
        {
          data: Object.values(ageRanges),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
        },
      ],
    });

    const ratingCounts = {
      "9.0+": 0,
      "8.0-8.9": 0,
      "6.0-7.9": 0,
      "<6.0": 0,
    };

    players.forEach((player) => {
      const rating = parseFloat(player.rating);
      if (rating >= 9.0) ratingCounts["9.0+"]++;
      else if (rating >= 8.0) ratingCounts["8.0-8.9"]++;
      else if (rating >= 6.0) ratingCounts["6.0-7.9"]++;
      else ratingCounts["<6.0"]++;
    });

    setRatingData({
      labels: Object.keys(ratingCounts),
      datasets: [
        {
          data: Object.values(ratingCounts),
          backgroundColor: ["#4cc9f0", "#21b64b", "#fcc027", "#ff4d4d"],
        },
      ],
    });
  }, [players]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            family: "Mulish, sans-serif",
            size: 14,
          },
        },
      },
    },
  };

  const filteredPlayers = selectedPosition === 'All'
    ? players
    : players.filter(player => player.position === selectedPosition);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.boxContainer}>
        <div className={styles.frame}>
          <div className={styles.header}>
            <h1 className={styles.title}>Statistics</h1>
          </div>
          <div className={styles.chartsContainer}>
            <div className={styles.chartWrapper}>
              <h2 className={styles.chartTitle}>Positions Distribution</h2>
              {positionData && (
                <Pie data={positionData} options={chartOptions} />
              )}
            </div>
            <div className={styles.chartWrapper}>
              <h2 className={styles.chartTitle}>Age Distribution</h2>
              {ageData && <Pie data={ageData} options={chartOptions} />}
            </div>
            <div className={styles.chartWrapper}>
              <h2 className={styles.chartTitle}>Rating Distribution</h2>
              {ratingData && <Pie data={ratingData} options={chartOptions} />}
            </div>
          </div>
          <button
            className={styles.goBackButton}
            onClick={handleGoBack}
            aria-label="Go back to main page"
          >
            GO BACK
          </button>
        </div>
      </div>
    </div>
  );
} 