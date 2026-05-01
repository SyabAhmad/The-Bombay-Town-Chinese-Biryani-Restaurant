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
  description: 'Serving the finest Indo-Chinese cuisine and authentic Biryani in Riyadh.',
  hours: '11:00 AM - 11:00 PM',
}

const MENU = productsData

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

function Header() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const nav = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/products', label: 'Products' },
    { path: '/offers', label: 'Offers' },
    { path: '/about', label: 'About' },
  ]
  return (
    <header className="bg-[#E63900] text-white sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">{BUSINESS.name}</Link>
        <nav className="hidden md:flex gap-6">
          {nav.map(n => (
            <Link key={n.path} to={n.path} className={`text-sm ${location.pathname === n.path ? 'border-b' : ''}`}>
              {n.label}
            </Link>
          ))}
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)}>☰</button>
      </div>
      {open && (
        <nav className="md:hidden px-4 pb-4">
          {nav.map(n => <Link key={n.path} to={n.path} className="block py-1">{n.label}</Link>)}
        </nav>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-stone-900 text-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-3xl font-black text-[#E63900] mb-3">{BUSINESS.name}</h3>
            <p className="text-stone-400 text-lg mb-4">{BUSINESS.subtitle}</p>
            <p className="text-stone-500 text-sm">{BUSINESS.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-stone-800 rounded-2xl p-4 hover:bg-stone-700 transition-colors">
              <img src="https://images.unsplash.com/photo-1529154036614-a60975f5c760?w=200" alt="Location" className="w-full h-24 object-cover rounded-xl mb-3" />
              <p className="text-stone-400 text-sm">📍 {BUSINESS.locationShort}</p>
              <a href="https://maps.google.com/?q=The+Bombay+Town+Al+Farazdaq+St+Riyadh" className="text-[#E63900] text-sm font-bold">Get Directions →</a>
            </div>
            <div className="bg-stone-800 rounded-2xl p-4 hover:bg-stone-700 transition-colors">
              <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200" alt="Contact" className="w-full h-24 object-cover rounded-xl mb-3" />
              <p className="text-stone-400 text-sm">📞 {BUSINESS.phoneDisplay}</p>
              <a href={`tel:${BUSINESS.phone}`} className="text-[#E63900] text-sm font-bold">Call Now →</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-stone-800 pt-6 mb-6">
          <h4 className="font-bold mb-4 text-center">Quick Links</h4>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/menu" className="bg-stone-800 hover:bg-[#E63900] px-4 py-2 rounded-full text-sm font-bold transition-colors">🍽️ Menu</a>
            <a href="/products" className="bg-stone-800 hover:bg-[#E63900] px-4 py-2 rounded-full text-sm font-bold transition-colors">🛒 Products</a>
            <a href="/offers" className="bg-stone-800 hover:bg-[#E63900] px-4 py-2 rounded-full text-sm font-bold transition-colors">🏷️ Offers</a>
            <a href="/about" className="bg-stone-800 hover:bg-[#E63900] px-4 py-2 rounded-full text-sm font-bold transition-colors">ℹ️ About</a>
          </div>
        </div>
        
        <div className="flex justify-center gap-4 mb-6">
          <a href={`https://wa.me/${BUSINESS.phone}`} className="bg-[#25D366] hover:bg-[#20BD5A] p-3 rounded-full transition-colors">
            <span className="text-xl">💬</span>
          </a>
          <a href={`tel:${BUSINESS.phone}`} className="bg-stone-800 hover:bg-[#E63900] p-3 rounded-full transition-colors">
            <span className="text-xl">📞</span>
          </a>
          <a href="https://maps.google.com/?q=The+Bombay+Town+Al+Farazdaq+St+Riyadh" className="bg-stone-800 hover:bg-[#E63900] p-3 rounded-full transition-colors">
            <span className="text-xl">📍</span>
          </a>
        </div>
        
        <div className="border-t border-stone-800 pt-6 text-center">
          <p className="text-stone-500">© 2024 {BUSINESS.name}. All rights reserved.</p>
          <p className="text-stone-600 text-sm mt-1">🕐 Open: {BUSINESS.hours}</p>
        </div>
      </div>
    </footer>
  )
}

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-[#E63900] to-[#C43200] text-white py-20 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=1200" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <div className="mb-2 text-4xl">🇸🇦 🌶️ 🍛</div>
            <h1 className="text-6xl font-black mb-3 tracking-tight">{BUSINESS.name}</h1>
            <p className="text-2xl text-orange-200 font-medium mb-8">{BUSINESS.subtitle}</p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mb-10">
              <a href={`https://wa.me/${BUSINESS.phone}?text=Hi`} className="bg-[#25D366] hover:bg-[#20BD5A] px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                <span className="text-xl">💬</span> Order on WhatsApp
              </a>
              <a href={`tel:${BUSINESS.phone}`} className="bg-white/20 hover:bg-white/30 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2">
                <span className="text-xl">📞</span> Call Now
              </a>
            </div>
            <div className="flex justify-center md:justify-start gap-6 mb-6">
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-3">
                <div className="text-3xl font-black">★ {BUSINESS.rating}</div>
                <div className="text-orange-200 font-medium text-sm">{BUSINESS.reviews}+ Reviews</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-3">
                <div className="text-3xl font-black">{BUSINESS.priceRange}</div>
                <div className="text-orange-200 font-medium text-sm">per person</div>
              </div>
            </div>
            <div className="text-white/70">📍 {BUSINESS.locationShort}</div>
          </div>
          <div className="hidden md:block">
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Location', icon: '📍', image: 'https://images.unsplash.com/photo-1529154036614-a60975f5c760?w=400', link: 'https://maps.google.com/?q=The+Bombay+Town+Al+Farazdaq+St+Riyadh', desc: 'Find us' },
          { label: 'Call', icon: '📞', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', link: `tel:${BUSINESS.phone}`, desc: 'Order now' },
          { label: 'Menu', icon: '🍽️', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400', link: '/menu', desc: 'View dishes' },
          { label: 'About', icon: 'ℹ️', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400', link: '/about', desc: 'Learn more' },
        ].map((item, i) => (
          <a key={i} href={item.link} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="relative h-32 overflow-hidden">
              <img src={item.image} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-3 text-2xl">{item.icon}</div>
            </div>
            <div className="p-4 text-center">
              <div className="font-bold text-lg text-gray-800 group-hover:text-[#E63900] transition-colors">{item.label}</div>
              <div className="text-sm text-gray-500">{item.desc}</div>
            </div>
          </a>
        ))}
      </section>
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Popular Dishes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MENU.categories[0].items.slice(0, 4).map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img src={item.image} className="w-full h-32 object-cover" alt={item.name} />
              <div className="p-3">
                <h3 className="font-bold text-sm">{item.name}</h3>
                <p className="text-[#E63900] font-black">SAR {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-gray-100 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">View All Products</h2>
        <Link to="/products" className="inline-block bg-[#E63900] text-white font-bold px-8 py-3 rounded-xl">Browse Menu</Link>
      </section>
    </div>
  )
}

function MenuPage() {
  const [cat, setCat] = useState('starters')
  const [search, setSearch] = useState('')
  const cur = MENU.categories.find(c => c.id === cat)
  const categoryIcons = { starters: '🥟', soups: '🍲', 'rice-noodles': '🍜', 'main-course': '🍛', biryani: '🍚', drinks: '🥤', desserts: '🍰', combos: '🎁' }
  
  const filteredItems = search ? cur.items.filter(i => i.name.toLowerCase().includes(search.toLowerCase())) : cur.items
  
  return (
    <div className="min-h-screen bg-stone-50">
      <section className="bg-gradient-to-b from-[#E63900] to-[#C43200] text-white py-16 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="text-4xl mb-3">🍽️ 🌶️ 🍛</div>
          <h1 className="text-5xl font-black mb-3">Our Menu</h1>
          <p className="text-xl text-orange-200 mb-6">Fresh ingredients • Authentic recipes • Flavorful dishes</p>
          <div className="relative max-w-md mx-auto">
            <input type="text" placeholder="Search dishes..." value={search} onChange={e => setSearch(e.target.value)} className="w-full px-5 py-3 pl-12 rounded-2xl text-gray-900 text-lg shadow-lg" />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
          </div>
        </div>
      </section>
      
      <div className="sticky top-14 bg-white shadow-lg z-40 border-b-4 border-[#E63900]">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-3">
            {MENU.categories.map(c => (
              <button key={c.id} onClick={() => {setCat(c.id); setSearch('')}} className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all ${cat === c.id ? 'bg-[#E63900] text-white shadow-lg' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>
                <span className="text-lg">{categoryIcons[c.id] || '🍽️'}</span>
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{categoryIcons[cat] || '🍽️'}</span>
            <div>
              <h2 className="text-3xl font-black text-stone-800">{cur.name}</h2>
              <p className="text-stone-500">{filteredItems.length} dishes available</p>
            </div>
          </div>
        </div>
        
        {search && (
          <div className="bg-orange-100 border border-orange-300 rounded-xl p-3 mb-6 text-center">
            <span className="text-orange-800 font-medium">Showing {filteredItems.length} results for "{search}"</span>
            <button onClick={() => setSearch('')} className="ml-2 text-orange-600 underline text-sm">Clear</button>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-5">
          {filteredItems.map((item, idx) => (
            <div key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border-2 border-transparent hover:border-[#E63900]">
              <div className="flex">
                <div className="flex-1 p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-stone-800 group-hover:text-[#E63900] transition-colors">{item.name}</h3>
                    <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full">{idx + 1}</span>
                  </div>
                  <p className="text-stone-500 text-sm mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#E63900]">SAR {item.price}</span>
                    <a href={`https://wa.me/${BUSINESS.phone}?text=Hi, I want to order ${item.name} - SAR ${item.price}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-4 py-2 rounded-full font-bold text-sm transition-all hover:scale-105">
                      <span>Order</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
                <div className="w-28 h-28 md:w-32 md:h-32 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-[#E63900] to-[#FF6B35] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-black mb-2">Want to order multiple items?</h3>
          <p className="mb-4 opacity-90">Chat with us on WhatsApp and we'll help you create the perfect meal!</p>
          <a href={`https://wa.me/${BUSINESS.phone}?text=Hi, I want to place an order`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-[#E63900] px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            <span className="text-xl">💬</span> Order on WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}

function ProductsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('all')
  const [page, setPage] = useState(1)
  const perPage = 20
  const [cart, setCart] = useState([])

  useEffect(() => {
    const all = []
    MENU.categories.forEach(c => {
      c.items.forEach(i => {
        all.push({ ...i, category: c.name })
      })
    })
    setItems(all)
    setLoading(false)
  }, [])

  useEffect(() => setPage(1), [search, cat])

  const filtered = items.filter(i => {
    const mSearch = i.name.toLowerCase().includes(search.toLowerCase())
    const mCat = cat === 'all' || i.category === cat
    return mSearch && mCat
  })
  const totalPages = Math.ceil(filtered.length / perPage)
  const current = filtered.slice((page - 1) * perPage, page * perPage)
  const uniqueCats = [...new Set(items.map(i => i.category))]

  const toggle = (item) => setCart(p => p.find(x => x.id === item.id) ? p.filter(x => x.id !== item.id) : [...p, item])
  const isIn = (id) => cart.some(i => i.id === id)
  const total = cart.reduce((s, i) => s + i.price, 0)

  const order = () => {
    if (!cart.length) return
    const msg = cart.map(i => `${i.name} - SAR ${i.price}`).join('\n')
    window.open(`https://wa.me/${BUSINESS.phone}?text=${encodeURIComponent(`Order:\n${msg}\n\nTotal: SAR ${total}`)}`, '_blank')
  }

  const categoryIcons = { 'Starters': '🥟', 'Soups': '🍲', 'Rice & Noodles': '🍜', 'Main Course': '🍛', 'Biryani': '🍚', 'Drinks': '🥤', 'Desserts': '🍰', 'Combos': '🎁' }

  return (
    <div className="min-h-screen bg-stone-50">
      <section className="bg-gradient-to-b from-[#E63900] to-[#C43200] text-white py-14 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="text-4xl mb-3">🛒 🍜 🍛</div>
          <h1 className="text-4xl font-black mb-2">All Products</h1>
          <p className="text-orange-200 text-lg mb-6">Browse our complete menu collection</p>
          <div className="relative max-w-lg mx-auto mb-6">
            <input type="text" placeholder="Search for dishes..." value={search} onChange={e => setSearch(e.target.value)} className="w-full px-5 py-3.5 pl-12 rounded-2xl text-gray-900 text-lg shadow-lg placeholder:text-gray-400" />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button onClick={() => setCat('all')} className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${cat === 'all' ? 'bg-white text-[#E63900] shadow-lg' : 'bg-white/20 hover:bg-white/30'}`}>
              <span>📋</span><span>All</span>
            </button>
            {uniqueCats.map(c => (
              <button key={c} onClick={() => setCat(c)} className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${cat === c ? 'bg-white text-[#E63900] shadow-lg' : 'bg-white/20 hover:bg-white/30'}`}>
                <span>{categoryIcons[c] || '🍽️'}</span><span>{c}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-8">
        <p className="mb-4 text-gray-500">{current.length} of {filtered.length} products</p>
        {loading ? <div className="text-center py-20 text-[#E63900] font-bold">Loading...</div> : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {current.map(item => (
                <button key={item.id} onClick={() => toggle(item)} className={`bg-white rounded-xl overflow-hidden shadow-sm text-left ${isIn(item.id) ? 'ring-2 ring-[#E63900]' : ''}`}>
                  <img src={item.image} className="w-full h-32 object-cover" alt={item.name} />
                  <div className="p-3">
                    <h3 className="text-sm font-bold truncate">{item.name}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[#E63900] font-black">SAR {item.price}</span>
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isIn(item.id) ? 'bg-[#25D366] text-white' : 'bg-gray-100'}`}>{isIn(item.id) ? '✓' : '+'}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 rounded-full bg-white shadow disabled:opacity-50">Previous</button>
                <span className="px-4">Page {page} of {totalPages}</span>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 rounded-full bg-[#E63900] text-white disabled:opacity-50">Next</button>
              </div>
            )}
          </>
        )}
      </section>
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center z-50">
          <div className="flex items-center gap-3">
            <div className="bg-[#E63900] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">{cart.length}</div>
            <span className="text-xl font-black">SAR {total}</span>
          </div>
          <button onClick={order} className="bg-[#25D366] text-white font-bold px-6 py-2 rounded-lg">Order</button>
        </div>
      )}
    </div>
  )
}

function OffersPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <section className="bg-gradient-to-b from-[#E63900] to-[#C43200] text-white py-16 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1200" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="text-4xl mb-3">🏷️ 🎁 🔥</div>
          <h1 className="text-5xl font-black mb-2">Special Offers</h1>
          <p className="text-xl text-orange-200">Best deals & discounts for you!</p>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
        {productsData.offers.map(offer => (
          <div key={offer.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-[#E63900]">
            <div className="relative h-48">
              <img src={offer.image} className="w-full h-full object-cover" alt={offer.title} />
              <div className="absolute top-3 right-3 bg-[#E63900] text-white font-black px-4 py-1.5 rounded-full text-lg">{offer.discount}</div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-xl text-stone-800 mb-2">{offer.title}</h3>
              <p className="text-stone-500 text-sm mb-4">{offer.description}</p>
              <div className="bg-stone-100 rounded-xl p-3 flex justify-between items-center">
                <span className="font-bold text-stone-600">Code: {offer.code}</span>
                <button onClick={() => {navigator.clipboard.writeText(offer.code); alert('Copied!')}} className="bg-[#E63900] text-white font-bold px-4 py-1.5 rounded-lg hover:bg-[#C43200] transition-colors">Copy</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <section className="bg-gradient-to-b from-[#E63900] to-[#C43200] text-white py-16 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="text-4xl mb-3">ℹ️ 🍛 🌶️</div>
          <h1 className="text-5xl font-black mb-2">About Us</h1>
          <p className="text-xl text-orange-200">Since 2019 in Riyadh</p>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200 mb-8">
          <h2 className="text-2xl font-black text-stone-800 mb-4">Our Story</h2>
          <p className="text-stone-600 leading-relaxed text-lg mb-4">{BUSINESS.name} brings authentic Indo-Chinese cuisine and aromatic Biryani to the heart of Riyadh. Our chefs combine traditional recipes passed down through generations with the freshest ingredients to create dishes that burst with flavor.</p>
          <p className="text-stone-600 leading-relaxed text-lg">Since 2019, we've been serving the community with our signature dishes - from crispy Chicken Lollipop to aromatic Chicken Biryani. Every dish is crafted with love and care.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { v: `★ ${BUSINESS.rating}`, l: 'Rating', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400' },
            { v: `${BUSINESS.reviews}+`, l: 'Reviews', image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=400' },
            { v: '50+', l: 'Dishes', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400' },
            { v: '365', l: 'Days Open', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400' },
          ].map((i, k) => (
            <div key={k} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="h-24 overflow-hidden relative">
                <img src={i.image} alt={i.l} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-4 text-center">
                <div className="text-2xl font-black text-[#E63900]">{i.v}</div>
                <div className="text-sm text-stone-500 font-bold">{i.l}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { title: 'Fresh Ingredients', desc: 'We use only the freshest ingredients sourced daily', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400' },
            { title: 'Authentic Recipes', desc: 'Traditional recipes with authentic spices', image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400' },
            { title: 'Fast Delivery', desc: 'Quick and reliable delivery across Riyadh', image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=400' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="h-40 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-bold text-lg text-stone-800">{item.title}</h3>
                <p className="text-stone-500 text-sm mt-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-[#E63900] to-[#FF6B35] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-black mb-2">Visit Us Today!</h3>
          <p className="mb-4 opacity-90">{BUSINESS.locationShort}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href={`tel:${BUSINESS.phone}`} className="bg-white text-[#E63900] font-bold px-6 py-2 rounded-full hover:scale-105 transition-transform">📞 Call Now</a>
            <a href={`https://wa.me/${BUSINESS.phone}?text=Hi`} className="bg-[#25D366] font-bold px-6 py-2 rounded-full hover:scale-105 transition-transform">💬 WhatsApp</a>
            <a href="https://maps.google.com/?q=The+Bombay+Town+Al+Farazdaq+St+Riyadh" className="bg-white/20 font-bold px-6 py-2 rounded-full hover:bg-white/30 transition-colors">📍 Get Directions</a>
          </div>
        </div>
      </section>
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
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App