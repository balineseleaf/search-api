import "./App.css";
import { React, useEffect, useState } from "react";
import Api from "../utils/Api";
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./Main";
import Photo from "./Photo";

function App() {
  const [cards, setCards] = useState([]); // возвращает UseState массив из 2 элементов
  const [searchQuery, setSearchQuery] = useState("");
  //const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    // при сабмите формы
    event.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value); // сэтит то, что мы ввели с клавиатуры в инпут , а дальше то, что лежит в searchQuery попадает в value инпута
  };

  useEffect(() => {
    // два аргумента - функция колбэк и массив зависимостей
    // при запуске ставим true и ждем выполнения запроса.
    if (isSubmitted) {
      //если true, то делаем запрос на сервер , в конце переводим в false и уже запрос не повториться
      Api.search(searchQuery)
        .then((data) => {
          setCards(
            data.results.map((item) => ({
              id: item.id,
              src: item.urls.regular,
              alt: item.alt_description,
              title: item.description,
              subtitle: item.user.name,
            }))
          );
        })
        .finally(() => setIsSubmitted(false));
    } // Независимо от того,как выполнился запрос, с ошибкой или нормально, в конце, отключаем спиннер
  }, [isSubmitted]); // массив зависимостей . Пустой массив означает, что  функция должна быть запущена один раз при запуске страницы
  // !!! каждый раз, когда searchQuery будет изменяться, useEffect будет запускаться заново  и только тогда.
  // декларативный подход.

  //  для компонента Button: у нас обработчик - это функция, а не результат ее вызова... мы не можем просто написать setSearchQuery,
  //  иначе она вызовется при рендере кнопки сразу, до клика еще. Используем () => функция

  //BrowserRouter предоставляет history API удобный, чтобы стрелочками могли туда-сюда управлять в самом браузере по истории посещения страниц

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Main
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              searchQuery={searchQuery}
              isSubmitted={isSubmitted}
              cards={cards}
            />
          }
        />
        <Route path="/photos/:id" element={<Photo photos={cards} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
