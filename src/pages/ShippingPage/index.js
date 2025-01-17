import React from "react";
import { connect } from "react-redux";
import Burger from "../../components/Burger";
import Button from "../../components/General/Button"
import css from "./style.module.css"
import ContactData from "../../components/ContactData";
import { Route } from "react-router-dom/cjs/react-router-dom.min";

class ShippingPage extends React.Component {
  cancelOrder = () => {
    this.props.history.push("/");
  }

  showContactData = () => {
    this.props.history.replace("/ship/contact")
  }

  render() {
    return (
      <div className={css.ShippingPage}>
        <p><strong>Таны захиалга амттай байж магадгүй</strong></p>
        <p style={{ fontSize: "24px" }}>
          <strong>Дүн : {this.props.price}₮</strong>
        </p>
        <Burger />
        <Button 
          daragdsan={this.cancelOrder} 
          btnType="Danger"
          text="ЗАХИАЛГЫГ ЦУЦЛАХ"  
        />
        <Button 
          daragdsan={this.showContactData} 
          btnType="Success"
          text="ХҮРГЭЛТИЙН МЭДЭЭЛЭЛ ОРУУЛАХ"  
        />
        <Route path="/ship/contact">
          <ContactData />
        </Route>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    price: state.burgerReducer.totalPrice
  };
};

export default connect(mapStateToProps)(ShippingPage);