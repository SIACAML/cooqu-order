import { useFormContext } from "react-hook-form";
import { FormValues, DIET_TYPES, UNITS } from "../../schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function ItemDetails() {
  const { control, watch } = useFormContext<FormValues>();
  const category = watch("category");

  // Dynamic Labels
  const itemNameLabel = category === "Catering" ? "Event Name" : "Item Name";
  const guestCountLabel = category === "Catering" ? "Total Guests" : "Number of People";
  
  return (
    <div className="space-y-6 pt-4 border-t border-border">
        <h3 className="text-md font-semibold text-foreground">Item Details</h3>
        
        <div className="space-y-4">
            {/* Item Name */}
            <FormField
                control={control}
                name="itemName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{itemNameLabel}</FormLabel>
                        <FormControl>
                            <Input 
                                placeholder={`e.g. ${category === 'Catering' ? 'Birthday Party' : 'Butter Chicken'}`} 
                                {...field} 
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Diet Type */}
            <FormField
                control={control}
                name="dietType"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Diet Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select diet type" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {DIET_TYPES.map(type => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Quantity & Unit */}
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input 
                                    type="number" 
                                    min="1"
                                    {...field}
                                    onChange={e => field.onChange(e.target.valueAsNumber)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="unit"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Unit</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select unit" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {UNITS.map(unit => (
                                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {/* Guest Count */}
            <FormField
                control={control}
                name="guestCount"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{guestCountLabel}</FormLabel>
                        <FormControl>
                            <Input 
                                type="number" 
                                min="1"
                                {...field}
                                onChange={e => field.onChange(e.target.valueAsNumber)}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

             {/* Budget - Only for Catering */}
            {category === "Catering" && (
                <FormField
                    control={control}
                    name="budget"
                    render={({ field }) => (
                        <FormItem className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <FormLabel>Estimated Budget (per head or total)</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                                    <Input 
                                        type="number" 
                                        min="0"
                                        placeholder="0.00"
                                        className="pl-7"
                                        {...field}
                                        onChange={e => field.onChange(e.target.valueAsNumber)}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}

            {/* Description */}
            <FormField
                control={control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea 
                                placeholder="Describe your item requirement (ingredients, preparation style, etc.)"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    </div>
  );
}
