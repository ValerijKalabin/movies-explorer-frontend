import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a
              className="portfolio__link"
              target="_blank"
              rel="noreferrer"
              href="https://valerijkalabin.github.io/how-to-learn"
            >
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__item">
            <a
              className="portfolio__link"
              target="_blank"
              rel="noreferrer"
              href="https://valerijkalabin.github.io/russian-travel"
            >
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__item">
            <a
              className="portfolio__link"
              target="_blank"
              rel="noreferrer"
              href="https://wel80.students.nomoreparties.xyz/sign-in"
            >
              Одностраничное приложение
            </a>
          </li>
        </ul>
    </section>
  );
}

export default Portfolio;
