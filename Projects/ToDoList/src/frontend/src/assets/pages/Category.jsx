import React from 'react'
import ShopByCategory from '../components/layouts/ShopByCategory'

const Category = () => {
  return (
    <div className="min-h-screen bg-background pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-8 text-center animate-slide-up">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
          All <span className="text-primary">Collections</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore our extensive range of premium audio collections. Categorised for your convenience.
        </p>
      </div>

      <div className="bg-secondary/10 border-y border-border/50 py-10 mt-12 shadow-inner">
        <ShopByCategory />
      </div>
    </div>
  )
}

export default Category