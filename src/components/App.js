import "./App.css";
import { Button } from "./Button"; // можно и без фигурных скобок, но тогда надо в самом компоненте экспортировать с default. Тут мы достаем объект с полями
import { Input } from "./Input";
import { Card } from "./Card";
import { Spinner } from "./Spinner";
import { React, useEffect, useState } from "react";
import Api from "../utils/Api";

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
        .then((res) => {
          const cardsFromApi = res.results.map((item) => ({
            id: item.id,
            src: item.urls.regular,
            alt: item.alt_description,
            title: item.description,
            subtitle: item.user.name,
          }));
          setCards(cardsFromApi);
        })
        .finally(() => setIsSubmitted(false));
    } // Независимо от того,как выполнился запрос, с ошибкой или нормально, в конце, отключаем спиннер
  }, [isSubmitted]); // массив зависимостей . Пустой массив означает, что  функция должна быть запущена один раз при запуске страницы
  // !!! каждый раз, когда searchQuery будет изменяться, useEffect будет запускаться заново  и только тогда.
  // декларативный подход.

  //  для компонента Button: у нас обработчик - это функция, а не результат ее вызова... мы не можем просто написать setSearchQuery,
  //  иначе она вызовется при рендере кнопки сразу, до клика еще. Используем () => функция

  return (
    <div className="App">
      <div className="App-content">
        <h1 className="App-header">Search API</h1>
        <form className="App-search" onSubmit={handleSubmit}>
          <Input
            placeholder="Type search text"
            onChange={handleChange}
            value={searchQuery}
          />
          <Button type="submit" title="Search">
            <span>Search</span>
          </Button>
        </form>
        {isSubmitted ? (
          <Spinner />
        ) : (
          <div className="App-card">
            {cards.map(({ id, ...props }) => (
              <Card key={id} {...props} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
