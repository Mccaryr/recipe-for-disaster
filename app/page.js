import Link from "next/link";
import classes from "./page.module.css";
import Slideshow from "../components/Slideshow/slideshow";
export default function Home() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.slideshow}>
          <Slideshow />
        </div>
        <div>
          <div className={classes.hero}>
            <h1>Next Level Food</h1>
            <p>Taste & share your recipes</p>
          </div>
          <div className={classes.cta}>
            <Link href="/community">Explore the Community</Link>
            <Link href="/meals">Explore Meals</Link>
          </div>
        </div>
      </header>
      <main className="page-content">
        <section className={classes.section}>
          <h2 className="font-bold mb-3">How it works</h2>
          <p>
            Recipe for Disaster is a platform for foodies to share their
            favorite recipes with the world. It's a place to discover new
            dishes, and to connect with other food lovers.
          </p>
        </section>
      </main>
    </>
  );
}
