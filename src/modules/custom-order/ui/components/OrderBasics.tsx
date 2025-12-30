import { useFormContext } from "react-hook-form";
import { FormValues, ORDER_TYPES, CATEGORIES } from "../../schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Clock, MapPin } from "lucide-react";

export function OrderBasics() {
  const { control, setValue, watch } = useFormContext<FormValues>();
  const orderType = watch("orderType");

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
              <div className="flex p-1 bg-muted rounded-lg">
                {ORDER_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => field.onChange(type)}
                    className={cn(
                      "flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200",
                      field.value === type
                        ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                        : "text-muted-foreground hover:text-foreground"
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

      {/* Request Category - Tabs */}
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
                <Tabs value={field.value} onValueChange={(val) => field.onChange(val)} className="w-full">
                    <TabsList className="w-full h-auto flex-wrap justify-start gap-1 bg-muted p-1">
                        {CATEGORIES.map((cat) => (
                            <TabsTrigger key={cat} value={cat} className="flex-1 min-w-[80px]">
                                {cat}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
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
                <div className="relative">
                    <Input
                        type="time"
                        className="pl-10"
                        {...field}
                    />
                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Location - Only for Delivery */}
      {orderType === "Delivery" && (
        <FormField
            control={control}
            name="location"
            render={({ field }) => (
                <FormItem className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <FormLabel>Delivery Location</FormLabel>
                    <FormControl>
                         <div className="relative">
                            <Input placeholder="Search for your address..." className="pl-10" {...field} />
                            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
      )}
    </div>
  );
}
