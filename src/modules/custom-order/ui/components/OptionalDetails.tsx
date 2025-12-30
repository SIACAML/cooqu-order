import { useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { FormValues, CUISINES, EVENT_STYLES } from "../../schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Upload, MapPinHouse, X } from "lucide-react";
import { useDropzone } from "react-dropzone";

export function OptionalDetails() {
  const { control, watch, setValue } = useFormContext<FormValues>();
  const [isOpen, setIsOpen] = useState(false);

  const category = watch("category");
  const orderType = watch("orderType");
  const selectedCuisines = watch("cuisines") || [];

  const toggleCuisine = (cuisine: string) => {
    const current = selectedCuisines;
    if (current.includes(cuisine)) {
      setValue("cuisines", current.filter(c => c !== cuisine));
    } else {
      setValue("cuisines", [...current, cuisine]);
    }
  };

  return (
    <Card className="overflow-hidden border-dashed">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs font-bold">2</span>
            <span className="text-lg font-semibold text-foreground">Optional Details</span>
        </div>
        {isOpen ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
      </button>

      {isOpen && (
        <CardContent className="p-4 space-y-6 animate-in slide-in-from-top-2 fade-in duration-200 pt-0">
          
          {/* Photos - React Dropzone */}
          <FormField
            control={control}
            name="photos"
            render={({ field }) => {
                const [files, setFiles] = useState<File[]>([]);

                const onDrop = useCallback((acceptedFiles: File[]) => {
                    const newFiles = [...files, ...acceptedFiles];
                    setFiles(newFiles);
                    field.onChange(newFiles);
                }, [files, field]);

                const removeFile = (index: number) => {
                    const newFiles = files.filter((_, i) => i !== index);
                    setFiles(newFiles);
                    field.onChange(newFiles);
                }

                const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
                    onDrop,
                    accept: {
                        'image/*': []
                    }
                });

                return (
                    <FormItem>
                        <FormLabel>Reference Photos</FormLabel>
                        <FormControl>
                            <div className="space-y-4">
                                <div 
                                    {...getRootProps()} 
                                    className={cn(
                                        "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground transition-colors cursor-pointer",
                                        isDragActive ? "border-primary bg-primary/5" : "border-input hover:bg-muted/50"
                                    )}
                                >
                                    <input {...getInputProps()} />
                                    <Upload className="h-8 w-8 mb-2 opacity-50" />
                                    {isDragActive ? (
                                        <p className="text-sm">Drop the files here ...</p>
                                    ) : (
                                        <p className="text-sm">Drag & drop or click to upload</p>
                                    )}
                                </div>
                                
                                {files.length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {files.map((file, i) => (
                                            <div key={i} className="relative group rounded-md overflow-hidden border">
                                                <img 
                                                    src={URL.createObjectURL(file)} 
                                                    alt="preview" 
                                                    className="h-20 w-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(i)}
                                                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
          />

          {/* Cuisines - Multi-select Chips */}
          <FormField
            control={control}
            name="cuisines"
            render={() => (
                <FormItem>
                    <FormLabel>Cuisines</FormLabel>
                    <FormControl>
                        <div className="flex flex-wrap gap-2">
                        {CUISINES.map((cuisine) => {
                            const isSelected = selectedCuisines.includes(cuisine);
                            return (
                                <Button
                                key={cuisine}
                                type="button"
                                variant={isSelected ? "default" : "outline"}
                                size="sm"
                                onClick={() => toggleCuisine(cuisine)}
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

          {/* Cooking Instructions */}
          <FormField
            control={control}
            name="cookingInstructions"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Cooking Instructions</FormLabel>
                    <FormControl>
                        <Textarea 
                            placeholder="E.g. Less oil, spicy, extra garlic..." 
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
          />

          {/* Size - Bakery/Sweet-Dish Only */}
          {["Bakery", "Sweet-Dish"].includes(category) && (
             <FormField
                control={control}
                name="size"
                render={({ field }) => (
                    <FormItem className="animate-in fade-in">
                        <FormLabel>Size / Weight</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. 1kg, Large, 10 inch" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
          )}

          {/* Catering Extras - Catering Only */}
          {category === "Catering" && (
            <div className="space-y-4 border-t pt-4 animate-in fade-in">
                <h4 className="font-medium text-foreground">Catering Extras</h4>
                
                <FormField
                    control={control}
                    name="eventStyle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Style</FormLabel>
                            <FormControl>
                                <div className="flex flex-wrap gap-2">
                                    {EVENT_STYLES.map((style) => (
                                        <Button
                                            key={style}
                                            type="button"
                                            variant={field.value === style ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => field.onChange(style)}
                                            className="rounded-full"
                                        >
                                            {style}
                                        </Button>
                                    ))}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="staffNeeded"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Staff Needed?</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-row space-x-4"
                                >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Yes" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Yes (Waiters/Cooks)
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="No" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            No
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
          )}

          {/* Detailed Address - Delivery Only */}
          {orderType === "Delivery" && (
            <div className="space-y-4 border-t pt-4 animate-in fade-in">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                    <MapPinHouse className="h-4 w-4" />
                    Additional Address Details (Optional)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {/* We hide the main address fields here because they are handled in LocationSearch now */}
                     {/* Only showing truly optional or specific details that might not be in the main address block */}
                </div>
                <p className="text-sm text-muted-foreground">
                    Address is managed in the "Required Details" section.
                </p>
            </div>
          )}

        </CardContent>
      )}
    </Card>
  );
}
