"use client";

import React, { useState } from "react";
import { usePlayer } from "../../../../context/PlayerContext.jsx";
import { useRouter } from "next/navigation";
import styles from "./PlayerStats.module.css";

const StatBox = ({ value, label, className, valueClassName }) => (
  <div className={className}>
    <div className={valueClassName}>{value}</div>
    <div className={styles.statDivider} />
    <div className={styles.statLabel}>{label}</div>
  </div>
);

export default function PlayerStats({ params }) {
  const { players, updatePlayer } = usePlayer();
  const router = useRouter();
  const player = players.find(p => p.id === parseInt(params.id));

  if (!player) {
    return <div>Player not found</div>;
  }

  
  const nameParts = player.name.trim().split(/\s+/);
  const firstName = nameParts.length > 1 ? nameParts[0] : "";
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : nameParts[0];


  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState({
    goals: player.goals,
    age: player.age,
    position: player.position
  });

  const handleEditClick = () => {
    router.push(`/player/${player.id}/edit`);
  };
  
  const handleGoBack = () => {
    router.push('/full-list');
  };

  return (
    <div className={styles.pageWrapper}>
      <link
        href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;600;700;800&family=League+Gothic&display=swap"
        rel="stylesheet"
      />
      <div className={styles.boxContainer}>
        <div className={styles.frame}>
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.nameContainer}>
                <h2 className={styles.firstName}>{firstName}</h2>
                <h1 className={styles.lastName}>{lastName}</h1>
                <p className={styles.playerNumber}>#{player.number}</p>
              </div>
            </div>
            <img
              src={player.image2}
              alt={player.name}
              className={styles.headerImage}
            />
            <button
              className={styles.editButton}
              onClick={handleEditClick}
              aria-label="Edit player"
            >
              <img
                src="/edit-icon.png"
                alt="Edit"
                className={styles.editIcon}
              />
            </button>
          </div>

          <div className={styles.statsContainer}>
            <StatBox
              value={stats.goals}
              label="Goals"
              className={styles.statBox}
              valueClassName={styles.statValue}
            />
            <StatBox
              value={stats.age}
              label="Age"
              className={styles.statBox}
              valueClassName={styles.statValue}
            />
            <StatBox
              value={stats.position}
              label="Position"
              className={styles.positionStatBox}
              valueClassName={styles.statValue}
            />
          </div>

          <button
            className={styles.goBackButton}
            onClick={handleGoBack}
            aria-label="Go back to full list"
          >
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
}