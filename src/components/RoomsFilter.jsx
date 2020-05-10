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
                {/* select the price */}
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
                {/* end select the price */}
              </form>
            </section>
          </>
        );
      }}
    </RoomConsumer>
  );
};

export default RoomsFilter;
