import React, { useEffect, useState} from 'react';
import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import AddCardPopup from "./AddCardPopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import NoFound from "./NoFound";
import ConfirmDeletePopup from './ConfirmDeletePopup'
import api from "../utils/Api";
//---------------------HOC--------------------------------------------/
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { ProtectedRouteElement } from "../hooks/ProtectedRoute";

// ---------------------------Роутинг--------------------------------------/
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom'; // импортируем Routes
import Login from './sign-in/Login'
import Register from './sign-up/Register'
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";



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
    const [isConfirmDelCardPopupOpen, setIsConfirmDelCardPopupOpen] = useState(false);
    // данные карточки на полный экран
    const [selectedCard, setSelectedCard] = useState(false);
    // открытие попап карточки на весь экран
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

    // открытие попап карточки об успешной регистрации
    const [isInfoTooltip, setInfoTooltip] = useState(false); //+

    const [tooltip, setTooltip] = React.useState({ image: "", message: "" });

    const navigate = useNavigate();

    // данные пользователя email и password с сервера
    const [userData, setUserData] = useState({email: ''});

    // Контекст текущего пользователя
    const [currentUser, setCurrentUser] = useState({});

    const [cards, setCards] = useState([]);
    const [cardId, setCardId] = useState('');
    // рендер текста для кнопкок формы после нажатия на сабмит
    const [isLoading, setIsLoading] = useState(false);

    const handlePopup = isEditProfilePopupOpen || isAddCardPopupOpen || isEditAvatarPopupOpen || isImagePopupOpen || isConfirmDelCardPopupOpen || isInfoTooltip

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddCardPopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmDelCardPopupOpen(false);
        setIsImagePopupOpen(false);
        setInfoTooltip(false)
    }

    // ----------------------------------------------------Попап закрытие по ESC и оверлею
    useEffect(() => {
        function closeByEscape(evt) {
            if(evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        const handleOverlay = (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                closeAllPopups();
            }
        };

        if(handlePopup) { // навешиваем только при открытии
            document.addEventListener('keydown', closeByEscape);
            document.addEventListener('mousedown', handleOverlay);
                return () => {
                    document.removeEventListener('keydown', closeByEscape);
                    document.removeEventListener('mousedown', handleOverlay);
                }
        }
    }, [handlePopup])

    // Инициализация User info
    useEffect(() => {
        api.getDataUser()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch(console.error);
    }, []);

    // Инициализация Card
    useEffect(() => {
        api.getInitialCards()
            .then((initialCards) => {
                setCards(initialCards);
            })
            .catch(console.error)
    }, []);

    // ---------------------------------------------------------> Открыте изображение
    function handleCardClick(card) {
        setIsImagePopupOpen(true);
        setSelectedCard(card);
    }



    // Api---------------------------------------------------------> Like
    function handleCardLike(cardId, likes) {
        const isLiked = likes.some((i) => i._id === currentUser._id);
        api.changeLikeCardStatus(cardId, !isLiked)
            .then((newCard) => {setCards((state) => state.map((element) => (element._id === cardId ? newCard : element)));})
            .catch(console.error)
    }
    // Api---------------------------------------------------------> Удаление карточки
    function handleCardDelete() {
        setIsLoading(true);
        api.deleteCard(cardId)
            .then(() => { setCards(cards.filter(item => item._id !== cardId))
                closeAllPopups();
            })
            .catch(console.error)
            .finally(() => {
                setIsLoading(false);
            })

    }

    function handleCardDeleteClick(card) {
        setCardId(card);
        setIsConfirmDelCardPopupOpen(true);
    }

    // Api---------------------------------------------------------> Изменение данных пользователя
    function handleUpdateUser(userData) {
        setIsLoading(true);
        api.saveDataInfo(userData)
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
        api.saveDataProfile(userData)
            .then((userAvatar) => {
                setCurrentUser(userAvatar);
                closeAllPopups();
            })
            .catch(console.error)
            .finally(() => {
                setIsLoading(false);
            })
    }

    // Api---------------------------------------------------------> Добавление карточки
    function handleAddPlaceSubmit(inputValues) {
        setIsLoading(true);
        api.saveCardInfo(inputValues).then(cardData => {
            setCards([cardData, ...cards]);
            closeAllPopups();
        })
            .catch(console.error)
            .finally(() => {
                setIsLoading(false);
            })
    }

    // ---------------------------------------------------------> Аутинфикация пользоватедя
    function tokenCheck(){
        const jwt = localStorage.getItem('jwt')
        if (jwt){
            auth.getContent(jwt)
                .then(({data}) => {
                    navigate('/app');
                    setLoggedIn(true);
                    setUserData({email: data.email})

                })
                .catch(err => console.log(err))
        }
    }
    useEffect(()=> {
        tokenCheck()
    },[])


    // ---------------------------------------------------------> Регистрация пользователя
    function handleRegisterUser(formValue) {
        //console.log(formValue)
        const { password, email } = formValue;
        auth.register(password, email)
            .then((res) => {
                if(res.message || res.error){
                    setInfoTooltip(true)
                    setTooltip({
                        image: false,
                        message: res.error || res.message,
                    });
                }else {
                    setInfoTooltip(true)
                    setTooltip({
                        image: true,
                        message: "Вы успешно зарегистрировались!",
                    });
                    navigate('/signin', {replace: true});
                    setTimeout(closeAllPopups, 2000);
                }
            })
            .catch((res) => {
                setTooltip({
                    image: false,
                    message: "Что-то пошло не так! Попробуйте ещё раз.",
                });
                console.log(res)
            });
    }

    // ---------------------------------------------------------> Авторизация пользователя

    function handleAuthorizeUser(formValue) {
        const { password, email } = formValue;
        auth.authorize(password, email)
            .then((response => response.json()))
            .then((data) => {
                if (data.token){
                    setUserData({email})
                    localStorage.setItem('jwt', data.token);
                    setLoggedIn(true);
                    navigate('/app', {replace: true});
                } else if (data.status === 401 || data.message){
                    setInfoTooltip(true)
                    setTooltip({
                        image: false,
                        message: 'Неверный адрес электронной почты или пароль!',
                    });
                }
            })
            .catch((res) => {
                setTooltip({
                    image: false,
                    message: "Что-то пошло не так! Попробуйте ещё раз.",
                });
                console.log(res)
            });

    }

    // ---------------------------------------------------------> Выход

    function signOut() {
        setUserData({email: ''})
        localStorage.removeItem('jwt');
        navigate('/signin', {replace: true});
        setLoggedIn(false);
    }


    return (
      <>
        <CurrentUserContext.Provider value={currentUser}>
            <Header
                loggedIn={loggedIn}
                userData={userData}
                signOut={signOut}
            />
            <Routes>
                <Route path="/" element={loggedIn ? <Navigate to="app" replace/> : <Navigate to="/signin" replace />} />
                <Route path="app" element={
                    <ProtectedRouteElement element={Main}
                        handleEditProfileClick={setIsEditProfilePopupOpen}
                        handleAddPlaceClick={setIsAddCardPopupOpen}
                        handleEditAvatarClick={setIsEditAvatarPopupOpen}
                        onCardLike={handleCardLike}
                        onCardDeleteClick={handleCardDeleteClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                 loggedIn={loggedIn}/> } />

                <Route path="/signin" element={
                    <Login
                        handleAuthorizeUser={handleAuthorizeUser}
                    />} />
                <Route path="/signup" element={
                    <Register
                        handleRegisterUser={handleRegisterUser}
                />} />
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
            >
            </ConfirmDeletePopup>

            <InfoTooltip
                tooltip={tooltip}
                isOpen={isInfoTooltip}
                onClose={closeAllPopups}
            >
            </InfoTooltip>

        </CurrentUserContext.Provider>
      </>

  );
}

export default App;
