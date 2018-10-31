const getTimeZoneForCountry = countryCode => {
  switch (countryCode) {
    case 'AE':
      return { value: 'Asia/Muscat', label: 'Asia/Muscat' }
    case 'AR':
      return { value: 'America/Buenos_Aires', label: 'America/Buenos_Aires' }
    case 'AT':
      return { value: 'Europe/Vienna', label: 'Europe/Vienna' }
    case 'AU':
      return { value: 'Australia/Sydney', label: 'Australia/Sydney' }
    case 'BB':
      return { value: 'America/Barbados', label: 'America/Barbados' }
    case 'BE':
      return { value: 'Europe/Brussels', label: 'Europe/Brussels' }
    case 'BH':
      return { value: 'Asia/Bahrain', label: 'Asia/Bahrain' }
    case 'BM':
      return { value: 'Atlantic/Bermuda', label: 'Atlantic/Bermuda' }
    case 'BN':
      return { value: 'Asia/Brunei', label: 'Asia/Brunei' }
    case 'BR':
      return { value: 'America/Sao_Paulo', label: 'America/Sao_Paulo' }
    case 'BS':
      return { value: 'America/Bermuda', label: 'America/Bermuda' }
    case 'CA':
      return { value: 'America/Montreal', label: 'America/Montreal' }
    case 'CH':
      return { value: 'Europe/Zurich', label: 'Europe/Zurich' }
    case 'DE':
      return { value: 'Europe/Berlin', label: 'Europe/Berlin' }
    case 'DK':
      return { value: 'Europe/Copenhagen', label: 'Europe/Copenhagen' }
    case 'ES':
      return { value: 'Europe/Madrid', label: 'Europe/Madrid' }
    case 'FI':
      return { value: 'Europe/Helsinki', label: 'Europe/Helsinki' }
    case 'FR':
      return { value: 'Europe/Paris', label: 'Europe/Paris' }
    case 'GI':
      return { value: 'Europe/Gibraltar', label: 'Europe/Gibraltar' }
    case 'GR':
      return { value: 'Europe/Athens', label: 'Europe/Athens' }
    case 'HK':
      return { value: 'Asia/Hong_Kong', label: 'Asia/Hong_Kong' }
    case 'IE':
      return { value: 'Europe/Dublin', label: 'Europe/Dublin' }
    case 'IT':
      return { value: 'Europe/Rome', label: 'Europe/Rome' }
    case 'JP':
      return { value: 'Asia/Tokyo', label: 'Asia/Tokyo' }
    case 'LI':
      return { value: 'Europe/Vaduz', label: 'Europe/Vaduz' }
    case 'LU':
      return { value: 'Europe/Luxembourg', label: 'Europe/Luxembourg' }
    case 'MC':
      return { value: 'Europe/Monaco', label: 'Europe/Monaco' }
    case 'MX':
      return { value: 'America/Mexico_City', label: 'America/Mexico_City' }
    case 'MY':
      return { value: 'Asia/Kuala_Lumpur', label: 'Asia/Kuala_Lumpur' }
    case 'NL':
      return { value: 'Europe/Amsterdam', label: 'Europe/Amsterdam' }
    case 'NO':
      return { value: 'Europe/Oslo', label: 'Europe/Oslo' }
    case 'NZ':
      return { value: 'Pacific/Auckland', label: 'Pacific/Auckland' }
    case 'PT':
      return { value: 'Europe/Lisbon', label: 'Europe/Lisbon' }
    case 'SA':
      return { value: 'Asia/Riyadh', label: 'Asia/Riyadh' }
    case 'SE':
      return { value: 'Europe/Stockholm', label: 'Europe/Stockholm' }
    case 'SG':
      return { value: 'Asia/Singapore', label: 'Asia/Singapore' }
    case 'TH':
      return { value: 'Asia/Bangkok', label: 'Asia/Bangkok' }
    case 'TR':
      return { value: 'Europe/Istanbul', label: 'Europe/Istanbul' }
    case 'TW':
      return { value: 'Asia/Taipei', label: 'Asia/Taipei' }
    case 'ZA':
      return { value: 'Africa/Johannesburg', label: 'Africa/Johannesburg' }
    case 'US':
      return { value: 'America/New_York', label: 'New York' }
    case 'GB':
    case 'UK':
      return { value: 'Europe/London', label: 'Europe/London' }
    default:
      return {
        value: 'GMT',
        label: 'GMT',
      }
  }
}

export default getTimeZoneForCountry
