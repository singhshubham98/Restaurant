import React, { Component } from "react";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import Reservation from "./ReservationComponent";
import DishDetail from "./DishDetailComponent";

import {
  View,
  Platform,
  Image,
  StyleSheet,
  ScrollView,
  Text
} from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView
} from "react-navigation";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import {
  fetchComments,
  fetchDishes,
  fetchPromos,
  fetchLeaders
} from "../redux/actionCreators";
import Favorites from "./FavoriteComponent";
import Login from "./LoginComponent";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchPromos: () => dispatch(fetchPromos())
});

const MenuNavigator = createStackNavigator(
  {
    Menu: {
      screen: Menu,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
            name="menu"
            size={40}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        )
      })
    },
    DishDetail: { screen: DishDetail }
  },
  {
    initialRouteName: "Menu",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff"
      },
      headerLeft: (
        <Icon
          name="menu"
          size={40}
          color="white"
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  }
);

const LoginNavigator = createStackNavigator(
  {
    Login: { screen: Login }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff"
      },
      headerLeft: (
        <Icon
          name="menu"
          size={40}
          color="white"
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  }
);

const ContactNavigator = createStackNavigator(
  {
    Contact: { screen: Contact }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff"
      },
      headerLeft: (
        <Icon
          name="menu"
          size={40}
          color="white"
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  }
);

const ReservationNavigator = createStackNavigator(
  {
    Reservation: { screen: Reservation }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff"
      },
      headerLeft: (
        <Icon
          name="menu"
          size={40}
          color="white"
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  }
);

const FavoritesNavigator = createStackNavigator(
  {
    Favorites: { screen: Favorites }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
        color: "#fff"
      },
      headerTintColor: "#fff",
      headerLeft: (
        <Icon
          name="menu"
          size={24}
          color="white"
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  }
);

const AboutNavigator = createStackNavigator(
  {
    About: { screen: About }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff"
      },
      headerLeft: (
        <Icon
          name="menu"
          size={40}
          color="white"
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  }
);

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("./images/logo.png")}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Green Apple</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator(
  {
    Login: {
      screen: LoginNavigator,
      navigationOptions: {
        title: "Login",
        drawerLabel: "Login",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="sign-in"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        )
      }
    },
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        title: "Home",
        drawerLabel: "Home",
        drawerIcon: ({ tintColor }) => (
          <Icon name="home" type="font-awesome" size={24} color={tintColor} />
        )
      }
    },
    About: {
      screen: AboutNavigator,
      navigationOptions: {
        title: "About us",
        drawerLabel: "About us",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="info-circle"
            type="font-awesome"
            size={22}
            color={tintColor}
          />
        )
      }
    },
    Menu: {
      screen: MenuNavigator,
      navigationOptions: {
        title: "Menu",
        drawerLabel: "Menu",
        drawerIcon: ({ tintColor }) => (
          <Icon name="list" type="font-awesome" size={24} color={tintColor} />
        )
      }
    },
    Contact: {
      screen: ContactNavigator,
      navigationOptions: {
        title: "Contact us",
        drawerLabel: "Contact us",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="address-card"
            type="font-awesome"
            size={22}
            color={tintColor}
          />
        )
      }
    },
    Favorites: {
      screen: FavoritesNavigator,
      navigationOptions: {
        title: "My Favorites",
        drawerLabel: "My Favorites",
        drawerIcon: ({ tintColor }) => (
          <Icon name="heart" type="font-awesome" size={24} color={tintColor} />
        )
      }
    },
    Reservation: {
      screen: ReservationNavigator,
      navigationOptions: {
        title: "Reserve Table",
        drawerLabel: "Reserve Table",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="cutlery"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    drawerBackgroundColor: "#D1C4E9",
    contentComponent: CustomDrawerContentComponent
  }
);

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight
        }}
      >
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor: "#512DA8",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row"
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 80
  },
  drawerHeaderText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
