const marketplaceData = [
  {
    id: 'galaxy-f15',
    name: 'Samsung Galaxy F15 5G',
    brand: 'Samsung',
    category: 'Smartphones',
    price: 15999,
    originalPrice: 20999,
    rating: 4.6,
    variants: ['128 GB', '256 GB'],
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    description: '6.5-inch AMOLED display, 5G-ready performance, and all-day battery.',
    emiOptions: [
      { id: 'galaxy-f15-3m', label: '3 months', months: 3, monthly: 5799, apr: '0% APR' },
      { id: 'galaxy-f15-6m', label: '6 months', months: 6, monthly: 2940, apr: '0% APR' },
      { id: 'galaxy-f15-9m', label: '9 months', months: 9, monthly: 2040, apr: '0% APR' },
      { id: 'galaxy-f15-12m', label: '12 months', months: 12, monthly: 1599, apr: '0% APR' },
    ],
  },
  {
    id: 'airpods-pro',
    name: 'Apple AirPods Pro',
    brand: 'Apple',
    category: 'Audio',
    price: 19999,
    originalPrice: 24999,
    rating: 4.8,
    variants: ['USB-C', 'Wireless charging'],
    image:
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80',
    description: 'Adaptive audio and active noise cancellation for immersive listening.',
    emiOptions: [
      { id: 'airpods-3m', label: '3 months', months: 3, monthly: 7120, apr: '0% APR' },
      { id: 'airpods-6m', label: '6 months', months: 6, monthly: 3785, apr: '0% APR' },
      { id: 'airpods-9m', label: '9 months', months: 9, monthly: 2600, apr: '0% APR' },
    ],
  },
  {
    id: 'hec-soundbar',
    name: 'Hisense 5.1 Soundbar',
    brand: 'Hisense',
    category: 'Home',
    price: 21999,
    originalPrice: 28999,
    rating: 4.5,
    variants: ['Dolby Audio', 'Bluetooth'],
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
    description: 'Powerful surround sound with deep bass and a compact cinematic profile.',
    emiOptions: [
      { id: 'soundbar-3m', label: '3 months', months: 3, monthly: 7600, apr: '0% APR' },
      { id: 'soundbar-6m', label: '6 months', months: 6, monthly: 4070, apr: '0% APR' },
      { id: 'soundbar-12m', label: '12 months', months: 12, monthly: 2060, apr: '0% APR' },
    ],
  },
  {
    id: 'lenovo-ideapad',
    name: 'Lenovo IdeaPad Slim 5',
    brand: 'Lenovo',
    category: 'Laptops',
    price: 45999,
    originalPrice: 61999,
    rating: 4.7,
    variants: ['16 GB', '512 GB SSD'],
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
    description: 'Sleek everyday laptop designed for smooth productivity and entertainment.',
    emiOptions: [
      { id: 'lenovo-6m', label: '6 months', months: 6, monthly: 8470, apr: '0% APR' },
      { id: 'lenovo-9m', label: '9 months', months: 9, monthly: 5850, apr: '0% APR' },
      { id: 'lenovo-12m', label: '12 months', months: 12, monthly: 4360, apr: '0% APR' },
    ],
  },
];

export const fetchMarketplaceData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(marketplaceData);
    }, 500);
  });
