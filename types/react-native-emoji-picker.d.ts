// types/react-native-emoji-picker.d.ts

declare module "react-native-emoji-picker" {
  import { Component } from "react";
  import { TextStyle, ViewStyle } from "react-native";

  export interface EmojiPickerProps {
    onEmojiSelected: (emoji: string) => void;
    showTabs?: boolean;
    showSearchBar?: boolean;
    showSectionTitles?: boolean;
    showHistory?: boolean;
    numColumns?: number;
    numFrequentlyUsedEmoji?: number;
    containerStyle?: ViewStyle;
    tabsContainerStyle?: ViewStyle;
    searchStyle?: TextStyle;
    emojiSize?: number;
    showSearchHistory?: boolean;
    clearButtonText?: string;
    searchPlaceholder?: string;
    frequentlyUsedEmoji?: string[];
    defaultFrequentlyUsedEmoji?: string[];
    resetSearch?: boolean;
    loggingFunction?: (message: string) => void;
    verboseLoggingFunction?: (message: string) => void;
  }

  export default class EmojiPicker extends Component<EmojiPickerProps> {}
}
