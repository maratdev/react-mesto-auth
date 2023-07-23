import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import AddCardPopup from "./AddCardPopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import NoFound from "./NoFound";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
//---------------------HOC--------------------------------------------/
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { ProtectedRouteElement } from "../hooks/ProtectedRoute";

// ---------------------------Роутинг--------------------------------------/
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"; // импортируем Routes
import Login from "./sign-in/Login";
import Register from "./sign-up/Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import * as Api from "../utils/Api";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // -------------------------------------------Попапы------------------------------------/
  // открытие попапа редактирования профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  // открытития попапа добавления карточек
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  // открытие попапа смены аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  // открытие попапа удаления карточки
  const [isConfirmDelCardPopupOpen, setIsConfirmDelCardPopupOpen] =
    useState(false);
  // данные карточки на полный экран
  const [selectedCard, setSelectedCard] = useState(false);
  // открытие попап карточки на весь экран
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  // открытие попап карточки об успешной регистрации
  const [isInfoTooltip, setInfoTooltip] = useState(false);
  const [tooltip, setTooltip] = useState({ image: "", message: "" });
  const navigate = useNavigate();

  // данные пользователя email и password с сервера
  const [userData, setUserData] = useState({ email: "" });

  // Контекст текущего пользователя
  const [currentUser, setCurrentUser] = useState({
    _id: undefined,
  });

  const [cards, setCards] = useState([]);
  const [cardId, setCardId] = useState("");
  // рендер текста для кнопкок формы после нажатия на сабмит
  const [isLoading, setIsLoading] = useState(false);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDelCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setInfoTooltip(false);
  }

  // Инициализация User и Card
  function loadUserAndCards() {
    Api.getDataUser()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(console.error);

    Api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards.reverse());
      })
      .catch(console.error);
  }

  // ---------------------------------------------------------> Открыте изображение
  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  // Api---------------------------------------------------------> Like
  function handleCardLike(cardId, likes) {
    const isLiked = likes?.some((i) => i === currentUser._id);
    Api.changeLikeCardStatus(cardId, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((element) => (element._id === cardId ? newCard : element))
        );
      })
      .catch(console.error);
  }

  // Api---------------------------------------------------------> Удаление карточки
  function handleCardDelete() {
    setIsLoading(true);
    Api.deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((item) => item._id !== cardId));
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDeleteClick(card) {
    setCardId(card);
    setIsConfirmDelCardPopupOpen(true);
  }

  // Api---------------------------------------------------------> Изменение данных пользователя
  function handleUpdateUser(userData) {
    setIsLoading(true);
    Api.saveDataInfo(userData)
      .then((updateUser) => {
        setCurrentUser(updateUser);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Api---------------------------------------------------------> Изменение аватара
  function handleUpdateAvatar(userData) {
    setIsLoading(true);
    Api.saveDataProfile(userData)
      .then((userAvatar) => {
        setCurrentUser(userAvatar);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Api---------------------------------------------------------> Добавление карточки
  function handleAddPlaceSubmit(inputValues) {
    setIsLoading(true);
    Api.saveCardInfo(inputValues)
      .then((cardData) => {
        setCards([cardData, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }

  console.log(loggedIn);
  // ---------------------------------------------------------> Аутинфикация пользователя
  useEffect(() => {
    auth
      .checkToken()
      .then((res) => {
        if (res.email) {
          loadUserAndCards();
          setUserData({ email: res.email });
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log("Ошибка проверки токена", err);
      });
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      navigate("/app", { replace: true });
    }
  }, [loggedIn]);

  // ---------------------------------------------------------> Регистрация пользователя

  function handleRegisterUser({ password, email }) {
    auth
      .register(password, email)
      .then(() => {
        setInfoTooltip(true);
        setTooltip({
          image: true,
          message: "Вы успешно зарегистрировались!",
        });
        navigate("/signin", { replace: true });
        setTimeout(closeAllPopups, 2000);
      })
      .catch((error) => {
        setInfoTooltip(true);
        setTooltip({
          image: false,
          message: "Пользователь с таким email уже зарегистрирован",
        });
        console.log(error);
      });
  }

  // ---------------------------------------------------------> Авторизация пользователя

  function handleAuthorizeUser({ password, email }) {
    auth
      .authorize(password, email)
      .then(() => {
        auth.checkToken().then((res) => {
          if (res.email) {
            loadUserAndCards();
            setUserData({ email });
            setLoggedIn(true);
          }
        });
      })
      .catch((error) => {
        setInfoTooltip(true);
        setTooltip({
          image: false,
          message: "Неверный адрес электронной почты или пароль!",
        });
        console.log(error);
      });
  }

  // ---------------------------------------------------------> Выход

  function signOut() {
    auth
      .logout()
      .then(() => {
        navigate("/signin", { replace: true });
        setLoggedIn(!loggedIn);
        setUserData({ email: "" });
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} userData={userData} signOut={signOut} />
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/app" replace />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/app"
            element={
              <ProtectedRouteElement
                element={Main}
                handleEditProfileClick={setIsEditProfilePopupOpen}
                handleAddPlaceClick={setIsAddCardPopupOpen}
                handleEditAvatarClick={setIsEditAvatarPopupOpen}
                onCardLike={handleCardLike}
                onCardDeleteClick={handleCardDeleteClick}
                onCardClick={handleCardClick}
                cards={cards}
                loggedIn={loggedIn}
              />
            }
          />

          <Route
            path="/signin"
            element={<Login handleAuthorizeUser={handleAuthorizeUser} />}
          />
          <Route
            path="/signup"
            element={<Register handleRegisterUser={handleRegisterUser} />}
          />
          <Route path="*" element={<NoFound />} />
        </Routes>
        {/*  Popup редактировать профиль*/}
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />
        {/*  Popup добавление новой карточки*/}
        <AddCardPopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          handleAddPlaceClick={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        {/*  Popup редактирования аватарки*/}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        {/*  Popup изображения*/}
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        {/*  Popup удаления карточки*/}
        <ConfirmDeletePopup
          isOpen={isConfirmDelCardPopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleCardDelete}
          isLoading={isLoading}
        ></ConfirmDeletePopup>

        <InfoTooltip
          tooltip={tooltip}
          isOpen={isInfoTooltip}
          onClose={closeAllPopups}
        ></InfoTooltip>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
