import {create} from 'zustand';

const useMenuStore = create((set) => ({
  totalPrice: 0,
  selectedOptions: [],
  updateTotalPrice: (price) => set((state) => ({ totalPrice: state.totalPrice + price })),
  toggleOption: (option, isChecked) =>
    set((state) => ({
      selectedOptions: isChecked
        ? [...state.selectedOptions, option]
        : state.selectedOptions.filter((selectedOption) => selectedOption !== option),
    })),
}));

export default useMenuStore;






