import React, { Component } from "react";
import { Text } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { MailComposer } from "expo";

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
  sendMail() {
    MailComposer.composeAsync({
      recipients: ["shubhamsingh4204@gmail.com"],
      subject: "Enquiry",
      body: "To whom it may concern:"
    });
  }

  static navigationOptions = {
    title: "Contact"
  };

  render() {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card title="Contact Information">
          <RenderAddressLines addressLines={this.state.addressLines} />
          <Button
            title="Send Email"
            buttonStyle={{ backgroundColor: "#512DA8" }}
            icon={<Icon type="font-awesome" name="envelope-o" color="white" />}
            onPress={this.sendMail}
          />
        </Card>
      </Animatable.View>
    );
  }
}

export default Contact;
