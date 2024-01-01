function Navbar() {
  return (
    <header className="container flex justify-between items-center">
      <h1>urlFortress</h1>
      <nav>
        <ul className="flex">
          <li>
            <a href="#">Docs</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
