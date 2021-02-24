import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__container">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__list">
          <li className="footer__item">
            <a
              className="footer__link"
              target="_blank"
              rel="noreferrer"
              href="https://praktikum.yandex.ru"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__item">
            <a
              className="footer__link"
              target="_blank"
              rel="noreferrer"
              href="https://github.com"
            >
              Github
            </a>
          </li>
          <li className="footer__item">
            <a
              className="footer__link"
              target="_blank"
              rel="noreferrer"
              href="https://www.facebook.com"
            >
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
