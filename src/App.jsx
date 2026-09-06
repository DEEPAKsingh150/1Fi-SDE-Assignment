import { useEffect, useMemo, useState } from 'react'
import { fetchMarketplaceData } from './data/marketplaceData'
import './App.css'

const tabs = [
  { id: 'top-brands', label: 'Top Brands' },
  { id: 'nearby-stores', label: 'Nearby Stores' },
  { id: 'marketplace', label: '1Fi Marketplace' },
]

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

function App() {
  const [activeTab, setActiveTab] = useState('marketplace')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedPlanByProduct, setSelectedPlanByProduct] = useState({})

  useEffect(() => {
    let active = true

    fetchMarketplaceData()
      .then((data) => {
        if (!active) return

        setProducts(data)
        const firstPlanMap = Object.fromEntries(
          data.map((item) => [item.id, item.emiOptions[0]?.id ?? ''])
        )
        setSelectedPlanByProduct(firstPlanMap)
      })
      .catch(() => {
        if (active) setError('Unable to load marketplace products right now.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const activeProducts = useMemo(
    () => products.map((product) => ({
      ...product,
      selectedPlan:
        product.emiOptions.find(
          (plan) => plan.id === selectedPlanByProduct[product.id]
        ) ?? product.emiOptions[0],
    })),
    [products, selectedPlanByProduct]
  )

  const handlePlanSelect = (productId, planId) => {
    setSelectedPlanByProduct((current) => ({
      ...current,
      [productId]: planId,
    }))
  }

  return (
    <div className="shop-page">
      <header className="shop-header">
        <div className="shop-title-block">
          <p className="eyebrow">Shop</p>
          <h1>Discover products</h1>
        </div>
        <button type="button" className="cart-button">
          <span>Cart</span>
          <span className="cart-pill">4</span>
        </button>
      </header>

      <nav className="shop-tabs" aria-label="Shop categories">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={tab.id === activeTab ? 'tab active' : 'tab'}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === 'top-brands' && (
        <section className="tab-panel empty-panel">
          <p>Top Brands</p>
        </section>
      )}

      {activeTab === 'nearby-stores' && (
        <section className="tab-panel empty-panel">
          <p>Nearby Stores</p>
        </section>
      )}

      {activeTab === 'marketplace' && (
        <section className="tab-panel marketplace-panel">
          <div className="marketplace-header">
            <div>
              <p className="section-label">1Fi Marketplace</p>
              <h2>Latest deals and flexible EMIs</h2>
            </div>
            <button type="button" className="filter-button">
              Filter
            </button>
          </div>

          {loading && (
            <div className="state-card">
              <p>Loading marketplace products...</p>
            </div>
          )}

          {!loading && error && (
            <div className="state-card error-card">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="product-grid">
              {activeProducts.map((product) => (
                <article key={product.id} className="product-card">
                  <div className="product-image-wrap">
                    <img src={product.image} alt={product.name} />
                    <span className="badge">{product.category}</span>
                  </div>

                  <div className="product-body">
                    <div className="meta-row">
                      <span className="brand">{product.brand}</span>
                      <span className="rating">★ {product.rating}</span>
                    </div>

                    <h3>{product.name}</h3>
                    <p className="description">{product.description}</p>

                    <div className="price-row">
                      <span className="price">{currency.format(product.price)}</span>
                      <span className="old-price">{currency.format(product.originalPrice)}</span>
                    </div>

                    <div className="variant-block">
                      <span className="label">Variants</span>
                      <div className="variant-pills">
                        {product.variants.map((variant) => (
                          <button key={variant} type="button" className="variant-pill">
                            {variant}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="emi-block">
                      <div className="emi-header">
                        <span className="label">EMI options</span>
                        <span className="emi-badge">No-cost EMI</span>
                      </div>

                      <div className="emi-options">
                        {product.emiOptions.map((plan) => (
                          <button
                            key={plan.id}
                            type="button"
                            className={
                              selectedPlanByProduct[product.id] === plan.id
                                ? 'emi-option selected'
                                : 'emi-option'
                            }
                            onClick={() => handlePlanSelect(product.id, plan.id)}
                          >
                            <span>{plan.label}</span>
                            <strong>{currency.format(plan.monthly)}/mo</strong>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="checkout-row">
                      <div className="monthly-plan">
                        <span>Selected plan</span>
                        <strong>
                          {product.selectedPlan
                            ? `${product.selectedPlan.label} • ${currency.format(product.selectedPlan.monthly)}/mo`
                            : '—'}
                        </strong>
                      </div>

                      <button type="button" className="cta-button">
                        Buy with EMI
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}

export default App
