import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Recycle, Leaf, Calculator, TreePine, Droplets, Quote } from "lucide-react";
import { ECO_TIPS, ECO_SLOGANS, WASTE_SEPARATION_GUIDE } from "@/lib/constants";

export default function EcoTips() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % ECO_TIPS.length);
  };

  const nextSlogan = () => {
    setCurrentSloganIndex((prev) => (prev + 1) % ECO_SLOGANS.length);
  };

  const currentTip = ECO_TIPS[currentTipIndex];
  const currentSlogan = ECO_SLOGANS[currentSloganIndex];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Eco Tips & Education</h1>
          <p className="text-xl text-gray-600">Learn how to make a positive environmental impact</p>
        </div>

        <Tabs defaultValue="tips" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tips">Daily Tips</TabsTrigger>
            <TabsTrigger value="separation">Waste Guide</TabsTrigger>
            <TabsTrigger value="slogans">Slogans</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="tips" className="space-y-8">
            {/* Featured Tip */}
            <Card className="eco-gradient-light border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  Eco Tip of the Day
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Badge className="bg-primary">{currentTip.category}</Badge>
                  <h3 className="text-xl font-semibold text-gray-800">{currentTip.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{currentTip.description}</p>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="flex items-center gap-1 text-sm text-primary">
                      <TreePine className="h-4 w-4" />
                      <span>Impact: {currentTip.impact}</span>
                    </div>
                  </div>
                  <Button onClick={nextTip} variant="outline" size="sm">
                    Next Tip
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* All Tips Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ECO_TIPS.map((tip, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{tip.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-primary">
                        <Leaf className="h-4 w-4" />
                        <span>{tip.difficulty}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-3">{tip.description}</p>
                    <div className="text-xs text-primary font-medium">
                      Impact: {tip.impact}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="separation" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Recycle className="h-6 w-6 text-primary" />
                  Waste Separation Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {WASTE_SEPARATION_GUIDE.map((category, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center`}>
                          <i className={`${category.icon} text-white text-xl`}></i>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                      </div>
                      <div className="ml-15">
                        <h4 className="font-medium mb-2">Items Include:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-sm mb-1">Preparation Tips:</h5>
                          <p className="text-xs text-gray-600">{category.tips}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="slogans" className="space-y-8">
            {/* Featured Slogan */}
            <Card className="eco-gradient text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Quote className="h-6 w-6" />
                  Eco Slogan of the Day
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <p className="text-2xl font-bold italic">"{currentSlogan.text}"</p>
                  <p className="text-lg opacity-90">- {currentSlogan.author}</p>
                  <Button onClick={nextSlogan} variant="outline" className="text-primary bg-white">
                    Next Slogan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* All Slogans */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ECO_SLOGANS.map((slogan, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-center space-y-3">
                      <Quote className="h-8 w-8 text-primary mx-auto" />
                      <p className="text-lg font-medium italic text-gray-800">
                        "{slogan.text}"
                      </p>
                      <p className="text-sm text-gray-600">- {slogan.author}</p>
                      <Badge variant="outline" className="text-xs">
                        {slogan.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="impact" className="space-y-8">
            {/* Personal Impact Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-primary" />
                  Your Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-20 h-20 eco-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                      <Recycle className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">125 kg</div>
                    <div className="text-sm text-gray-600">Materials Recycled</div>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 eco-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                      <Droplets className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">50 kg</div>
                    <div className="text-sm text-gray-600">CO₂ Reduced</div>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 eco-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                      <TreePine className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">3.2</div>
                    <div className="text-sm text-gray-600">Trees Saved</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Global Impact Stats */}
            <Card className="eco-gradient text-white">
              <CardHeader>
                <CardTitle>Global Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">50,000+</div>
                    <div className="text-sm opacity-90">Kg Materials Recycled</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">2,500+</div>
                    <div className="text-sm opacity-90">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">150+</div>
                    <div className="text-sm opacity-90">Partner Dealers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">1,200</div>
                    <div className="text-sm opacity-90">Trees Saved</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips for Maximizing Impact */}
            <Card>
              <CardHeader>
                <CardTitle>Maximize Your Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-3">Daily Actions</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Separate waste at source</li>
                      <li>• Choose reusable over disposable</li>
                      <li>• Compost organic waste</li>
                      <li>• Buy products with minimal packaging</li>
                      <li>• Repair instead of replace when possible</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Community Impact</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Educate friends and family</li>
                      <li>• Participate in local cleanup drives</li>
                      <li>• Support eco-friendly businesses</li>
                      <li>• Share recycling tips on social media</li>
                      <li>• Join environmental groups in your area</li>
                    </ul>
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
