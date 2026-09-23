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
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Shield,
  Heart,
  Search,
  TrendingUp,
  Lock,
  Sparkles,
} from 'lucide-react'

// =========================================================================
// 📸 4 IMAGE SLOTS FOR YOUR ASSETS
// When ready, place your photos in /src/assets and swap these lines:
// import heroImg from './assets/hero-birmingham.jpg'
// import property1Img from './assets/penthouse-jewellery-quarter.jpg'
// import property2Img from './assets/detached-edgbaston.jpg'
// import property3Img from './assets/apartment-mailbox.jpg'
// =========================================================================
const heroImg = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=70&fm=webp'
const property1Img = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=500&q=70&fm=webp'
const property2Img = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=500&q=70&fm=webp'
const property3Img = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=70&fm=webp'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [filterType, setFilterType] = useState('rent')
  const [filterBeds, setFilterBeds] = useState('any')
  const [filterLocation, setFilterLocation] = useState('all')
  const [showViewingModal, setShowViewingModal] = useState(false)
  const [modalType, setModalType] = useState('viewing') // 'viewing' | 'valuation'
  const [calculatorLocation, setCalculatorLocation] = useState('jewellery')
  const [calculatorBeds, setCalculatorBeds] = useState('2')
  const [calculatorYield, setCalculatorYield] = useState(null)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [savedProps, setSavedProps] = useState([])
  const [formSubmitted, setFormSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Letting & Management',
    date: '',
    notes: '',
  })

  // UK Property listings with energy efficiency (EPC) & Council Tax Bands
  const properties = [
    {
      id: 1,
      title: 'The St. Paul’s Penthouse',
      location: 'Jewellery Quarter, Birmingham',
      postcode: 'B3 1RB',
      beds: 2,
      baths: 2,
      price: 1850,
      type: 'rent',
      badge: 'NEW TO MARKET',
      epc: 'EPC B',
      councilTax: 'Band D',
      image: property1Img,
      parking: true,
      description: 'Panoramic skyline views, Italian marble bathrooms, private terrace & secure gated parking.',
    },
    {
      id: 2,
      title: 'The Calthorpe Residence',
      location: 'Edgbaston, Birmingham',
      postcode: 'B15 3TR',
      beds: 4,
      baths: 3,
      price: 3200,
      type: 'rent',
      badge: 'FEATURED',
      epc: 'EPC C',
      councilTax: 'Band G',
      image: property2Img,
      parking: true,
      description: 'Stately Victorian detached home, landscaped south-facing garden, bespoke shaker kitchen.',
    },
    {
      id: 3,
      title: 'Canal-Side Luxury Suite',
      location: 'Mailbox District, Birmingham',
      postcode: 'B1 1RD',
      beds: 1,
      baths: 1,
      price: 1250,
      type: 'rent',
      badge: 'VIRTUAL TOUR',
      epc: 'EPC B',
      councilTax: 'Band C',
      image: property3Img,
      parking: false,
      description: 'Boutique waterfront living moments from New Street Station and Colmore Business District.',
    },
  ]

  const filteredProperties = properties.filter((prop) => {
    if (prop.type !== filterType) return false
    if (filterBeds !== 'any') {
      const beds = parseInt(filterBeds, 10)
      if (filterBeds === '3+' && prop.beds < 3) return false
      if (filterBeds !== '3+' && prop.beds !== beds) return false
    }
    if (filterLocation !== 'all' && !prop.location.toLowerCase().includes(filterLocation.toLowerCase())) {
      return false
    }
    return true
  })

  const toggleSave = (id) => {
    setSavedProps((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleOpenModal = (type) => {
    setModalType(type)
    setFormData((prev) => ({
      ...prev,
      service: type === 'valuation' ? 'Landlord Valuation' : 'Property Viewing',
    }))
    setShowViewingModal(true)
  }

  const handleCalculateYield = () => {
    const baseYields = {
      jewellery: { 1: 5.6, 2: 5.1, 3: 4.8, 4: 4.4 },
      edgbaston: { 1: 4.9, 2: 4.6, 3: 4.3, 4: 4.0 },
      citycore: { 1: 5.9, 2: 5.4, 3: 5.0, 4: 4.7 },
      digbeth: { 1: 6.2, 2: 5.7, 3: 5.2, 4: 4.9 },
    }
    const beds = parseInt(calculatorBeds, 10)
    const yieldVal = baseYields[calculatorLocation]?.[beds] || 5.1
    setCalculatorYield(yieldVal)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setShowViewingModal(false)
      setFormSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Letting & Management',
        date: '',
        notes: '',
      })
    }, 2800)
  }

  const faqs = [
    {
      q: 'How does the Guaranteed Rent Scheme protect landlords?',
      a: 'We take full financial responsibility for the property. You receive a guaranteed fixed rent on the 1st of every calendar month with zero void periods, zero tenant arrears risk, and zero management commission deducted.',
    },
    {
      q: 'Which UK deposit scheme do you use?',
      a: 'All security deposits are safely registered under the Tenancy Deposit Scheme (TDS) Custodial branch in strict adherence to the Housing Act 2004.',
    },
    {
      q: 'What referencing checks do you run on prospective tenants?',
      a: 'We perform 6-step institutional vetting: UK Right-to-Rent verification, Experian credit checks, 3 years of residential history, employer income verification (30x monthly rent ratio), and direct bank confirmation.',
    },
    {
      q: 'How quickly can you let my Birmingham property?',
      a: 'Our average time to agreed let across Birmingham City Centre, Edgbaston, and Harborne is 11 days, aided by our corporate relocation network with HSBC UK, PwC, and Deutsche Bank.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#070D18] text-slate-100 font-sans selection:bg-[#C9A86A] selection:text-slate-950">
      {/* 1. TOP UK STATUTORY BAR */}
      <aside aria-label="Statutory Information" className="bg-[#0B1528] border-b border-amber-400/20 text-xs text-amber-200/90 py-2.5 px-4 tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Independent Birmingham Estate Specialists | Regulated by <strong>ARLA Propertymark</strong> &amp; <strong>TPO</strong></span>
          </div>
          <div className="flex items-center gap-4 mx-auto sm:mx-0 font-medium">
            <span>Colmore Row Office:</span>
            <a href="tel:01214960880" className="text-white hover:text-amber-300 transition-colors underline decoration-amber-400/50">
              0121 496 0880
            </a>
          </div>
        </div>
      </aside>

      {/* 2. NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#070D18]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#properties" aria-label="Highland & Co. Home" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#C9A86A] to-[#99793D] flex items-center justify-center text-slate-950 shadow-lg shadow-[#C9A86A]/20">
                <Building2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="block text-xl font-bold tracking-wider text-white group-hover:text-amber-300 transition-colors">
                  HIGHLAND &amp; CO.
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-amber-200/70 font-semibold uppercase">
                  Estates &amp; Lettings • Birmingham
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
              <a href="#properties" onClick={() => setFilterType('rent')} className="hover:text-amber-300 transition-colors py-2">To Let</a>
              <a href="#properties" onClick={() => setFilterType('sale')} className="hover:text-amber-300 transition-colors py-2">For Sale</a>
              <a href="#landlords" className="hover:text-amber-300 transition-colors py-2">Guaranteed Rent</a>
              <a href="#calculator" className="hover:text-amber-300 transition-colors py-2">Yield Calculator</a>
              <a href="#reviews" className="hover:text-amber-300 transition-colors py-2">Client Reviews</a>
              <a href="#faq" className="hover:text-amber-300 transition-colors py-2">FAQ</a>
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleOpenModal('valuation')}
                className="px-4 py-2.5 rounded-md border border-amber-300/40 text-amber-200 text-sm font-semibold hover:bg-amber-300/10 hover:border-amber-300 transition-all focus:ring-2 focus:ring-amber-300 focus:outline-none"
              >
                Book Valuation
              </button>
              <button
                type="button"
                onClick={() => handleOpenModal('viewing')}
                className="px-5 py-2.5 rounded-md bg-gradient-to-r from-[#D8B475] to-[#B38D48] text-slate-950 text-sm font-bold shadow-md shadow-[#C9A86A]/25 hover:brightness-110 active:scale-[0.98] transition-all focus:ring-2 focus:ring-amber-300 focus:outline-none"
              >
                Arrange Viewing
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-amber-300 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#0B1528] border-b border-slate-800 px-6 py-6 space-y-4">
            <nav className="flex flex-col space-y-3 text-base font-medium">
              <a href="#properties" onClick={() => { setFilterType('rent'); setIsMenuOpen(false); }} className="text-slate-200 hover:text-amber-300 py-1">Properties To Let</a>
              <a href="#properties" onClick={() => { setFilterType('sale'); setIsMenuOpen(false); }} className="text-slate-200 hover:text-amber-300 py-1">Properties For Sale</a>
              <a href="#landlords" onClick={() => setIsMenuOpen(false)} className="text-slate-200 hover:text-amber-300 py-1">Landlord Management</a>
              <a href="#calculator" onClick={() => setIsMenuOpen(false)} className="text-slate-200 hover:text-amber-300 py-1">Rental Yield Calculator</a>
              <a href="#reviews" onClick={() => setIsMenuOpen(false)} className="text-slate-200 hover:text-amber-300 py-1">Client Reviews</a>
              <a href="#faq" onClick={() => setIsMenuOpen(false)} className="text-slate-200 hover:text-amber-300 py-1">Lettings FAQ</a>
            </nav>
            <div className="pt-4 border-t border-slate-700/60 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => { handleOpenModal('valuation'); setIsMenuOpen(false); }}
                className="w-full py-3 rounded-md border border-amber-300/40 text-amber-200 text-sm font-semibold hover:bg-amber-300/10 text-center"
              >
                Free Landlord Valuation
              </button>
              <button
                type="button"
                onClick={() => { handleOpenModal('viewing'); setIsMenuOpen(false); }}
                className="w-full py-3 rounded-md bg-[#C9A86A] text-slate-950 text-sm font-bold text-center"
              >
                Book a Viewing
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* 3. HERO SECTION WITH IMAGE IMPORT #1 (LCP OPTIMIZED) */}
        <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden">
          {/* Background Image Container */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroImg}
              alt="Luxury modern Birmingham residential architecture"
              className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.08]"
              fetchPriority="high"
              decoding="async"
              loading="eager"
              width="900"
              height="600"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-[#070D18]/70 to-[#070D18]/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070D18]/90 via-transparent to-[#070D18]/90" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-medium mb-6 backdrop-blur shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Birmingham’s Premier High-Yield Property Consultancy</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.15]">
              Exceptional Properties.{' '}
              <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                Unrivalled Midlands Lettings &amp; Management.
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Connecting qualified tenants with luxury city apartments and executive family residences. Delivering <strong>99.4% average occupancy</strong> and certified guaranteed rent for UK landlords.
            </p>

            {/* Quick Filter Box */}
            <div className="max-w-4xl mx-auto bg-slate-900/85 backdrop-blur-xl border border-amber-300/30 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-black/80">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                {/* Type */}
                <div>
                  <label htmlFor="filter-type" className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
                    Property Type
                  </label>
                  <select
                    id="filter-type"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full bg-[#0E1726] border border-slate-700 rounded-lg px-3.5 py-2.5 text-white text-sm focus:border-amber-400 focus:outline-none"
                  >
                    <option value="rent">To Rent (PCM)</option>
                    <option value="sale">For Sale (Freehold / Leasehold)</option>
                  </select>
                </div>

                {/* Beds */}
                <div>
                  <label htmlFor="filter-beds" className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
                    Bedrooms
                  </label>
                  <select
                    id="filter-beds"
                    value={filterBeds}
                    onChange={(e) => setFilterBeds(e.target.value)}
                    className="w-full bg-[#0E1726] border border-slate-700 rounded-lg px-3.5 py-2.5 text-white text-sm focus:border-amber-400 focus:outline-none"
                  >
                    <option value="any">Any Bedrooms</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3+">3+ Bedrooms</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="filter-loc" className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
                    Location
                  </label>
                  <select
                    id="filter-loc"
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="w-full bg-[#0E1726] border border-slate-700 rounded-lg px-3.5 py-2.5 text-white text-sm focus:border-amber-400 focus:outline-none"
                  >
                    <option value="all">All Birmingham Districts</option>
                    <option value="Jewellery Quarter">Jewellery Quarter (B1/B3)</option>
                    <option value="Edgbaston">Edgbaston (B15)</option>
                    <option value="Mailbox District">Mailbox &amp; Canal Basin (B1)</option>
                    <option value="Colmore">Colmore Business District (B3)</option>
                  </select>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <a
                    href="#properties"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D8B475] to-[#B38D48] text-slate-950 font-bold py-2.5 px-4 rounded-lg shadow-md hover:brightness-110 active:scale-[0.98] transition-all text-sm h-[42px]"
                  >
                    <Search className="w-4 h-4 stroke-[2.5]" />
                    <span>Search Listings</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Accreditations Trust Badges */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-[#0B1528]/80 border border-slate-800 rounded-xl p-3.5 text-center backdrop-blur">
                <Shield className="w-5 h-5 text-amber-300 mx-auto mb-1.5" />
                <p className="text-xs font-semibold text-white">ARLA Propertymark</p>
                <p className="text-[10px] text-slate-400">Client Money Protected</p>
              </div>

              <div className="bg-[#0B1528]/80 border border-slate-800 rounded-xl p-3.5 text-center backdrop-blur">
                <CheckCircle2 className="w-5 h-5 text-amber-300 mx-auto mb-1.5" />
                <p className="text-xs font-semibold text-white">The Property Ombudsman</p>
                <p className="text-[10px] text-slate-400">Approved Redress Scheme</p>
              </div>

              <div className="bg-[#0B1528]/80 border border-slate-800 rounded-xl p-3.5 text-center backdrop-blur">
                <Lock className="w-5 h-5 text-amber-300 mx-auto mb-1.5" />
                <p className="text-xs font-semibold text-white">TDS Protection</p>
                <p className="text-[10px] text-slate-400">Government Registered</p>
              </div>

              <div className="bg-[#0B1528]/80 border border-slate-800 rounded-xl p-3.5 text-center backdrop-blur">
                <Star className="w-5 h-5 fill-amber-300 text-amber-300 mx-auto mb-1.5" />
                <p className="text-xs font-semibold text-white">4.9 / 5.0 Star Rated</p>
                <p className="text-[10px] text-slate-400">160+ Verified Google Reviews</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FEATURED PROPERTY SHOWCASE WITH IMAGE IMPORTS #2, #3, #4 */}
        <section id="properties" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">Birmingham Prime Portfolio</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">
                Featured {filterType === 'rent' ? 'Lettings (To Let)' : 'Sales Properties'}
              </h2>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-lg self-start">
              <button
                type="button"
                onClick={() => setFilterType('rent')}
                className={`px-4 py-1.5 rounded text-xs font-semibold transition-all ${
                  filterType === 'rent' ? 'bg-[#C9A86A] text-slate-950 shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                To Let
              </button>
              <button
                type="button"
                onClick={() => setFilterType('sale')}
                className={`px-4 py-1.5 rounded text-xs font-semibold transition-all ${
                  filterType === 'sale' ? 'bg-[#C9A86A] text-slate-950 shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                For Sale
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <article
                key={prop.id}
                className="bg-[#0D1829] border border-slate-800 hover:border-amber-400/40 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                    <img
                      src={prop.image}
                      alt={`${prop.title} in ${prop.location}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                      width="500"
                      height="300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="bg-amber-400 text-slate-950 text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                        {prop.badge}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleSave(prop.id)}
                        aria-label={`Save ${prop.title} to favourites`}
                        className="w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur text-white flex items-center justify-center hover:text-red-400 transition-colors"
                      >
                        <Heart className={`w-4 h-4 ${savedProps.includes(prop.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                    </div>

                    {/* Statutory UK Badges (EPC & Council Tax) */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[10px] font-semibold">
                      <span className="px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-500/40">
                        {prop.epc}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-900/90 text-slate-200 border border-slate-700">
                        {prop.councilTax}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center text-xs text-amber-200/80 mb-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-amber-400" />
                      <span>{prop.location} ({prop.postcode})</span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-3">
                      {prop.title}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-slate-300 py-3 my-2 border-y border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-amber-400" />
                        <span>{prop.beds} Beds</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-amber-400" />
                        <span>{prop.baths} Baths</span>
                      </div>
                      {prop.parking && (
                        <div className="flex items-center gap-1.5">
                          <ParkingCircle className="w-4 h-4 text-amber-400" />
                          <span>Parking</span>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
                      {prop.description}
                    </p>
                  </div>
                </div>

                {/* Footer and Price */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">Monthly Rent</span>
                      <span className="text-2xl font-black text-amber-300">
                        £{prop.price.toLocaleString()}
                        <span className="text-xs text-slate-400 font-normal"> pcm</span>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleOpenModal('viewing')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs font-bold hover:bg-amber-400 hover:text-slate-950 transition-all"
                    >
                      Book Tour
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 5. GUARANTEED RENT & LANDLORD MANAGEMENT TIERS */}
        <section id="landlords" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0B1528] border-y border-slate-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">Landlord Services</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">Institutional Care for Private Portfolios</h2>
              <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                Whether you prefer passive hands-off income or bespoke tenant matching, our Birmingham team delivers complete legislative compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Tenant Find */}
              <div className="bg-[#070D18] border border-slate-800 rounded-2xl p-7 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Tenant Find Only</h3>
                  <div className="mt-3 mb-6">
                    <span className="text-3xl font-black text-amber-300">8%</span>
                    <span className="text-xs text-slate-400 ml-1">+ VAT one-off</span>
                  </div>
                  <ul className="space-y-3 text-xs text-slate-300 mb-8">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Full Right-to-Rent &amp; Experian credit referencing</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Drafting compliant UK AST contracts</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>TDS Government deposit protection registration</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Photographic schedule of condition at move-in</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenModal('valuation')}
                  className="w-full py-2.5 rounded-lg border border-amber-400/40 text-amber-200 text-xs font-bold hover:bg-amber-400/10 transition-colors"
                >
                  Select Tenant Find
                </button>
              </div>

              {/* Fully Managed */}
              <div className="bg-[#070D18] border-2 border-amber-400 rounded-2xl p-7 relative shadow-2xl shadow-amber-400/10 flex flex-col justify-between">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-3 py-0.5 rounded-full tracking-wider shadow">
                  Most Popular
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Fully Managed</h3>
                  <div className="mt-3 mb-6">
                    <span className="text-3xl font-black text-amber-300">12%</span>
                    <span className="text-xs text-slate-400 ml-1">+ VAT monthly</span>
                  </div>
                  <ul className="space-y-3 text-xs text-slate-300 mb-8">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Everything in Tenant Find</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>24/7 UK emergency repair and maintenance coordination</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Automated rent collection &amp; monthly statements</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Gas Safe, EICR &amp; EPC statutory renewals</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenModal('valuation')}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#D8B475] to-[#B38D48] text-slate-950 text-xs font-extrabold hover:brightness-110 shadow transition-all"
                >
                  Choose Fully Managed
                </button>
              </div>

              {/* Guaranteed Rent */}
              <div className="bg-[#070D18] border border-slate-800 rounded-2xl p-7 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Guaranteed Rent</h3>
                  <div className="mt-3 mb-6">
                    <span className="text-3xl font-black text-amber-300">Fixed</span>
                    <span className="text-xs text-slate-400 ml-1">Paid on the 1st of every month</span>
                  </div>
                  <ul className="space-y-3 text-xs text-slate-300 mb-8">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>0% void periods</strong> — no loss of earnings</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Paid even if tenant defaults or vacates</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Zero agency commission or management deductions</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>1 to 5 year guaranteed company leases</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenModal('valuation')}
                  className="w-full py-2.5 rounded-lg border border-amber-400/40 text-amber-200 text-xs font-bold hover:bg-amber-400/10 transition-colors"
                >
                  Get Guaranteed Offer
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 6. INSTANT GROSS RENTAL YIELD CALCULATOR */}
        <section id="calculator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-b from-[#0D1829] to-[#070D18] border border-amber-400/30 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">Investment Benchmarks</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Birmingham Rental Yield Calculator</h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-2">
                Estimate expected gross yields across Birmingham submarkets based on live quarterly metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div>
                <label htmlFor="calc-area" className="block text-xs font-semibold text-slate-200 mb-2">
                  Select Birmingham Postcode / Area
                </label>
                <select
                  id="calc-area"
                  value={calculatorLocation}
                  onChange={(e) => setCalculatorLocation(e.target.value)}
                  className="w-full bg-[#070D18] border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-amber-400 focus:outline-none"
                >
                  <option value="jewellery">Jewellery Quarter &amp; St. Paul’s (B3)</option>
                  <option value="edgbaston">Edgbaston &amp; Harborne (B15/B17)</option>
                  <option value="citycore">Colmore &amp; City Core (B2/B3)</option>
                  <option value="digbeth">Digbeth Creative Quarter (B5)</option>
                </select>
              </div>

              <div>
                <label htmlFor="calc-bedroom-count" className="block text-xs font-semibold text-slate-200 mb-2">
                  Property Configuration
                </label>
                <select
                  id="calc-bedroom-count"
                  value={calculatorBeds}
                  onChange={(e) => setCalculatorBeds(e.target.value)}
                  className="w-full bg-[#070D18] border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-amber-400 focus:outline-none"
                >
                  <option value="1">1 Bed Luxury Flat</option>
                  <option value="2">2 Bed Modern Apartment</option>
                  <option value="3">3 Bed Townhouse</option>
                  <option value="4">4+ Bed Executive Detached</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCalculateYield}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D8B475] to-[#B38D48] text-slate-950 font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition-all"
            >
              <TrendingUp className="w-4 h-4 stroke-[2.5]" />
              <span>Calculate Gross Annual Yield</span>
            </button>

            {calculatorYield && (
              <div className="mt-8 p-6 bg-[#070D18] border border-amber-400/40 rounded-2xl text-center">
                <span className="text-xs uppercase tracking-wider text-slate-400 block font-medium">Estimated Gross Yield</span>
                <span className="text-4xl sm:text-5xl font-extrabold text-amber-300 my-2 block">
                  {calculatorYield.toFixed(1)}%
                </span>
                <p className="text-xs text-slate-300 max-w-md mx-auto mb-4">
                  Based on recent AST tenancy registrations in this submarket. Individual property condition and finish may achieve higher premiums.
                </p>
                <button
                  type="button"
                  onClick={() => handleOpenModal('valuation')}
                  className="text-xs font-bold text-amber-300 hover:text-white underline underline-offset-4"
                >
                  Request a Formal Portfolio Rental Appraisal →
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 7. CLIENT TESTIMONIALS */}
        <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0B1528] border-t border-slate-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">Client Reputation</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">Endorsed by Midlands Landlords</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#070D18] border border-slate-800 p-6 rounded-2xl">
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 italic mb-6 leading-relaxed">
                  "Highland &amp; Co. has managed my 4 buy-to-let apartments in the Jewellery Quarter since 2018. Their Guaranteed Rent scheme has never missed a single month. Absolute professionals."
                </p>
                <div>
                  <h4 className="text-sm font-bold text-white">James Patterson</h4>
                  <p className="text-xs text-amber-200/70">Portfolio Landlord • Birmingham</p>
                </div>
              </div>

              <div className="bg-[#070D18] border border-slate-800 p-6 rounded-2xl">
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 italic mb-6 leading-relaxed">
                  "When relocating our corporate executives from London to HSBC's Birmingham headquarters, Highland &amp; Co secured three outstanding properties within 48 hours. Stellar service."
                </p>
                <div>
                  <h4 className="text-sm font-bold text-white">Sarah Mitchell</h4>
                  <p className="text-xs text-amber-200/70">Corporate Relocation Client</p>
                </div>
              </div>

              <div className="bg-[#070D18] border border-slate-800 p-6 rounded-2xl">
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 italic mb-6 leading-relaxed">
                  "Hands down the most transparent independent agency in the West Midlands. Their AST paperwork and digital inventories protect both landlord and tenant to the highest standard."
                </p>
                <div>
                  <h4 className="text-sm font-bold text-white">Michael Zhang</h4>
                  <p className="text-xs text-amber-200/70">Overseas Investor • London &amp; HK</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. FREQUENTLY ASKED QUESTIONS ACCORDION */}
        <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">Clear Guidance</span>
            <h2 className="text-3xl font-bold text-white mt-1">UK Lettings &amp; Management FAQ</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#0D1829] border border-slate-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-bold text-white hover:text-amber-300 focus:outline-none"
                  aria-expanded={expandedFaq === idx}
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-300 ${
                      expandedFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 pb-5 pt-1 text-xs text-slate-300 border-t border-slate-800/60 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 9. STATUTORY FOOTER */}
      <footer id="contact" className="bg-[#050912] border-t border-slate-800 text-slate-400 text-xs py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-white font-bold text-base">
              <Building2 className="w-5 h-5 text-amber-400" />
              <span>HIGHLAND &amp; CO.</span>
            </div>
            <p className="leading-relaxed mb-4 text-slate-300">
              Premier independent estate agency and residential asset managers serving Birmingham City Centre, Edgbaston, Solihull, and the West Midlands.
            </p>
            <p className="text-[11px] text-slate-400">
              Company Reg: 12345678 • Registered in England &amp; Wales
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Colmore Row Headquarters</h4>
            <address className="not-italic space-y-2.5">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Colmore Row, Birmingham, West Midlands, B3 2BJ</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:01214960880" className="hover:text-amber-300">0121 496 0880</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:enquiries@highlandco.co.uk" className="hover:text-amber-300">enquiries@highlandco.co.uk</a>
              </p>
            </address>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#properties" onClick={() => setFilterType('rent')} className="hover:text-amber-300">Properties To Let</a></li>
              <li><a href="#properties" onClick={() => setFilterType('sale')} className="hover:text-amber-300">Properties For Sale</a></li>
              <li><a href="#landlords" className="hover:text-amber-300">Guaranteed Rent Scheme</a></li>
              <li><a href="#calculator" className="hover:text-amber-300">Rental Yield Calculator</a></li>
              <li><a href="#faq" className="hover:text-amber-300">UK Tenancy Regulations</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Accredited Regulation</h4>
            <p className="mb-4 leading-relaxed">
              We operate under strict codes of practice approved by statutory regulators. All client monies are held in segregated, ring-fenced accounts.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold text-amber-200">
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">ARLA Propertymark</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">TPO Registered</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">TDS Custodial</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Highland &amp; Co. Estate &amp; Lettings Agents Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#contact" className="hover:text-amber-300">Privacy Notice</a>
            <a href="#contact" className="hover:text-amber-300">Terms of Tenancy</a>
            <a href="#contact" className="hover:text-amber-300">CMP Certificate</a>
            <a href="#contact" className="hover:text-amber-300">Complaints Procedure</a>
          </div>
        </div>
      </footer>

      {/* 10. MODAL: VIEWING / VALUATION FORM */}
      {showViewingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D1829] border border-amber-400/40 rounded-2xl w-full max-w-lg p-6 sm:p-8 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setShowViewingModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
              aria-label="Close form"
            >
              <X className="w-5 h-5" />
            </button>

            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {modalType === 'valuation' ? 'Book a Free Landlord Valuation' : 'Arrange an In-Person Viewing'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Direct from our Colmore Row Birmingham Office.
                  </p>
                </div>

                <div>
                  <label htmlFor="modal-name" className="block text-xs font-semibold text-slate-200 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    id="modal-name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#070D18] border border-slate-700 rounded-lg px-3.5 py-2.5 text-white text-sm focus:border-amber-400 focus:outline-none"
                    placeholder="e.g. Eleanor Vance"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="modal-email" className="block text-xs font-semibold text-slate-200 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="modal-email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#070D18] border border-slate-700 rounded-lg px-3.5 py-2.5 text-white text-sm focus:border-amber-400 focus:outline-none"
                      placeholder="eleanor@example.co.uk"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-phone" className="block text-xs font-semibold text-slate-200 mb-1">
                      UK Telephone Number *
                    </label>
                    <input
                      id="modal-phone"
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#070D18] border border-slate-700 rounded-lg px-3.5 py-2.5 text-white text-sm focus:border-amber-400 focus:outline-none"
                      placeholder="07123 456789"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="modal-service" className="block text-xs font-semibold text-slate-200 mb-1">
                      Service Required
                    </label>
                    <select
                      id="modal-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#070D18] border border-slate-700 rounded-lg px-3.5 py-2.5 text-white text-sm focus:border-amber-400 focus:outline-none"
                    >
                      <option value="Property Viewing">Property Viewing</option>
                      <option value="Landlord Valuation">Landlord Valuation</option>
                      <option value="Guaranteed Rent Quote">Guaranteed Rent Quote</option>
                      <option value="Sales Valuation">Sales Valuation</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="modal-date" className="block text-xs font-semibold text-slate-200 mb-1">
                      Preferred Date
                    </label>
                    <input
                      id="modal-date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#070D18] border border-slate-700 rounded-lg px-3.5 py-2.5 text-white text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="modal-notes" className="block text-xs font-semibold text-slate-200 mb-1">
                    Specific Requirements or Property Address
                  </label>
                  <textarea
                    id="modal-notes"
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#070D18] border border-slate-700 rounded-lg px-3.5 py-2 text-white text-sm focus:border-amber-400 focus:outline-none resize-none"
                    placeholder="Details about your property portfolio or preferred move-in timeline..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-[#D8B475] to-[#B38D48] text-slate-950 font-bold text-sm hover:brightness-110 active:scale-[0.99] transition-all"
                >
                  Confirm Appointment Request
                </button>
              </form>
            ) : (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-xl font-bold text-white mb-1">Request Received</h4>
                <p className="text-xs text-slate-300 max-w-xs mx-auto">
                  A licensed negotiator from our Colmore Row office will confirm your appointment via phone within 1 hour.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}