import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { FaMapMarkerAlt } from "react-icons/fa";

import { ButtonBar } from "../components/ButtonBar";
import { FieldArrayButtons } from "../components/FieldArrayButtons";
import { Input } from "../components/FormControls";

import { ClickableMap } from "../components/ClickableMap";
import { PointMap } from "../components/PointMap";
import { MyMarker } from "../components/MyMarker";

export const MapModal = () => {
  const [show, setShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const [popupInfo, setPopupInfo] = useState();
  const [point, setPoint] = useState([]);

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
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { fn026: initialValues },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "fn026",
  });

  const values = useWatch({
    control,
    name: "fn026",
  });

  const markers = React.useMemo(
    () =>
      values
        .map((pt, i) => {
          const lon = pt.dd_lon ? parseFloat(pt.dd_lon) : null;
          const lat = pt.dd_lat ? parseFloat(pt.dd_lat) : null;
          if (lon && lat) {
            return (
              <MyMarker
                key={`marker-${i}`}
                lat={lat}
                lon={lon}
                onClick={() => {
                  setPopupInfo(values[i]);
                }}
              />
            );
          }
        })
        .filter((x) => typeof x !== "undefined"),
    [values]
  );

  const onSubmit = (data) => {
    console.log(data);
  };

  const ShowMap = (index) => {
    setShow(true);
    setCurrentIndex(index);
  };

  const handleHide = () => {
    if (point.length) {
      setValue(`fn026.${currentIndex}.dd_lon`, point[0]);
      setValue(`fn026.${currentIndex}.dd_lat`, point[1]);
      //addPoint(point);
    }
    setCurrentIndex();
    setPoint([]);
    setShow(false);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {fields.map((item, index) => (
                <div key={index} className="card my-3">
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
                        <button
                          type="button"
                          className="btn btn-outline-info"
                          onClick={() => ShowMap(index)}
                        >
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
              <PointMap
                markers={markers}
                popupInfo={popupInfo}
                setPopupInfo={setPopupInfo}
                height={600}
                width={700}
              />
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
