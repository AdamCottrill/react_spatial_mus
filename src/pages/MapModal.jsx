import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { ClickableMap } from "../components/ClickableMap";
import { PointMap } from "../components/PointMap";

export const MapModal = () => {
  const [show, setShow] = useState(false);

  const [point, setPoint] = useState([]);
  const [points, setPoints] = useState([]);

  const ShowMap = () => {
    setShow(true);
  };

  const addPoint = (point) => setPoints([point, ...points]);
  const clearPoints = () => setPoints([]);

  const handleHide = () => {
    console.log("point = ", point);
    if (point.length) {
      addPoint(point);
    }
    setPoint([]);
    setShow(false);
  };

  const showPoints = (points) => {
    if (points.length) {
      return (
        <ul>
          {points.map((pt) => (
            <li key={`${pt[0]}-${pt[1]}`}>
              {pt[0].toFixed(3)}-{pt[1].toFixed(3)}
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Button className="me-2" size="sm" onClick={() => ShowMap()}>
              Show Map
            </Button>

            <Button className="me-2" size="sm" onClick={() => clearPoints()}>
              Clear Points
            </Button>

            {points && showPoints(points)}
          </div>
          <div className="col-md-8">
            <h5>
              <PointMap points={points} height={600} width={800} />
            </h5>
          </div>
        </div>
      </div>

      <Modal show={show} dialogClassName="modal-xl" onHide={() => handleHide()}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ClickableMap point={point} setPoint={setPoint} />
        </Modal.Body>
      </Modal>
    </>
  );
};
