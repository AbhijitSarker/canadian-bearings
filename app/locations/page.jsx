"use client";

import { useState } from "react";

const locationsData = [
  {
    province: "Ontario",
    locations: [
      {
        name: "Barrie",
        phone: "705.726.3030",
        fax: "705.726.4581",
        address: "220 Bayview Dr, Unit 3, Barrie, ON, L4N 4Y8"
      },
      {
        name: "Mississauga",
        phone: "905-670-7422",
        fax: "905.670.7466",
        address: "1600 Drew Rd, Mississauga, ON, L5S 1S5"
      },
      {
        name: "Hamilton",
        phone: "905.547.2351",
        fax: "905.547.9720",
        address: "400 Parkdale Ave. N, UNIT 1C, Hamilton, ON, L8H 5Y2"
      },
      {
        name: "North Bay",
        phone: "705.474.1022",
        fax: "705.474.6182",
        address: "13 Commerce Cres., North Bay, ON, P1B 8J8"
      },
      {
        name: "St Catharines",
        phone: "905.688.4380",
        fax: "905.688.4546",
        address: "11 Neilson St., St Catharines, ON, L2M 5V9"
      },
      {
        name: "Hearst",
        phone: "705.372.0022",
        fax: "705.372.0027",
        address: "3-15th Street, Unit# 5, Hearst, ON, P0L 1N0"
      },
      {
        name: "Peterborough",
        phone: "705.743.6000",
        fax: "705.743.9430",
        address: "686 Rye St., Peterborough, ON, K9J 6W9"
      },
      {
        name: "Thunder Bay",
        phone: "807.345.8166",
        fax: "807.345.9617",
        address: "910 Commerce Street - Unit 3, Thunder Bay, ON, P7E 6E9"
      },
      {
        name: "Kingston",
        phone: "613.389.5371",
        fax: "613.384.6879",
        address: "740A Baker Cres., Kingston, ON, K7M 6P6"
      },
      {
        name: "Sarnia",
        phone: "519.337-3258",
        fax: "519.337.5516",
        address: "1030 Confederation St., Unit 14, Sarnia, ON, N7S 6H1"
      },
      {
        name: "Windsor",
        phone: "519.944.0317",
        fax: "519.944.0309",
        address: "2885 Lauzon Parkway, Unit 105, Windsor, ON, N8T 3H5"
      },
      {
        name: "Kitchener",
        phone: "519.748.5500",
        fax: "519.748.5040",
        address: "500 Trillium Dr., Unit 1, Kitchener, ON, N2R 1A7"
      },
      {
        name: "Sault Ste Marie",
        phone: "705.942.7011",
        fax: "705.942.7018",
        address: "530 Cathcart St., Sault Ste Marie, ON, P6A 1G2"
      },
      {
        name: "London",
        phone: "519.686.7600",
        fax: "519.686.3067",
        address: "115 Midpark Rd, London, ON, N6N 1B2"
      }
    ]
  },
  {
    province: "Quebec",
    locations: [
      {
        name: "Quebec City",
        phone: "418.681.1300",
        fax: "418.681.8515",
        address: "220 Rue Fortin, Quebec City, QC, G1M 3S5"
      },
      {
        name: "Shawinigan Sud",
        phone: "819.536.4800",
        fax: "819.536.0279",
        address: "75 Rue du parc- Industriel, Shawinigan, QC, G9N 6T5"
      },
      {
        name: "Saguenay",
        phone: "418.545.4623",
        fax: "418.545.4447",
        address: "1051, de la Rupert, Chicoutimi, QC, G7K 0A2"
      },
      {
        name: "Val D'Or",
        phone: "819.824.3678",
        fax: "819.824.2185",
        address: "1500 4E Rue, Val D'Or, QC, J9P 6X2"
      }
    ]
  },
  {
    province: "New Brunswick",
    locations: [
      {
        name: "Moncton",
        phone: "506.857.8491",
        fax: "506.857.9789",
        address: "290 Baig Blvd, Moncton, NB, E1E 1C8"
      },
      {
        name: "Saint John",
        phone: "506.633.7560",
        fax: "506.634.8927",
        address: "28 McIlveen Drive, Saint John, NB, E2J 4Y7"
      }
    ]
  },
  {
    province: "Nova Scotia",
    locations: [
      {
        name: "Halifax",
        phone: "902.450.5600",
        fax: "902.450.5319",
        address: "133 Ilsley Avenue, Dartmouth, NS, B3B 1S9"
      }
    ]
  },
  {
    province: "Alberta",
    locations: [
      {
        name: "Edmonton",
        phone: "780.452.0316",
        fax: "",
        address: "8741 53 Avenue NW, Edmonton, AB, T6E 5E9"
      }
    ]
  }
];

export default function LocationsPage() {
  const [expandedProvinces, setExpandedProvinces] = useState(["Ontario"]);

  const toggleProvince = (province) => {
    setExpandedProvinces(prev => 
      prev.includes(province) 
        ? prev.filter(p => p !== province)
        : [...prev, province]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section - Styled like image */}
      <div className="bg-[#f8f6f3] py-6 sm:py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Location
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-4xl leading-relaxed">
            Whether you need one part, a full-service solution or simply have a question or comment, don’t hesitate to get in touch. We’re always ready to help.
          </p>
        </div>
      </div>

      {/* Locations Section */}
      <div className="container mx-auto px-4 max-w-7xl py-12 sm:py-16">
        <div className="space-y-8">
          {locationsData.map((provinceData) => (
            <div key={provinceData.province} className="border-b border-gray-200 last:border-b-0">
              {/* Province Header */}
              <button
                onClick={() => toggleProvince(provinceData.province)}
                className="w-full flex items-center justify-between py-5 hover:opacity-70 transition-opacity group"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-[#4E9647] transition-colors">
                  {provinceData.province}
                </h2>
                <svg
                  className={`w-7 h-7 text-gray-500 transition-transform duration-300 ${
                    expandedProvinces.includes(provinceData.province) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Location Cards - 4 Column Grid */}
              {expandedProvinces.includes(provinceData.province) && (
                <div className="pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {provinceData.locations.length > 0 ? (
                    provinceData.locations.map((location, index) => (
                      <div
                        key={index}
                        className="group bg-white rounded-lg p-6 border-2 border-gray-100 hover:border-[#4E9647] hover:shadow-xl transition-all duration-300"
                      >
                        {/* Location Name with Icon */}
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-[#4E9647] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#4E9647] transition-colors">
                              {location.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-0.5">
                              {provinceData.province}
                            </p>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-gray-200 via-[#4E9647] to-gray-200 mb-4 opacity-30 group-hover:opacity-100 transition-opacity"></div>

                        {/* Contact Info */}
                        <div className="space-y-3 text-sm">
                          {/* Phone */}
                          <div className="flex items-start gap-2.5">
                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#4E9647]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                            </svg>
                            <a 
                              href={`tel:${location.phone.replace(/\./g, '').replace(/-/g, '')}`} 
                              className="hover:text-[#4E9647] font-medium transition-colors"
                            >
                              {location.phone}
                            </a>
                          </div>

                          {/* Fax */}
                          {location.fax && (
                            <div className="flex items-start gap-2.5">
                              <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z"/>
                                <circle cx="18" cy="11.5" r="1"/>
                              </svg>
                              <span className="text-gray-600">
                                <span className="text-gray-400">Fax:</span> {location.fax}
                              </span>
                            </div>
                          )}

                          {/* Address */}
                          <div className="flex items-start gap-2.5 pt-2">
                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#4E9647]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <address className="not-italic text-gray-600 leading-relaxed">
                              {location.address}
                            </address>
                          </div>
                        </div>

                        {/* Get Directions Link */}
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-gray-50 hover:bg-[#4E9647] text-gray-700 hover:text-white rounded-md font-medium transition-all duration-300 group/btn"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          <span className="text-sm">Get Directions</span>
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12 text-gray-500">
                      No locations available for this province yet.
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
