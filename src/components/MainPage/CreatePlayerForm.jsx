"use client";
import React, { useState } from "react";
import styles from "./CreatePlayerForm.module.css";
import { usePlayer } from "../../context/PlayerContext";
import { useRouter } from "next/navigation";

const CreatePlayerForm = () => {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [position, setPosition] = useState("");
  const [shirtNumber, setShirtNumber] = useState("");
  const [errors, setErrors] = useState({ age: "", shirtNumber: "", position: "" });
  const { players, addPlayer } = usePlayer(); 
  const router = useRouter();

  const positions = ["ST", "CF", "LW", "RW", "LM", "RM", "CAM", "CM", "CDM", "LB", "RB", "CB", "GK"];

  const handleAgeChange = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    const num = parseInt(value, 10);
    setAge(value);
    setErrors((prev) => ({
      ...prev,
      age: num >= 1 && num <= 99 ? "" : "Age must be between 1 and 99",
    }));
  };

  const handleShirtNumberChange = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    const num = parseInt(value, 10);
    setShirtNumber(value);
    setErrors((prev) => ({
      ...prev,
      shirtNumber: num >= 1 && num <= 99 ? "" : "Shirt number must be between 1 and 99",
    }));
  };

  const handlePositionChange = (e) => {
    const value = e.target.value;
    setPosition(value);
    setErrors((prev) => ({
      ...prev,
      position: value ? "" : "You must select a position",
    }));
  };
  

  const handleAddPlayerClick = async () => {
    if (errors.age || errors.shirtNumber || errors.position || !age || !shirtNumber || !position) {
      setErrors((prev) => ({
        ...prev,
        position: !position ? "You must select a position" : "",
      }));
      alert("Please complete all required fields before submitting.");
      return;
    }
  
    // Only send the fields your backend expects
    const playerData = {
      name: fullName,
      age: parseInt(age),
      position,
      number: parseInt(shirtNumber)
    };

    try {
      // Await the real player object from the backend
      const newPlayer = await addPlayer(playerData);

    alert("New player added!");

      // Use the real database ID for redirect
      router.push(`/player/${newPlayer.id}/preview`);
    } catch (error) {
      alert("Failed to add player: " + error.message);
    }
  };
  

  return (
    <div className={styles.createPlayerContainer}>
      <div className={styles.formContent}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F6c19a84570cc4b7ebcefc63534859305%2Fb17a7bfed461553f6be1a921288e1c35c2749b1db9c45baf0fb5107350e5fee1"
          alt="Default avatar"
          className={styles.defaultAvatar}
        />
        <input
          type="text"
          placeholder="Full Name"
          className={styles.formInput}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Age"
          className={styles.formInput}
          value={age}
          onChange={handleAgeChange}
        />
        {errors.age && <p className={styles.error}>{errors.age}</p>}

        <select
          className={styles.positionSelect}
          aria-label="Position"
          value={position}
          onChange={handlePositionChange}
        >
          <option value="">Select a Position</option> 
          {positions.map((pos) => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>
        {errors.position && <p className={styles.error}>{errors.position}</p>}


        <input
          type="text"
          placeholder="Shirt Number"
          className={styles.formInput}
          value={shirtNumber}
          onChange={handleShirtNumberChange}
        />
        {errors.shirtNumber && <p className={styles.error}>{errors.shirtNumber}</p>}
      </div>

      <button className={styles.addButton} aria-label="Create new player" onClick={handleAddPlayerClick}>
        <img src="https://cdn-icons-png.flaticon.com/512/32/32339.png" alt="Add" className={styles.addIcon} />
      </button>
    </div>
  );
};

export default CreatePlayerForm;
