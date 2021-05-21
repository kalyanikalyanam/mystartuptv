import React from "react";
import Loader from "react-loader-spinner";
class Loaderpage1 extends React.Component {
  //other logic
  render() {
    return (
      <div>
        <Loader
          type="Circles"
          color="#fab308"
          height={50}
          width={50}
          timeout={70000}
        />
      </div>
    );
  }
}
export default Loaderpage1;
