import { useEffect, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2, Check, Pencil } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useUserStore } from "../../store/userStore";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocationMap } from "./LocationMap";

declare global {
  interface Window {
    google: any;
    googleMapsPromise?: Promise<void>;
  }
}

// Load Google Maps script with promise
const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  // Return existing promise if script is already loading
  if (window.googleMapsPromise) {
    return window.googleMapsPromise;
  }

  // Return resolved promise if already loaded
  if (typeof window !== "undefined" && window.google && window.google.maps) {
    return Promise.resolve();
  }

  // Create new promise for loading
  window.googleMapsPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      reject(new Error("Failed to load Google Maps script"));
    };

    document.head.appendChild(script);
  });

  return window.googleMapsPromise;
};

export function LocationSearch() {
  const { setValue, watch } = useFormContext();
  const { address, setAddress } = useUserStore();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Local state for the confirmation form
  const [tempAddress, setTempAddress] = useState<any>(null);
  const [lockedFields, setLockedFields] = useState<string[]>([]);

  const {
    ready,
    value,
    setValue: setPlacesValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 300,
    initOnMount: isScriptLoaded,
  });

  console.log("Google Maps Ready:", ready, "Script Loaded:", isScriptLoaded);
  useEffect(() => {
    // Load existing address from Zustand if available
    if (address && !isEditing) {
      setValue("location", address.fullAddress);
      setValue("addressDetails.area", address.area);
      setValue("addressDetails.city", address.city);
      setValue("addressDetails.state", address.state);
      setValue("addressDetails.pincode", address.pincode);
      setValue("detailedAddress.houseNo", address.houseNo);
      setValue("detailedAddress.landmark", address.landmark);
    }
  }, [address, isEditing, setValue]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    if (!apiKey) {
      console.error("Google Maps API key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.");
      return;
    }

    loadGoogleMapsScript(apiKey)
      .then(() => {
        setIsScriptLoaded(true);
      })
      .catch((error) => {
        console.error("Failed to load Google Maps:", error);
      });
  }, []);

  const handleSelect = async (selectedAddress: string) => {
    setPlacesValue(selectedAddress, false);
    clearSuggestions();
    setOpen(false);

    try {
      const results = await getGeocode({ address: selectedAddress });
      const { lat, lng } = await getLatLng(results[0]);
      console.log(results, 'This is results');
      const addressComponents = results[0].address_components;
      let area = "";
      let city = "";
      let state = "";
      let pincode = "";

      addressComponents.forEach((component: any) => {
        if (component.types.includes("sublocality") || component.types.includes("neighborhood")) {
          area = component.long_name;
        }
        if (component.types.includes("locality")) {
          city = component.long_name;
        }
        if (component.types.includes("administrative_area_level_1")) {
          state = component.long_name;
        }
        if (component.types.includes("postal_code")) {
          pincode = component.long_name;
        }
      });

      const locked: string[] = [];
      if (city) locked.push("city");
      if (state) locked.push("state");
      if (pincode) locked.push("pincode");
      setLockedFields(locked);

      // Set temp address for confirmation view
      setTempAddress({
        fullAddress: selectedAddress,
        houseNo: "",
        area,
        city,
        state,
        pincode,
        landmark: "",
        lat,
        lng
      });
      setIsEditing(true);

    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleConfirmAddress = () => {
    if (tempAddress) {
      setAddress(tempAddress);
      setValue("location", tempAddress.fullAddress);
      setValue("addressDetails.area", tempAddress.area);
      setValue("addressDetails.city", tempAddress.city);
      setValue("addressDetails.state", tempAddress.state);
      setValue("addressDetails.pincode", tempAddress.pincode);
      setValue("detailedAddress.houseNo", tempAddress.houseNo);
      setValue("detailedAddress.landmark", tempAddress.landmark);
      setIsEditing(false);
      setTempAddress(null);
    }
  };

  const handleEditSavedAddress = () => {
    if (address) {
      setTempAddress(address);
      setIsEditing(true);
    }
  };

  const handleClearAddress = () => {
    setAddress(null);
    setTempAddress(null);
    setIsEditing(false);
    setPlacesValue("", false);
    setValue("location", "");
    setValue("addressDetails.area", "");
    setValue("addressDetails.city", "");
    setValue("addressDetails.state", "");
    setValue("addressDetails.pincode", "");
    setValue("detailedAddress.houseNo", "");
    setValue("detailedAddress.landmark", "");
  };

  const handleChangeLocation = () => {
    // Clear temp address and go back to search
    setTempAddress(null);
    setIsEditing(false);
    setPlacesValue("", false);
  };

  const handleMapLocationChange = async (newLat: number, newLng: number) => {
    try {
      // Reverse geocode to get address from coordinates
      const results = await getGeocode({ location: { lat: newLat, lng: newLng } });

      if (results && results[0]) {
        const addressComponents = results[0].address_components;
        let area = "";
        let city = "";
        let state = "";
        let pincode = "";

        addressComponents.forEach((component: any) => {
          if (component.types.includes("sublocality") || component.types.includes("neighborhood")) {
            area = component.long_name;
          }
          if (component.types.includes("locality")) {
            city = component.long_name;
          }
          if (component.types.includes("administrative_area_level_1")) {
            state = component.long_name;
          }
          if (component.types.includes("postal_code")) {
            pincode = component.long_name;
          }
        });

        const locked: string[] = [];
        if (city) locked.push("city");
        if (state) locked.push("state");
        if (pincode) locked.push("pincode");
        setLockedFields(locked);

        // Update temp address with new coordinates and address, but keep user-entered houseNo and landmark
        setTempAddress({
          ...tempAddress,
          fullAddress: results[0].formatted_address,
          area,
          city,
          state,
          pincode,
          lat: newLat,
          lng: newLng,
        });
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    }
  };

  // View 1: Saved Address Summary
  if (address && !isEditing) {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-3 sm:p-4 flex items-start justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-medium text-primary">
              <MapPin className="h-4 w-4" />
              <span>Delivery Location</span>
            </div>
            <p className="text-sm font-medium">{address.fullAddress}</p>
            <p className="text-xs text-muted-foreground">
              {address.houseNo ? `${address.houseNo}, ` : ''}{address.area}, {address.city} - {address.pincode}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleEditSavedAddress}>
              <Pencil className="h-4 w-4 mr-1" /> Edit
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClearAddress} className="text-destructive hover:text-destructive">
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // View 2: Confirmation / Edit Form
  if (isEditing && tempAddress) {
    return (
      <div className="space-y-4 border rounded-lg p-3 sm:p-4 bg-background animate-in fade-in slide-in-from-top-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <h4 className="font-medium">Confirm Address Details</h4>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleChangeLocation} className="flex-1 sm:flex-none h-8 text-xs">
              Change Location
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)} className="h-8 text-xs">Cancel</Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-xs text-blue-800">
            <p className="font-medium mb-1">📍 Location from Google Maps</p>
            <p>Fields filled by Google Maps are locked for accuracy. Empty fields can be edited manually.</p>
          </div>

          {/* Visual map confirmation */}
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Map View</Label>
            <LocationMap
              lat={tempAddress.lat}
              lng={tempAddress.lng}
              address={tempAddress.fullAddress}
              onLocationChange={handleMapLocationChange}
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Selected Location</Label>
            <div className="flex items-center gap-2 p-2 bg-muted rounded text-sm">
              <MapPin className="h-4 w-4 shrink-0" />
              {tempAddress.fullAddress}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="houseNo">House / Flat No</Label>
              <Input
                id="houseNo"
                value={tempAddress.houseNo}
                onChange={(e) => setTempAddress({ ...tempAddress, houseNo: e.target.value })}
                placeholder="e.g. A-101"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="area">
                Area
              </Label>
              <Input
                id="area"
                value={tempAddress.area}
                onChange={(e) => setTempAddress({ ...tempAddress, area: e.target.value })}
                placeholder="Enter area"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label htmlFor="city" className="flex items-center gap-1">
                City {lockedFields.includes("city") && <span className="text-xs text-muted-foreground">🔒</span>}
              </Label>
              <Input
                id="city"
                value={tempAddress.city}
                readOnly={lockedFields.includes("city")}
                onChange={(e) => setTempAddress({ ...tempAddress, city: e.target.value })}
                className={lockedFields.includes("city") ? "bg-muted cursor-not-allowed" : ""}
                placeholder="Enter city"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="state" className="flex items-center gap-1">
                State {lockedFields.includes("state") && <span className="text-xs text-muted-foreground">🔒</span>}
              </Label>
              <Input
                id="state"
                value={tempAddress.state}
                readOnly={lockedFields.includes("state")}
                onChange={(e) => setTempAddress({ ...tempAddress, state: e.target.value })}
                className={lockedFields.includes("state") ? "bg-muted cursor-not-allowed" : ""}
                placeholder="Enter state"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="pincode" className="flex items-center gap-1">
                Pincode {lockedFields.includes("pincode") && <span className="text-xs text-muted-foreground">🔒</span>}
              </Label>
              <Input
                id="pincode"
                value={tempAddress.pincode}
                readOnly={lockedFields.includes("pincode")}
                onChange={(e) => setTempAddress({ ...tempAddress, pincode: e.target.value })}
                className={lockedFields.includes("pincode") ? "bg-muted cursor-not-allowed" : ""}
                placeholder="Enter pincode"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="landmark">Landmark (Optional)</Label>
            <Input
              id="landmark"
              value={tempAddress.landmark}
              onChange={(e) => setTempAddress({ ...tempAddress, landmark: e.target.value })}
              placeholder="Near Central Park"
            />
          </div>

          <Button onClick={handleConfirmAddress} className="w-full mt-2">
            Confirm & Save Address
          </Button>
        </div>
      </div>
    );
  }

  // View 3: Search Input (Default)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between pl-3 text-left font-normal h-12"
          disabled={!isScriptLoaded || !ready}
        >
          <span className="flex items-center gap-2">
            {!isScriptLoaded ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading location service...
              </>
            ) : (
              value || "Search for your delivery location..."
            )}
          </span>
          <MapPin className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] sm:w-[400px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder={!isScriptLoaded ? "Loading Google Maps..." : "Search location..."}
            value={value}
            onValueChange={setPlacesValue}
            disabled={!ready || !isScriptLoaded}
          />
          <CommandList>
            <CommandEmpty>
              {!isScriptLoaded ? "Loading location service..." : "No results found."}
            </CommandEmpty>
            <CommandGroup>
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <CommandItem
                    key={place_id}
                    value={description}
                    onSelect={handleSelect}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    {description}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
