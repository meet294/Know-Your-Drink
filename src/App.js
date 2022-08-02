import "./App.css";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "./components/UI/Card";
import classes from "./components/UI/Card.module.css";
import imageh1 from "./Images/h1.png";
import scroll from "./Images/scroll.png";



function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const getResults = async () => {
      setLoading(true);
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
      );
      const list = await response.json();
      setResults(list.drinks);
      setLoading(false);
      
    };
    getResults();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <div className="App">
      <img className="scrolldown" src={scroll} alt="scroll" />
      <motion.h1
        animate={{
          opacity: 1,
        }}
        initial={{
          opacity: 0,
        }}
        transition={{
          duration: 2,
        }}
      >
        <img className="backgroundimage" src={imageh1} alt="bg" />
        Know your Drink
      </motion.h1>
      {!loading && (
        <form className="searchform" onSubmit={getSearch}>
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={updateSearch}
            className="searchinput"
          />
          <button className="searchbutton">Search</button>
        </form>
      )}

      {results !== null && (
        <div className="booklist" style={{ display: "flex", flexWrap: "wrap" }}>
          {results.map((item) => (
            <motion.div>
              <Card key={item.idDrink}>
                <motion.div key={item.idDrink} className={classes.container}>
                  <div className="cardtitle">
                    <img
                      src={item.strDrinkThumb}
                      className={classes.card_image}
                      alt={item.strDrink}
                    />

                    <motion.h2 className={classes.card_title}>
                      {item.strDrink}
                    </motion.h2>
                  </div>
                  <div className="cardingredients">
                    <motion.h3>Ingredients:</motion.h3>
                    <motion.h4>
                      <ol style={{ listStyle: "none" }}>
                        <li>
                          {item.strIngredient1} {item.strMeasure1}
                        </li>
                        <li>
                          {item.strIngredient2} {item.strMeasure2}
                        </li>
                        <li>
                          {item.strIngredient3} {item.strMeasure3}
                        </li>
                        <li>
                          {item.strIngredient4} {item.strMeasure4}
                        </li>
                        <li>
                          {item.strIngredient5} {item.strMeasure5}
                        </li>
                        <li>
                          {item.strIngredient6} {item.strMeasure6}
                        </li>
                      </ol>
                    </motion.h4>
                  </div>

                  <div className="cardinstructions">
                    <motion.h3>Instructions:</motion.h3>
                    {<motion.h5>{item.strInstructions}</motion.h5>}
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
