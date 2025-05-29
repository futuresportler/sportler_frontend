"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink, MapPin, Navigation, Phone, Star } from "lucide-react"

interface MapLocation {
  id: string | number
  name: string
  address: string
  lat?: number
  lng?: number
  type: "academy" | "coach" | "turf"
  rating?: number
  price?: number
  hourlyRate?: number
  image?: string
  phone?: string
  availability?: string
  sport?: string
  category?: string
  slug?: string
  url?: string
}

interface MapViewProps {
  locations: MapLocation[]
  city: string
  onLocationClick?: (location: MapLocation) => void
}

export default function MapView({ locations, city, onLocationClick }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [geocodedLocations, setGeocodedLocations] = useState<MapLocation[]>([])

  // Initialize Google Maps
  useEffect(() => {
    const initMap = async () => {
      if (!window.google) {
        // Load Google Maps script
        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
        script.async = true
        script.defer = true
        document.head.appendChild(script)

        script.onload = () => {
          initializeMap()
        }
      } else {
        initializeMap()
      }
    }

    const initializeMap = () => {
      if (!mapRef.current) return

      const mapInstance = new google.maps.Map(mapRef.current, {
        zoom: 12,
        center: { lat: 28.6139, lng: 77.209 }, // Default to Delhi
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      })

      const geocoderInstance = new google.maps.Geocoder()
      setMap(mapInstance)
      setGeocoder(geocoderInstance)
    }

    initMap()
  }, [])

  // Geocode locations and add markers
  useEffect(() => {
    if (!map || !geocoder || !locations.length) return

    const geocodeLocations = async () => {
      setIsLoading(true)
      const geocodedLocs: MapLocation[] = []
      const newMarkers: google.maps.Marker[] = []

      // Clear existing markers
      markers.forEach((marker) => marker.setMap(null))

      // Create a delay function to avoid hitting Google's rate limits
      const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

      for (const location of locations) {
        try {
          // Add a small delay between geocoding requests to avoid rate limiting
          await delay(200)

          const result = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
            geocoder.geocode({ address: `${location.address}, ${city}` }, (results, status) => {
              if (status === "OK" && results && results.length > 0) {
                resolve(results)
              } else {
                console.warn(`Geocoding failed for ${location.name}: ${status}`)
                // Don't reject, just return empty results
                resolve([])
              }
            })
          })

          if (result.length > 0) {
            const { lat, lng } = result[0].geometry.location
            const geocodedLocation = {
              ...location,
              lat: lat(),
              lng: lng(),
            }
            geocodedLocs.push(geocodedLocation)

            // Create marker
            const marker = new google.maps.Marker({
              position: { lat: lat(), lng: lng() },
              map: map,
              title: location.name,
              icon: {
                url: getMarkerIcon(location.type),
                scaledSize: new google.maps.Size(40, 40),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(20, 40),
              },
            })

            // Add click listener
            marker.addListener("click", () => {
              setSelectedLocation(geocodedLocation)
              if (onLocationClick) {
                onLocationClick(geocodedLocation)
              }
            })

            newMarkers.push(marker)
          }
        } catch (error) {
          console.error(`Failed to geocode ${location.name}:`, error)
        }
      }

      setGeocodedLocations(geocodedLocs)
      setMarkers(newMarkers)

      // Fit map to show all markers
      if (newMarkers.length > 0) {
        const bounds = new google.maps.LatLngBounds()
        newMarkers.forEach((marker) => {
          const position = marker.getPosition()
          if (position) bounds.extend(position)
        })
        map.fitBounds(bounds)

        // If we only have one marker, zoom in a bit more
        if (newMarkers.length === 1) {
          map.setZoom(15)
        }
      }

      setIsLoading(false)
    }

    geocodeLocations()
  }, [map, geocoder, locations, city])

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "academy":
        return (
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="#059669" stroke="white" strokeWidth="2"/>
        <path d="M20 10 L26 16 L20 22 L14 16 Z" fill="white"/>
        <circle cx="20" cy="26" r="4" fill="white"/>
      </svg>
    `)
        )
      case "coach":
        return (
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="#3B82F6" stroke="white" strokeWidth="2"/>
        <circle cx="20" cy="16" r="6" fill="white"/>
        <path d="M10 32 C10 24 30 24 30 32" fill="white"/>
      </svg>
    `)
        )
      case "turf":
        return (
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="#F59E0B" stroke="white" strokeWidth="2"/>
        <rect x="12" y="12" width="16" height="16" fill="white"/>
        <line x1="12" y1="20" x2="28" y2="20" stroke="#F59E0B" strokeWidth="2"/>
        <line x1="20" y1="12" x2="20" y2="28" stroke="#F59E0B" strokeWidth="2"/>
      </svg>
    `)
        )
      default:
        return (
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="#6B7280" stroke="white" strokeWidth="2"/>
        <text x="20" y="26" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">?</text>
      </svg>
    `)
        )
    }
  }

  const handleGetDirections = (location: MapLocation) => {
    if (location.lat && location.lng) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`
      window.open(url, "_blank")
    }
  }

  return (
    <div className="relative w-full h-full min-h-[600px] bg-gray-100 rounded-lg overflow-hidden">
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map locations...</p>
          </div>
        </div>
      )}

      {/* Location Info Card */}
      {selectedLocation && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 z-20 max-w-sm mx-auto">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {selectedLocation.image ? (
                <img
                  src={selectedLocation.image || "/placeholder.svg"}
                  alt={selectedLocation.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{selectedLocation.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{selectedLocation.address}</p>

              {selectedLocation.sport && (
                <p className="text-xs text-gray-500 mb-2">
                  <span className="inline-block px-2 py-0.5 bg-gray-100 rounded-full mr-1">
                    {selectedLocation.sport}
                  </span>
                  {selectedLocation.category && (
                    <span className="inline-block px-2 py-0.5 bg-gray-100 rounded-full">
                      {selectedLocation.category}
                    </span>
                  )}
                </p>
              )}

              <div className="flex items-center space-x-4 mb-3">
                {selectedLocation.rating && (
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{selectedLocation.rating}</span>
                  </div>
                )}
                {(selectedLocation.price || selectedLocation.hourlyRate) && (
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-emerald-600">
                      ₹{selectedLocation.price || selectedLocation.hourlyRate}
                      {selectedLocation.hourlyRate ? "/hr" : ""}
                    </span>
                  </div>
                )}
                {selectedLocation.availability && (
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500">{selectedLocation.availability}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleGetDirections(selectedLocation)}
                  className="flex items-center px-3 py-1.5 bg-emerald-600 text-white text-sm rounded-md hover:bg-emerald-700 transition-colors"
                >
                  <Navigation className="w-4 h-4 mr-1" />
                  Directions
                </button>
                {selectedLocation.phone && (
                  <button
                    onClick={() => window.open(`tel:${selectedLocation.phone}`, "_self")}
                    className="flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </button>
                )}
                {selectedLocation.url && (
                  <a
                    href={selectedLocation.url}
                    className="flex items-center px-3 py-1.5 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-900 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View Details
                  </a>
                )}
              </div>
            </div>
            <button onClick={() => setSelectedLocation(null)} className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-20">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-emerald-600 rounded-full"></div>
            <span className="text-xs text-gray-600">Academies</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            <span className="text-xs text-gray-600">Coaches</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
            <span className="text-xs text-gray-600">Turfs</span>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg px-3 py-2 z-20">
        <span className="text-sm font-medium text-gray-900">{geocodedLocations.length} locations found</span>
      </div>
    </div>
  )
}
