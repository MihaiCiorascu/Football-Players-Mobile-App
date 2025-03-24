"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./NewPlayerPreview.module.css";
import { useRouter } from "next/navigation";


function NewPlayerPreview() {
  const [player, setPlayer] = useState(() => ({
    firstName: "FIRST NAME",
    lastName: "LAST NAME",
    imageUrl: "/lovable-uploads/50691a64-3f9a-43e9-bc2d-8ff71235badb.png",
  }));

  const [formData, setFormData] = useState({
    age: "",
    position: "",
    shirtNumber: "",
  });

  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fullName = params.get("fullName") || "";
    const age = params.get("age") || "";
    const position = params.get("position") || "";
    const shirtNumber = params.get("shirtNumber") || "";

    let firstName = "FIRST NAME";
    let lastName = "LAST NAME";

    if (fullName.trim().length > 0) {
      const nameParts = fullName.trim().split(/\s+/);

      if (nameParts.length === 1) {
        firstName = "";
        lastName = nameParts[0];
      } else {
        firstName = nameParts[0];
        lastName = nameParts.slice(1).join(" ");
      }
    }

    setPlayer((prev) => ({
      ...prev,
      firstName,
      lastName,
    }));

    setFormData({
      age: age || "",
      position: position || "",
      shirtNumber: shirtNumber || "",
    });

    console.log("Received player data:", {
      firstName,
      lastName,
      age,
      position,
      shirtNumber,
    });
  }, []);

  const handleStatsClick = () => {
    // Navigate to the career stats page with all player data
    const queryParams = new URLSearchParams({
      firstName: player.firstName,
      lastName: player.lastName,
      shirtNumber: formData.shirtNumber,
      age: formData.age,
      position: formData.position,
    }).toString();

    router.push(`/new-player-stats?${queryParams}`);
  };

  return (
    <section className={styles.playerCardContainer}>
      <article className={styles.div}>
        <header className={styles.div2}>
          <h2 className={styles.div3}>{player.firstName}</h2>
          <h1 className={styles.div4}>{player.lastName}</h1>
          <figure className={styles.div5}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F6c19a84570cc4b7ebcefc63534859305%2F8fa3e8bdea4b09d4fe289f04a794b703d36cd5de4093e9f5d5c2fd80552b5444"
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

export default NewPlayerPreview;



// "use client";
// import React from "react";
// import PlayerPreview from "../PlayerPreview/PlayerPreview";

// function NewPlayerPreview() {
//   return (
//     <PlayerPreview
//       defaultPlayer={{
//         firstName: "FIRST NAME",
//         lastName: "LAST NAME",
//         imageUrl: "/lovable-uploads/50691a64-3f9a-43e9-bc2d-8ff71235badb.png",
//       }}
//       defaultFormData={{
//         age: "",
//         position: "",
//         shirtNumber: "",
//       }}
//       statsPage="new-player-stats"
//     />
//   );
// }

// export default NewPlayerPreview;
