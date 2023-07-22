// noinspection JSUnresolvedVariable
import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Footer from "./Footer";

export default function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <>
      <main>
        <section className="profile page__profile">
          <button
            onClick={props.handleEditAvatarClick}
            className="profile__avatar-btn"
            type="button"
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Аватарка"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={props.handleEditProfileClick}
              aria-label="Редактировать профиль"
              type="button"
              className="profile__edit-btn"
            />
            <p className="profile__subtitle"> {currentUser.about}</p>
          </div>
          <button
            onClick={props.handleAddPlaceClick}
            aria-label="Добавление карточки"
            type="button"
            className="profile__add-btn"
          />
        </section>
        <section className="elements page__cards">
          <ul className="elements__grids list">
            {props.cards.map((card) => (
              <Card
                key={card._id}
                name={card.name}
                link={card.link}
                ownerId={card.owner}
                likes={card.likes}
                onCardLike={props.onCardLike}
                cardId={card._id}
                onCardDeleteClick={props.onCardDeleteClick}
                onCardClick={props.onCardClick}
              />
            ))}
          </ul>
        </section>
      </main>
      <Footer date={new Date().getFullYear()} />
    </>
  );
}
