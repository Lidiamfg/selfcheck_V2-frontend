import { useContext, useEffect, useState } from "react";
import MobileLogo from "../../assets/logo-dark.png";
import { AuthContext } from "../../contexts/AuthContext";
import YearCardSettings from "./InitialPage-components/YearCardSettings";
import { Link } from "react-router-dom";

const InitialSettingPage = () => {
  const token = localStorage.getItem("authToken");

  const { currentUser } = useContext(AuthContext);

  const [years, setYears] = useState([]);
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  const payload = {
    user: `${currentUser}`,
    number,
  };

  /*FUNCTION TO ADD A YEAR*/
  const addYear = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/years`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user: `${currentUser}`,
            number,
          }),
        }
      );
      if (response.ok) {
        fetchYears();
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*FECTCH ALL THE YEARS FROM THIS USER*/
  const fetchYears = async () => {
    console.log(currentUser);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/years/user/${currentUser}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const allYears = await response.json();
        console.log("chicorita", allYears);
        setYears(allYears);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchYears();
    }
  }, []);

  const handleCreateYear = () => {
    const yearExists = years.some(
      (element) => element.number === parseInt(number)
    );
    if (yearExists) {
      setError("Year already exists.");
    } else if (number === "") {
      setError("Year cannot be empty.");
    } else {
      setError("");
      setNumber("");
      addYear();
    }
  };

  return (
    <div>
      <div className="logo">
        <img className="mobile-logo" src={MobileLogo} />
      </div>
      <section className="homepage-background" style={{ height: "100vh" }}>
        <article className="hp-title">
          <h1>Let's create your first year!</h1>
        </article>
        <article className="MultiYearCards">
          {years
            .sort((a, b) => b.number - a.number)
            .map((oneYear) => {
              return (
                <div key={oneYear._id} className="YearCard">
                  <YearCardSettings
                    years={years}
                    oneYear={oneYear}
                    fetchYears={fetchYears}
                  />
                </div>
              );
            })}
        </article>
        <article>
          <div>
            Add a new year
            {/* LISTA DE ANOS CRIADOS */}
            <form>
              <div>
                <input
                  value={number}
                  placeholder="year"
                  onChange={(event) => {
                    setNumber(event.target.value);
                    setError("");
                  }}
                  required
                />
                <button type="button" onClick={handleCreateYear}>
                  Create
                </button>
                {error && <p className="error-message">{error}</p>}
              </div>
            </form>
          </div>
        </article>
        {years.length > 0 && <Link to={"/dashboard"}>Next</Link>}
      </section>
    </div>
  );
};

export default InitialSettingPage;
