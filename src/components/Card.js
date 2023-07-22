import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export default function Card(card) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.ownerId === currentUser._id;
  const isLiked = card.likes?.some((i) => i === currentUser._id);
  const cardElementButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;
  //console.log(isLiked)
  function handleClick() {
    card.onCardClick({ name: card.name, link: card.link });
  }

  function handleLikeClick() {
    card.onCardLike(card.cardId, card.likes);
  }
  function handleDeleteCard() {
    card.onCardDeleteClick(card.cardId);
  }

  return (
    <li key={card.cardId} className="elements__items">
      <article className="card">
        {isOwn && (
          <button
            aria-label="Удалить"
            className="card__trash card_trash_visible"
            type="button"
            onClick={handleDeleteCard}
          />
        )}
        <img
          className="card__item"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />

        <div className="card__desc">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__place">
            <button
              aria-label="Лайк"
              type="button"
              className={cardElementButtonClassName}
              onClick={handleLikeClick}
            />
            <p className="card__like-count">{card.likes.length}</p>
          </div>
        </div>
      </article>
    </li>
  );
}
