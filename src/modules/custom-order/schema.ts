import { z } from "zod";

export const ORDER_TYPES = ["Delivery", "Pickup", "Dine-in"] as const;
export const CATEGORIES = ["Dish", "Catering", "Snack", "Bakery", "Sweet Dish"] as const;
export const DIET_TYPES = ["Veg", "Non-Veg", "Vegan"] as const;
export const UNITS = ["kg", "plate", "pcs", "ltr", "gm", "ml", "dozen"] as const;
export const CUISINES = [
  "Breakfast",
  "Indian",
  "Chinese",
  "Punjabi",
  "Gujarati Special",
  "South Indian",
  "Fast Food",
  "North Indian",
  "Italian"
] as const;
export const EVENT_STYLES = ["Buffet", "Sit-down", "Cocktail", "High Tea"] as const;

// Base schema for required fields
const baseSchema = z.object({
  orderType: z.array(z.enum(ORDER_TYPES)).min(1, "Select at least one order type"),
  category: z.enum(CATEGORIES),
  date: z.date().refine((date) => date > new Date(), {
    message: "Date must be in the future",
  }),
  time: z.string().min(1, "Please select a time"),
  itemName: z.string().min(2, "Item name is required"),
  dietType: z.enum(DIET_TYPES),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unit: z.enum(UNITS),
  description: z.string().min(10, "Please provide a brief description (min 10 chars)"),
  guestCount: z.number().min(1, "At least 1 guest required"),

  // Optional fields
  photos: z.any().optional(),
  cuisine: z.string().min(1, "Please select at least one cuisine"),
  cookingInstructions: z.string().optional(),
});

// Discriminated union or refinements based on category/orderType
export const formSchema = baseSchema
  .extend({
    // Delivery specific
    location: z.string().optional(),
    addressDetails: z.object({
      area: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      pincode: z.string().optional(),
    }).optional(),
    detailedAddress: z.object({
      houseNo: z.string().optional(),
      landmark: z.string().optional(),
    }).optional(),

    // Catering specific
    budget: z.number().optional(),
    eventStyle: z.string().optional(),
    staffNeeded: z.enum(["Yes", "No"]).optional(),

    // Bakery/Sweet-Dish specific
    size: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // 1. Delivery Validation
    if (data.orderType.includes("Delivery")) {
      if (!data.location || data.location.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Delivery address is required",
          path: ["location"],
        });
      }
    }

    // 2. Catering Validation
    if (data.category === "Catering") {
      if (!data.budget || data.budget <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Budget is required for catering",
          path: ["budget"],
        });
      }
    }

    // 3. Bakery/Sweet Dish Validation
    if (["Bakery", "Sweet Dish"].includes(data.category)) {
      // Size is optional in the prompt ("Visible ONLY for...", usually implies strictly relevant, but prompt says "Optional Details" section.
      // The prompt says "Size: Text Input (Visible ONLY for Bakery/Sweet-Dish)".
      // It is in the "Optional Details" section, so it shouldn't be required.
    }
  });

export type FormValues = z.infer<typeof formSchema>;
