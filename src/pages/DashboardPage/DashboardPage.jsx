import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const DashboardPage = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const token = localStorage.getItem("authToken");

  const [userYears, setUserYears] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  //FETCH USER YEARS
  const fetchYears = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/years/user/${currentUser}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const allYears = await response.json();
        console.log("chicorita", allYears);
        setUserYears(allYears);
        if (allYears.length > 0) {
          setSelectedYear(
            allYears.sort((a, b) => b.number - a.number)[0].number
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //FETCH INCOMES
  const fetchIncomes = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/incomes`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const allIncomes = await response.json();
        console.log("pikachu", allIncomes);
        const filteredIncomes = allIncomes.filter((income) => {
          //FILTER INCOMES PER YEAR AND USER
          return (
            income.year.user === currentUser &&
            income.year.number === selectedYear
          );
        });
        console.log("Incomes filtrados", filteredIncomes);
        setIncomes(filteredIncomes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //FETCH EXPENSES
  const fetchExpenses = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/expenses`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const allExpenses = await response.json();
        console.log("pikachu", allExpenses);
        const filteredExpenses = allExpenses.filter((expense) => {
          //FILTER INCOMES PER YEAR AND USER
          return (
            expense.year.user === currentUser &&
            expense.year.number === selectedYear
          );
        });
        setExpenses(filteredExpenses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //FETCH BUDGETS
  const fetchBudgets = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/budgets`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const allBudgets = await response.json();
        console.log("pikachu", allBudgets);
        const filteredBudgets = allBudgets.filter((budget) => {
          //FILTER INCOMES PER YEAR AND USER
          return (
            budget.year.user === currentUser &&
            budget.year.number === selectedYear
          );
        });
        setBudgets(filteredBudgets);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchYears();
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedYear) {
      fetchIncomes();
      fetchExpenses();
      fetchBudgets();
    }
  }, [selectedYear]);

  return (
    <section>
      <div>
        <h1>DASHBOARD</h1>
        <p>{selectedYear}</p>
        <select
          name="years"
          onChange={(event) => {
            setSelectedYear(parseInt(event.target.value));
          }}
        >
          {userYears
            .sort((a, b) => b.number - a.number)
            .map((oneYear) => {
              return (
                <option value={oneYear.number} key={oneYear._id}>
                  {oneYear.number}
                </option>
              );
            })}
        </select>
      </div>
      <article>
        <div>
          {incomes.map((income) => (
            <div key={income._id}>{income.amount}</div>
          ))}
        </div>
      </article>
    </section>
  );
};

export default DashboardPage;
