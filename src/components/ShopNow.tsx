import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import p5 from "@/assets/product-5.jpg";
import p6 from "@/assets/product-6.jpg";
import p7 from "@/assets/product-7.jpg";
import p8 from "@/assets/product-8.jpg";
import { Reveal } from "@/components/Reveal";

const products = [
  { name: "Menorca Dress — Pink", price: "€79.95", image: p1 },
  { name: "Helena Dress", price: "€89.95", image: p2 },
  { name: "Nice Flower Set", price: "€99.95", image: p3 },
  { name: "Lira Blouse", price: "€69.95", image: p4 },
  { name: "Imperial Cushion — Beige", price: "€49.00", image: p5 },
  { name: "Imperial Cushion — Yellow", price: "€49.00", image: p6 },
  { name: "Golden Forest Duvet", price: "€99.00", image: p7 },
  { name: "Imperial Blanket — Green", price: "€79.00", image: p8 },
];

export function ShopNow() {
  return (
    <section className="bg-white px-6 py-[120px] md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <Reveal as="p" className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#888888]">
          New In
        </Reveal>
        <Reveal as="h2" delay={0.2} className="section-heading mt-6">
          Shop Now.
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          {products.map((product, i) => (
            <Reveal key={product.name} delay={0.1 * i}>
              <article className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden bg-[#f5f5f5]">
                  <img
                    src={product.image}
                    alt={product.name}
                    width={768}
                    height={1024}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-5 text-[12px] font-medium uppercase tracking-[0.15em] text-[#111111]">
                  {product.name}
                </h3>
                <p className="mt-2 text-[14px] text-[#888888]">{product.price}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.15em] text-[#111111] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View Product →
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-20 flex justify-center">
          <button className="rounded-full border border-[#111111] px-8 py-3 text-[12px] font-medium uppercase tracking-[0.2em] text-[#111111] transition-colors hover:bg-[#111111] hover:text-white">
            View All
          </button>
        </Reveal>
      </div>
    </section>
  );
}

