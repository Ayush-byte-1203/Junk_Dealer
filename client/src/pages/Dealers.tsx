import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Star, Navigation, Clock, Filter } from "lucide-react";

export default function Dealers() {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const { data: dealers = [] } = useQuery({
    queryKey: ["/api/dealers"],
  });

  const filteredDealers = dealers.filter(dealer => {
    const matchesLocation = !searchLocation || 
      dealer.address.toLowerCase().includes(searchLocation.toLowerCase()) ||
      dealer.city.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesCity = !selectedCity || dealer.city === selectedCity;
    return matchesLocation && matchesCity;
  });

  const cities = [...new Set(dealers.map(dealer => dealer.city))];

  const getDealerSpecialties = (specialties: string) => {
    try {
      const parsed = JSON.parse(specialties);
      const specialtyNames = {
        1: "Electronics",
        2: "Metals", 
        3: "Plastic",
        4: "Paper",
        5: "Copper",
        6: "Aluminum",
        7: "Steel"
      };
      return parsed.map((id: number) => specialtyNames[id as keyof typeof specialtyNames]).filter(Boolean);
    } catch {
      return [];
    }
  };

  const getRatingColor = (rating: string) => {
    const numRating = parseFloat(rating);
    if (numRating >= 4.5) return "text-green-600";
    if (numRating >= 4.0) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Find Dealers Near You</h1>
          <p className="text-xl text-gray-600">Connect with verified junk dealers in your area</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search Dealers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Enter location, area, or PIN code"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Dealers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDealers.map((dealer) => (
            <Card key={dealer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{dealer.name}</CardTitle>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className={`font-semibold ${getRatingColor(dealer.rating)}`}>
                        {dealer.rating}
                      </span>
                      <span className="text-sm text-gray-500">(4.5/5)</span>
                    </div>
                  </div>
                  <Badge variant={dealer.isActive ? "default" : "secondary"}>
                    {dealer.isActive ? "Open" : "Closed"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{dealer.address}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{dealer.phone}</span>
                </div>
                
                {dealer.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{dealer.email}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Mon-Sat: 9:00 AM - 6:00 PM</span>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-1">
                    {getDealerSpecialties(dealer.specialties || "[]").map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Navigation className="h-4 w-4 mr-1" />
                    Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredDealers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Dealers Found</h3>
            <p className="text-gray-600">
              Try adjusting your search location or browse all available dealers
            </p>
          </div>
        )}

        {/* How to Choose Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>How to Choose the Right Dealer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3">What to Look For</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• High customer ratings and reviews</li>
                  <li>• Specializes in your material type</li>
                  <li>• Transparent pricing policy</li>
                  <li>• Proper licensing and certifications</li>
                  <li>• Convenient location and hours</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Before You Visit</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Call ahead to confirm they accept your materials</li>
                  <li>• Ask about current pricing</li>
                  <li>• Check their operating hours</li>
                  <li>• Prepare proper identification</li>
                  <li>• Clean and sort your materials</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
