import React from "react";
import Button from "../General/Button";
import { connect } from "react-redux";

const OrderSummary = (props) => {
  return (
    <div>
      <h3>Таны захиалга</h3>
      <p>Таны сонгосон орцууд</p>
      <ul>
        {Object.keys(props.ingredients).map(el => (
          <li key={el}>{props.ingredientNames[el]} : {props.ingredients[el]}</li>
        ))}
      </ul>
      <p>
        <strong>захиалгын дүн: {props.price}</strong>
      </p>
      <p>Цаашаа үргэлжлүүлэх үү</p>
      <Button daragdsan={props.onCancel} btnType="Danger" text="Татгалзах"/>
      <Button daragdsan={props.onContinue} btnType="Success" text="Үргэлжлүүлэх"/>
    </div>);
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerReducer.ingredients,
    ingredientNames: state.burgerReducer.ingredientNames,
    price: state.burgerReducer.totalPrice
  }
}

export default connect(mapStateToProps)(OrderSummary);