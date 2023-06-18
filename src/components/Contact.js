import { useState } from "react";
// import contactImg from "../assets/img/contact-img.svg";
// import contactImg from "../assests/img/connect-us.svg";
import { Container, Row, Col } from "react-bootstrap";
export const Contact = () => {
  // const formInitialDetails = {
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phone: "",
  //   message: "",
  // };

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phone, message } = user;

    if (firstName && lastName && email && phone && message) {
      const res = await fetch(
        "https://contact-us-968d2-default-rtdb.firebaseio.com/contactus.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone,
            message,
          }),
        }
      );
      if (res) {
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      }
      alert("Data sent sussess ");
    } else {
      alert("Oops Please fill all details");
    }
  };
  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          {/* <Col md={6}>
            <img src={contactImg} />
          </Col> */}
          <Col md={6}>
            <h2>Get In Touch</h2>
            <form method="POST">
              <Row>
                <Col sm={6} className="px-1">
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    placeholder="First Name"
                    onChange={getUserData}
                  />
                </Col>
                <Col sm={6} className="px-1">
                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    placeholder="Last Name"
                    onChange={getUserData}
                  />
                </Col>
                <Col sm={6} className="px-1">
                  <input
                    type="tel"
                    name="phone"
                    value={user.phone}
                    placeholder="Phone No"
                    onChange={getUserData}
                  />
                </Col>
                <Col sm={6} className="px-1">
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    placeholder="abc@gmail.com"
                    onChange={getUserData}
                  />
                </Col>
                <Col>
                  <textarea
                    rows="6"
                    name="message"
                    value={user.message}
                    placeholder="Message"
                    onChange={getUserData}
                  ></textarea>
                  <br />
                  <button type="submit" onClick={postData}>
                    <span>{"buttonText"}</span>
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
