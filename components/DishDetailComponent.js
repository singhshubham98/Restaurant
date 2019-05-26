import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Modal,
  StyleSheet,
  Button,
  Alert,
  PanResponder
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postComment, postFavorite } from "../redux/actionCreators";
import * as Animatable from "react-native-animatable";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  };
};

const mapDispatchToProps = dispatch => ({
  postFavorite: dishId => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment))
});

const RenderDish = props => {
  handleViewRefs = ref => (this.view = ref);

  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx < -200) {
      return true;
    } else {
      return false;
    }
  };

  const recognizeComment = ({ moveX, moveY, dx, dy }) => {
    if (dx > 200) {
      return true;
    } else {
      return false;
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    onPanResponderGrant: () => {
      this.view
        .rubberBand(1000)
        .then(endState =>
          console.log(endState.finished ? "finished" : "cancelled")
        );
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log("pan responder end", gestureState);
      if (recognizeDrag(gestureState)) {
        Alert.alert(
          "Add Favorite",
          "Are you sure to add " + dish.name + "to favorite?",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => {
                console.log("Cancel pressed");
              }
            },
            {
              text: "OK",
              onPress: () => {
                props.favorite
                  ? console.log("Already favorite")
                  : props.onPress();
              }
            }
          ],
          { cancelable: false }
        );
      } else if (recognizeComment(gestureState)) props.onShowModal();
      return true;
    }
  });

  const dish = props.dish;
  if (dish != null) {
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
        ref={this.handleViewRefs}
        {...panResponder.panHandlers}
      >
        <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View style={styles.cardRow}>
            <Icon
              raised
              reverse
              name={props.favorite ? "heart" : "heart-o"}
              type="font-awesome"
              color="#f50"
              onPress={() =>
                props.favorite
                  ? console.log("Already favorite")
                  : props.onPress()
              }
            />
            <Icon
              raised
              reverse
              name={"pencil"}
              type="font-awesome"
              color="#512DA8"
              style={styles.cardItem}
              onPress={() => props.onShowModal()}
            />
          </View>
        </Card>
      </Animatable.View>
    );
  } else {
    return <View />;
  }
};

function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating
          type="star"
          fractions={0}
          startingValue={+item.rating}
          imageSize={10}
          readonly
          style={{ alignItems: "flex-start", paddingVertical: "5%" }}
        />
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}
        </Text>
      </View>
    );
  };

  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      rating: 5,
      author: "",
      comment: "",
      showModal: false
    };
  }
  markFavorite = dishId => {
    this.props.postFavorite(dishId);
  };

  static navigationOptions = {
    title: "Dish Details"
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  handleComment = dishId => {
    this.toggleModal();
    this.props.postComment(
      dishId,
      this.state.rating,
      this.state.author,
      this.state.comment
    );
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      favorites: [],
      rating: 5,
      author: "",
      comment: ""
    });
  };

  render() {
    const dishId = this.props.navigation.getParam("dishId", "");
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some(dish => dish === dishId)}
          onPress={() => this.markFavorite(dishId)}
          onShowModal={() => this.toggleModal()}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            comment => comment.dishId === dishId
          )}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
          onShowModal={() => this.toggleModal()}
        >
          >
          <View style={styles.modal}>
            <Rating
              showRating
              type="star"
              fractions={0}
              startingValue={this.state.rating}
              imageSize={32}
              onFinishRating={rating => this.setState({ rating: rating })}
              style={{ paddingVertical: 10 }}
            />
            <Input
              placeholder="Author"
              leftIcon={{ type: "font-awesome", name: "user-o" }}
              onChangeText={author => {
                this.setState({
                  author: author
                });
              }}
              value={this.state.author}
            />
            <Input
              placeholder="Comment"
              leftIcon={{ type: "font-awesome", name: "comment-o" }}
              onChangeText={comment => {
                this.setState({
                  comment: comment
                });
              }}
              value={this.state.comment}
            />
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => this.handleComment(dishId)}
                color="#512DA8"
                title="Submit"
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => this.toggleModal()}
                color="grey"
                title="Cancel"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 20
  },
  cardRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20
  },
  cardItem: {
    flex: 1,
    margin: 10
  },
  cancelButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 15
  },
  submitButton: {
    alignItems: "center",
    backgroundColor: "#512DA8",
    padding: 10,
    margin: 15
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishDetail);
