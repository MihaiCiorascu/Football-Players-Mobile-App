// "use client";
// import React from "react";
// import styles from "./NewPlayerStats.module.css";

// const SaveButton = ({ onClick }) => {
//   return (
//     <button className={styles.saveButton} onClick={onClick}>
//       SAVE CHANGES
//     </button>
//   );
// };

// export default SaveButton;
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./NewPlayerStats.module.css";

const SaveButton = ({ playerData }) => {
  const router = useRouter();

   const handleSave = () => {
    alert("New player added!");
    router.push("/"); // Redirect after saving
  };

  return (
    <button className={styles.saveButton} onClick={handleSave}>
      SAVE CHANGES
    </button>
  );
};

export default SaveButton;
