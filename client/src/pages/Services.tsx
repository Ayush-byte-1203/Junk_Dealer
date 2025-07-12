import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { Truck, MapPin, Calendar, Clock, Phone, Home } from "lucide-react";

export default function Services() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("pickup");

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  const [bookingData, setBookingData] = useState({
    serviceType: "pickup",
    categoryId: "",
    estimatedWeight: "",
    scheduledDate: "",
    scheduledTime: "",
    address: "",
    phone: "",
    notes: "",
  });

  const createBookingMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          userId: user?.id,
          categoryId: parseInt(data.categoryId),
          estimatedWeight: parseFloat(data.estimatedWeight),
        }),
      });
      if (!response.ok) throw new Error("Failed to create booking");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your booking has been created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      setBookingData({
        serviceType: "pickup",
        categoryId: "",
        estimatedWeight: "",
        scheduledDate: "",
        scheduledTime: "",
        address: "",
        phone: "",
        notes: "",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book our services.",
        variant: "destructive",
      });
      return;
    }
    createBookingMutation.mutate({ ...bookingData, serviceType: activeTab });
  };

  const timeSlots = [
    "09:00-11:00", "11:00-13:00", "13:00-15:00", "15:00-17:00", "17:00-19:00"
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600">Choose the service that works best for you</p>
        </div>

        <Tabs defaultValue="pickup" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pickup" onClick={() => setActiveTab("pickup")}>
              <Truck className="mr-2 h-4 w-4" />
              Pickup Service
            </TabsTrigger>
            <TabsTrigger value="dropoff" onClick={() => setActiveTab("dropoff")}>
              <MapPin className="mr-2 h-4 w-4" />
              Drop-off Service
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pickup" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Schedule a Pickup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4">Service Features</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">Free pickup for orders above ₹500</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">Flexible time slots</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">Instant payment on collection</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">Professional handling</span>
                      </li>
                    </ul>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="category">Material Category</Label>
                      <Select value={bookingData.categoryId} onValueChange={(value) => setBookingData({ ...bookingData, categoryId: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="weight">Estimated Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="Enter estimated weight"
                        value={bookingData.estimatedWeight}
                        onChange={(e) => setBookingData({ ...bookingData, estimatedWeight: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Preferred Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={bookingData.scheduledDate}
                          onChange={(e) => setBookingData({ ...bookingData, scheduledDate: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Time Slot</Label>
                        <Select value={bookingData.scheduledTime} onValueChange={(value) => setBookingData({ ...bookingData, scheduledTime: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                {slot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Pickup Address</Label>
                      <Textarea
                        id="address"
                        placeholder="Enter your complete address"
                        value={bookingData.address}
                        onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Contact Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any special instructions or notes"
                        value={bookingData.notes}
                        onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={createBookingMutation.isPending}
                    >
                      {createBookingMutation.isPending ? "Booking..." : "Schedule Pickup"}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dropoff" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-secondary" />
                  Drop-off Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4">Service Features</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span className="text-sm">Find nearest dealers</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span className="text-sm">Compare prices</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span className="text-sm">Real-time availability</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span className="text-sm">No minimum quantity</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Find Dealers Near You</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="location">Enter Your Location</Label>
                        <Input
                          id="location"
                          placeholder="City, area, or PIN code"
                          className="mb-4"
                        />
                        <Button className="w-full bg-secondary hover:bg-secondary/90">
                          <MapPin className="mr-2 h-4 w-4" />
                          Find Dealers
                        </Button>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Quick Actions</h4>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start">
                            <Phone className="mr-2 h-4 w-4" />
                            Call Nearest Dealer
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Calendar className="mr-2 h-4 w-4" />
                            Check Operating Hours
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Home className="mr-2 h-4 w-4" />
                            View All Locations
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
