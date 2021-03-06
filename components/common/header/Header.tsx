import {VERSION} from "../../../lib/constants";

export default function Header() {
  return (
    <header className="bg-primary">
      <div className="container">
        <nav className="navbar navbar-dark">
          <a className="navbar-brand" href="/">
            <span className="small fst-italic">Pomodoro</span>
          </a>
          <span className="navbar-text">
            {VERSION}
          </span>
        </nav>
      </div>
    </header>
  );
}
