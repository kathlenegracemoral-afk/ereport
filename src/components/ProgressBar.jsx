function ProgressBar({ step }) {
  return (
    <div className="progress">
      <div className={`circle ${step >= 1 ? "active" : ""}`}></div>

      <div className="line"></div>

      <div className={`circle ${step >= 2 ? "active" : ""}`}></div>

      <div className="line"></div>

      <div className={`circle ${step >= 3 ? "active" : ""}`}></div>
    </div>
  );
}

export default ProgressBar;