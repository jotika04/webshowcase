import React from "react";
import SwipeableViews from "react-swipeable-views";

import Image from "./image";

import Controls from "./Carouselcontrols";

const styles = {
  slide: {
    minHeight: 100,
    color: "#fff"
  },
  slide1: {},
  slide2: {},
  slide3: {}
};

const items = [
  {
    src:
      "https://images.pexels.com/photos/879356/pexels-photo-879356.jpeg?auto=compress&cs=tinysrgb&h=350",
    title: "Tower"
  },
  {
    src:
      "https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg?auto=compress&cs=tinysrgb&h=350",
    title: "Cookies"
  }
];

class Carousell extends React.Component {
  state = {
    index: 1
  };

  handleChangeIndex = index => {
    this.setState({ index });
  };
  render() {
    const { index } = this.state;
    return (
      <div>
        <SwipeableViews
          enableMouseEvents
          resistance
          index={index}
          onChangeIndex={this.handleChangeIndex}
        >
          {items.map((item, i) => (
            <div key={i} style={Object.assign({}, styles.slide)}>
              <Image title={item.title} src={item.src} />
            </div>
          ))}
        </SwipeableViews>
        <Controls
          itemsnumber={items.length}
          index={index}
          handleChangeIndex={this.handleChangeIndex}
        />
      </div>
    );
  }
}

export default Carousell;
