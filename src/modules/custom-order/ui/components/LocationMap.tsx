import { GoogleMap, Marker } from "@react-google-maps/api";
import { memo } from "react";

interface LocationMapProps {
    lat: number;
    lng: number;
    address?: string;
    onLocationChange?: (lat: number, lng: number) => void;
}

const mapContainerStyle = {
    width: "100%",
    height: "250px", // Mobile-optimized height
};

const mapOptions = {
    disableDefaultUI: true, // Clean UI for mobile
    zoomControl: true,
    gestureHandling: "cooperative", // Better mobile UX
    styles: [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }], // Reduce clutter on mobile
        },
    ],
};

export const LocationMap = memo(({ lat, lng, address, onLocationChange }: LocationMapProps) => {
    const center = { lat, lng };

    // Check if Google Maps is loaded
    if (!window.google || !window.google.maps) {
        return (
            <div className="w-full h-[250px] flex items-center justify-center bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Loading map...</p>
            </div>
        );
    }

    const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
        if (e.latLng && onLocationChange) {
            const newLat = e.latLng.lat();
            const newLng = e.latLng.lng();
            onLocationChange(newLat, newLng);
        }
    };

    return (
        <div className="space-y-2">
            <div className="w-full rounded-lg overflow-hidden border border-border">
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={16} // Good zoom for street-level view
                    options={mapOptions}
                >
                    <Marker
                        position={center}
                        title={address || "Selected Location"}
                        animation={window.google?.maps?.Animation?.DROP}
                        draggable={true}
                        onDragEnd={handleMarkerDragEnd}
                    />
                </GoogleMap>
            </div>
            {onLocationChange && (
                <p className="text-xs text-muted-foreground text-center">
                    💡 Tip: Drag the pin to adjust the exact location
                </p>
            )}
        </div>
    );
});

LocationMap.displayName = "LocationMap";
