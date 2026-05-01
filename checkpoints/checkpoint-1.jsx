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
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="font-bold mb-2">{BUSINESS.name}</h3>
        <p className="text-gray-400 text-sm">{BUSINESS.locationShort}</p>
        <p className="text-gray-500 text-xs mt-4">© 2024 {BUSINESS.name}</p>
      </div>
    </footer>
  )
}

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#E63900] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-black mb-4">{BUSINESS.name}</h1>
            <p className="text-xl text-orange-200 mb-6">{BUSINESS.subtitle}</p>
            <div className="flex justify-center md:justify-start gap-4 mb-8">
              <a href={`https://wa.me/${BUSINESS.phone}?text=Hi`} className="bg-[#25D366] px-6 py-3 rounded-xl font-bold">Order on WhatsApp</a>
              <a href={`tel:${BUSINESS.phone}`} className="bg-white/20 px-6 py-3 rounded-xl font-bold">Call</a>
            </div>
            <div className="flex justify-center md:justify-start gap-6">
              <div className="text-center"><div className="text-3xl font-black">★ {BUSINESS.rating}</div><div className="text-orange-200 text-sm">{BUSINESS.reviews}+ reviews</div></div>
              <div className="text-center"><div className="text-3xl font-black">{BUSINESS.priceRange}</div><div className="text-orange-200 text-sm">per person</div></div>
            </div>
          </div>
          <div className="hidden md:block">
            <img src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600" className="w-full h-64 object-cover rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-4 -mt-12 relative z-20">
        {[
          { label: 'Location', icon: '📍', link: 'https://maps.google.com/?q=The+Bombay+Town+Al+Farazdaq+St+Riyadh' },
          { label: 'Call', icon: '📞', link: `tel:${BUSINESS.phone}` },
          { label: 'Menu', icon: '🍽️', link: '/menu' },
          { label: 'About', icon: 'ℹ️', link: '/about' },
        ].map((item, i) => (
          <a key={i} href={item.link} className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center hover:border-[#E63900]">
            <div className="text-2xl mb-1">{item.icon}</div>
            <div className="text-xs font-bold">{item.label}</div>
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
  const cur = MENU.categories.find(c => c.id === cat)
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#E63900] text-white py-12 text-center">
        <h1 className="text-4xl font-black">Our Menu</h1>
        <p className="text-orange-200">Fresh ingredients • Authentic recipes</p>
      </section>
      <div className="sticky top-14 bg-white shadow-md z-40">
        <div className="max-w-4xl mx-auto px-4 flex gap-2 py-3 overflow-x-auto">
          {MENU.categories.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)} className={`px-4 py-2 rounded-full text-sm font-bold ${cat === c.id ? 'bg-[#E63900] text-white' : 'bg-gray-100'}`}>{c.name}</button>
          ))}
        </div>
      </div>
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-4">{cur.name}</h2>
        <div className="space-y-3">
          {cur.items.map(item => (
            <div key={item.id} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border">
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-[#E63900]">SAR {item.price}</p>
                <a href={`https://wa.me/${BUSINESS.phone}?text=Order:${item.name}`} className="text-xs bg-[#25D366] text-white px-3 py-1 rounded-lg">Order</a>
              </div>
            </div>
          ))}
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
    const fetchItems = async () => {
      setLoading(true)
      const all = []
      const cats = ['starters', 'soups', 'rice-noodles', 'main-course', 'biryani', 'drinks', 'desserts', 'combos']
      for (const c of cats) {
        try {
          const res = await fetch(`/data/${c}.json`)
          if (res.ok) {
            const d = await res.json()
            all.push(...d.items.map(i => ({ ...i, category: d.name })))
          }
        } catch {}
      }
      setItems(all)
      setLoading(false)
    }
    fetchItems()
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
    const msg = cart.map(i => `• ${i.name} - SAR ${i.price}`).join('\n')
    window.open(`https://wa.me/${BUSINESS.phone}?text=${encodeURIComponent(`Order:\n${msg}\n\nTotal: SAR ${total}`)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-[#E63900] text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-black mb-4">All Products</h1>
          <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="w-full max-w-md px-4 py-2 rounded-xl text-gray-900" />
          <div className="flex gap-2 mt-4 overflow-x-auto">
            <button onClick={() => setCat('all')} className={`px-3 py-1 rounded-full text-sm ${cat === 'all' ? 'bg-white text-[#E63900]' : 'bg-white/20'}`}>All</button>
            {uniqueCats.map(c => (
              <button key={c} onClick={() => setCat(c)} className={`px-3 py-1 rounded-full text-sm ${cat === c ? 'bg-white text-[#E63900]' : 'bg-white/20'}`}>{c}</button>
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
    <div className="min-h-screen bg-gray-50">
      <section className="bg-[#E63900] text-white py-16 text-center">
        <h1 className="text-4xl font-black">Special Offers</h1>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
        {productsData.offers.map(offer => (
          <div key={offer.id} className="bg-white rounded-xl overflow-hidden shadow-lg">
            <img src={offer.image} className="w-full h-40 object-cover" alt={offer.title} />
            <div className="p-4">
              <span className="bg-[#E63900] text-white text-xs font-bold px-2 py-1 rounded">{offer.discount}</span>
              <h3 className="font-bold mt-2">{offer.title}</h3>
              <p className="text-sm text-gray-500">{offer.description}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">Code: {offer.code}</span>
                <button onClick={() => {navigator.clipboard.writeText(offer.code); alert('Copied!')}} className="text-sm text-[#E63900] font-bold">Copy</button>
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
    <div className="min-h-screen bg-white">
      <section className="bg-gray-900 text-white py-16 text-center">
        <h1 className="text-4xl font-black">About Us</h1>
        <p className="text-gray-400">Since 2019 in Riyadh</p>
      </section>
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="text-gray-600 leading-relaxed">{BUSINESS.name} brings authentic Indo-Chinese cuisine and aromatic Biryani to Riyadh. Our chefs combine traditional recipes with fresh ingredients.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { v: `★ ${BUSINESS.rating}`, l: 'Rating' },
            { v: `${BUSINESS.reviews}+`, l: 'Reviews' },
            { v: '20+', l: 'Dishes' },
            { v: '365', l: 'Days Open' },
          ].map((i, k) => (
            <div key={k} className="bg-gray-100 p-4 rounded-xl text-center">
              <div className="text-2xl font-black">{i.v}</div>
              <div className="text-sm text-gray-500">{i.l}</div>
            </div>
          ))}
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