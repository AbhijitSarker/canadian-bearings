"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Loader2, MapPin, User, CreditCard, Package, Calendar, Clock, Tag, Mail, Building2 } from "lucide-react";
import { getQuoteDetails } from "@/lib/api/services/quotes";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function QuoteDetails({ quoteNumber, onBack }) {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await getQuoteDetails(quoteNumber);
        if (res.success) {
          const quoteData = res.data?.body || res.data;
          console.log('Quote data:', quoteData);
          setQuote(quoteData);
        } else {
          setError(res.error || "Failed to load quote details");
        }
      } catch (err) {
        console.error('Error fetching quote details:', err);
        setError("An error occurred while loading quote details");
      } finally {
        setLoading(false);
      }
    };

    if (quoteNumber) {
      fetchDetails();
    }
  }, [quoteNumber]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-green-100 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">Loading quote details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-center text-red-800 font-medium mb-4">{error}</p>
          <button
            onClick={onBack}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-300 flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Quotes
          </button>
        </div>
      </div>
    );
  }

  if (!quote) return null;

  const { header, customer, contact, billing, shipping, lines, mainline, taxes } = quote;
  const validLines = lines?.filter(line => line.item?.spn) || [];

  return (
    <div className="min-h-screen bg-gray-50 pb-12 border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 rounded-t-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-all"
              >
                <ArrowLeft size={22} />
              </button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">Quote {header?.orderno}</h1>
                  <Badge className="bg-green-100 text-green-700 border-0 px-3 py-1">
                    {header?.transtype}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Created {header?.datecreated} • {header?.takenby}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="border-gray-300 text-gray-700 px-4 py-2 text-sm font-medium">
              {header?.disposition}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Content - 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-gray-500 font-medium">Ship Date</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{header?.shipdate}</p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span className="text-xs text-gray-500 font-medium">Promise Date</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{header?.promisedate}</p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-1">
                  <Tag className="w-4 h-4 text-orange-500" />
                  <span className="text-xs text-gray-500 font-medium">Terms</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{header?.termstype}</p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-gray-500 font-medium">Items</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{validLines.length} Items</p>
              </div>
            </div>

            {/* Line Items */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Package size={20} className="text-gray-500" />
                  <h3 className="font-semibold text-gray-900 text-base">Order Items</h3>
                </div>
                <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-0 font-medium px-3">
                  {validLines.length} Items
                </Badge>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 border-b border-gray-100">
                      <TableHead className="w-[60px] font-semibold text-gray-600 pl-6">#</TableHead>
                      <TableHead className="font-semibold text-gray-600">Product Details</TableHead>
                      <TableHead className="text-right font-semibold text-gray-600">Quantity</TableHead>
                      <TableHead className="text-right font-semibold text-gray-600">Unit Price</TableHead>
                      <TableHead className="text-right font-semibold text-gray-600 pr-6">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {validLines.map((line) => (
                      <TableRow key={line.lineNum} className="hover:bg-gray-50/50 border-b border-gray-100 last:border-0">
                        <TableCell className="font-medium text-gray-500 pl-6 align-top pt-4">{line.lineNum}</TableCell>
                        <TableCell className="py-4 align-top">
                          <div className="flex gap-4">
                            {line.item?.imageUrl ? (
                              <div className="flex-shrink-0 border border-gray-200 rounded-lg overflow-hidden w-16 h-16 bg-white">
                                <img
                                  src={line.item.imageUrl}
                                  alt={line.item.spn}
                                  className="w-full h-full object-contain p-1"
                                />
                              </div>
                            ) : (
                              <div className="flex-shrink-0 border border-gray-200 rounded-lg w-16 h-16 bg-gray-50 flex items-center justify-center text-gray-300">
                                <Package size={24} />
                              </div>
                            )}
                            <div className="flex-1 space-y-1">
                              <div className="font-bold text-gray-900 text-base">{line.item?.spn}</div>
                              <div className="text-sm text-gray-500 leading-relaxed max-w-xl">{line.item?.description}</div>
                              <div className="flex gap-2 flex-wrap mt-2">
                                {line.item?.manufacturer && (
                                  <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-0 text-xs px-2.5 py-0.5 font-medium rounded">
                                    {line.item.manufacturer}
                                  </Badge>
                                )}
                                {line.item?.itemClass && (
                                  <Badge variant="outline" className="text-xs px-2.5 py-0.5 font-medium text-gray-600 border-gray-200 rounded bg-white">
                                    {line.item.itemClass}
                                  </Badge>
                                )}
                                {line.item?.quantityOnHand > 0 && (
                                  <Badge className="bg-green-50 text-green-700 hover:bg-green-100 border-0 text-xs px-2.5 py-0.5 font-medium rounded">
                                    {line.item.quantityOnHand} in stock
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-4 align-top">
                          <div className="font-bold text-gray-900">{line.quantityOrdered}</div>
                          {line.unitOfMeasure && (
                            <div className="text-xs text-gray-500 mt-0.5">{line.unitOfMeasure}</div>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-medium text-gray-900 py-4 align-top">${line.price?.toFixed(2)}</TableCell>
                        <TableCell className="text-right font-bold text-gray-900 pr-6 py-4 align-top">${line.netAmount?.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    {validLines.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="h-48 text-center">
                          <div className="flex flex-col items-center justify-center text-gray-400">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                              <Package size={32} className="text-gray-300" />
                            </div>
                            <p className="text-gray-500 font-medium">No items in this quote</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            
          </div>

          {/* Right Sidebar - Order Summary */}
          <div className="lg:col-span-1 space-y-6">
          
            <div className="bg-white rounded-lg border border-gray-200 top-8">
              <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">Order Summary</h3>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">${mainline?.netAmount?.toFixed(2)}</span>
                </div>

                {taxes?.filter(tax => tax.netAmount !== 0).map((tax, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {tax.taxCodeLabel} {tax.netAmount < 0 ? '(Credit)' : ''}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {tax.netAmount < 0 ? '-' : ''}${Math.abs(tax.netAmount).toFixed(2)}
                    </span>
                  </div>
                ))}

                <div className="pt-4 mt-4 border-t-2 border-gray-200">
                  <div className="flex justify-between items-baseline">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-bold text-green-600">
                      ${Math.abs(
                        (mainline?.netAmount || 0) +
                        (taxes?.reduce((acc, curr) => acc + (curr.netAmount || 0), 0) || 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Transaction ID</span>
                    <span className="font-mono text-gray-700">{header?.transactionId}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Unique ID</span>
                    <span className="font-mono text-gray-700">{header?.uniqueId?.slice(0, 18)}...</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-5 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2 text-gray-900">
                  <User size={18} className="text-gray-500" />
                  <h3 className="font-semibold">Customer Information</h3>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <Building2 size={12} />
                    Customer Name
                  </div>
                  <p className="font-medium text-gray-900">{customer?.customerName}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <Tag size={12} />
                    Customer No.
                  </div>
                  <p className="font-mono text-sm text-gray-900">{customer?.custno}</p>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <User size={12} />
                    Contact Person
                  </div>
                  <p className="font-medium text-gray-900 text-sm">{contact?.placedByName}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                    <Mail size={11} />
                    <a href={`mailto:${contact?.placedByEmail}`} className="hover:text-green-600">
                      {contact?.placedByEmail}
                    </a>
                  </div>
                </div>
                {(header?.custpo || header?.customerPoNumber) && (
                  <div className="pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">PO Number</div>
                    <p className="font-mono text-sm text-gray-900 bg-gray-50 px-2 py-1.5 rounded">
                      {header?.custpo || header?.customerPoNumber}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-5 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2 text-gray-900">
                  <CreditCard size={18} className="text-gray-500" />
                  <h3 className="font-semibold">Billing Address</h3>
                </div>
              </div>
              <div className="p-5">
                <div className="space-y-0.5 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">{billing?.address1}</p>
                  {billing?.address2 && <p>{billing?.address2}</p>}
                  {billing?.address3 && <p>{billing?.address3}</p>}
                  <p className="pt-1">{billing?.city}, {billing?.state} {billing?.zip}</p>
                  <p className="font-medium">{billing?.country}</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-5 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2 text-gray-900">
                  <MapPin size={18} className="text-gray-500" />
                  <h3 className="font-semibold">Shipping Address</h3>
                </div>
              </div>
              <div className="p-5">
                <div className="space-y-0.5 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">{shipping?.address1}</p>
                  {shipping?.address2 && <p>{shipping?.address2}</p>}
                  {shipping?.address3 && <p>{shipping?.address3}</p>}
                  <p className="pt-1">{shipping?.city}, {shipping?.state} {shipping?.zip}</p>
                  <p className="font-medium">{shipping?.country}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}