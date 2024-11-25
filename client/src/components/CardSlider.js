import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Card, Button } from "react-bootstrap";
import "./CardSlider.css";
import Spinner from "react-bootstrap/Spinner";
import { BASE_URL } from "../Url";
const CardSlider = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL()}/api/v1/getAllUsers`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setUsers(data.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <Spinner animation="border" size="10%" style={"align-item:centre"} />
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Slider {...settings}>
      {users.length > 0 ? (
        users.map((user, idx) => {
          const imageUrl = user.adImage
            ? `BASE_URL()/${user.adImage}`
            : "img/simple.png";
          return (
            <div key={idx}>
              <Card style={{ width: "15rem", margin: "0 auto" }}>
                <Card.Img
                  variant="top"
                  src={imageUrl}
                  alt={`${user.jobTitle}'s image`}
                />
                <Card.Body>
                  <Card.Title>{user.jobTitle}</Card.Title>
                  <Card.Text>
                    {user.description || "No description available"}
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </div>
          );
        })
      ) : (
        <div>No users found</div>
      )}
    </Slider>
  );
};

export default CardSlider;
