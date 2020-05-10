import React, { Component } from "react";
import Loading from "./Loading";
import { RoomContext } from "../Context";
import Room from "./Room";
import Title from "./Title";

class FeaturedRooms extends Component {
  static contextType = RoomContext;

  render() {
    const { loading, featuredRooms } = this.context;

    return (
      <div>
        <section className="featured-rooms">
          <Title title="featured rooms" />
          <div className="featured-rooms-center">
            {loading ? (
              <Loading />
            ) : (
              featuredRooms.map((room) => <Room key={room.id} room={room} />)
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default FeaturedRooms;
