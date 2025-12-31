import { useFormContext } from "react-hook-form";
import { FormValues } from "../../schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Banknote, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function PaymentPreference() {
  const { control } = useFormContext<FormValues>();

  return (
    <Card className="overflow-hidden border-none sm:border shadow-none sm:shadow-sm bg-transparent sm:bg-card">
      <div className="flex items-center gap-2 p-3 sm:p-4 border-b bg-muted/20">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs font-bold">3</span>
        <span className="text-lg font-semibold text-foreground">Payment Preference</span>
      </div>
      <CardContent className="p-3 sm:p-6 space-y-4">
        <div className="flex items-start gap-3 p-3 bg-blue-50 text-blue-700 rounded-md border border-blue-100 text-sm">
          <Info className="h-5 w-5 shrink-0 mt-0.5" />
          <p>
            <strong>Note:</strong> We are not charging you anything right now. This is just a request.
            You will only pay after we confirm your order details and availability.
          </p>
        </div>

        <FormField
          control={control}
          name="paymentPreference"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>How would you like to pay later?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem value="Online" className="peer sr-only" />
                    </FormControl>
                    <FormLabel className={cn(
                      "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all",
                      field.value === "Online" && "border-primary bg-primary/5"
                    )}>
                      <CreditCard className="mb-3 h-6 w-6" />
                      <div className="text-center">
                        <span className="font-semibold">Pay Online</span>
                        <span className="block text-xs text-muted-foreground mt-1">UPI, Card, Netbanking</span>
                      </div>
                    </FormLabel>
                  </FormItem>

                  <FormItem>
                    <FormControl>
                      <RadioGroupItem value="COD" className="peer sr-only" />
                    </FormControl>
                    <FormLabel className={cn(
                      "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all",
                      field.value === "COD" && "border-primary bg-primary/5"
                    )}>
                      <Banknote className="mb-3 h-6 w-6" />
                      <div className="text-center">
                        <span className="font-semibold">Pay on Delivery</span>
                        <span className="block text-xs text-muted-foreground mt-1">Cash or QR Scan</span>
                      </div>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}