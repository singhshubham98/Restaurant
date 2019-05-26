import React, { Component } from "react";
import { Text } from "react-native";
import { Card } from "react-native-elements";
import * as Animatable from "react-native-animatable";

function RenderAddressLines({ addressLines }) {
  const renderAddressLine = (line, index) => {
    return (
      <Text key={index} style={{ marginBottom: 10 }}>
        {line}
      </Text>
    );
  };

  return addressLines.map((line, index) => {
    return renderAddressLine(line, index);
  });
}

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressLines: [
        "121, Clear Water Bay Road",
        "Clear Water Bay, Kowloon",
        "HONG KONG",
        "Tel: +852 1234 5678",
        "Fax: +852 8765 4321",
        "Email:confusion@food.net"
      ]
    };
  }

  static navigationOptions = {
    title: "Contact"
  };

  render() {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card title="Contact Information">
          <RenderAddressLines addressLines={this.state.addressLines} />
        </Card>
      </Animatable.View>
    );
  }
}

export default Contact;
