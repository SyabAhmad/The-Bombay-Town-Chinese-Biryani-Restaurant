import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import productsData from './data/products.json'

const BUSINESS = {
  name: 'The Bombay Town',
  subtitle: 'Chinese & Biryani Restaurant',
  phone: '966579169866',
  phoneDisplay: '+966 57 916 9866',
  location: 'Al Farazdaq St, Building 6641 Shop 2, Al Dhubabat, Malaz, Riyadh',
  locationShort: 'Al Farazdaq St, Al Dhubabat, Malaz',
  rating: 4.6,
  reviews: 228,
  priceRange: 'SAR 20-40',
  tagline: 'Authentic Indo-Chinese & Biryani in Riyadh',
  description: 'Serving the finest Indo-Chinese cuisine and authentic Biryani in Riyadh. Our recipes bring the true taste of India to your table.',
  hours: '11:00 AM - 11:00 PM',
}

const MENU = productsData

function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}

function Header() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/products', label: 'Products' },
    { path: '/offers', label: 'Offers' },
    { path: '/about', label: 'About' },
  ]

  return (
    <header className="bg-[#E63900] text-white sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl tracking-tight">
            {BUSINESS.name}
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.path 
                    ? 'text-white border-b-2 border-white pb-1' 
                    : 'text-orange-100 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-orange-400">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-2 text-sm font-medium ${
                  location.pathname === item.path ? 'text-white' : 'text-orange-100'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div>
            <h3 className="font-bold text-lg mb-2">{BUSINESS.name}</h3>
            <p className="text-gray-400 text-sm">{BUSINESS.subtitle}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <a href={`tel:${BUSINESS.phone}`} className="text-gray-400 text-sm block hover:text-white">
              {BUSINESS.phoneDisplay}
            </a>
            <a 
              href="https://maps.google.com/?q=The+Bombay+Town+Chinese+Biryani+Al+Farazdaq+St+Riyadh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-sm block hover:text-white mt-1"
            >
              {BUSINESS.locationShort}
            </a>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Hours</h4>
            <p className="text-gray-400 text-sm">{BUSINESS.hours}</p>
            <p className="text-gray-500 text-xs mt-2">Every day</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-gray-500 text-sm">© 2024 {BUSINESS.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function Home() {
  const [cart, setCart] = useState([])
  
  const popularItems = MENU.categories.flatMap(c => c.items).filter(item => item.popular)

  const toggleItem = (item) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id)
      if (exists) {
        return prev.filter(i => i.id !== item.id)
      }
      return [...prev, item]
    })
  }

  const isInCart = (id) => cart.some(i => i.id === id)
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)

  const sendToWhatsApp = () => {
    if (cart.length === 0) return
    const message = cart.map(item => `• ${item.name} — SAR ${item.price}`).join('\n')
    const fullMessage = `🛒 *New Order*\n\n${message}\n\n*Total: SAR ${cartTotal}*\n\n📍 ${BUSINESS.location}`
    const encoded = encodeURIComponent(fullMessage)
    window.open(`https://wa.me/${BUSINESS.phone}?text=${encoded}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#E63900] text-white relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80" 
            alt="Restaurant interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 text-6xl opacity-20 z-20">🍜</div>
        <div className="absolute top-20 left-8 text-4xl opacity-15 z-20 hidden md:block">🍗</div>
        <div className="absolute bottom-20 right-12 text-5xl opacity-15 z-20 hidden md:block">🥘</div>
        <div className="absolute bottom-8 left-4 text-3xl opacity-20 z-20">🍚</div>
        
        {/* Main Content - Two Column Layout */}
        <div className="max-w-6xl mx-auto px-4 pt-20 pb-28 relative z-10">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left Column - Text Content (7 cols) */}
            <div className="md:col-span-7 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
                <span>📍</span>
                <span className="text-sm font-medium">Riyadh, Saudi Arabia</span>
              </div>
              
              {/* Title - Big and bold */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tight leading-none">
                The Bombay<br/>
                <span className="text-orange-400">Town</span>
              </h1>
              
              <p className="text-2xl md:text-3xl font-bold text-white/90 mb-4">{BUSINESS.subtitle}</p>
              
              {/* Tagline */}
              <p className="text-lg text-white/70 mb-8 max-w-md">
                {BUSINESS.tagline}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a 
                  href={`https://wa.me/${BUSINESS.phone}?text=${encodeURIComponent('Hi! I want to place an order.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 shadow-lg shadow-green-900/30"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Order on WhatsApp
                </a>
                
                <a 
                  href={`tel:${BUSINESS.phone}`}
                  className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    <span className="text-2xl font-black">{BUSINESS.rating}</span>
                  </div>
                  <div className="text-white/60 text-xs">{BUSINESS.reviews}+ reviews</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/10">
                  <div className="text-xl font-black">{BUSINESS.priceRange}</div>
                  <div className="text-white/60 text-xs">per person</div>
                </div>
              </div>
            </div>

            {/* Right Column - Reviews (5 cols) */}
            <div className="md:col-span-5 hidden md:block">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="text-5xl font-black text-orange-400">{BUSINESS.rating}</div>
                    <div className="text-white/60">
                      <div className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
                      <div className="text-sm">{BUSINESS.reviews}+ reviews</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-2xl p-4">
                    <p className="text-white font-medium">"Best Biryani in Riyadh! Authentic taste and great service."</p>
                    <p className="text-orange-400 text-sm mt-2">— Ahmed M.</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-2xl p-4">
                    <p className="text-white font-medium">"Amazing Chinese food! Chicken Lollipop is a must-try."</p>
                    <p className="text-orange-400 text-sm mt-2">— Sara K.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* Quick Info Cards - Real Images */}
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Location Card */}
          <a 
            href="https://maps.google.com/?q=The+Bombay+Town+Chinese+Biryani+Al+Farazdaq+St+Riyadh"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl aspect-[4/3] hover:shadow-2xl transition-all duration-300"
          >
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80" 
              alt="Location" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-white font-bold text-lg">📍 Location</h3>
              <p className="text-white/80 text-sm mt-1">Al Farazdaq St, Malaz</p>
            </div>
          </a>

          {/* Call Card */}
          <a 
            href={`tel:${BUSINESS.phone}`}
            className="group relative overflow-hidden rounded-2xl aspect-[4/3] hover:shadow-2xl transition-all duration-300"
          >
            <img 
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80" 
              alt="Call" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-white font-bold text-lg">📞 Call Now</h3>
              <p className="text-white/80 text-sm mt-1">+966 57 916 9866</p>
            </div>
          </a>

          {/* Menu Card */}
          <Link 
            to="/menu"
            className="group relative overflow-hidden rounded-2xl aspect-[4/3] hover:shadow-2xl transition-all duration-300"
          >
            <img 
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80" 
              alt="Menu" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-white font-bold text-lg">🍜 Our Menu</h3>
              <p className="text-white/80 text-sm mt-1">View full menu</p>
            </div>
          </Link>

          {/* About Card */}
          <Link 
            to="/about"
            className="group relative overflow-hidden rounded-2xl aspect-[4/3] hover:shadow-2xl transition-all duration-300"
          >
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80" 
              alt="About" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-white font-bold text-lg">ℹ️ About Us</h3>
              <p className="text-white/80 text-sm mt-1">Our story</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Popular Items Preview - With Real Images */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-900">🔥 Popular Dishes</h2>
            <p className="text-gray-500 mt-2">Customer favorites</p>
          </div>
          <Link to="/menu" className="text-[#E63900] font-bold text-sm hover:underline flex items-center gap-1">
            View Full Menu
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 1, name: 'Chicken Lollipop', price: 25, img: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&q=80' },
            { id: 5, name: 'Chicken Biryani', price: 35, img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80' },
            { id: 4, name: 'Schezwan Chicken', price: 32, img: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&q=80' },
            { id: 8, name: 'Triple Rice', price: 28, img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80' },
          ].map((item, idx) => (
            <button
              key={item.id}
              onClick={() => toggleItem(item)}
              className={`group relative overflow-hidden rounded-2xl text-left transition-all duration-300 ${
                isInCart(item.id) ? 'ring-4 ring-[#E63900] ring-offset-2' : 'hover:shadow-2xl'
              }`}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {item.popular && (
                  <span className="inline-block bg-[#E63900] text-white text-xs font-bold px-2 py-1 rounded mb-2">
                    BEST SELLER
                  </span>
                )}
                <h3 className="text-white font-bold text-lg">{item.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-white font-black text-xl">SAR {item.price}</span>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                    isInCart(item.id) ? 'bg-[#25D366] text-white' : 'bg-white/20 text-white'
                  }`}>
                    {isInCart(item.id) ? '✓ Added' : 'Add +'}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-900">🎉 Special Offers</h2>
            <p className="text-gray-500 mt-2">Limited time deals</p>
          </div>
          <Link to="/offers" className="text-[#E63900] font-bold text-sm hover:underline flex items-center gap-1">
            View All Offers
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsData.offers.slice(0, 3).map(offer => (
            <div key={offer.id} className="group relative overflow-hidden rounded-2xl">
              <img 
                src={offer.image} 
                alt={offer.title} 
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute top-3 left-3 bg-[#E63900] text-white font-bold px-3 py-1 rounded-full text-sm">
                {offer.discount}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-bold text-lg">{offer.title}</h3>
                <p className="text-white/80 text-sm mb-2">{offer.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">Code: {offer.code}</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(offer.code)
                    }}
                    className="text-white bg-white/20 px-3 py-1 rounded-lg text-sm font-medium hover:bg-white/30"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gray-50 py-20 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Want a Custom Order?</h2>
          <p className="text-gray-600 mb-6">Contact us directly on WhatsApp for special requests</p>
          <a 
            href={`https://wa.me/${BUSINESS.phone}?text=${encodeURIComponent('Hi! I have a special order request.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* Floating Cart */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4 z-50">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{cart.length} item{cart.length > 1 ? 's' : ''}</p>
              <p className="text-2xl font-bold text-gray-900">SAR {cartTotal}</p>
            </div>
            <button
              onClick={sendToWhatsApp}
              className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Order on WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Menu() {
  const [cart, setCart] = useState([])
  const [activeCategory, setActiveCategory] = useState('starters')

  const categoryImages = {
    'starters': 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=800&q=80',
    'soups': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
    'rice-noodles': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80',
    'main-course': 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80',
    'biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
  }

  const toggleItem = (item) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id)
      if (exists) {
        return prev.filter(i => i.id !== item.id)
      }
      return [...prev, item]
    })
  }

  const isInCart = (id) => cart.some(i => i.id === id)
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)

  const sendToWhatsApp = () => {
    if (cart.length === 0) return
    const message = cart.map(item => `• ${item.name} — SAR ${item.price}`).join('\n')
    const fullMessage = `🛒 *New Order*\n\n${message}\n\n*Total: SAR ${cartTotal}*\n\n📍 ${BUSINESS.location}`
    const encoded = encodeURIComponent(fullMessage)
    window.open(`https://wa.me/${BUSINESS.phone}?text=${encoded}`, '_blank')
  }

  const currentCategory = MENU.categories.find(c => c.id === activeCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Menu Hero Header */}
      <section className="relative h-64 md:h-80">
        <img 
          src={categoryImages[activeCategory]} 
          alt={currentCategory.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 pb-8">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{currentCategory.name}</h1>
            <p className="text-white/80">{currentCategory.items.length} dishes available</p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="sticky top-16 bg-white shadow-md z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-3 py-4 overflow-x-auto scrollbar-hide">
            {MENU.categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-[#E63900] text-white shadow-lg shadow-orange-500/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCategory.items.map(item => (
            <button
              key={item.id}
              onClick={() => toggleItem(item)}
              className={`group relative overflow-hidden rounded-2xl text-left transition-all duration-300 ${
                isInCart(item.id) ? 'ring-4 ring-[#E63900] ring-offset-2' : 'hover:shadow-2xl bg-white'
              }`}
            >
              {/* Food Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={categoryImages[activeCategory]} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {item.popular && (
                  <div className="absolute top-3 left-3 bg-[#E63900] text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                  <span className="text-xl font-black text-[#E63900]">SAR {item.price}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.description}</p>
                
                <div className={`w-full py-3 rounded-xl text-center font-bold transition-colors ${
                  isInCart(item.id) 
                    ? 'bg-[#E63900] text-white' 
                    : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                }`}>
                  {isInCart(item.id) ? '✓ Added to Order' : 'Add to Order'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-2xl">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-[#E63900] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{cart.length} item{cart.length > 1 ? 's' : ''}</p>
                  <p className="text-2xl font-black text-gray-900">SAR {cartTotal}</p>
                </div>
              </div>
              <button
                onClick={sendToWhatsApp}
                className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-8 py-4 rounded-2xl flex items-center gap-2 transition-all hover:scale-105 shadow-lg shadow-green-900/20"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Order on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <section className="relative h-72 md:h-96">
        <img 
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80" 
          alt="Our Kitchen" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 pb-10">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-3">About Us</h1>
            <p className="text-white/80 text-xl">Bringing authentic flavors to Riyadh since 2019</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
              Our <span className="text-[#E63900]">Story</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">{BUSINESS.name}</strong> started with a simple mission — 
                to bring the authentic taste of Indo-Chinese cuisine and aromatic Biryani to the heart of Riyadh.
              </p>
              <p>
                Our chefs, trained in the traditional methods of Mumbai and Shanghai, combine the best 
                of both worlds to create dishes that satisfy every palate. From our signature Chicken 
                Lollipop to our aromatic Biryani, every dish is prepared with fresh ingredients and 
                time-honored recipes.
              </p>
              <p>
                We take pride in serving not just food, but an experience that reminds you of home. 
                Whether you're craving spicy Chinese or aromatic Indian biryani, we've got you covered.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80" 
              alt="Chef preparing food" 
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-[#E63900] text-white p-6 rounded-2xl shadow-xl">
              <div className="text-4xl font-black">5+</div>
              <div className="text-white/80 text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-[#E63900] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-black mb-2">★ {BUSINESS.rating}</div>
              <div className="text-white/80">Google Rating</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-black mb-2">{BUSINESS.reviews}+</div>
              <div className="text-white/80">Happy Customers</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-black mb-2">20+</div>
              <div className="text-white/80">Menu Items</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-black mb-2">365</div>
              <div className="text-white/80">Days Open</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-12">
          Why <span className="text-[#E63900]">Choose Us</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80', title: 'Authentic Recipes', desc: 'Traditional recipes passed down through generations' },
            { img: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=600&q=80', title: 'Fresh Ingredients', desc: 'Sourced daily from trusted suppliers' },
            { img: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80', title: 'Family Friendly', desc: 'Perfect for family dinners and gatherings' },
            { img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80', title: 'Great Ambiance', desc: 'Clean, comfortable, and welcoming space' },
          ].map((item, idx) => (
            <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visit CTA */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Come Visit Us!</h2>
          <p className="text-gray-400 text-lg mb-8">
            We'd love to serve you. Find us at:
          </p>
          <p className="text-white font-medium text-xl mb-8">
            {BUSINESS.location}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`tel:${BUSINESS.phone}`}
              className="bg-[#E63900] hover:bg-[#c93200] text-white font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105"
            >
              Call Now
            </a>
            <a 
              href="https://maps.google.com/?q=The+Bombay+Town+Chinese+Biryani+Al+Farazdaq+St+Riyadh"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105 border border-white/20"
            >
              Get Directions
            </a>
            <a 
              href={`https://wa.me/${BUSINESS.phone}?text=${encodeURIComponent('Hi! I want to know more about your restaurant.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

function Offers() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil(productsData.offers.length / itemsPerPage)
  
  const currentOffers = productsData.offers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const copyCode = (code) => {
    navigator.clipboard.writeText(code)
    alert(`Copied: ${code}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative h-64 md:h-80">
        <img 
          src="https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&q=80" 
          alt="Special Offers" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 pb-8">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">Special Offers</h1>
            <p className="text-white/80">Save big on your favorite dishes</p>
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentOffers.map(offer => (
            <div key={offer.id} className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#E63900] text-white font-bold px-4 py-2 rounded-full">
                  {offer.discount}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                <p className="text-gray-500 mb-4">{offer.description}</p>
                <div className="flex items-center justify-between">
                  <div className="bg-gray-100 px-3 py-2 rounded-lg">
                    <span className="text-gray-500 text-sm">Code: </span>
                    <span className="font-bold text-gray-900">{offer.code}</span>
                  </div>
                  <button 
                    onClick={() => copyCode(offer.code)}
                    className="bg-[#E63900] hover:bg-[#c93200] text-white font-bold px-4 py-2 rounded-lg transition-colors"
                  >
                    Copy Code
                  </button>
                </div>
                <p className="text-gray-400 text-xs mt-3">Valid until: {offer.validUntil}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-10 h-10 rounded-full font-bold transition-colors ${
                  currentPage === idx + 1 
                    ? 'bg-[#E63900] text-white' 
                    : 'bg-white shadow-md text-gray-600 hover:bg-gray-100'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-[#E63900] py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Want to order now?</h2>
          <p className="text-orange-100 mb-6">Use our WhatsApp ordering for quick service</p>
          <a 
            href={`https://wa.me/${BUSINESS.phone}?text=${encodeURIComponent('Hi! I want to use an offer.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#E63900] font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Order on WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}

function Products() {
  const [cart, setCart] = useState([])
  const [activeCategory, setActiveCategory] = useState('starters')
  const [categoryData, setCategoryData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const categoryImages = {
    'starters': 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=800&q=80',
    'soups': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
    'rice-noodles': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80',
    'main-course': 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80',
    'biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
    'drinks': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=80',
    'desserts': 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&q=80',
    'combos': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
  }

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/data/${activeCategory}.json`)
        if (!response.ok) throw new Error('Failed to load')
        const data = await response.json()
        setCategoryData(data)
      } catch (err) {
        setError('Failed to load category')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCategory()
  }, [activeCategory])

  const toggleItem = (item) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id)
      if (exists) {
        return prev.filter(i => i.id !== item.id)
      }
      return [...prev, item]
    })
  }

  const isInCart = (id) => cart.some(i => i.id === id)
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)

  const sendToWhatsApp = () => {
    if (cart.length === 0) return
    const message = cart.map(item => `• ${item.name} — SAR ${item.price}`).join('\n')
    const fullMessage = `🛒 *New Order*\n\n${message}\n\n*Total: SAR ${cartTotal}*\n\n📍 ${BUSINESS.location}`
    const encoded = encodeURIComponent(fullMessage)
    window.open(`https://wa.me/${BUSINESS.phone}?text=${encoded}`, '_blank')
  }

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-[#E63900] text-xl font-bold">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative h-56 md:h-64">
        <img 
          src={categoryImages[activeCategory] || categoryImages['starters']} 
          alt={categoryData.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 pb-6">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-1">{categoryData.name}</h1>
            <p className="text-white/80 text-sm">{categoryData.items.length} items</p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="bg-white shadow-md sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 py-3 overflow-x-auto">
            {productsData.categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#E63900] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryData.items.map(item => (
            <button
              key={item.id}
              onClick={() => toggleItem(item)}
              className={`group relative overflow-hidden rounded-2xl text-left transition-all duration-300 ${
                isInCart(item.id) ? 'ring-4 ring-[#E63900] ring-offset-2' : 'hover:shadow-2xl bg-white'
              }`}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {item.popular && (
                  <div className="absolute top-3 left-3 bg-[#E63900] text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-black text-[#E63900]">SAR {item.price}</span>
                  <span className={`px-4 py-2 rounded-xl font-bold text-sm ${
                    isInCart(item.id) 
                      ? 'bg-[#E63900] text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {isInCart(item.id) ? '✓ Added' : 'Add +'}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4 z-50 shadow-2xl">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-[#E63900] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{cart.length} items</p>
                  <p className="text-2xl font-black text-gray-900">SAR {cartTotal}</p>
                </div>
              </div>
              <button
                onClick={sendToWhatsApp}
                className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-8 py-4 rounded-2xl flex items-center gap-2 transition-all hover:scale-105 shadow-lg"
              >
                Order on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App