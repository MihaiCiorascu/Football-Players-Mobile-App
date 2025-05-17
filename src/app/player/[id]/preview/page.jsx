"use client";

import React from "react";
import { usePlayer } from "../../../../context/PlayerContext.jsx";
import { useRouter } from "next/navigation";
import styles from "./PlayerPreview.module.css";

export default function PlayerPreview({ params }) {
  const { players } = usePlayer();
  const router = useRouter();
  const player = players.find(p => p.id === parseInt(params.id));

  if (!player) {
    return <div>Player not found</div>;
  }

  const nameParts = player.name.trim().split(/\s+/);
  const firstName = nameParts.length > 1 ? nameParts[0] : "";
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : nameParts[0];


  const handleStatsClick = () => {
    const queryParams = new URLSearchParams({
      firstName,
      lastName,
      shirtNumber: player.number || "",
      age: player.age,
      position: player.position,
    }).toString();

    router.push(`/player/${player.id}/stats?${queryParams}`);
  };

  return (
    <section className={styles.playerCardContainer}>
      <article className={styles.div}>
        <header className={styles.div2}>
          <h2 className={styles.div3}>{firstName}</h2>
          <h1 className={styles.div4}>{lastName}</h1>
          <figure className={styles.div5}>
            <img
              src={player.image1}
              alt="Player profile"
              className={styles.img}
            />
            <div className={styles.div6} />
          </figure>
          <button
            className={styles.div7}
            aria-label="View career statistics"
            onClick={handleStatsClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleStatsClick();
              }
            }}
          >
            <div>
              <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24">
                <path
                  d="M95.5 805.8H100V820.5H95.5V805.8ZM103.9 799.5H108.1V820.5H103.9V799.5ZM112.3 811.5H116.5V820.5H112.3V811.5Z"
                  fill="#6923B8"
                ></path>
              </svg>
            </div>
            <span className={styles.div8}>VIEW CAREER STATS</span>
          </button>
        </header>
      </article>
    </section>
  );
}