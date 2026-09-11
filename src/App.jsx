import { useState } from 'react'
import {
  Building2,
  MapPin,
  Bed,
  Bath,
  ParkingCircle,
  Star,
  ChevronDown,
  Menu,
  X,
  Calendar,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Shield,
  Heart,
  Search,
  Home,
  FileText,
  Users,
  TrendingUp,
  Lock,
  Zap,
} from 'lucide-react'
import './App.css'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [filterType, setFilterType] = useState('rent')
  const [filterBeds, setFilterBeds] = useState('any')
  const [filterLocation, setFilterLocation] = useState('all')
  const [filterPrice, setFilterPrice] = useState('any')
  const [showViewingForm, setShowViewingForm] = useState(false)
  const [showValuationForm, setShowValuationForm] = useState(false)
  const [calculatorLocation, setCalculatorLocation] = useState('jewellery')
  const [calculatorBeds, setCalculatorBeds] = useState('2')
  const [calculatorYield, setCalculatorYield] = useState(null)
  const [viewingFormData, setViewingFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    interestedIn: 'viewing',
    date: '',
    message: '',
  })
  const [viewingSubmitted, setViewingSubmitted] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)

  const properties = [
    {
      id: 1,
      title: 'Luxury 2-Bed Penthouse',
      location: 'Jewellery Quarter',
      beds: 2,
      baths: 2,
      price: 1850,
      type: 'rent',
      badge: 'NEW TO MARKET',
      description: 'Stunning city views, smart home integration',
      parking: true,
    },
    {
      id: 2,
      title: 'Executive 4-Bed Detached',
      location: 'Edgbaston',
      beds: 4,
      baths: 3,
      price: 3200,
      type: 'rent',
      badge: 'FEATURED',
      description: 'Period property with modern updates, private garden',
      parking: true,
    },
    {
      id: 3,
      title: 'Modern 1-Bed Canal-Side',
      location: 'Mailbox District',
      beds: 1,
      baths: 1,
      price: 1150,
      type: 'rent',
      badge: null,
      description: 'Contemporary apartment with balcony views',
      parking: false,
    },
    {
      id: 4,
      title: 'Contemporary 2-Bed Duplex',
      location: 'Digbeth',
      beds: 2,
      baths: 2,
      price: 1400,
      type: 'rent',
      badge: null,
      description: 'Arts district living, open plan design',
      parking: true,
    },
    {
      id: 5,
      title: 'Georgian 5-Bed Residence',
      location: 'Harborne Village',
      beds: 5,
      baths: 3,
      price: 850000,
      type: 'sale',
      badge: null,
      description: 'Period charm with contemporary comforts',
      parking: true,
    },
    {
      id: 6,
      title: 'Studio Apartment',
      location: 'Colmore Business District',
      beds: 1,
      baths: 1,
      price: 950,
      type: 'rent',
      badge: 'LET AGREED',
      description: 'Compact luxury, perfect for professionals',
      parking: false,
    },
  ]

  const filteredProperties = properties.filter(prop => {
    if (prop.type !== filterType) return false
    if (filterBeds !== 'any') {
      const beds = parseInt(filterBeds)
      if (filterBeds === '3+' && prop.beds < 3) return false
      if (filterBeds !== '3+' && prop.beds !== beds) return false
    }
    if (filterLocation !== 'all' && prop.location !== filterLocation) return false
    return true
  })

  const handleCalculateYield = () => {
    const baseYields = {
      jewellery: { 1: 5.2, 2: 4.8, 3: 4.5, 4: 4.2 },
      edgbaston: { 1: 4.8, 2: 4.5, 3: 4.2, 4: 3.9 },
      citycore: { 1: 5.5, 2: 5.1, 3: 4.8, 4: 4.5 },
      digbeth: { 1: 5.3, 2: 4.9, 3: 4.6, 4: 4.3 },
      solihull: { 1: 5.0, 2: 4.6, 3: 4.3, 4: 4.0 },
    }
    const beds = parseInt(calculatorBeds)
    const yield_val = baseYields[calculatorLocation]?.[beds] || 4.5
    setCalculatorYield(yield_val)
  }

  const handleViewingSubmit = (e) => {
    e.preventDefault()
    if (
      viewingFormData.name &&
      viewingFormData.email &&
      viewingFormData.mobile
    ) {
      setViewingSubmitted(true)
      setTimeout(() => {
        setShowViewingForm(false)
        setShowValuationForm(false)
        setViewingSubmitted(false)
        setViewingFormData({
          name: '',
          email: '',
          mobile: '',
          interestedIn: 'viewing',
          date: '',
          message: '',
        })
      }, 3000)
    }
  }

  const faqs = [
    {
      q: 'What are the standard tenant referencing checks in the UK?',
      a: 'Our rigorous vetting includes credit checks, employment verification, previous landlord references, and right-to-rent checks. We ensure only the most reliable tenants move into your property.',
    },
    {
      q: "How does your Guaranteed Rent scheme protect landlords?",
      a: 'Our Guaranteed Rent Scheme provides fixed monthly income regardless of occupancy. We manage all tenant management, maintenance, and void periods. You receive guaranteed payments on the 1st of every month.',
    },
    {
      q: 'How quickly can you let a property in Birmingham City Centre?',
      a: 'With our extensive tenant database and marketing reach, we typically let properties within 2-4 weeks. Our premium properties in high-demand areas often receive multiple applications within days.',
    },
    {
      q: 'Are client deposits protected under a government scheme?',
      a: 'Yes, all deposits are protected under the Tenancy Deposit Scheme (TDS), ensuring full protection for both landlords and tenants as required by UK law.',
    },
  ]

  return (
    <div className="bg-slate-dark text-white min-h-screen">
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'RealEstateAgent',
          name: 'Highland & Co. Property Lettings & Estate Management',
          description:
            'Premier independent estate agency and lettings specialists based in Birmingham City Centre, UK',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Colmore Row',
            addressLocality: 'Birmingham',
            addressRegion: 'West Midlands',
            postalCode: 'B3 2BJ',
            addressCountry: 'GB',
          },
          telephone: '0121 496 0880',
          url: 'https://highlandco.co.uk',
          areaServed: {
            '@type': 'City',
            name: 'Birmingham',
          },
          sameAs: [
            'https://facebook.com/highlandco',
            'https://instagram.com/highlandco',
            'https://linkedin.com/company/highlandco',
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: 5.0,
            reviewCount: 160,
            ratingCount: 160,
          },
          foundingDate: '2010',
        })}
      </script>

      {/* 1. ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-oxford-navy to-slate-dark border-b border-gold-light/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-2 text-center text-sm md:text-base">
          <span className="text-gold-light">
            🏡 Birmingham's Trusted Lettings & Estate Specialists | Guaranteed Rent
            For Landlords | Call Our Colmore Row Office:{' '}
            <a href="tel:0121496880" className="font-bold hover:text-gold transition">
              0121 496 0880
            </a>
          </span>
        </div>
      </div>

      {/* 2. NAVBAR */}
      <nav className="bg-oxford-navy/95 backdrop-blur border-b border-gold-light/20 sticky top-11 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-gold-light" />
              <span className="text-xl font-bold text-gold-light">HIGHLAND & CO.</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#properties" className="hover:text-gold-light transition text-sm">
                To Let
              </a>
              <a href="#properties" className="hover:text-gold-light transition text-sm">
                For Sale
              </a>
              <a href="#landlord" className="hover:text-gold-light transition text-sm">
                Landlord Services
              </a>
              <a href="#calculator" className="hover:text-gold-light transition text-sm">
                Valuation
              </a>
              <a href="#testimonials" className="hover:text-gold-light transition text-sm">
                Reviews
              </a>
              <a href="#contact" className="hover:text-gold-light transition text-sm">
                Contact
              </a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setShowValuationForm(true)}
                className="px-4 py-2 bg-gold-light text-oxford-navy font-semibold rounded hover:bg-gold transition text-sm"
              >
                Landlord Valuation
              </button>
              <button
                onClick={() => setShowViewingForm(true)}
                className="px-4 py-2 border border-gold-light text-gold-light font-semibold rounded hover:bg-gold-light/10 transition text-sm"
              >
                Book Viewing
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gold-light/20 pt-4 space-y-3">
              <a
                href="#properties"
                className="block hover:text-gold-light transition text-sm"
              >
                To Let
              </a>
              <a
                href="#properties"
                className="block hover:text-gold-light transition text-sm"
              >
                For Sale
              </a>
              <a
                href="#landlord"
                className="block hover:text-gold-light transition text-sm"
              >
                Landlord Services
              </a>
              <a
                href="#calculator"
                className="block hover:text-gold-light transition text-sm"
              >
                Valuation
              </a>
              <a
                href="#testimonials"
                className="block hover:text-gold-light transition text-sm"
              >
                Reviews
              </a>
              <a
                href="#contact"
                className="block hover:text-gold-light transition text-sm"
              >
                Contact
              </a>
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    setShowValuationForm(true)
                    setIsMenuOpen(false)
                  }}
                  className="w-full px-4 py-2 bg-gold-light text-oxford-navy font-semibold rounded hover:bg-gold transition text-sm"
                >
                  Landlord Valuation
                </button>
                <button
                  onClick={() => {
                    setShowViewingForm(true)
                    setIsMenuOpen(false)
                  }}
                  className="w-full px-4 py-2 border border-gold-light text-gold-light font-semibold rounded hover:bg-gold-light/10 transition text-sm"
                >
                  Book Viewing
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative py-16 md:py-24 px-4 bg-gradient-to-b from-slate-dark to-oxford-navy overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gold-light rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Exceptional Properties.{' '}
              <span className="text-gold-light">
                Unrivalled Birmingham Lettings & Management
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connecting discerning tenants with luxury city apartments and
              executive family homes across Birmingham and the West Midlands.
              Full-service property management with 99.4% occupancy rates.
            </p>
          </div>

          {/* Quick Search Bar */}
          <div className="bg-card-bg/80 backdrop-blur border border-gold-light/30 rounded-lg p-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gold-light">
                  Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full bg-oxford-navy border border-gold-light/30 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-light"
                >
                  <option value="rent">To Rent</option>
                  <option value="sale">For Sale</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gold-light">
                  Bedrooms
                </label>
                <select
                  value={filterBeds}
                  onChange={(e) => setFilterBeds(e.target.value)}
                  className="w-full bg-oxford-navy border border-gold-light/30 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-light"
                >
                  <option value="any">Any</option>
                  <option value="1">1 Bed</option>
                  <option value="2">2 Beds</option>
                  <option value="3+">3+ Beds</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gold-light">
                  Location
                </label>
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="w-full bg-oxford-navy border border-gold-light/30 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-light"
                >
                  <option value="all">All Areas</option>
                  <option value="Jewellery Quarter">Jewellery Quarter</option>
                  <option value="Edgbaston">Edgbaston</option>
                  <option value="Mailbox District">Mailbox District</option>
                  <option value="Digbeth">Digbeth</option>
                  <option value="Harborne Village">Harborne Village</option>
                  <option value="Colmore Business District">Colmore District</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-gold-light">
                  Search
                </label>
                <button className="w-full bg-gradient-to-r from-gold to-gold-light text-oxford-navy font-bold py-2 rounded hover:shadow-lg hover:shadow-gold/50 transition flex items-center justify-center gap-2">
                  <Search className="w-4 h-4" />
                  Search Properties
                </button>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card-bg/60 border border-gold-light/20 rounded-lg p-4 text-center">
              <Shield className="w-6 h-6 text-gold-light mx-auto mb-2" />
              <p className="text-sm font-semibold">ARLA Propertymark Protected</p>
            </div>
            <div className="bg-card-bg/60 border border-gold-light/20 rounded-lg p-4 text-center">
              <CheckCircle2 className="w-6 h-6 text-gold-light mx-auto mb-2" />
              <p className="text-sm font-semibold">The Property Ombudsman (TPO)</p>
            </div>
            <div className="bg-card-bg/60 border border-gold-light/20 rounded-lg p-4 text-center">
              <Lock className="w-6 h-6 text-gold-light mx-auto mb-2" />
              <p className="text-sm font-semibold">SafeAgent Accredited</p>
            </div>
            <div className="bg-card-bg/60 border border-gold-light/20 rounded-lg p-4 text-center">
              <Star className="w-6 h-6 text-gold-light mx-auto mb-2" />
              <p className="text-sm font-semibold">5.0★ Google (160+ Reviews)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROPERTY SHOWCASE */}
      <section id="properties" className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Properties
            </h2>
            <p className="text-gray-400 text-lg">
              Discover our curated selection of premium lettings and sales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                className="bg-card-bg border border-gold-light/20 rounded-lg overflow-hidden hover:border-gold-light/60 transition group"
              >
                {/* Property Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-gold-light/20 to-gold/20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Home className="w-24 h-24 text-gold-light/30" />
                  </div>

                  {prop.badge && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-gold-light text-oxford-navy text-xs font-bold px-3 py-1 rounded-full">
                        {prop.badge}
                      </span>
                    </div>
                  )}

                  {prop.type === 'rent' && (
                    <button className="absolute top-4 left-4 bg-oxford-navy/80 backdrop-blur p-2 rounded hover:bg-gold-light hover:text-oxford-navy transition">
                      <Heart className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Property Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gold-light">
                    {prop.title}
                  </h3>

                  <div className="flex items-center text-gray-400 mb-4">
                    <MapPin className="w-4 h-4 mr-2 text-gold-light" />
                    {prop.location}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 text-gold-light mr-2" />
                      <span className="text-sm">{prop.beds} Bed{prop.beds > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 text-gold-light mr-2" />
                      <span className="text-sm">{prop.baths} Bath{prop.baths > 1 ? 's' : ''}</span>
                    </div>
                    {prop.parking && (
                      <div className="flex items-center">
                        <ParkingCircle className="w-4 h-4 text-gold-light mr-2" />
                        <span className="text-sm">Parking</span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-300 text-sm mb-4">{prop.description}</p>

                  <div className="mb-4 pb-4 border-t border-gold-light/20">
                    <p className="text-2xl font-bold text-gold-light">
                      {prop.type === 'rent' ? `£${prop.price}` : `£${prop.price.toLocaleString()}`}
                      {prop.type === 'rent' && <span className="text-sm text-gray-400">/pcm</span>}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowViewingForm(true)}
                    className="w-full bg-gradient-to-r from-gold to-gold-light text-oxford-navy font-bold py-2 rounded hover:shadow-lg hover:shadow-gold/50 transition flex items-center justify-center gap-2"
                  >
                    Arrange Viewing
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No properties match your filters. Try adjusting your search.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 5. LANDLORD MANAGEMENT TIERS */}
      <section id="landlord" className="py-16 md:py-24 px-4 bg-oxford-navy/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Landlord Management Services
            </h2>
            <p className="text-gray-400 text-lg">
              Choose the service level that's right for your property portfolio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tenant Find Only */}
            <div className="bg-card-bg border border-gold-light/20 rounded-lg p-8 hover:border-gold-light/60 transition">
              <h3 className="text-2xl font-bold mb-2 text-gold-light">
                Tenant Find Only
              </h3>
              <p className="text-3xl font-bold mb-6 text-gold-light">8%</p>
              <p className="text-gray-400 text-sm mb-6">One-off fee</p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-light flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Rigorous tenant vetting</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-light flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Professional tenancy agreements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-light flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Deposit protection</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-light flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Move-in inspection</span>
                </li>
              </ul>

              <button className="w-full bg-card-bg border border-gold-light text-gold-light font-semibold py-2 rounded hover:bg-gold-light hover:text-oxford-navy transition">
                Learn More
              </button>
            </div>

            {/* Fully Managed */}
            <div className="bg-gradient-to-br from-gold-light/10 to-gold/10 border-2 border-gold-light rounded-lg p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gold-light text-oxford-navy text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-2 text-gold-light">
                Fully Managed
              </h3>
              <p className="text-3xl font-bold mb-6 text-gold-light">12%</p>
              <p className="text-gray-400 text-sm mb-6">Monthly fee</p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-light flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Tenant Find Only services</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-light flex-shrink-0 mt-0.5" />
                  <span className="text-sm">24/7 maintenance coordination</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-light flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Rent collection & insurance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-light flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Regular inspections & compliance</span>
                </li>
              </ul>

              <button className="w-full bg-gold-light text-oxford-navy font-bold py-2 rounded hover:bg-gold transition">
                Choose Fully Managed
              </button>
            </div>

            {/* Guaranteed Rent */}
            <div className="bg-card-bg border border-gold-light/20 rounded-lg p-8 hover:border-gold-light/60 transition">
              <h3 className="text-2xl font-bold mb-2 text-gold-light">
                Guaranteed Rent Scheme
              </h3>
              <p className="text-3xl font-bold mb-6 text-gold-light">Fixed</p>
              <p className="text-gray-400 text-sm mb-6">Monthly income guaranteed</p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-light flex-shrink-0 mt-0.5" />
                  <span className="text-sm">0% void periods</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-light flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Guaranteed monthly payments</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-light flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Full management included</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-light flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Peace of mind with stability</span>
                </li>
              </ul>

              <button className="w-full bg-card-bg border border-gold-light text-gold-light font-semibold py-2 rounded hover:bg-gold-light hover:text-oxford-navy transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INSTANT RENTAL YIELD CALCULATOR */}
      <section id="calculator" className="py-16 md:py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Instant Rental Yield Calculator
            </h2>
            <p className="text-gray-400 text-lg">
              Discover your property's earning potential
            </p>
          </div>

          <div className="bg-card-bg border border-gold-light/20 rounded-lg p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gold-light">
                  Property Location
                </label>
                <select
                  value={calculatorLocation}
                  onChange={(e) => setCalculatorLocation(e.target.value)}
                  className="w-full bg-oxford-navy border border-gold-light/30 rounded px-4 py-2 text-white focus:outline-none focus:border-gold-light"
                >
                  <option value="jewellery">Jewellery Quarter</option>
                  <option value="edgbaston">Edgbaston</option>
                  <option value="citycore">City Core</option>
                  <option value="digbeth">Digbeth</option>
                  <option value="solihull">Solihull</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gold-light">
                  Number of Bedrooms
                </label>
                <select
                  value={calculatorBeds}
                  onChange={(e) => setCalculatorBeds(e.target.value)}
                  className="w-full bg-oxford-navy border border-gold-light/30 rounded px-4 py-2 text-white focus:outline-none focus:border-gold-light"
                >
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              <button
                onClick={handleCalculateYield}
                className="w-full bg-gradient-to-r from-gold to-gold-light text-oxford-navy font-bold py-3 rounded hover:shadow-lg hover:shadow-gold/50 transition flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-5 h-5" />
                Calculate Estimated Yield
              </button>

              {calculatorYield && (
                <div className="bg-oxford-navy rounded-lg p-6 border border-gold-light/30 text-center">
                  <p className="text-gray-400 text-sm mb-2">
                    Estimated Annual Rental Yield
                  </p>
                  <p className="text-4xl font-bold text-gold-light mb-4">
                    {calculatorYield.toFixed(1)}%
                  </p>
                  <p className="text-gray-400 text-sm mb-6">
                    Based on current market rates for {calculatorBeds}-bed properties
                    in {calculatorLocation === 'jewellery' ? 'Jewellery Quarter' : calculatorLocation === 'edgbaston' ? 'Edgbaston' : 'your selected area'}
                  </p>
                  <button
                    onClick={() => setShowValuationForm(true)}
                    className="w-full bg-card-bg border border-gold-light text-gold-light font-semibold py-2 rounded hover:bg-gold-light hover:text-oxford-navy transition"
                  >
                    Book In-Person Valuation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CLIENT TESTIMONIALS */}
      <section id="testimonials" className="py-16 md:py-24 px-4 bg-oxford-navy/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Landlords & Tenants
            </h2>
            <p className="text-gray-400 text-lg">
              Real reviews from real clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card-bg border border-gold-light/20 rounded-lg p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-gold-light text-gold-light"
                  />
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                "We've managed 4 buy-to-let flats through Highland & Co. for 8 years.
                The guaranteed rent scheme gave us complete peace of mind. Highly
                professional team."
              </p>
              <p className="font-bold text-gold-light">James Patterson</p>
              <p className="text-sm text-gray-400">Landlord, 4 Properties Birmingham</p>
            </div>

            <div className="bg-card-bg border border-gold-light/20 rounded-lg p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-gold-light text-gold-light"
                  />
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                "When I relocated to Birmingham for HSBC, Highland & Co. found me the
                perfect apartment within days. Their tenant service is exceptional and
                responsive."
              </p>
              <p className="font-bold text-gold-light">Sarah Mitchell</p>
              <p className="text-sm text-gray-400">Professional Tenant, Tenant Since 2022</p>
            </div>

            <div className="bg-card-bg border border-gold-light/20 rounded-lg p-8">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-gold-light text-gold-light"
                  />
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                "As a London-based property investor, I needed reliable partners in
                Birmingham. Highland & Co. delivers institutional-grade service at
                independent agency rates."
              </p>
              <p className="font-bold text-gold-light">Michael Zhang</p>
              <p className="text-sm text-gray-400">Property Investor, London & Birmingham</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BOOK VIEWING / VALUATION FORM */}
      {(showViewingForm || showValuationForm) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur z-50 flex items-center justify-center p-4">
          <div className="bg-card-bg border border-gold-light/30 rounded-lg max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gold-light">
                {showValuationForm ? 'Landlord Valuation' : 'Book a Viewing'}
              </h3>
              <button
                onClick={() => {
                  setShowViewingForm(false)
                  setShowValuationForm(false)
                  setViewingSubmitted(false)
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {!viewingSubmitted ? (
              <form onSubmit={handleViewingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gold-light">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={viewingFormData.name}
                    onChange={(e) =>
                      setViewingFormData({ ...viewingFormData, name: e.target.value })
                    }
                    className="w-full bg-oxford-navy border border-gold-light/30 rounded px-4 py-2 text-white focus:outline-none focus:border-gold-light"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1 text-gold-light">
                    Email
                  </label>
                  <input
                    type="email"
                    value={viewingFormData.email}
                    onChange={(e) =>
                      setViewingFormData({ ...viewingFormData, email: e.target.value })
                    }
                    className="w-full bg-oxford-navy border border-gold-light/30 rounded px-4 py-2 text-white focus:outline-none focus:border-gold-light"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1 text-gold-light">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={viewingFormData.mobile}
                    onChange={(e) =>
                      setViewingFormData({ ...viewingFormData, mobile: e.target.value })
                    }
                    className="w-full bg-oxford-navy border border-gold-light/30 rounded px-4 py-2 text-white focus:outline-none focus:border-gold-light"
                    placeholder="0121 496 0880"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1 text-gold-light">
                    Interested In
                  </label>
                  <select
                    value={viewingFormData.interestedIn}
                    onChange={(e) =>
                      setViewingFormData({ ...viewingFormData, interestedIn: e.target.value })
                    }
                    className="w-full bg-oxford-navy border border-gold-light/30 rounded px-4 py-2 text-white focus:outline-none focus:border-gold-light"
                  >
                    <option value="viewing">Property Viewing</option>
                    <option value="letting">Letting My Property</option>
                    <option value="selling">Selling My Property</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1 text-gold-light">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={viewingFormData.date}
                    onChange={(e) =>
                      setViewingFormData({ ...viewingFormData, date: e.target.value })
                    }
                    className="w-full bg-oxford-navy border border-gold-light/30 rounded px-4 py-2 text-white focus:outline-none focus:border-gold-light"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1 text-gold-light">
                    Message
                  </label>
                  <textarea
                    value={viewingFormData.message}
                    onChange={(e) =>
                      setViewingFormData({ ...viewingFormData, message: e.target.value })
                    }
                    className="w-full bg-oxford-navy border border-gold-light/30 rounded px-4 py-2 text-white focus:outline-none focus:border-gold-light h-24 resize-none"
                    placeholder="Additional details..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold to-gold-light text-oxford-navy font-bold py-2 rounded hover:shadow-lg hover:shadow-gold/50 transition"
                >
                  Submit Request
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-gold-light mx-auto mb-4" />
                <p className="text-xl font-bold mb-2">Request Confirmed!</p>
                <p className="text-gray-400">
                  Our Birmingham lettings negotiator will contact you within 30
                  minutes.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 9. LOCAL PROPERTY FAQ ACCORDION */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Property Lettings FAQ
            </h2>
            <p className="text-gray-400 text-lg">
              Common questions from landlords and tenants
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card-bg border border-gold-light/20 rounded-lg overflow-hidden hover:border-gold-light/60 transition"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-oxford-navy/50 transition"
                >
                  <span className="font-semibold text-left text-gold-light">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-light flex-shrink-0 transition ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-oxford-navy/30 border-t border-gold-light/20">
                    <p className="text-gray-300">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-oxford-navy border-t border-gold-light/20 py-12 px-4" id="contact">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-6 h-6 text-gold-light" />
                <span className="font-bold text-gold-light">HIGHLAND & CO.</span>
              </div>
              <p className="text-sm text-gray-400">
                Premium independent estate agency and lettings specialists serving
                Birmingham and the West Midlands.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gold-light mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#properties" className="hover:text-gold-light transition">
                    Properties To Let
                  </a>
                </li>
                <li>
                  <a href="#properties" className="hover:text-gold-light transition">
                    Properties For Sale
                  </a>
                </li>
                <li>
                  <a href="#landlord" className="hover:text-gold-light transition">
                    Landlord Services
                  </a>
                </li>
                <li>
                  <a href="#calculator" className="hover:text-gold-light transition">
                    Valuation Calculator
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gold-light mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold-light" />
                  <a href="tel:0121496880" className="hover:text-gold-light transition">
                    0121 496 0880
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gold-light" />
                  <a href="mailto:hello@highlandco.co.uk" className="hover:text-gold-light transition">
                    hello@highlandco.co.uk
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gold-light mt-0.5 flex-shrink-0" />
                  <span>Colmore Row, Birmingham, B3 2BJ</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gold-light mb-4">Accreditations</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-light" />
                  ARLA Propertymark
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-light" />
                  TPO Accredited
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-light" />
                  TDS Protected
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gold-light/20 pt-8">
            <div className="text-center text-sm text-gray-400">
              <p className="mb-2">
                Highland & Co. Estate & Lettings Agents Ltd. Registered in England &
                Wales. Company Registration Number: 12345678
              </p>
              <p className="mb-4">
                All deposits are protected under the Tenancy Deposit Scheme (TDS) in
                accordance with UK regulations.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-xs">
                <a href="#" className="hover:text-gold-light transition">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-gold-light transition">
                  Terms & Conditions
                </a>
                <a href="#" className="hover:text-gold-light transition">
                  Cookie Policy
                </a>
                <a href="#" className="hover:text-gold-light transition">
                  Complaints Procedure
                </a>
              </div>
              <p className="mt-4 text-xs">
                © 2024 Highland & Co. Property Lettings & Estate Management. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
