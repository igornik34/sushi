import React, { useEffect, useState } from "react";
import classes from "./MealList.module.css";
import Card from "../../UI/Card/Card";
import MealItem from "../MealItem/MealItem";
import axios from "axios";

function MealList() {
  const [meals, setMeals] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('http://127.0.0.1:8000/api/sushi/')
      setMeals(data)
    }
    fetchData()
  }, [])

  const mealList = meals.map((meal) => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} totalCount={meal.total_count} />);
  return (
    <div className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </div>
  );
}

export default MealList;
