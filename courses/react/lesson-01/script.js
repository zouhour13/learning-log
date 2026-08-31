// Profile data inserted into JSX
const name = "Zouhour13";
const role = "AI Engineer";
const description = "I build AI-powered applications.";
const skills = ["React", "Python", "FastAPI", "AI"];
const currentlyLearning = "React";

function Profile() {
  return (
    <div className="profile">
      <h1>{name}</h1>
      <h2>{role}</h2>
      <p>{description}</p>

      <h3>Skills:</h3>
      <ul>
        {skills.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <p>Currently learning: {currentlyLearning}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Profile />);
