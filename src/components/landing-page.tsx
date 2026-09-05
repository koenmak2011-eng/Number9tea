"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowDown,
  ArrowUpRight,
  Cake,
  Check,
  Coffee,
  Flower,
  Gift,
  Heart,
  IconContext,
  MapPin,
  Minus,
  Plus,
  Sparkle,
  WhatsappLogo,
  X,
  List,
  Clock,
  Pause,
  Play,
  Cookie,
  FacebookLogo,
  InstagramLogo,
  ShoppingCart,
  TiktokLogo,
  Trash,
} from "@phosphor-icons/react";
import {
  type CartOrderLine,
  type Category,
  type MenuCategory,
  type Product,
  cartMessage,
  filterProducts,
  itemPrice,
  shop,
  whatsappUrl,
} from "@/lib/shop";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const surprises = [
  {
    title: "Blind boxes",
    subtitle: "A little mystery. A big smile.",
    colour: "rose",
    icon: Gift,
    reveal: "Meet your next little obsession.",
    number: "?",
  },
  {
    title: "Cute trinkets",
    subtitle: "Tiny things to make your day.",
    colour: "yellow",
    icon: Sparkle,
    reveal: "Small enough for your pocket. Big on joy.",
    number: "!",
  },
  {
    title: "Little gifts",
    subtitle: "For your person. Or yourself.",
    colour: "green",
    icon: Heart,
    reveal: "A just-because kind of present.",
    number: "9",
  },
];

const socialLinks = [
  {
    label: "Instagram",
    detail: "@no.9_bubbletea",
    href: "https://www.instagram.com/no.9_bubbletea/?hl=en-gb",
    Icon: InstagramLogo,
  },
  {
    label: "Facebook",
    detail: "NO9 Bubble Tea",
    href: "https://www.facebook.com/people/NO9_Bubble-Tea/100093989031765/",
    Icon: FacebookLogo,
  },
  {
    label: "TikTok",
    detail: "@no.9_bubbletea_wolves",
    href: "https://www.tiktok.com/@no.9_bubbletea_wolves",
    Icon: TiktokLogo,
  },
];

const deliveryLinks = [
  {
    label: "Just Eat",
    detail: "Browse the menu",
    href: "https://www.just-eat.co.uk/restaurants-no9---bubble-tea-wolverhampton/menu",
    mark: "JE",
  },
  {
    label: "Deliveroo",
    detail: "Order for delivery",
    href: "https://deliveroo.co.uk/menu/birmingham/wolverhampton-city-centre/no9-bubble-tea-50-lichfield-street",
    mark: "DR",
  },
  {
    label: "Uber Eats",
    detail: "Find No.9 nearby",
    href: "https://www.ubereats.com/gb/store/no9_bubble-tea/_bH4rIB6SpOjmcgotXPo1Q",
    mark: "UE",
  },
  {
    label: "Too Good To Go",
    detail: "Rescue a surprise bag",
    href: "https://www.toogoodtogo.com/en-gb/find/wolverhampton/no9bubbletea/other/surprisebag-1311158",
    mark: "TGTG",
  },
];

type CartItem = CartOrderLine & { key: string };

function priceLabel(product: Product) {
  if (product.price == null) return "Ask us";
  if (product.largePrice != null) {
    return (
      "£" +
      product.price.toFixed(2) +
      " M · £" +
      product.largePrice.toFixed(2) +
      " L"
    );
  }
  if (product.icedPrice != null) {
    return (
      "£" +
      product.price.toFixed(2) +
      " hot · £" +
      product.icedPrice.toFixed(2) +
      " iced"
    );
  }
  return "£" + product.price.toFixed(2);
}

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      href="#home"
      className={`brand ${footer ? "brand-footer" : ""}`}
      aria-label="No.9 Bubble Tea home"
    >
      <Image
        className="brand-logo"
        src="/images/no9-logo.jpg"
        alt=""
        width={64}
        height={64}
        aria-hidden="true"
      />
      <span className="brand-copy">
        <span className="brand-name">
          No<span className="brand-dot">.</span>9
          <span className="brand-flower" aria-hidden="true">
            <Flower weight="fill" />
          </span>
        </span>
        <span className="brand-sub">BUBBLE TEA & LITTLE JOYS</span>
      </span>
    </a>
  );
}

function OrderLink({
  children = "Order on WhatsApp",
  className = "button button-red",
  message,
}: {
  children?: React.ReactNode;
  className?: string;
  message?: string;
}) {
  return (
    <a
      className={className}
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsappLogo size={20} weight="regular" aria-hidden="true" />
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}

function BobaDoodle() {
  return (
    <svg
      viewBox="0 0 120 140"
      fill="none"
      aria-hidden="true"
      className="boba-doodle"
    >
      <path
        d="M75 4 59 65"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="m27 42 8 77c2 15 46 15 49 0l10-77"
        fill="var(--cream)"
        stroke="currentColor"
        strokeWidth="3"
      />
      <ellipse
        cx="61"
        cy="42"
        rx="35"
        ry="9"
        fill="var(--cream)"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="m60 42 9-35"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M44 79v5m30-5v5m-24 7q10 12 20 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {[44, 58, 73].map((x) => (
        <circle key={x} cx={x} cy="113" r="4" fill="currentColor" />
      ))}
      <circle cx="51" cy="102" r="4" fill="currentColor" />
      <circle cx="67" cy="102" r="4" fill="currentColor" />
      <path
        d="m26 77-15 8m79-9 17-8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ProductCard({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (product: Product) => void;
}) {
  return (
    <article className="product-card">
      <button
        className={`product-image ${product.colour}`}
        onClick={() => onSelect(product)}
        aria-label={`Choose ${product.name}`}
      >
        <span className="product-tag">{product.tag}</span>
        <span className="product-id">{product.id}</span>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name + " from No.9 Bubble Tea"}
            fill
            sizes="(max-width: 640px) 46vw, (max-width: 1000px) 44vw, 280px"
          />
        ) : (
          <span className="dessert-art">
            <span className="dessert-orbit" />
            <Cake size={96} weight="duotone" />
            <span className="dessert-art-label">
              a little sweet
              <br />
              something.
            </span>
          </span>
        )}
        <span className="product-add">
          <Plus size={21} />
        </span>
      </button>
      <div className="product-info">
        <h3>{product.name}</h3>
        <span className="product-price">{priceLabel(product)}</span>
      </div>
      <p>{product.description}</p>
    </article>
  );
}

function OrderDialog({
  product,
  onClose,
  onAdd,
}: {
  product: Product | null;
  onClose: () => void;
  onAdd: (line: CartOrderLine) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<"Medium" | "Large" | null>(
    product?.largePrice != null ? "Medium" : null,
  );
  const [temperature, setTemperature] = useState<"Iced" | "Hot">(
    product?.icedPrice != null ? "Hot" : "Iced",
  );
  const [sweetness, setSweetness] = useState("Regular");
  const [notes, setNotes] = useState("");
  const isDrink = product
    ? (product.isDrink ?? product.category !== "cafe-treats")
    : false;
  const supportsSweetness = product
    ? ["bubble-tea", "fruit-tea", "slushies"].includes(product.category)
    : false;
  const hasOrderOptions = Boolean(
    product &&
    (product.largePrice != null || product.hotAvailable || supportsSweetness),
  );

  useEffect(() => {
    if (product) {
      const trigger = document.activeElement as HTMLElement | null;
      const element = dialog.current;
      element?.showModal();
      const overflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        element?.close();
        document.body.style.overflow = overflow;
        trigger?.focus({ preventScroll: true });
      };
    }
    dialog.current?.close();
  }, [product]);

  const close = () => {
    dialog.current?.close();
    onClose();
  };

  return (
    <dialog
      ref={dialog}
      className="order-dialog"
      aria-labelledby="order-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      {product && (
        <div className="dialog-inner">
          <button
            className="icon-button dialog-close"
            aria-label="Close order details"
            onClick={close}
          >
            <X size={24} />
          </button>
          <div className={`dialog-image ${product.colour}`}>
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="420px"
              />
            ) : (
              <Cake size={100} weight="duotone" />
            )}
          </div>
          <div className="dialog-copy">
            <p className="eyebrow">YOUR NEXT LITTLE HAPPY · {product.id}</p>
            <h2 id="order-title">{product.name}</h2>
            <p>{product.description}</p>
            <div className="quantity-row">
              <span>How many?</span>
              <div className="quantity-controls">
                <button
                  className="icon-button"
                  aria-label="Decrease quantity"
                  disabled={quantity === 1}
                  onClick={() => setQuantity(quantity - 1)}
                >
                  <Minus size={18} />
                </button>
                <output aria-label="Quantity" aria-live="polite">
                  {quantity}
                </output>
                <button
                  className="icon-button"
                  aria-label="Increase quantity"
                  disabled={quantity === 9}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
            {isDrink && hasOrderOptions && (
              <div className="order-options">
                {product.largePrice != null && (
                  <label htmlFor="order-size">
                    Size
                    <select
                      id="order-size"
                      value={size ?? "Medium"}
                      onChange={(event) =>
                        setSize(event.target.value as "Medium" | "Large")
                      }
                    >
                      <option>Medium</option>
                      <option>Large</option>
                    </select>
                  </label>
                )}
                {product.hotAvailable && (
                  <label htmlFor="order-temperature">
                    Temperature
                    <select
                      id="order-temperature"
                      value={temperature}
                      onChange={(event) =>
                        setTemperature(event.target.value as "Iced" | "Hot")
                      }
                    >
                      <option>Iced</option>
                      <option>Hot</option>
                    </select>
                  </label>
                )}
                {supportsSweetness && (
                  <label htmlFor="order-sweetness">
                    Sweetness
                    <select
                      id="order-sweetness"
                      value={sweetness}
                      onChange={(event) => setSweetness(event.target.value)}
                    >
                      <option>Regular</option>
                      <option>Less sweet</option>
                      <option>No added sugar, if possible</option>
                    </select>
                  </label>
                )}
              </div>
            )}
            {product.price != null && (
              <p className="dialog-selection-price">
                Current selection: £
                {(
                  itemPrice(product, size, temperature) ?? product.price
                ).toFixed(2)}
              </p>
            )}
            <label className="notes-label" htmlFor="order-notes">
              Anything else?
              <textarea
                id="order-notes"
                value={notes}
                maxLength={500}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Ice preferences, questions or collection time…"
                rows={2}
              />
            </label>
            <p className="order-note">
              We’ll confirm today’s price, options and collection time in the
              chat.{" "}
              {product.allergens ||
                "Please tell us about any allergies before ordering."}
            </p>
            <button
              className="button button-red dialog-add-button"
              onClick={() => {
                onAdd({
                  product,
                  quantity,
                  size,
                  temperature,
                  sweetness,
                  notes,
                });
                close();
              }}
            >
              <ShoppingCart size={20} weight="fill" />
              Add to order
              <Plus size={18} weight="bold" />
            </button>
            <span className="dialog-footnote">
              Add more items, then send the whole order on WhatsApp.
            </span>
          </div>
        </div>
      )}
    </dialog>
  );
}

function CartDialog({
  open,
  items,
  onClose,
  onQuantity,
  onRemove,
}: {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onQuantity: (key: string, quantity: number) => void;
  onRemove: (key: string) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const knownTotal = items.reduce(
    (total, item) =>
      total +
      (itemPrice(item.product, item.size, item.temperature) ?? 0) *
        item.quantity,
    0,
  );
  const hasUnpricedItems = items.some(
    (item) => itemPrice(item.product, item.size, item.temperature) == null,
  );

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) {
      const trigger = document.activeElement as HTMLElement | null;
      element.showModal();
      const overflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        element.close();
        document.body.style.overflow = overflow;
        trigger?.focus({ preventScroll: true });
      };
    }
    if (!open && element.open) element.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      className="cart-dialog"
      aria-labelledby="cart-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="cart-shell">
        <header className="cart-head">
          <div>
            <p className="eyebrow">YOUR NO.9 ORDER</p>
            <h2 id="cart-title">Good choices.</h2>
          </div>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close order basket"
          >
            <X size={24} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart-empty">
            <ShoppingCart size={55} weight="duotone" />
            <h3>Your order is waiting for its first favourite.</h3>
            <a href="#menu" className="button button-red" onClick={onClose}>
              Explore the menu <ArrowDown size={18} />
            </a>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => {
                const isDrink =
                  item.product.isDrink ??
                  item.product.category !== "cafe-treats";
                return (
                  <article className="cart-item" key={item.key}>
                    <div className={`cart-thumb ${item.product.colour}`}>
                      {item.product.image ? (
                        <Image
                          src={item.product.image}
                          alt=""
                          fill
                          sizes="86px"
                        />
                      ) : (
                        <Cake size={35} weight="duotone" />
                      )}
                    </div>
                    <div className="cart-item-copy">
                      <span>{item.product.id}</span>
                      <h3>{item.product.name}</h3>
                      {(item.size ||
                        (isDrink && item.product.hotAvailable) ||
                        (isDrink &&
                          ["bubble-tea", "fruit-tea", "slushies"].includes(
                            item.product.category,
                          ))) && (
                        <p>
                          {[
                            item.size,
                            isDrink && item.product.hotAvailable
                              ? item.temperature
                              : null,
                            isDrink &&
                            ["bubble-tea", "fruit-tea", "slushies"].includes(
                              item.product.category,
                            )
                              ? item.sweetness
                              : null,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      )}
                      {item.notes && <p>“{item.notes}”</p>}
                    </div>
                    <div className="cart-item-actions">
                      <strong>
                        {itemPrice(item.product, item.size, item.temperature) !=
                        null
                          ? "£" +
                            (
                              (itemPrice(
                                item.product,
                                item.size,
                                item.temperature,
                              ) ?? 0) * item.quantity
                            ).toFixed(2)
                          : "Ask us"}
                      </strong>
                      <div className="cart-quantity">
                        <button
                          aria-label={`Decrease ${item.product.name} quantity`}
                          disabled={item.quantity === 1}
                          onClick={() =>
                            onQuantity(item.key, item.quantity - 1)
                          }
                        >
                          <Minus size={15} />
                        </button>
                        <output aria-label={`${item.product.name} quantity`}>
                          {item.quantity}
                        </output>
                        <button
                          aria-label={`Increase ${item.product.name} quantity`}
                          disabled={item.quantity === 9}
                          onClick={() =>
                            onQuantity(item.key, item.quantity + 1)
                          }
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                      <button
                        className="cart-remove"
                        onClick={() => onRemove(item.key)}
                        aria-label={`Remove ${item.product.name} from order`}
                      >
                        <Trash size={17} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
            <footer className="cart-foot">
              <div className="cart-total">
                <span>
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
                <strong>
                  {hasUnpricedItems
                    ? knownTotal > 0
                      ? `£${knownTotal.toFixed(2)} + ask us`
                      : "Price confirmed in chat"
                    : `£${knownTotal.toFixed(2)}`}
                </strong>
              </div>
              <p>
                {hasUnpricedItems
                  ? "Some item prices are still placeholders. No.9 will confirm the full total, availability and options in the chat."
                  : "Guide total. No.9 will confirm availability, options and the final price."}
              </p>
              <OrderLink
                className="button button-red cart-whatsapp"
                message={cartMessage(items)}
              >
                Send full order on WhatsApp
              </OrderLink>
              <a href="#menu" className="cart-continue" onClick={onClose}>
                + Add another item
              </a>
            </footer>
          </>
        )}
      </div>
    </dialog>
  );
}

export function LandingPage({
  menuProducts,
  menuCategories,
}: {
  menuProducts: Product[];
  menuCategories: MenuCategory[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<Category>("favourites");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [marqueePaused, setMarqueePaused] = useState(false);
  const [openBox, setOpenBox] = useState<number | null>(null);
  const [activeBox, setActiveBox] = useState(0);
  const categories: { id: Category; label: string }[] = [
    { id: "favourites", label: "The favourites" },
    ...menuCategories.map(({ id, label }) => ({ id, label })),
  ];
  const visibleProducts = filterProducts(category, menuProducts);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (line: CartOrderLine) => {
    const temperature = line.product.hotAvailable ? line.temperature : "Iced";
    const notes = line.notes.trim();
    const key = JSON.stringify([
      line.product.id,
      line.size,
      temperature,
      line.sweetness,
      notes,
    ]);
    setCart((current) => {
      const existing = current.find((item) => item.key === key);
      if (!existing) return [...current, { ...line, temperature, notes, key }];
      return current.map((item) =>
        item.key === key
          ? { ...item, quantity: Math.min(9, item.quantity + line.quantity) }
          : item,
      );
    });
    setCartOpen(true);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-copy > *", {
          y: 22,
          opacity: 0,
          duration: 0.8,
          stagger: 0.11,
          ease: "power3.out",
        });
        gsap.from(".combined-banner", {
          x: 70,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });
        gsap.fromTo(
          ".story-word",
          { opacity: 0.22 },
          {
            opacity: 1,
            stagger: 0.07,
            ease: "none",
            scrollTrigger: {
              trigger: ".story-quote",
              start: "top 80%",
              end: "bottom 52%",
              scrub: 0.6,
            },
          },
        );
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
          gsap.from(element, {
            y: 28,
            opacity: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
          });
        });
      });
      mm.add(
        "(min-width: 1000px) and (prefers-reduced-motion: no-preference)",
        () => {
          const copy = root.current?.querySelector<HTMLElement>(".merch-copy");
          const gallery =
            root.current?.querySelector<HTMLElement>(".surprise-gallery");
          if (!copy || !gallery) return;
          ScrollTrigger.create({
            trigger: copy,
            start: "top 100px",
            end: () =>
              `+=${Math.max(0, gallery.offsetHeight - copy.offsetHeight)}`,
            pin: copy,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [category]);

  return (
    <IconContext.Provider value={{ "aria-hidden": true }}>
      <div ref={root} className="combined-home">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="announcement">
          GOOD SIPS. SWEET TREATS. YOUR NEW FAVOURITE SPOT.
          <span>
            WOLVERHAMPTON, UK <MapPin size={12} aria-hidden="true" />
          </span>
        </div>
        <header className="site-header" id="home">
          <div className="nav-wrap">
            <Brand />
            <nav className="desktop-nav" aria-label="Main navigation">
              <a href="#menu">The menu</a>
              <a href="#little-finds">Little finds</a>
              <a href="#our-story">Our story</a>
              <a href="#visit">
                Find us <ArrowUpRight size={14} />
              </a>
              <a href="#connect">Connect</a>
            </nav>
            <button
              className="button button-red nav-order cart-trigger"
              onClick={() => setCartOpen(true)}
              aria-label={`Open order basket with ${cartCount} items`}
            >
              <ShoppingCart size={19} weight="fill" />
              Your order
              <span className="cart-count" aria-live="polite">
                {cartCount}
              </span>
            </button>
            <button
              className="icon-button mobile-menu-toggle"
              aria-label={mobileMenu ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileMenu}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X size={26} /> : <List size={26} />}
            </button>
          </div>
          {mobileMenu && (
            <nav
              id="mobile-navigation"
              className="mobile-nav"
              aria-label="Mobile navigation"
            >
              {[
                ["The menu", "menu"],
                ["Little finds", "little-finds"],
                ["Our story", "our-story"],
                ["Find us", "visit"],
                ["Connect", "connect"],
              ].map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMobileMenu(false)}
                >
                  {label}
                  <ArrowUpRight size={20} />
                </a>
              ))}
              <button
                className="button button-red mobile-cart-trigger"
                onClick={() => {
                  setMobileMenu(false);
                  setCartOpen(true);
                }}
              >
                <ShoppingCart size={20} weight="fill" />
                Your order <span className="cart-count">{cartCount}</span>
              </button>
            </nav>
          )}
        </header>

        <main id="main" className="main-content">
          <section className="hero combined-hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">
                <span /> A LITTLE CUP OF WOLVERHAMPTON
              </p>
              <h1 id="hero-title">
                Boba made
                <br />
                <span>bright.</span>
              </h1>
              <p className="hero-description">
                Proper bubble tea, café treats and tiny finds for very good
                days. Come find your happy at No.9.
              </p>
              <div className="hero-actions">
                <a href="#menu" className="button button-red">
                  Find your flavour <ArrowDown size={19} />
                </a>
                <a href="#visit" className="text-link">
                  Come say hi <ArrowUpRight size={18} />
                </a>
              </div>
              <div className="hero-small">
                <Heart size={17} /> Big on flavour. Small on ordinary.
              </div>
            </div>
            <div className="hero-art combined-hero-art">
              <span className="combined-hero-orbit" aria-hidden="true" />
              <Image
                className="combined-banner"
                src="/images/no9-banner.png"
                alt="A colourful line-up of No.9 bubble teas with fresh fruit, ice and tapioca pearls"
                width={2172}
                height={724}
                priority
                sizes="(max-width: 760px) 175vw, 1050px"
              />
              <span className="hero-handwriting">your day, made brighter.</span>
            </div>
            <span className="colour-splash splash-heart" aria-hidden="true">
              ♥
            </span>
            <span className="colour-splash splash-nine" aria-hidden="true">
              09
            </span>
            <span className="colour-splash splash-spark" aria-hidden="true">
              ✦
            </span>
          </section>

          <div className={`marquee ${marqueePaused ? "is-paused" : ""}`}>
            <div className="marquee-track" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <span className="marquee-group" key={i}>
                  SIP. SMILE. REPEAT.
                  <Flower weight="fill" /> A LITTLE CUP OF HAPPY.
                  <Flower weight="fill" /> SWEET LITTLE ESCAPES.
                  <Flower weight="fill" />
                </span>
              ))}
            </div>
            <span className="sr-only">
              Sip. Smile. Repeat. A little cup of happy. Sweet little escapes.
            </span>
            <button
              className="marquee-control"
              aria-label={
                marqueePaused ? "Play moving banner" : "Pause moving banner"
              }
              onClick={() => setMarqueePaused(!marqueePaused)}
            >
              {marqueePaused ? (
                <Play size={15} weight="fill" />
              ) : (
                <Pause size={15} weight="fill" />
              )}
            </button>
          </div>

          <section
            id="menu"
            className="menu-section section-width"
            aria-labelledby="menu-title"
          >
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">A MOOD FOR EVERY SIP</p>
                <h2 id="menu-title">
                  Meet your next
                  <br />
                  “the usual”.
                </h2>
              </div>
              <p>
                Milky, fruity, a little indulgent.
                <br />
                Whatever your mood, we’ve got your cup.
              </p>
              <BobaDoodle />
            </div>
            <div className="menu-toolbar">
              <div
                className="menu-filters"
                role="group"
                aria-label="Filter the menu"
              >
                {categories.map((item) => (
                  <button
                    key={item.id}
                    aria-pressed={category === item.id}
                    className={category === item.id ? "active" : ""}
                    onClick={() => setCategory(item.id)}
                  >
                    {item.id === "favourites" && (
                      <Heart
                        size={15}
                        weight={category === item.id ? "fill" : "regular"}
                      />
                    )}
                    {item.label}
                  </button>
                ))}
              </div>
              <span className="menu-hint">
                Good taste starts here <ArrowDown size={15} />
              </span>
            </div>
            <div
              className={`product-grid grid-flow-dense count-${visibleProducts.length}`}
              key={category}
            >
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                />
              ))}
            </div>
            <span className="sr-only" role="status">
              {visibleProducts.length}{" "}
              {categories
                .find((item) => item.id === category)
                ?.label.toLowerCase()}{" "}
              shown
            </span>
            <div className="menu-foot">
              <p>
                {category === "cafe-treats"
                  ? "Ask us for today’s dessert selection, photos and prices."
                  : "Prices are transcribed from No.9’s supplied menu boards. Confirm today’s prices and availability with us."}
              </p>
              <OrderLink className="text-link">
                Can’t decide? Let’s chat
              </OrderLink>
            </div>
          </section>

          <section
            id="little-finds"
            className="merch-section"
            aria-labelledby="merch-title"
          >
            <div className="merch-inner section-width">
              <div className="merch-copy">
                <p className="eyebrow">A LITTLE EXTRA HAPPY</p>
                <h2 id="merch-title">
                  Tiny things.
                  <br />
                  Big serotonin.
                </h2>
                <p>
                  Came for the boba. Left with a new little obsession. Explore
                  our cute trinkets, collectible blind boxes and just-because
                  gifts.
                </p>
                <a
                  className="text-link"
                  href={whatsappUrl(
                    "Hi No.9! What blind boxes and cute merchandise do you have in the shop at the moment?",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ask what’s in store <ArrowUpRight size={20} />
                </a>
                <div className="merch-handwriting">
                  go on, open a little happy <span>↘</span>
                </div>
              </div>
              <div className="surprise-gallery">
                <div className="surprise-accordion">
                  {surprises.map((surprise, index) => {
                    const Icon = surprise.icon;
                    const isOpen = openBox === index;
                    return (
                      <article
                        key={surprise.title}
                        className={`surprise-panel ${surprise.colour} ${activeBox === index ? "is-active" : ""}`}
                        onMouseEnter={() => setActiveBox(index)}
                        onFocus={() => setActiveBox(index)}
                      >
                        <div className="surprise-top">
                          <span>NO.9 LITTLE FINDS</span>
                          <Icon size={20} />
                        </div>
                        <button
                          className={`surprise-box-button ${isOpen ? "is-open" : ""}`}
                          aria-label={`${isOpen ? "Close" : "Open"} ${surprise.title.toLowerCase()} surprise`}
                          aria-expanded={isOpen}
                          onClick={() => {
                            setActiveBox(index);
                            setOpenBox(isOpen ? null : index);
                          }}
                        >
                          <span
                            className="surprise-confetti"
                            aria-hidden="true"
                          >
                            <i />
                            <i />
                            <i />
                            <i />
                            <i />
                            <i />
                          </span>
                          <span className="box-surprise" aria-hidden="true">
                            <Icon size={64} weight="duotone" />
                          </span>
                          <span className="box-lid" aria-hidden="true">
                            <span>something good inside</span>
                          </span>
                          <span className="box-body" aria-hidden="true">
                            <span className="box-brand">No.9</span>
                            <span className="box-question">
                              {surprise.number}
                            </span>
                            <span className="box-caption">
                              A LITTLE BOX OF HAPPY
                            </span>
                          </span>
                          <span className="box-shadow" />
                        </button>
                        <div className="surprise-bottom">
                          <h3>{surprise.title}</h3>
                          <p aria-live="polite">
                            {isOpen ? surprise.reveal : surprise.subtitle}
                          </p>
                          <button
                            className="surprise-toggle"
                            onClick={() => {
                              setActiveBox(index);
                              setOpenBox(isOpen ? null : index);
                            }}
                          >
                            {isOpen
                              ? "Close the surprise"
                              : "Tap for a little joy"}
                            <span>
                              {isOpen ? (
                                <Minus size={17} />
                              ) : (
                                <Plus size={17} />
                              )}
                            </span>
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
                <p className="merch-note">
                  <Sparkle size={15} /> A taste of the unboxing feeling. Pop in
                  to discover the actual collection.
                </p>
              </div>
            </div>
          </section>

          <section
            id="our-story"
            className="story-section section-width"
            aria-labelledby="story-title"
          >
            <div className="story-intro reveal">
              <span className="eyebrow">NOT JUST A TEA STOP</span>
              <span className="story-location">
                YOUR LITTLE CORNER OF LICHFIELD STREET
              </span>
            </div>
            <h2
              id="story-title"
              className="story-quote"
              aria-label="Some days, all you need is a good drink, your favourite person, and nowhere to rush."
            >
              <span aria-hidden="true">
                {"Some days, all you need is a good"
                  .split(" ")
                  .map((word, i) => (
                    <span className="story-word" key={`a${i}`}>
                      {word}{" "}
                    </span>
                  ))}
                <span className="inline-photo">
                  <Image
                    src="/images/taro-milk-tea.jpg"
                    alt=""
                    fill
                    sizes="130px"
                  />
                </span>
                {" drink, your favourite person, and nowhere to rush."
                  .split(" ")
                  .map((word, i) => (
                    <span className="story-word" key={`b${i}`}>
                      {" "}
                      {word}
                    </span>
                  ))}
              </span>
            </h2>
            <div className="story-bottom">
              <div className="story-signature">
                That’s the No.9 feeling.
                <Heart size={28} />
              </div>
              <div>
                <p>
                  We’re your bubble tea and café spot in the heart of
                  Wolverhampton. A place for traditional bubble tea, a spoonful
                  of tiramisu, and the joy of finding something unexpectedly
                  cute.
                </p>
                <p>
                  Catch up. Take a breather. Make it your little ritual.
                  <br />
                  There’s always room for you here.
                </p>
              </div>
            </div>
            <div className="story-values">
              <span>
                <Coffee size={23} /> GOOD DRINKS
              </span>
              <span>
                <Cookie size={23} /> SWEET MOMENTS
              </span>
              <span>
                <Heart size={23} /> ALL ARE WELCOME
              </span>
            </div>
          </section>

          <section
            id="visit"
            className="visit-section"
            aria-labelledby="visit-title"
          >
            <div className="visit-inner section-width">
              <div className="visit-copy reveal">
                <p className="eyebrow">YOUR NEXT LITTLE DETOUR</p>
                <h2 id="visit-title">
                  See you
                  <br />
                  at No.9.
                </h2>
                <p>
                  Follow the boba cravings.
                  <br />
                  We’ll be right here on Lichfield Street.
                </p>
                <div className="visit-details">
                  <div>
                    <MapPin size={23} />
                    <div>
                      <h3>Find your happy place</h3>
                      <address>
                        50 Lichfield Street
                        <br />
                        Wolverhampton, WV1 1DG
                        <br />
                        United Kingdom
                      </address>
                    </div>
                  </div>
                  <div>
                    <Clock size={23} />
                    <div>
                      <h3>Opening hours</h3>
                      {shop.openingHours ? (
                        <dl className="opening-hours">
                          {shop.openingHours.map((row) => (
                            <div key={row.days}>
                              <dt>{row.days}</dt>
                              <dd>{row.hours}</dd>
                            </div>
                          ))}
                        </dl>
                      ) : (
                        <p>
                          Planning a visit?{" "}
                          <a
                            href={whatsappUrl(
                              "Hi No.9! What are your current opening hours? I'd love to pop in.",
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Check today’s hours with us{" "}
                            <ArrowUpRight size={14} />
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <a
                  className="button button-red"
                  href={shop.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Take me there <ArrowUpRight size={19} />
                </a>
              </div>
              <div className="location-card reveal">
                <div
                  className="map-art"
                  role="img"
                  aria-label="Illustrated location card for No.9 on Lichfield Street in Wolverhampton. Use Take me there for accurate directions."
                >
                  <div className="map-block block-one" />
                  <div className="map-block block-two" />
                  <div className="map-block block-three" />
                  <div className="map-block block-four" />
                  <div className="map-park">
                    <span>a little green</span>
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="map-road road-one" />
                  <div className="map-road road-two" />
                  <div className="map-road road-three" />
                  <span className="map-street">LICHFIELD STREET</span>
                  <span className="map-city">WOLVERHAMPTON</span>
                  <span className="map-north">N ↑</span>
                  <div className="map-pin">
                    <span>No.9</span>
                    <Heart size={19} weight="fill" />
                  </div>
                  <span className="map-caption">
                    you’re almost at your happy place.
                  </span>
                </div>
                <div className="location-card-bottom">
                  <span>
                    <span className="location-dot" /> 50 Lichfield Street
                  </span>
                  <a
                    href={shop.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open No.9 Bubble Tea in Google Maps"
                  >
                    <ArrowUpRight size={25} />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section
            id="connect"
            className="connect-section"
            aria-labelledby="connect-title"
          >
            <div className="connect-intro section-width reveal">
              <div>
                <p className="eyebrow">KEEP THE GOOD STUFF COMING</p>
                <h2 id="connect-title">
                  Follow the fun.
                  <br />
                  Order your way.
                </h2>
              </div>
              <p>
                New drinks, tiny finds and shop updates on social. Delivery
                partners when the sofa wins.
              </p>
            </div>
            <div className="connect-panels section-width">
              <div className="connect-panel social-panel">
                <span className="connect-label">FOLLOW NO.9</span>
                <div className="social-link-list">
                  {socialLinks.map(({ label, detail, href, Icon }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={label}
                    >
                      <Icon size={29} weight="fill" />
                      <span>
                        <strong>{label}</strong>
                        <small>{detail}</small>
                      </span>
                      <ArrowUpRight size={21} weight="bold" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="connect-panel delivery-panel">
                <span className="connect-label">DELIVERY &amp; RESCUE</span>
                <div className="delivery-link-list">
                  {deliveryLinks.map(({ label, detail, href, mark }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={label}
                    >
                      <span className="delivery-mark">{mark}</span>
                      <span>
                        <strong>{label}</strong>
                        <small>{detail}</small>
                      </span>
                      <ArrowUpRight size={21} weight="bold" />
                    </a>
                  ))}
                </div>
                <p>
                  Availability, pricing and delivery areas are managed by each
                  platform.
                </p>
              </div>
            </div>
          </section>

          <section className="final-cta" aria-labelledby="cta-title">
            <div className="section-width">
              <Flower weight="fill" className="cta-flower" aria-hidden="true" />
              <p className="eyebrow">YOUR HAPPY IS ONE MESSAGE AWAY</p>
              <h2 id="cta-title">
                Fancy a little
                <br />
                pick-me-up?
              </h2>
              <p>Your usual or something new. Let’s make it a good one.</p>
              <button
                className="button button-cream"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart size={20} weight="fill" />
                View your order
                <span className="cart-count dark">{cartCount}</span>
              </button>
              <span className="cta-note">
                <Check size={15} /> Pick your favourites. Message us. We’ll take
                it from there.
              </span>
              <BobaDoodle />
            </div>
          </section>
        </main>

        {cartCount > 0 && (
          <button
            className="cart-fab"
            onClick={() => setCartOpen(true)}
            aria-label={`Open order basket with ${cartCount} items`}
          >
            <ShoppingCart size={22} weight="fill" />
            <span>{cartCount}</span>
            View order
          </button>
        )}

        <footer className="site-footer section-width">
          <div className="footer-top">
            <Brand footer />
            <p>
              A little cup of happy.
              <br />A whole lot of No.9.
            </p>
            <div className="footer-links">
              <a href="#menu">The menu</a>
              <a href="#little-finds">Little finds</a>
              <a href="#our-story">Our story</a>
              <a href="#visit">Find us</a>
              <a href="#connect">Connect</a>
            </div>
            <a
              className="footer-contact"
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappLogo size={21} />
              {shop.displayPhone}
              <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} No.9 Bubble Tea. Made for the little
              moments.
            </span>
            <span>50 Lichfield St, Wolverhampton WV1 1DG</span>
            <a href="#home">Back to the good stuff ↑</a>
          </div>
        </footer>
        <OrderDialog
          key={selectedProduct?.id ?? "closed"}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAdd={addToCart}
        />
        <CartDialog
          open={cartOpen}
          items={cart}
          onClose={() => setCartOpen(false)}
          onQuantity={(key, quantity) =>
            setCart((current) =>
              current.map((item) =>
                item.key === key ? { ...item, quantity } : item,
              ),
            )
          }
          onRemove={(key) =>
            setCart((current) => current.filter((item) => item.key !== key))
          }
        />
      </div>
    </IconContext.Provider>
  );
}
