"use client";

import React from "react";
import styles from "./PlayerCard.module.css";
import { usePlayer } from "../../context/PlayerContext";
import { useRouter } from "next/navigation";

const POSITION_TRANSLATIONS = {
  'CF': 'Center Forward',
  'ST': 'Striker',
  'RW': 'Right Winger',
  'LW': 'Left Winger',
  'CAM': 'Center Attacking Midfielder',
  'CM': 'Center Midfielder',
  'CDM': 'Center Defensive Midfielder',
  'LM': 'Left Midfielder',
  'RM': 'Right Midfielder',
  'CB': 'Center Back',
  'LB': 'Left Back',
  'RB': 'Right Back',
  'GK': 'Goalkeeper'
};

const PlayerCard = ({ player, onDelete, highlight }) => {
  if (!player) {
    return null;
  }

  const router = useRouter();

  const getRatingStyle = () => {
    const rating = parseFloat(player.rating);
    if (rating >= 9.0) {
      return styles.ratingBlue;
    } else if (rating >= 8.0) {
      return styles.ratingGreen;
    } else if (rating >= 6.0) {
      return styles.ratingYellow;
    } else {
      return styles.ratingRed;
    }
  };

  const getFullPosition = (shortPosition) => {
    return POSITION_TRANSLATIONS[shortPosition] || shortPosition;
  };

  const handleClick = (e) => {
    if (e.target.closest(`.${styles.deleteButton}`)) return;
    router.push(`/player/${player.id}/preview`);
  };

  return (
    <article className={styles.playerCard} role="button" tabIndex={0} onClick={handleClick}>
      <button className={styles.deleteButton} onClick={onDelete} aria-label="Delete player">
        -
      </button>
      <div className={styles.playerInfo}>
        {player.image ? (
          <img src={player.image} alt={`${player.name} profile`} className={styles.playerImage} />
        ) : (
          <div className={styles.placeholderImage}>No Image</div>
        )}
        <div className={styles.playerDetails}>
          <h3 className={styles.playerName}>{player.name} {highlight === "highest" ? "👑" : highlight === "lowest" ? "🤡" : ""}</h3>
          <p className={styles.playerDescription}>{getFullPosition(player.position)}</p>

        </div>
        <div className={`${styles.ratingBadge} ${getRatingStyle()}`}>
          {player.rating}
        </div>
      </div>
    </article>
  );
};

export default PlayerCard;
