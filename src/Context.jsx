import React, { Component } from "react";
//import items from "./data";
import client from "./Contentful";

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    featuredRooms: [],
    sortedRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };

  componentDidMount() {
    this.getData();
  }

  // Get Data
  getData = async () => {
    client
      .getEntries({ content_type: "beachResortRoom", order: "sys.createdAt" })
      .then((response) => {
        const rooms = this.formatData(response.items);
        const featuredRooms = rooms.filter((room) => room.featured === true);
        const maxPrice = Math.max(...rooms.map((room) => room.price));
        const maxSize = Math.max(...rooms.map((room) => room.size));

        this.setState({
          rooms,
          featuredRooms,
          sortedRooms: rooms,
          loading: false,
          price: maxPrice,
          maxPrice,
          maxSize,
        });
      });
  };

  //Format Data
  formatData = (items) => {
    const tmpItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tmpItems;
  };

  // Get Single Room
  getRoom = (slug) => {
    let tmpRooms = [...this.state.rooms];
    const room = tmpRooms.find((r) => r.slug === slug);
    return room;
  };

  handleChange = ({ currentTarget: input }) => {
    const type = input.type;
    const name = input.name;
    const value = type === "checkbox" ? input.checked : input.value;

    this.setState({ [name]: value }, this.handleFilterRooms);
  };

  handleFilterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = this.state;
    let tmpRooms = [...rooms];

    // Parse To Int
    capacity = parseInt(capacity);
    price = parseInt(price);

    if (type !== "all")
      tmpRooms = tmpRooms.filter((room) => room.type === type);

    if (capacity !== 1)
      tmpRooms = tmpRooms.filter((room) => room.capacity >= capacity);

    tmpRooms = tmpRooms.filter((room) => room.price <= price);

    tmpRooms = tmpRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );

    if (breakfast)
      tmpRooms = tmpRooms.filter((room) => room.breakfast === true);

    if (pets) tmpRooms = tmpRooms.filter((room) => room.pets === true);

    this.setState({ sortedRooms: tmpRooms });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };
