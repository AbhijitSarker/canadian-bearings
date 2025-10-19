"use client"
import { useState } from "react"
import TelephoneIcon from "@/assets/icons/telephoneIcon"

const dummy_languages = [
    {
        name: 'English',
        code: 'EN',
        flag: '🇺🇸',
        translations: {
            sales: 'Sales',
            phone: '(250) 555-0199',
            quote: 'Request a Quote',
            support: 'Customer Support',
            knowledge: 'Knowledge Center'
        }
    },
    {
        name: 'Spanish',
        code: 'ES',
        flag: '🇪🇸',
        translations: {
            sales: 'Ventas',
            phone: '(250) 555-0199',
            quote: 'Solicitar Cotización',
            support: 'Atención al Cliente',
            knowledge: 'Centro de Conocimiento'
        }
    },
    {
        name: 'French',
        code: 'FR',
        flag: '🇫🇷',
        translations: {
            sales: 'Ventes',
            phone: '(250) 555-0199',
            quote: 'Demander un Devis',
            support: 'Service Client',
            knowledge: 'Centre de Connaissances'
        }
    },
    {
        name: 'German',
        code: 'DE',
        flag: '🇩🇪',
        translations: {
            sales: 'Vertrieb',
            phone: '(250) 555-0199',
            quote: 'Angebot Anfordern',
            support: 'Kundendienst',
            knowledge: 'Wissenszentrum'
        }
    }
]

export default function TopHeader({ bgColor = "bg-green-50", textColor = "text-neutral-600", iconColor = "#4E9647" }) {
    const [selectedLanguage, setSelectedLanguage] = useState(dummy_languages[0])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    return (
        <section className={`${bgColor} ${textColor} border-b border-neutral-200`}>
            <div className="container mx-auto px-4 py-2">
                {/* Desktop Layout */}
                <div className="hidden lg:flex justify-between items-center">
                    <div className="flex items-center gap-x-[8px]">
                        <TelephoneIcon color={iconColor} />
                        <div className="text-sm">
                            {selectedLanguage.translations.sales} : {selectedLanguage.translations.phone}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-[11px] border-r border-neutral-300 text-sm">
                            {selectedLanguage.translations.quote}
                        </div>
                        <div className="px-[11px] border-r border-neutral-300 text-sm">
                            {selectedLanguage.translations.support}
                        </div>
                        <div className="px-[11px] text-sm">
                            {selectedLanguage.translations.knowledge}
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="border border-neutral-300 bg-green-50 rounded-md py-2 px-4 text-sm hover:bg-neutral-50 transition-colors min-w-[140px] flex items-center justify-between gap-3 shadow-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl leading-none">{selectedLanguage.flag}</span>
                                    <span className="font-medium">{selectedLanguage.name}</span>
                                </div>
                                <svg
                                    className={`w-5 h-5 transition-transform text-neutral-400 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 bg-white border border-neutral-200 rounded-2xl shadow-lg z-50 min-w-[180px] overflow-hidden">
                                    {dummy_languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setSelectedLanguage(lang)
                                                setIsDropdownOpen(false)
                                            }}
                                            className={`w-full text-left px-4 py-3 text-sm hover:bg-neutral-50 transition-colors flex items-center gap-3 ${selectedLanguage.code === lang.code ? 'bg-green-50' : ''
                                                }`}
                                        >
                                            <span className="text-2xl leading-none">{lang.flag}</span>
                                            <span className={selectedLanguage.code === lang.code ? 'font-medium' : ''}>{lang.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tablet Layout */}
                <div className="hidden md:flex lg:hidden justify-between items-center flex-wrap gap-y-2">
                    <div className="flex items-center gap-x-[8px]">
                        <TelephoneIcon color={iconColor} />
                        <div className="text-sm">
                            {selectedLanguage.translations.sales} : {selectedLanguage.translations.phone}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="px-[8px] border-r border-neutral-300 text-sm">
                            {selectedLanguage.translations.quote}
                        </div>
                        <div className="px-[8px] border-r border-neutral-300 text-sm">
                            {selectedLanguage.translations.support}
                        </div>
                        <div className="px-[8px] text-sm">
                            {selectedLanguage.translations.knowledge}
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="border border-neutral-300 bg-green-50 rounded-md py-1 px-2 text-sm  transition-colors min-w-[140px] flex items-center justify-between gap-3 shadow-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl leading-none">{selectedLanguage.flag}</span>
                                    <span className="font-medium">{selectedLanguage.name}</span>
                                </div>
                                <svg
                                    className={`w-5 h-5 transition-transform text-neutral-400 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 bg-red border border-neutral-200 rounded-2xl shadow-lg z-50 min-w-[180px] overflow-hidden">
                                    {dummy_languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setSelectedLanguage(lang)
                                                setIsDropdownOpen(false)
                                            }}
                                            className={`w-full text-left px-4 py-3 text-sm hover:bg-neutral-50 transition-colors flex items-center gap-3 ${selectedLanguage.code === lang.code ? 'bg-green-50' : ''
                                                }`}
                                        >
                                            <span className="text-2xl leading-none">{lang.flag}</span>
                                            <span className={selectedLanguage.code === lang.code ? 'font-medium' : ''}>{lang.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden space-y-2">
                    {/* Phone Number Row */}
                    <div className="flex items-center justify-center gap-x-[8px]">
                        <TelephoneIcon color={iconColor} />
                        <div className="text-sm">
                            {selectedLanguage.translations.sales} : {selectedLanguage.translations.phone}
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="border border-neutral-300 bg-green-50 rounded-md py-1 px-2 text-xs  transition-colors flex items-center gap-2 shadow-sm"
                            >
                                <span className="text-lg leading-none">{selectedLanguage.flag}</span>
                                <span className="font-medium">{selectedLanguage.code}</span>
                                <svg
                                    className={`w-4 h-4 transition-transform text-neutral-400 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 bg-white border border-neutral-200 rounded-2xl shadow-lg z-50 min-w-[180px] overflow-hidden">
                                    {dummy_languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setSelectedLanguage(lang)
                                                setIsDropdownOpen(false)
                                            }}
                                            className={`w-full text-left px-4 py-3 text-sm hover:bg-neutral-50 transition-colors flex items-center gap-3 ${selectedLanguage.code === lang.code ? 'bg-green-50' : ''
                                                }`}
                                        >
                                            <span className="text-2xl leading-none">{lang.flag}</span>
                                            <span className={selectedLanguage.code === lang.code ? 'font-medium' : ''}>{lang.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Links Row */}
                    <div className="flex items-center justify-center gap-2 text-xs flex-wrap">
                        <div className="px-[8px] border-r border-neutral-300 whitespace-nowrap">
                            {selectedLanguage.translations.quote}
                        </div>
                        <div className="px-[8px] border-r border-neutral-300 whitespace-nowrap">
                            {selectedLanguage.code === 'EN' ? 'Support' : selectedLanguage.translations.support}
                        </div>
                        <div className="px-[8px] whitespace-nowrap">
                            {selectedLanguage.code === 'EN' ? 'Knowledge' : selectedLanguage.translations.knowledge}
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    )
}