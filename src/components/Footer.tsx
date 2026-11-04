import { ArrowRight } from "lucide-react";

const navLinks = [
  "Collections",
  "Home Textiles",
  "About Us",
  "Contact",
  "Terms of Service",
  "Refund Policy",
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#A89880] text-white">
      <div className="mx-auto max-w-[1400px] px-6 pb-8 pt-20 md:px-12">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {/* Left */}
          <div>
            <p className="font-display text-[24px] font-bold tracking-tight text-white">
              KAPDA CASA
            </p>
            <p className="mt-3 text-[14px] text-[#F5F0E8]">
              Mediterranean craft for the modern woman.
            </p>
            <ul className="mt-10 space-y-3">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="nav-link inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="md:pt-1">
            <p className="text-[14px] text-[#F5F0E8]">
              Subscribe and receive offers.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 flex w-full items-center border border-white/80 bg-transparent"
            >
              <input
                type="email"
                placeholder="Email"
                className="flex-1 bg-transparent px-4 py-3 text-[14px] text-white placeholder:text-white/70 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="px-4 py-3 text-white transition-opacity hover:opacity-60"
              >
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-8 flex items-center gap-6">
              {[
                { Icon: InstagramIcon, label: "Instagram" },
                { Icon: PinterestIcon, label: "Pinterest" },
                { Icon: FacebookIcon, label: "Facebook" },
                { Icon: LinkedinIcon, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-white transition-opacity hover:opacity-60"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-20 h-px w-full bg-white/20" />

        {/* Bottom */}
        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-[11px] text-[#F5F0E8] md:flex-row md:items-center">
          <p>© 2025 KAPDA CASA. All rights reserved.</p>
          <p className="italic">Designed & built by Mohd Yasir Salmani</p>
        </div>
      </div>

      {/* Watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden"
      >
        <p className="whitespace-nowrap text-center font-display font-bold leading-none text-white opacity-[0.08]"
           style={{ fontSize: "clamp(80px, 17vw, 260px)", letterSpacing: "-0.02em" }}>
          KAPDA CASA
        </p>
      </div>
    </footer>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.088 4.088 0 0 1 1.518.988c.468.468.756.906.988 1.518.163.46.35 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.088 4.088 0 0 1-.988 1.518 4.088 4.088 0 0 1-1.518.988c-.46.163-1.26.35-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.088 4.088 0 0 1-1.518-.988 4.088 4.088 0 0 1-.988-1.518c-.163-.46-.35-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.088 4.088 0 0 1 .988-1.518A4.088 4.088 0 0 1 5.142 2.233c.46-.163 1.26-.35 2.43-.403C8.838 1.775 9.218 1.763 12 1.763V2.163zM12 0C8.741 0 8.333.014 7.053.072 5.775.13 4.903.333 4.14.63a5.876 5.876 0 0 0-2.126 1.384A5.876 5.876 0 0 0 .63 4.14C.333 4.903.13 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.058 1.278.261 2.15.558 2.913a5.876 5.876 0 0 0 1.384 2.126 5.876 5.876 0 0 0 2.126 1.384c.763.297 1.635.5 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.058 2.15-.261 2.913-.558a5.876 5.876 0 0 0 2.126-1.384 5.876 5.876 0 0 0 1.384-2.126c.297-.763.5-1.635.558-2.913C23.986 15.667 24 15.259 24 12s-.014-3.667-.072-4.947c-.058-1.278-.261-2.15-.558-2.913a5.876 5.876 0 0 0-1.384-2.126A5.876 5.876 0 0 0 19.86.63C19.097.333 18.225.13 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function PinterestIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345c-.091.379-.293 1.194-.333 1.361-.052.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
