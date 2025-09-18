import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface pour l'état de navigation - basée sur l'ancien store Gatsby
interface NavigationState {
  navigatorPosition: string;
  navigatorShape: string;
  navigatorFilter: string;
  isWideScreen: boolean;
  scrollToTop: boolean;
  fontSizeIncrease: number;
  categoryFilter: string;
}

// État initial - exactement comme dans l'ancien code Gatsby
const initialState: NavigationState = {
  categoryFilter: "all posts",
  fontSizeIncrease: 1, 
  isWideScreen: false,
  navigatorFilter: "",
  navigatorPosition: "is-aside",
  navigatorShape: "open",
  scrollToTop: false
};

const navigationSlice = createSlice({
  initialState,
  name: 'navigation',
  reducers: {
    // Actions supplémentaires pour la logique de navigation Gatsby
    featureNavigator: (state) => {
      if (state.navigatorPosition === "is-aside") {
        state.navigatorPosition = "is-featured";
        state.navigatorShape = "open";
      }
    },
    moveNavigatorAside: (state, action: PayloadAction<string | undefined>) => {
      const navigatorShape = action.payload || "open";
      if (state.navigatorPosition === "is-featured") {
        state.navigatorPosition = "is-aside";
        state.navigatorShape = navigatorShape;
      }
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload;
    },
    setFontSizeIncrease: (state, action: PayloadAction<number>) => {
      state.fontSizeIncrease = action.payload;
    },
    setIsWideScreen: (state, action: PayloadAction<boolean>) => {
      state.isWideScreen = action.payload;
    },
    setNavigatorFilter: (state, action: PayloadAction<string>) => {
      state.navigatorFilter = action.payload;
    },
    // Actions exactement comme dans l'ancien store Gatsby
    setNavigatorPosition: (state, action: PayloadAction<string>) => {
      state.navigatorPosition = action.payload;
    },
    setNavigatorShape: (state, action: PayloadAction<string>) => {
      state.navigatorShape = action.payload;
    },
    setScrollToTop: (state, action: PayloadAction<boolean>) => {
      state.scrollToTop = action.payload;
    }
  }
});

export const { 
  featureNavigator, 
  moveNavigatorAside, 
  setCategoryFilter,
  setFontSizeIncrease, 
  setIsWideScreen,
  setNavigatorFilter,
  setNavigatorPosition,
  setNavigatorShape,
  setScrollToTop
} = navigationSlice.actions;

export default navigationSlice.reducer;
