export default function Logos() {
  return (
    <section className="py-8 sm:py-12 border-y border-gray-100">
      <div className="px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
          Trusted by Leading Brands and Used by Over 2,000 Companies
        </p>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/1280px-Walmart_logo.svg.png" alt="Walmart" className="h-6 sm:h-10 opacity-75" loading="lazy" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" alt="Nike" className="h-6 sm:h-9 opacity-75" loading="lazy" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta" className="h-6 sm:h-8 opacity-75" loading="lazy" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsI0lPAbggya4q3VjaW8E_IkwJWYyLKtUhAQ&s" alt="Express" className="h-6 sm:h-14 opacity-75" loading="lazy" />
        </div>
      </div>
    </section>
  );
}