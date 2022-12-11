// import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../components/PopupCuisineList.css";
// import Razorpay from "razorpay";

export default function PopupCuisineList({ popup, setPopupValue, details }) {
  const cuisines = details?.cuisineNames?.map((c) => ({
    ...c,
    quantity: 0,
    showQuantityCounter: false,
  }));

  const [totalCost, setTOtalCost] = useState(0);
  const [cuisineList, setCuisineList] = useState(cuisines || []);

  function closePopup(popup) {
    setPopupValue(false);
  }

  useEffect(() => {
    let total = 0;
    cuisineList.map((item) => {
      total += item.quantity * item.cost;
    });
    setTOtalCost(total);
  }, [cuisineList]);

  // console.log("Total cost is "+totalCost);

  function subtractItems(id) {
    const clonedCuisineList = [...cuisineList];
    const cuisine = clonedCuisineList.find((c) => c.id === id);
    if (cuisine && cuisine.quantity > 0) {
      cuisine.quantity -= 1;
    }
    setCuisineList(clonedCuisineList);
  }
  function addItems(id) {
    const clonedCuisineList = [...cuisineList];
    const cuisine = clonedCuisineList.find((c) => c.id === id);
    if (cuisine) {
      cuisine.quantity += 1;
    }
    setCuisineList(clonedCuisineList);
  }

  function openQuantityCounter(id) {
    const clonedCuisineList = [...cuisineList];
    const cuisine = clonedCuisineList.find((c) => c.id === id);
    if (cuisine) {
      cuisine.showQuantityCounter = true;
    }
    setCuisineList(clonedCuisineList);
  }
//loadscript function has no error because dubg krte time ho raha tha
  const loadScript = (url) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const displayRazorPayConsole = async (amountToPay) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("You are offline ..Failed to load Razorpay");
    }

  const options = {
    key: "rzp_test_AdnDBw7R2Iutm9",
    currency: "INR",
    amount: amountToPay *100,
    name: "Zomato Clone",
    image:"https://logos-world.net/wp-content/uploads/2021/04/ava.jpg",
    description: "Pay Securely with us",
    handler: function (response) {
      alert(response.razorpay_payment_id);
      alert("payment successful");
    },
    preFill: {
      name: "Zomato Clone",
      email:"testData@gmail.com",
      contact:"9873847588"
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  }
  return <>(
{popup && <section className="modal-wrapper">
      <div className="popup">
        <div className="popup-header">
          <h6>
            <b>{details.name}</b>
          </h6>
          <h3 onClick={closePopup}>X</h3>
        </div>
        <div className="popup-body">
          {cuisineList.map((item, index) => (
            <div className="popup-body__wrapper">
              <div className="popup-body__text">
                <h5>
                  <b>{item.name}</b>
                </h5>
                <p>Rs.{item.cost}</p>
                {/* <br /> */}
                <p>Made with Chole and Maida</p>
              </div>
              <div className="popup-body__image position-relative">
                <img src={item.imageLink} alt="Not available"></img>
                <div className="counter position-absolute">
                  {!item.showQuantityCounter && (
                    <Button
                      className="add-button"
                      variant="danger"
                      onClick={() => openQuantityCounter(item.id)}
                    >
                      Add
                    </Button>
                  )}
                  {item.showQuantityCounter && (
                    <div className="incrementDecrementCounter">
                      <Button
                        className="subtractButton"
                        onClick={() => subtractItems(item.id)}
                        variant="light"
                      >
                        <b>-</b>
                      </Button>
                      <input
                        className="inputCounter"
                        type="text"
                        value={item.quantity}
                        max="10"
                      />
                      <Button
                        className="addButton"
                        onClick={() => addItems(item.id)}
                        variant="light"
                      >
                        <b>+</b>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="popup-footer">
          <div>
            Subtotal:
            {totalCost}
          </div>
          <Button
            variant="danger"
            onClick={() => displayRazorPayConsole(totalCost)}
          >
            Pay Now
          </Button>
        </div>
      </div>
    </section>
}
  )</>;
}
