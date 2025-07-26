import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Globe,
  Search,
  Tickets,
  Syringe,
  FileText,
  Clock,
  Wallet,
  AlertCircle,
  ArrowRight,
  HandCoins,
  HeartPulse,
  CheckCheck,
  Landmark,
  BookCopy,
} from "lucide-react";

const TravelRequirements = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [nationality, setNationality] = useState("");
  const [searchResults, setSearchResults] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("visa");

  // Mock requirements data
  const mockRequirements = {
    route: {
      from: "United States",
      to: "France",
    },
    nationality: "United States",
    visa: {
      required: false,
      type: "Visa-free entry",
      duration: "90 days",
      notes:
        "US citizens can enter France for up to 90 days within a 180-day period without a visa for tourism or business purposes.",
      documents: [
        "Valid passport with at least 6 months validity beyond intended stay",
        "Return/onward ticket",
        "Proof of accommodation",
        "Sufficient funds for the stay",
      ],
      links: [
        {
          text: "France Visa Information",
          url: "https://france-visas.gouv.fr/",
        },
        {
          text: "Schengen Area Requirements",
          url: "https://ec.europa.eu/home-affairs/policies/schengen-borders-and-visa/visa-policy_en",
        },
      ],
    },
    health: {
      vaccinations: {
        required: ["No mandatory vaccinations for entry from the US to France"],
        recommended: [
          "COVID-19 vaccination (with booster)",
          "Routine vaccines (MMR, Tdap, etc.)",
          "Seasonal influenza vaccine",
        ],
      },
      insurance:
        "Travel health insurance is highly recommended with minimum coverage of €30,000 for medical expenses.",
      certificates:
        "No health certificates required for entry, but COVID-19 status may be checked depending on current regulations.",
      links: [
        {
          text: "CDC Travel Health Information",
          url: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/france",
        },
        {
          text: "France Health Ministry",
          url: "https://solidarites-sante.gouv.fr/",
        },
      ],
    },
    customs: {
      restrictions: [
        {
          category: "Currency",
          details:
            "Amounts over €10,000 must be declared when entering or leaving the EU.",
        },
        {
          category: "Alcohol",
          details:
            "Duty-free allowance: 4 liters of wine and 1 liter of spirits or 2 liters of fortified wine.",
        },
        {
          category: "Tobacco",
          details:
            "200 cigarettes OR 100 cigarillos OR 50 cigars OR 250g of tobacco.",
        },
        {
          category: "Food",
          details:
            "Restrictions on meat and dairy products from outside the EU.",
        },
        {
          category: "Gifts",
          details:
            "Goods up to €430 for air travelers are exempt from duty and tax.",
        },
      ],
      prohibited: [
        "Counterfeit goods",
        "Endangered plant and animal species",
        "Certain weapons and ammunition",
        "Illegal drugs and narcotics",
        "Certain food products of animal origin from non-EU countries",
      ],
      links: [
        {
          text: "French Customs Information",
          url: "https://www.douane.gouv.fr/fiche/travellers-customs-guide",
        },
      ],
    },
    travel: {
      advisories: {
        level: "Exercise normal precautions",
        details:
          "France generally has a low crime rate, but visitors should be aware of pickpocketing and scams in tourist areas.",
        areas:
          "No specific areas to avoid, but demonstrations may occur in major cities.",
      },
      localLaws: [
        "ID must be carried at all times (passport or copy)",
        "Photography restrictions in some government buildings",
        "Strict anti-terrorism laws",
        "Public intoxication is discouraged",
        "Modest dress is required when visiting religious sites",
      ],
      currency: {
        name: "Euro (€)",
        exchange:
          "Widely available at airports, banks, and exchange offices. Credit cards are widely accepted.",
        tips: "Inform your bank of travel plans to avoid card blocks. Keep some cash for small businesses that may not accept cards.",
      },
      links: [
        {
          text: "US State Department Advisory",
          url: "https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/France.html",
        },
      ],
    },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearchResults(null);

    // Simulate API call with timeout
    setTimeout(() => {
      // For demo purposes, always return mock data
      if (from && to && nationality) {
        // Customize mock data with user inputs
        const customizedData = {
          ...mockRequirements,
          route: {
            from: from,
            to: to,
          },
          nationality: nationality,
        };
        setSearchResults(customizedData);
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <PageLayout
      title="Travel Requirements"
      subtitle="Find visa, health, and customs requirements for your journey"
      backgroundImage="https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2231&q=80"
    >
      <div className="max-w-7xl mx-auto">
        {/* Search Form */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-lg mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-6">
            Travel Requirements Checker
          </h2>
          <p className="text-gray-600 mb-6">
            Enter your travel details to check the visa, health, and customs
            requirements for your journey.
          </p>

          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="from-country">From (Country)</Label>
                <div className="relative mt-1.5">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <Input
                    id="from-country"
                    className="pl-10"
                    placeholder="e.g. United States"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="to-country">To (Country)</Label>
                <div className="relative mt-1.5">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <Input
                    id="to-country"
                    className="pl-10"
                    placeholder="e.g. France"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <div className="relative mt-1.5">
                  <Tickets className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <Input
                    id="nationality"
                    className="pl-10"
                    placeholder="e.g. United States"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="qatar"
                className="w-full sm:w-auto"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="mr-2">Searching</span>
                    <span className="animate-spin">
                      <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </span>
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Check Requirements
                  </>
                )}
              </Button>
            </div>

            <div className="text-sm text-gray-500 mt-4">
              <p>
                The information provided is for guidance purposes only and is
                subject to change. Always verify requirements with official
                sources before traveling.
              </p>
            </div>
          </form>
        </motion.div>

        {/* Search Results */}
        {searchResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-10">
              <div className="bg-purple-600 p-6 text-white">
                <h2 className="text-xl font-bold mb-2">
                  Travel Requirements: {searchResults.route.from} to{" "}
                  {searchResults.route.to}
                </h2>
                <p>
                  For travelers with {searchResults.nationality} nationality
                </p>
              </div>

              <div className="p-6">
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                    <TabsTrigger value="visa" className="gap-2">
                      <Tickets className="h-4 w-4" /> Visa
                    </TabsTrigger>
                    <TabsTrigger value="health" className="gap-2">
                      <HeartPulse className="h-4 w-4" /> Health
                    </TabsTrigger>
                    <TabsTrigger value="customs" className="gap-2">
                      <HandCoins className="h-4 w-4" /> Customs
                    </TabsTrigger>
                    <TabsTrigger value="travel" className="gap-2">
                      <Globe className="h-4 w-4" /> Travel Advice
                    </TabsTrigger>
                  </TabsList>

                  {/* Visa Requirements Tab */}
                  <TabsContent value="visa" className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`p-4 mb-6 rounded-lg flex items-start gap-4 ${
                          searchResults.visa.required
                            ? "bg-red-50"
                            : "bg-green-50"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-full ${
                            searchResults.visa.required
                              ? "bg-red-100"
                              : "bg-green-100"
                          }`}
                        >
                          {searchResults.visa.required ? (
                            <AlertCircle
                              className={`h-6 w-6 ${
                                searchResults.visa.required
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            />
                          ) : (
                            <CheckCheck className="h-6 w-6 text-green-600" />
                          )}
                        </div>
                        <div>
                          <h3
                            className={`font-semibold ${
                              searchResults.visa.required
                                ? "text-red-800"
                                : "text-green-800"
                            }`}
                          >
                            {searchResults.visa.required
                              ? "Visa Required"
                              : "No Visa Required"}
                          </h3>
                          <p
                            className={`${
                              searchResults.visa.required
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {searchResults.visa.type} -{" "}
                            {searchResults.visa.duration}
                          </p>
                          <p className="text-gray-700 mt-2">
                            {searchResults.visa.notes}
                          </p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">
                          Required Documents
                        </h3>
                        <ul className="space-y-2">
                          {searchResults.visa.documents.map(
                            (doc: string, i: number) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="bg-purple-50 p-1 rounded-full mt-0.5">
                                  <CheckCheck className="h-4 w-4 text-purple-600" />
                                </div>
                                <span className="text-gray-700">{doc}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">
                          Official Resources
                        </h3>
                        <ul className="space-y-2">
                          {searchResults.visa.links.map(
                            (link: any, i: number) => (
                              <li key={i}>
                                <Button
                                  variant="link"
                                  className="h-auto p-0 text-purple-600"
                                >
                                  <ArrowRight className="h-4 w-4 mr-2" />
                                  <span>{link.text}</span>
                                </Button>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </motion.div>
                  </TabsContent>

                  {/* Health Requirements Tab */}
                  <TabsContent value="health" className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="bg-amber-100 p-2 rounded-full">
                              <Syringe className="h-5 w-5 text-amber-600" />
                            </div>
                            <h3 className="text-lg font-semibold">
                              Required Vaccinations
                            </h3>
                          </div>

                          <ul className="space-y-2">
                            {searchResults.health.vaccinations.required.map(
                              (vac: string, i: number) => (
                                <li key={i} className="flex items-start gap-3">
                                  <div className="bg-amber-50 p-1 rounded-full mt-0.5">
                                    <AlertCircle className="h-4 w-4 text-amber-600" />
                                  </div>
                                  <span className="text-gray-700">{vac}</span>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Syringe className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold">
                              Recommended Vaccinations
                            </h3>
                          </div>

                          <ul className="space-y-2">
                            {searchResults.health.vaccinations.recommended.map(
                              (vac: string, i: number) => (
                                <li key={i} className="flex items-start gap-3">
                                  <div className="bg-blue-50 p-1 rounded-full mt-0.5">
                                    <CheckCheck className="h-4 w-4 text-blue-600" />
                                  </div>
                                  <span className="text-gray-700">{vac}</span>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-6 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-4">
                          <div className="bg-purple-100 p-2 rounded-full">
                            <FileText className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1">
                              Health Certificates
                            </h3>
                            <p className="text-gray-700">
                              {searchResults.health.certificates}
                            </p>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-4">
                          <div className="bg-green-100 p-2 rounded-full">
                            <Wallet className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1">
                              Health Insurance
                            </h3>
                            <p className="text-gray-700">
                              {searchResults.health.insurance}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">
                          Health Resources
                        </h3>
                        <ul className="space-y-2">
                          {searchResults.health.links.map(
                            (link: any, i: number) => (
                              <li key={i}>
                                <Button
                                  variant="link"
                                  className="h-auto p-0 text-purple-600"
                                >
                                  <ArrowRight className="h-4 w-4 mr-2" />
                                  <span>{link.text}</span>
                                </Button>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </motion.div>
                  </TabsContent>

                  {/* Customs Tab */}
                  <TabsContent value="customs" className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4">
                          Import Restrictions
                        </h3>
                        <div className="space-y-4">
                          {searchResults.customs.restrictions.map(
                            (restriction: any, i: number) => (
                              <div
                                key={i}
                                className="bg-gray-50 p-4 rounded-lg"
                              >
                                <h4 className="font-semibold mb-1">
                                  {restriction.category}
                                </h4>
                                <p className="text-gray-700 text-sm">
                                  {restriction.details}
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">
                          Prohibited Items
                        </h3>
                        <div className="bg-red-50 p-4 rounded-lg">
                          <ul className="space-y-2">
                            {searchResults.customs.prohibited.map(
                              (item: string, i: number) => (
                                <li key={i} className="flex items-start gap-3">
                                  <div className="bg-red-100 p-1 rounded-full mt-0.5">
                                    <AlertCircle className="h-4 w-4 text-red-600" />
                                  </div>
                                  <span className="text-gray-700">{item}</span>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">
                          Customs Resources
                        </h3>
                        <ul className="space-y-2">
                          {searchResults.customs.links.map(
                            (link: any, i: number) => (
                              <li key={i}>
                                <Button
                                  variant="link"
                                  className="h-auto p-0 text-purple-600"
                                >
                                  <ArrowRight className="h-4 w-4 mr-2" />
                                  <span>{link.text}</span>
                                </Button>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </motion.div>
                  </TabsContent>

                  {/* Travel Advice Tab */}
                  <TabsContent value="travel" className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                          <div className="flex items-start gap-4 mb-3">
                            <div className="bg-amber-100 p-2 rounded-full">
                              <AlertCircle className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-1">
                                Travel Advisory
                              </h3>
                              <p className="font-medium text-amber-600">
                                {searchResults.travel.advisories.level}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-700">
                            {searchResults.travel.advisories.details}
                          </p>
                          {searchResults.travel.advisories.areas && (
                            <p className="text-gray-700 mt-2">
                              <strong>Areas to be aware of:</strong>{" "}
                              {searchResults.travel.advisories.areas}
                            </p>
                          )}
                        </div>

                        <h3 className="text-lg font-semibold mb-3">
                          Local Laws to Know
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                          <ul className="space-y-2">
                            {searchResults.travel.localLaws.map(
                              (law: string, i: number) => (
                                <li key={i} className="flex items-start gap-3">
                                  <div className="bg-blue-50 p-1 rounded-full mt-0.5">
                                    <Landmark className="h-4 w-4 text-blue-600" />
                                  </div>
                                  <span className="text-gray-700">{law}</span>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>

                        <h3 className="text-lg font-semibold mb-3">
                          Currency Information
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold">Currency</h4>
                              <p className="text-gray-700">
                                {searchResults.travel.currency.name}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold">Exchange</h4>
                              <p className="text-gray-700">
                                {searchResults.travel.currency.exchange}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold">Tips</h4>
                              <p className="text-gray-700">
                                {searchResults.travel.currency.tips}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold mb-3">
                            Official Travel Resources
                          </h3>
                          <ul className="space-y-2">
                            {searchResults.travel.links.map(
                              (link: any, i: number) => (
                                <li key={i}>
                                  <Button
                                    variant="link"
                                    className="h-auto p-0 text-purple-600"
                                  >
                                    <ArrowRight className="h-4 w-4 mr-2" />
                                    <span>{link.text}</span>
                                  </Button>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Last Updated</h4>
                      <p className="text-sm text-gray-600">
                        July 15, 2025. Requirements can change frequently.
                        Always verify with official sources.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Additional Travel Information */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-purple-100 p-2 rounded-full">
                <Tickets className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">
                  Passport Services
                </h3>
                <p className="text-gray-600 text-sm">
                  Need a new passport or renewal? Check processing times and
                  requirements.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-purple-600 text-purple-600 mt-4"
            >
              Passport Information
            </Button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-purple-100 p-2 rounded-full">
                <Syringe className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">
                  Vaccination Centers
                </h3>
                <p className="text-gray-600 text-sm">
                  Find travel vaccination centers and book appointments for
                  required vaccines.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-purple-600 text-purple-600 mt-4"
            >
              Find Vaccination Centers
            </Button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-purple-100 p-2 rounded-full">
                <BookCopy className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Travel Insurance</h3>
                <p className="text-gray-600 text-sm">
                  Protect your journey with comprehensive travel insurance
                  coverage.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-purple-600 text-purple-600 mt-4"
            >
              Compare Insurance Plans
            </Button>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-lg mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                question:
                  "How far in advance should I check travel requirements?",
                answer:
                  "We recommend checking travel requirements at least 4-6 weeks before your departure date. Some visa processes can take several weeks, and vaccination requirements may involve multiple doses spread over time.",
              },
              {
                question:
                  "What's the difference between a visa and a travel authorization?",
                answer:
                  "A visa is an official document issued by a country's government allowing entry for a specific purpose and duration. A travel authorization (like ESTA for the US or eTA for Canada) is a simpler pre-approval for travelers from visa-exempt countries, usually obtained online.",
              },
              {
                question: "Do I need travel insurance?",
                answer:
                  "While not always mandatory, travel insurance is strongly recommended for all international travel. Some countries now require proof of health insurance for entry. Good travel insurance covers medical emergencies, trip cancellations, and lost luggage.",
              },
              {
                question: "What should I do if my passport expires soon?",
                answer:
                  "Many countries require that your passport remains valid for at least 6 months beyond your planned return date. If your passport expires within 6-9 months of your trip, we recommend renewing it before traveling.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
              >
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="bg-purple-600 rounded-xl p-6 text-white shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-semibold mb-2">Need Assistance?</h2>
              <p className="text-purple-100">
                Our travel specialists can help with complex visa questions and
                travel requirements.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Contact a Specialist
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Browse Guides
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default TravelRequirements;
