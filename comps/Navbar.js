import Link from 'next/link';

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Emperor
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link href="/">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link href="/listings">
                <a class="nav-link" href="#">
                  Listings
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <Link href="/member">
                <a class="nav-link" href="#">
                  Member
                </a>
              </Link>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
