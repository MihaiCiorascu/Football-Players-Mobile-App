"use client";
import React from "react";
import styles from "./PlayerCard.module.css";
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

const PlayerCard = ({
  id,
  image,
  name,
  position,
  rating,
}) => {
  const router = useRouter();
  
  const getRatingStyle = () => {
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


  const handleClick = () => {
    router.push(`/player/${id}/preview`);
  };

  return (
    <article
      className={styles.playerCard}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
    >
      <div className={styles.playerInfo}>
        <img
          src={image}
          alt={`${name} profile`}
          className={styles.playerImage}
        />
        <div className={styles.playerDetails}>
          <h3 className={styles.playerName}>{name}</h3>
          <p className={styles.playerPosition}>{getFullPosition(position)}</p>
        </div>
        <div className={`${styles.ratingBadge} ${getRatingStyle()}`}>
          {rating}
        </div>
      </div>
    </article>
  );
};

export default PlayerCard;
