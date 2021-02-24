import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about">
      <h2 className="about__title">О проекте</h2>
      <div className="about__container">
        <div className="about__info">
          <h3 className="about__info-title">Дипломный проект включал 5 этапов</h3>
          <p className="about__info-text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="about__info">
          <h3 className="about__info-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about__info-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about__container">
        <div className="about__time">
          <p className="about__time-text">1 неделя</p>
          <h3 className="about__time-title">Back-end</h3>
        </div>
        <div className="about__time">
          <p className="about__time-text about__time-text_position_right">4 недели</p>
          <h3 className="about__time-title">Front-end</h3>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
