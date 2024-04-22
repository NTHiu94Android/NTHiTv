import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as AMT from "react-native-animatable";
const TVSControlPopup = ({
  isShow,
  onHide,
  children,
  bottom,
  title,
  maxHeight = 600,
  minHeight,
  backgroundColor = "white",
}) => {
  return (
    <Modal
      transparent={true}
      visible={isShow}
      style={[{
        justifyContent: "flex-end",
        margin: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      }]}
    >
      <View style={{
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }} />

      <View style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <HideArea onHide={onHide} />
        <AMT.View
          duration={300}
          animation={"fadeInUp"}
          style={{
            backgroundColor: backgroundColor,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            paddingBottom: Platform.OS === "ios" ? 0 : 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
          }}
        >
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              flexDirection: "row",
              backgroundColor: 'white',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}
          >
            <PopupTitle>{title}</PopupTitle>
            <TouchableOpacity onPress={onHide}>
              <Icon size={20} style={{
                opacity: 0.8,
                color: 'black'
              }} name={"close"} />
            </TouchableOpacity>
          </View>
          <View style={{
            padding: 10,
            maxHeight,
            minHeight,
          }} >
            {children}
          </View>
          <SafeAreaView>
            <View style={{
              paddingTop: 10,
              paddingHorizontal: 20,
              flexDirection: "row",
              justifyContent: "center",
            }} >
              {bottom}
            </View>
          </SafeAreaView>
        </AMT.View>
        <HideArea onHide={onHide} />
      </View>
    </Modal>
  );
};
const PopupTitle = ({ children }) => {
  return (
    <View style={{ flex: 1, }}>
      <Text style={{
        fontSize: 16,
        fontWeight: "bold",
        // textTransform: "uppercase",
        opacity: 0.8,
        paddingVertical: 10,
      }} >
        {children}
      </Text>
    </View>
  );
};
const HideArea = ({ onHide }) => {
  return <TouchableOpacity style={{ flex: 1 }} onPress={onHide} />;
};

export default TVSControlPopup;
