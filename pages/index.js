import Head from "next/head";
import Link from "next/link";

const Home = () => (
  <div className="container">
    <Link href="/about">
      <a>Visit the About Page</a>
    </Link>
  </div>
);

export default Home;
