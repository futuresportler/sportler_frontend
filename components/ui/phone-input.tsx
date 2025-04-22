"use client"

import type React from "react"

import { useState } from "react"

interface PhoneInputProps {
  value: string
  onChange: (value: string, data: { countryCode: string }) => void
  country?: string
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }
  containerClass?: string
  buttonClass?: string
  disabled?: boolean
}

export function PhoneInput({
  value,
  onChange,
  country = "in",
  inputProps = {},
  containerClass = "",
  buttonClass = "",
  disabled = false,
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(country)

  // Map of country codes to dial codes
  const countryCodes: Record<string, { code: string; flag: string }> = {
    in: { code: "+91", flag: "🇮🇳" },
    us: { code: "+1", flag: "🇺🇸" },
    gb: { code: "+44", flag: "🇬🇧" },
    ca: { code: "+1", flag: "🇨🇦" },
    au: { code: "+61", flag: "🇦🇺" },
    de: { code: "+49", flag: "🇩🇪" },
    fr: { code: "+33", flag: "🇫🇷" },
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value.replace(/\D/g, "")
    onChange(phoneNumber, { countryCode: selectedCountry })
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value
    setSelectedCountry(newCountry)
    onChange(value, { countryCode: newCountry })
  }

  return (
    <div className={`relative ${containerClass}`}>
      <div
        className={`absolute left-0 top-0 bottom-0 flex items-center justify-center px-2 border-r border-gray-300 ${buttonClass}`}
        style={{ minWidth: "70px", zIndex: 10 }}
      >
        <select
          value={selectedCountry}
          onChange={handleCountryChange}
          className="appearance-none bg-transparent border-none focus:outline-none pr-6 pl-1 text-sm"
          disabled={disabled}
          style={{ minWidth: "70px" }}
        >
          {Object.entries(countryCodes).map(([code, data]) => (
            <option key={code} value={code}>
              {data.flag} {data.code}
            </option>
          ))}
        </select>
      </div>
      <input
        type="tel"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        {...inputProps}
        className={`pl-[90px] ${inputProps.className || ""}`}
      />
    </div>
  )
}
