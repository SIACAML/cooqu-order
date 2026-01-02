import { useFormContext } from "react-hook-form";
import { FormValues, ORDER_TYPES, CATEGORIES, CUISINES } from "../../schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { TimePicker } from "./TimePicker";
import { LocationSearch } from "./LocationSearch";

export function OrderBasics() {
  const { control, watch } = useFormContext<FormValues>();
  const orderType = watch("orderType");
  const category = watch("category");

  // Get tomorrow's date for min attribute (for disabled matcher)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div className="space-y-6">
      {/* Order Type - Segmented Control style using Tabs or custom buttons */}
      <FormField
        control={control}
        name="orderType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Order Type</FormLabel>
            <FormControl>
              <div className="flex gap-2 p-1 bg-muted rounded-lg">
                {ORDER_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      const current = field.value || [];
                      let newValue;
                      if (current.includes(type)) {
                        // Don't allow unselecting if it's the only one left
                        if (current.length > 1) {
                          newValue = current.filter((v: string) => v !== type);
                        } else {
                          return; // Do nothing
                        }
                      } else {
                        newValue = [...current, type];
                      }
                      field.onChange(newValue);
                    }}
                    className={cn(
                      "flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200",
                      field.value?.includes(type)
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Request Category - Improved UI */}
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <div className="w-full">
                {/* Desktop: Flex Wrap, Mobile: Horizontal Scroll */}
                <div className="flex flex-wrap gap-2 pb-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => field.onChange(cat)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border",
                        field.value === cat
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-background text-muted-foreground border-input hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Cuisine - Single-select Chips */}
      <FormField
        control={control}
        name="cuisine"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cuisines (Select one)</FormLabel>
            <FormControl>
              <div className="flex flex-wrap gap-2">
                {CUISINES.map((cuisine) => {
                  const isSelected = field.value === cuisine;
                  return (
                    <Button
                      key={cuisine}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => field.onChange(cuisine)}
                      className={cn(
                        "rounded-full transition-all",
                        isSelected && "ring-2 ring-offset-1 ring-primary"
                      )}
                    >
                      {cuisine}
                    </Button>
                  );
                })}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Date & Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <TimePicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Location - Only for Delivery */}
      {orderType?.includes("Delivery") && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <FormLabel className="mb-2 block">Delivery Location</FormLabel>
          <LocationSearch />
          <p className="text-[0.8rem] text-muted-foreground mt-1">
            Enter your location to auto-detect address details.
          </p>
        </div>
      )}
    </div>
  );
}
