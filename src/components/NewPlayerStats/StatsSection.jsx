"use client";
import React from "react";
import StatCard from "./StatCard";
import styles from "./NewPlayerStats.module.css";

const StatsSection = ({ goals, age, position }) => {
  return (
    <section className={styles.statsSection}>
      <StatCard value={goals} label="Goals" />
      <StatCard value={age} label="Age" />
      <StatCard value={position} label="Position" />
    </section>
  );
};

export default StatsSection;
