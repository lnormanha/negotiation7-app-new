import { Platform } from "react-native";

const icons = {
  add: require("../assets/images/icons/add.png"),
  back: require("../assets/images/icons/ic_back_arrow.png"),
  rightArrow: require("../assets/images/icons/ArrowRight.png"),
  remove: require("../assets/images/icons/ic_trash_can.png"),
  close: require("../assets/images/icons/ic_close.png"),
  search: require("../assets/images/icons/search.png"),
  us_flag: require("../assets/images/icons/us_flag.png"),
  br_flag: require("../assets/images/icons/br_flag.png"),
  chevron_right: require("../assets/images/icons/ic_chevron_right.png"),
  landing: require("../assets/images/icons/apartment.png"),
  preview: require("../assets/images/icons/file-find.png"),
  share:
    Platform.OS == "ios"
      ? require("../assets/images/icons/share-ios.png")
      : require("../assets/images/icons/share-android.png"),
  user: require("../assets/images/icons/icon-profile.png"),
  arrow_right: require("../assets/images/icons/ic_arrow_right.png"),
  report: require("../assets/images/icons/ic_report.png"),
  response: require("../assets/images/icons/ic_response.png"),
  calendar: require("../assets/images/icons/time.png"),
  fb: require("../assets/images/icons/ic_fb.png"),
  google: require("../assets/images/icons/ic_google.png"),
  header_neg: require("../assets/images/icons/header_neg.png"),
  object: require("../assets/images/icons/object.png"),
  objective: require("../assets/images/icons/objective.png"),
  interests: require("../assets/images/icons/interests.png"),
  macna: require("../assets/images/icons/macna.png"),
  trade_coin: require("../assets/images/icons/trade_coin.png"),
  neg_field: require("../assets/images/icons/neg_field.png"),
  arguments: require("../assets/images/icons/arguments.png"),
  questions: require("../assets/images/icons/questions.png"),
  next_steps: require("../assets/images/icons/next_steps.png"),
  folder: require("../assets/images/icons/Folder-01.png"),
  check: require("../assets/images/icons/check.png"),
  download: require("../assets/images/icons/download_icon.png"),
};

export default icons;
