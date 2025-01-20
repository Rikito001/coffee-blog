import { defineStore } from 'pinia';
import coffeePresets from '@/data/coffeePresets.json';

const STORAGE_KEY = 'coffee-builder-state';

export interface CoffeeIngredients {
  whipped_cream: number;
  milk_foam: number;
  steamed_milk: number;
  milk: number;
  water: number;
  liquor: number;
  chocolate: number;
  coffee: number;
}

export interface CoffeeState {
  coffeeName: string;
  currentCoffeeType: string;
  totalHeight: number;
  customIngredients: CoffeeIngredients;
  coffeeTypes: string[];
}

const getInitialState = (): CoffeeState => {
  const savedState = localStorage.getItem(STORAGE_KEY);
  if (savedState) {
    try {
      return JSON.parse(savedState);
    } catch (e) {
      console.error('Error parsing saved state:', e);
    }
  }

  return {
    coffeeName: 'Choose your coffee',
    currentCoffeeType: '',
    totalHeight: 0,
    customIngredients: {
      whipped_cream: 0,
      milk_foam: 0,
      steamed_milk: 0,
      milk: 0,
      water: 0,
      liquor: 0,
      chocolate: 0,
      coffee: 0
    },
    coffeeTypes: Object.keys(coffeePresets)
  };
};

export const useCoffeeStore = defineStore('coffee', {
  state: (): CoffeeState => getInitialState(),

  getters: {
    getCurrentType(): string {
      return this.currentCoffeeType;
    },
    getName(): string {
      return this.coffeeName;
    },
    getHeight(): number {
      return this.totalHeight;
    },
    getIngredients(): CoffeeIngredients {
      return this.customIngredients;
    },
    getTypes(): string[] {
      return this.coffeeTypes;
    }
  },

  actions: {
    saveState(): void {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        coffeeName: this.coffeeName,
        currentCoffeeType: this.currentCoffeeType,
        totalHeight: this.totalHeight,
        customIngredients: this.customIngredients,
        coffeeTypes: this.coffeeTypes
      }));
    },

    resetCustomIngredients(): void {
      Object.keys(this.customIngredients).forEach(key => {
        this.customIngredients[key as keyof CoffeeIngredients] = 0;
      });
      this.totalHeight = 0;
      this.saveState();
    },

    updateTotalHeight(): void {
      this.totalHeight = Object.values(this.customIngredients)
        .reduce((sum, value) => sum + value, 0);
      this.saveState();
    },

    changeCoffeeType(type: string): void {
      this.currentCoffeeType = type;
      this.coffeeName = type
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      this.resetCustomIngredients();

      if (type && type in coffeePresets) {
        const preset = (coffeePresets as Record<string, Partial<CoffeeIngredients>>)[type];
        Object.entries(preset).forEach(([ingredient, value]) => {
          if (value !== undefined) {
            this.customIngredients[ingredient as keyof CoffeeIngredients] = value;
          }
        });
      }

      this.updateTotalHeight();
    },

    updateIngredient(ingredient: keyof CoffeeIngredients, value: number): void {
      const newValue = Number(value);
      if (isNaN(newValue)) return;

      const otherIngredientsTotal = Object.entries(this.customIngredients)
        .reduce((sum, [key, val]) =>
            key !== ingredient ? sum + val : sum,
          0
        );

      const maxAllowed = 100 - otherIngredientsTotal;
      const adjustedValue = Math.min(Math.max(0, newValue), maxAllowed);

      this.customIngredients[ingredient] = adjustedValue;
      this.currentCoffeeType = '';
      this.coffeeName = 'Custom Coffee';
      this.updateTotalHeight();
    }
  }
});
