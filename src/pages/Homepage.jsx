import SignupLogin from "../components/Signup_Login/Signup_Login";
import "./Homepage.css";

const HomePage = () => {
  return (
    <article className="homepage-background">
      <section>
        <h1>Track your finances</h1>
        <p>Forget the excel sheets!</p>
        <p>
          Selfcheck is a personal "notebook" for you to track your personal
          finances.
        </p>
      </section>
      <section>
        <SignupLogin />
      </section>
    </article>
  );
};

export default HomePage;
