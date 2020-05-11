import React from "react";
// import { useContext } from "react";
import { RoomConsumer } from "../Context";
import Title from "./Title";
import _ from "lodash";

// Get Unique Only The Unique Type From Rooms

const getUniqueValue = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};

const RoomsFilter = ({ rooms }) => {
  //const context = useContext(RoomConsumer);
  return (
    <RoomConsumer>
      {(value) => {
        const {
          handleChange,
          type,
          capacity,
          price,
          minPrice,
          maxPrice,
          minSize,
          maxSize,
          breakfast,
          pets,
        } = value;

        let roomsType = getUniqueValue(rooms, "type");
        roomsType = ["all", ...roomsType];

        const roomsCapacity = getUniqueValue(rooms, "capacity");

        return (
          <>
            <section className="filter-container">
              <Title title="search rooms" />
              <form className="filter-form">
                {/* select type */}
                <div className="form-group">
                  <label htmlFor="type">room type</label>
                  <select
                    name="type"
                    id="type"
                    value={type}
                    className="form-control"
                    onChange={handleChange}
                  >
                    {roomsType.map((type) => (
                      <option key={Math.random()} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                {/* end select type */}
                {/* select capacity */}
                <div className="form-group">
                  <label htmlFor="capacity">geust</label>
                  <select
                    name="capacity"
                    id="capacity"
                    value={capacity}
                    className="form-control"
                    onChange={handleChange}
                  >
                    {roomsCapacity.map((capacity) => (
                      <option key={Math.random()} value={capacity}>
                        {capacity}
                      </option>
                    ))}
                  </select>
                </div>
                {/* end select capacity */}
                {/* select price */}
                <div className="form-group">
                  <label htmlFor="price">room price ${price}</label>
                  <input
                    type="range"
                    name="price"
                    id="price"
                    min={minPrice}
                    max={maxPrice}
                    value={price}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                {/* end select price */}
                {/* select size */}
                <div className="form-group">
                  <label htmlFor="size">room size</label>
                  <div className="size-inputs">
                    <input
                      type="number"
                      name="minSize"
                      id="size"
                      value={minSize}
                      onChange={handleChange}
                      className="size-input"
                    />
                    <input
                      type="number"
                      name="maxSize"
                      id="size"
                      value={maxSize}
                      onChange={handleChange}
                      className="size-input"
                    />
                  </div>
                </div>
                {/* end select size */}
                {/* select extras */}
                <div className="form-group">
                  <div className="single-extra">
                    <input
                      type="checkbox"
                      name="breakfast"
                      id="breakfast"
                      onChange={handleChange}
                      checked={breakfast}
                    />
                    <label htmlFor="breakfast">breakfast</label>
                  </div>
                  <div className="single-extra">
                    <input
                      type="checkbox"
                      name="pets"
                      id="pets"
                      onChange={handleChange}
                      checked={pets}
                    />
                    <label htmlFor="pets">pets</label>
                  </div>
                </div>
                {/* end select extras */}
              </form>
            </section>
          </>
        );
      }}
    </RoomConsumer>
  );
};

export default RoomsFilter;
