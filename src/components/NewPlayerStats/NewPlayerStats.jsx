"use client";
import React, { useEffect, useState } from "react";
import PlayerHeader from "./PlayerHeader";
import StatsSection from "./StatsSection";
import SaveButton from "./SaveButton";
import styles from "./NewPlayerStats.module.css";
import { useRouter } from "next/navigation";

function NewPlayerStats() {
  const router = useRouter();

  const [playerData, setPlayerData] = useState({
    firstName: "First Name",
    lastName: "Last Name",
    playerNumber: "",
    goals: "0",
    age: "",
    position: "",
    playerImageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/33367e44c5ed17e458231156d84d8eadd7d5b485",
  });

  useEffect(() => {
    // Get URL parameters when component mounts
    const params = new URLSearchParams(window.location.search);

    // Log received parameters for debugging
    console.log("Stats page received params:", {
      firstName: params.get("firstName"),
      lastName: params.get("lastName"),
      shirtNumber: params.get("shirtNumber"),
      age: params.get("age"),
      position: params.get("position"),
    });

    setPlayerData({
        firstName: params.get("firstName")?.trim() || "",
        lastName: params.get("lastName")?.trim() || "Last Name",
        playerNumber: params.get("shirtNumber") || "",
        goals: "0", 
        age: params.get("age") || "",
        position: params.get("position") || "",
        playerImageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/33367e44c5ed17e458231156d84d8eadd7d5b485",
    });
  }, []);

  const handleSaveChanges = () => {
    console.log("Saving changes...");
    router.push("/full-list");
  };

  return (
    <main className={styles.container}>
      <PlayerHeader
        firstName={playerData.firstName}
        lastName={playerData.lastName}
        playerNumber={playerData.playerNumber}
        playerImageUrl={playerData.playerImageUrl}
      />
      <StatsSection
        goals={playerData.goals}
        age={playerData.age}
        position={playerData.position}
      />
      <SaveButton onClick={handleSaveChanges} />
    </main>
  );
}

export default NewPlayerStats;
