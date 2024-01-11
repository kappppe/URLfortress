function Navbar() {
  return (
    <header className="container flex justify-between items-center">
      <h1>
        <span className="logo">url</span>Fortress
      </h1>
      <nav>
        <ul className="flex">
          <li>
            <a href="https://urlfortress1.docs.apiary.io/#">Docs</a>
          </li>
          <li>
            <a href="https://github.com/kappppe/URLfortress/blob/main/README.md">
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
