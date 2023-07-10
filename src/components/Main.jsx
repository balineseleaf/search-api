import { Button } from "./Button"; // можно и без фигурных скобок, но тогда надо в самом компоненте экспортировать с default. Тут мы достаем объект с полями
import { Input } from "./Input";
import { Card } from "./Card";
import { Spinner } from "./Spinner";
import "./App.css";

const Main = ({
  handleChange,
  handleSubmit,
  searchQuery,
  isSubmitted,
  cards,
}) => {
  return (
    <>
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
          <div className="App-cards">
            {cards.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

//cards.map((card) => <Card key={card.id} {...card} />
export default Main;
