import './AboutMe.css';
import photo from '../../images/photo.png';

function AboutMe() {
  return (
    <section className="student">
      <h2 className="student__title">Студент</h2>
      <div className="student__container">
        <div className="student__info">
          <div className="student__profile">
            <h3 className="student__name">Виталий</h3>
            <p className="student__profession">Фронтенд-разработчик, 30 лет</p>
            <p className="student__description">
              Я родился и живу в Саратове, закончил факультет экономики СГУ.
              У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
              Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
              После того, как прошёл курс по веб-разработке, начал заниматься
              фриланс-заказами и ушёл с постоянной работы.
            </p>
          </div>
          <ul className="student__list">
            <li className="student__item">
              <a className="student__link" href="https://www.facebook.com/">Facebook</a>
            </li>
            <li className="student__item">
              <a className="student__link" href="https://github.com/ValerijKalabin">Github</a>
            </li>
          </ul>
        </div>
        <img className="student__photo" src={photo} alt="Фото" />
      </div>
    </section>
  );
}

export default AboutMe;
