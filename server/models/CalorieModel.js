import mongoose from "mongoose";

const daySchema = {
  calories: Number,
  carbs: Number,
  protein: Number,
  fats: Number,
};

const caloriesSchema = new mongoose.Schema({
  clerkUserId: String,
  Jours: {
    Jour0: daySchema,
    Jour1: daySchema,
    Jour2: daySchema,
    Jour3: daySchema,
    Jour4: daySchema,
    Jour5: daySchema,
    Jour6: daySchema,
  },
  JourTotal: daySchema,
});

const Calories = mongoose.model("Calories", caloriesSchema);

export default Calories;
