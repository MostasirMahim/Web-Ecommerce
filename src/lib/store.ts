import { create } from "zustand"
import { persist } from "zustand/middleware"

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  color?: string
  size?: string
  discountPercentage?: number
}

type CartStore = {
  items: CartItem[]
  isOpen: boolean
  totalItems: number
  totalPrice: number

  // Actions
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  setIsOpen: (isOpen: boolean) => void
  calculateTotals: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      totalItems: 0,
      totalPrice: 0,

      addItem: (item) => {
        const { items } = get()
        const existingItem = items.find((i) => i.id === item.id)

        if (existingItem) {
          const updatedItems = items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i))
          set({ items: updatedItems })
        } else {
          set({ items: [...items, item] })
        }

        get().calculateTotals()
        set({ isOpen: true })
      },

      removeItem: (id) => {
        const { items } = get()
        const updatedItems = items.filter((item) => item.id !== id)
        set({ items: updatedItems })
        get().calculateTotals()
      },

      updateQuantity: (id, quantity) => {
        const { items } = get()
        const updatedItems = items.map((item) => (item.id === id ? { ...item, quantity } : item))
        set({ items: updatedItems })
        get().calculateTotals()
      },

      clearCart: () => {
        set({ items: [] })
        get().calculateTotals()
      },

      setIsOpen: (isOpen) => {
        set({ isOpen })
      },

      calculateTotals: () => {
        const { items } = get()
        const totalItems = items.reduce((total, item) => total + item.quantity, 0)
        const totalPrice = items.reduce((total, item) => {
          const price = item.discountPercentage ? item.price * (1 - item.discountPercentage / 100) : item.price
          return total + price * item.quantity
        }, 0)

        set({ totalItems, totalPrice })
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)

// Wishlist store
export type WishlistItem = {
  id: string
  name: string
  price: number
  image: string
  discountPercentage?: number
  category: string
  rating: number
  reviewCount: number
}

type WishlistStore = {
  items: WishlistItem[]

  // Actions
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  toggleItem: (item: WishlistItem) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const { items } = get()
        if (!items.some((i) => i.id === item.id)) {
          set({ items: [...items, item] })
        }
      },

      removeItem: (id) => {
        const { items } = get()
        set({ items: items.filter((item) => item.id !== id) })
      },

      toggleItem: (item) => {
        const { items } = get()
        const exists = items.some((i) => i.id === item.id)

        if (exists) {
          set({ items: items.filter((i) => i.id !== item.id) })
        } else {
          set({ items: [...items, item] })
        }
      },

      isInWishlist: (id) => {
        const { items } = get()
        return items.some((item) => item.id === id)
      },

      clearWishlist: () => {
        set({ items: [] })
      },
    }),
    {
      name: "wishlist-storage",
    },
  ),
)

// Checkout store for managing checkout state
type CheckoutStore = {
  step: number
  shippingAddress: Address | null
  billingAddress: Address | null
  paymentMethod: string
  shippingMethod: string

  // Actions
  setStep: (step: number) => void
  setShippingAddress: (address: Address) => void
  setBillingAddress: (address: Address) => void
  setPaymentMethod: (method: string) => void
  setShippingMethod: (method: string) => void
  resetCheckout: () => void
}

export type Address = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      step: 1,
      shippingAddress: null,
      billingAddress: null,
      paymentMethod: "",
      shippingMethod: "standard",

      setStep: (step) => set({ step }),
      setShippingAddress: (address) => set({ shippingAddress: address }),
      setBillingAddress: (address) => set({ billingAddress: address }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      setShippingMethod: (method) => set({ shippingMethod: method }),
      resetCheckout: () =>
        set({
          step: 1,
          shippingAddress: null,
          billingAddress: null,
          paymentMethod: "",
          shippingMethod: "standard",
        }),
    }),
    {
      name: "checkout-storage",
    },
  ),
)

// User store for managing user data
type UserProfile = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  avatar?: string;
};

type UserStore = {
  isLoggedIn: boolean
  profile: UserProfile | null

  // Actions
  login: (profile: UserProfile) => void
  logout: () => void
  updateProfile: (profile: Partial<UserProfile>) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      profile: null,

      login: (profile) => {
        set({ isLoggedIn: true, profile })
      },

      logout: () => {
        set({ isLoggedIn: false, profile: null })
      },

      updateProfile: (updatedProfile) => {
        const { profile } = get()
        set({ profile: { ...profile, ...updatedProfile } })
      },
    }),
    {
      name: "user-storage",
    },
  ),
)

// Search store for managing search state
type SearchStore = {
  query: string
  isOpen: boolean
  recentSearches: string[]

  // Actions
  setQuery: (query: string) => void
  setIsOpen: (isOpen: boolean) => void
  addRecentSearch: (query: string) => void
  clearRecentSearches: () => void
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      query: "",
      isOpen: false,
      recentSearches: [],

      setQuery: (query) => {
        set({ query })
      },

      setIsOpen: (isOpen) => {
        set({ isOpen })
      },

      addRecentSearch: (query) => {
        if (!query.trim()) return

        const { recentSearches } = get()
        const updatedSearches = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5)

        set({ recentSearches: updatedSearches })
      },

      clearRecentSearches: () => {
        set({ recentSearches: [] })
      },
    }),
    {
      name: "search-storage",
    },
  ),
)
