"use client";
import React from "react";
import styles from "./NewPlayerStats.module.css";

const StatCard = ({ value, label }) => {
  return (
    <article className={styles.statCard}>
      <h2 className={styles.statValue}>{value}</h2>
      <div className={styles.statDivider}></div>
      <p className={styles.statLabel}>{label}</p>
    </article>
  );
};

export default StatCard;
