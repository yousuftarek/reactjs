import React, { Component } from "react";
import "react-router-dom";

class bookFair extends Component {
   constructor(props){
       super(props);
   }
  
  render() {
    return (
        <div class="sticky__header" style={{ textAlign: "center",backgroundColor: "#b8b7b7" }}>
          <h2>অমর একুশে গ্রন্থমেলা ২০২০ 'গ্রন্থিক ডট কম' এর স্টল নং ২১১</h2>
          <h4>গ্রন্থমেলায় প্রকাশিত সকল বইয়ের খবর রাখতে চোখ রাখুন 'গ্রন্থিক ডট কম' এ...</h4>
      </div>
    );
  }
}

export default bookFair;