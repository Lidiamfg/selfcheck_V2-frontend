import { useEffect, useState } from "react";

const YearCardSettings = ({ years, oneYear, fetchYears }) => {
  const token = localStorage.getItem("authToken");
  console.log(oneYear);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedNumber, setUpdatedNumber] = useState(oneYear.number);
  const [error, setError] = useState("");

  /*UPDATE A YEAR*/
  const updateYear = async (oneYear) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/years/${oneYear._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ number: updatedNumber }),
        }
      );
      if (response.ok) {
        console.log("Update successful");
        fetchYears();
      } else {
        console.log("Update failed:", response.status, response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*FUNCTION TO DELETE A YEAR*/
  const deleteYear = async (oneYear) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/years/${oneYear._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        fetchYears();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchYears();
  }, [updatedNumber]);

  const handleUpdateYear = (oneYear) => {
    const yearExists = years.some(
      (element) => element.number === parseInt(updatedNumber)
    );
    if (yearExists && oneYear.number !== parseInt(updatedNumber)) {
      console.log("antes", oneYear.number, "depois", updatedNumber);
      setError("Sorry, year already exists.");
    } else if (updatedNumber === "") {
      setError("Year cannot be empty.");
    } else {
      updateYear(oneYear);
      setIsEditing(!isEditing);
      setError("");
    }
  };

  return (
    <>
      <div>
        {isEditing ? (
          <input
            type="number"
            value={updatedNumber}
            onChange={(event) => {
              setUpdatedNumber(event.target.value);
              setError("");
            }}
          />
        ) : (
          <h2>{oneYear.number}</h2>
        )}
      </div>
      <button
        type="button"
        onClick={() => {
          setIsEditing(!isEditing);
          if (isEditing) {
            handleUpdateYear(oneYear);
          }
          setUpdatedNumber(oneYear.number);
        }}
      >
        {isEditing ? "save" : "edit"}
      </button>

      <button
        type="button"
        onClick={() => {
          const confirmed = window.confirm(
            `Do you really want to delete ${oneYear.number}?`
          );
          if (confirmed) {
            deleteYear(oneYear);
          }
        }}
      >
        x
      </button>
      {error && <p className="error-message">{error}</p>}
    </>
  );
};

export default YearCardSettings;
