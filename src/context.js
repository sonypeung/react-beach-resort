import React, { Component } from "react";
import Client from "./Contenful";

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    featuredRooms: [],
    sortedRooms: [],
    loading: true,
    type: "All",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  // getData
  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "beachResort"
      });

      let rooms = this.formatData(response.items);
      let featuredRooms = rooms.filter(room => room.featured === true);
      let maxPrice = Math.max(...rooms.map(item => item.price));
      let maxSize = Math.max(...rooms.map(item => item.size));

      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  componentDidMount() {
    this.getData();
  }

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }

  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;
    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;

    let tempRooms = [...rooms];

    capacity = parseInt(capacity);
    price = parseInt(price);

    if (type !== "All") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }

    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

    tempRooms = tempRooms.filter(room => room.price <= price);
    tempRooms = tempRooms.filter(
      room => room.size <= maxSize && room.size >= minSize
    );
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }
    this.setState({
      sortedRooms: tempRooms
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomContext, RoomConsumer };
