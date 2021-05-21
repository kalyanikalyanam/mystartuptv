// import React from 'react';
// import Loader from 'react-loader-spinner'
//  class Loaderpage extends React.Component {
//   //other logic
//     render() {
//      return(
//          <div>
//       <Loader
//          type="Puff"
//          color="orange"
//          height={100}
//          width={100}
//          timeout={20000} //6 secs
        

//       />
//       </div>
//      );
//     }
//  }
//  export default Loaderpage;

import React from 'react';
import Loader from 'react-loader-spinner'
 class Loaderpage extends React.Component {
  //other logic
    render() {
     return(
         <div>
      <Loader
         type="Circles"
         color="#fab308"
         height={100}
         width={100}
         timeout={2000} 
        

      />
      </div>
     );
    }
 }
 export default Loaderpage;