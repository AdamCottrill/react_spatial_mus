import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm, useFieldArray } from "react-hook-form";
import { FaMapMarkerAlt } from "react-icons/fa";

import { ButtonBar } from "../components/ButtonBar";
import { FieldArrayButtons } from "../components/FieldArrayButtons";
import { Input } from "../components/FormControls";

import { ClickableMap } from "../components/ClickableMap";
import { PointMap } from "../components/PointMap";

export const MapModal = () => {
  const [show, setShow] = useState(false);

  const [point, setPoint] = useState([]);
  const [points, setPoints] = useState([]);

  const [showRules, setShowRules] = useState(false);

  const initialValues = [
    {
      space: "00",
      space_des: "Project Study Area",
      dd_lat: "",
      dd_lon: "",
    },
  ];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { fn026: initialValues },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "fn026",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

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
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <Button className="me-2" size="sm" onClick={() => ShowMap()}>
              Show Map
            </Button>

            <Button className="me-2" size="sm" onClick={() => clearPoints()}>
              Clear Points
            </Button>
            {points && showPoints(points)}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {fields.map((item, index) => (
                <div key={index} className="card my-2">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-2 mb-3">
                        <Input
                          name={`fn026.${index}.space`}
                          label="Space"
                          type="text"
                          register={register}
                          errors={errors}
                          index={index}
                        />
                      </div>

                      <div className="col-7 mb-3">
                        <Input
                          name={`fn026.${index}.space_des`}
                          label="Space Description"
                          type="text"
                          register={register}
                          errors={errors}
                          index={index}
                        />
                      </div>

                      <FieldArrayButtons
                        index={index}
                        fields={fields}
                        remove={remove}
                        move={move}
                      />
                    </div>

                    <div className="row  align-items-end">
                      <div className="col-5">
                        <Input
                          name={`fn026.${index}.dd_lat`}
                          label="Latitude"
                          type="text"
                          register={register}
                          errors={errors}
                          index={index}
                        />
                      </div>

                      <div className="col-5">
                        <Input
                          name={`fn026.${index}.dd_lon`}
                          label="Longitude"
                          type="text"
                          register={register}
                          errors={errors}
                          index={index}
                        />
                      </div>

                      <div className="col-2">
                        <button type="button" className="btn btn-outline-info">
                          <span className="mx-1">
                            <FaMapMarkerAlt />
                          </span>
                          Map
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <hr />

              <ButtonBar
                append_values={initialValues[0]}
                button_label="Add Another Space"
                reset={reset}
                append={append}
              />
            </form>
          </div>
          <div className="col-md-6">
            <h5>
              <PointMap points={points} height={600} width={700} />
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
