"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Cake,
  ChatCircleDots,
  Check,
  Gift,
  Heart,
  IconContext,
  List,
  MapPin,
  Plus,
  Sparkle,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import {
  type Product,
  orderMessage,
  products,
  shop,
  whatsappUrl,
} from "@/lib/shop";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ClubCategory = "all" | "milk" | "fruit" | "treats";

const clubFilters: { id: ClubCategory; label: string; mark: string }[] = [
  { id: "all", label: "All moods", mark: "✦" },
  { id: "milk", label: "Milk tea", mark: "◒" },
  { id: "fruit", label: "Fruit tea", mark: "●" },
  { id: "treats", label: "Cafe treats", mark: "◆" },
];

const featureProducts = [
  products.find((product) => product.id === "brown-sugar")!,
  products.find((product) => product.id === "taro")!,
  products.find((product) => product.id === "mango")!,
  products.find((product) => product.id === "strawberry")!,
  products.find((product) => product.id === "peach-lychee")!,
  products.find((product) => product.id === "tiramisu")!,
  products.find((product) => product.id === "lava-cake")!,
];

const menuNames: Record<string, { name: string; note: string }> = {
  "brown-sugar": {
    name: "Brown sugar legend",
    note: "Rich. Caramelly. Unapologetic.",
  },
  taro: { name: "Taro daydream", note: "Creamy, nutty, purple perfection." },
  mango: { name: "Mango Monday", note: "Tropical energy, every day." },
  strawberry: {
    name: "Strawberry crush",
    note: "Bright, berry, brilliantly pink.",
  },
  "peach-lychee": {
    name: "Peach & lychee bliss",
    note: "Light, floral, properly refreshing.",
  },
  tiramisu: { name: "Tiramisu pause", note: "Coffee break, by the spoonful." },
  "lava-cake": {
    name: "Chocolate centre",
    note: "Warm, rich, worth the wait.",
  },
};

function ClubLogo({ compact = false }: { compact?: boolean }) {
  return (
    <a
      className={`club-logo ${compact ? "compact" : ""}`}
      href="#club-home"
      aria-label="No.9 Bubble Tea Social Club home"
    >
      <Image
        src="/images/no9-logo.jpg"
        alt="No.9 Bubble Tea, established 2023"
        width={96}
        height={96}
        priority={!compact}
      />
    </a>
  );
}

function ClubOrder({
  message,
  children = "Order on WhatsApp",
  cream = false,
}: {
  message?: string;
  children?: React.ReactNode;
  cream?: boolean;
}) {
  return (
    <a
      className={`club-button ${cream ? "club-button-cream" : ""}`}
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsappLogo size={22} weight="bold" />
      {children}
      <ArrowUpRight size={18} weight="bold" />
    </a>
  );
}

function DirectProductOrder({
  product,
  label = "Add to order",
}: {
  product: Product;
  label?: string;
}) {
  const message = orderMessage(product, 1, "Iced", "Regular", "");
  return (
    <a
      className="club-product-order"
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Order ${product.name} on WhatsApp`}
    >
      <WhatsappLogo size={17} weight="bold" />
      {label}
      <Plus size={15} weight="bold" />
    </a>
  );
}

function MenuTile({ product, index }: { product: Product; index: number }) {
  const wording = menuNames[product.id];
  return (
    <article
      className={`club-menu-tile club-tile-${index % 5} ${product.image ? "has-photo" : "no-photo"}`}
    >
      <div className="club-tile-copy">
        <h3>{wording.name}</h3>
        <p>{wording.note}</p>
        <span className="club-tile-price">
          {product.price ? `£${product.price.toFixed(2)}` : "Ask us"}
        </span>
        <DirectProductOrder product={product} />
      </div>
      <div className="club-tile-photo">
        {product.image ? (
          <Image
            src={product.image}
            alt={`${product.name} by No.9 Bubble Tea`}
            fill
            sizes="(max-width: 720px) 88vw, 34vw"
          />
        ) : (
          <Cake size={104} weight="duotone" />
        )}
      </div>
    </article>
  );
}

const boxes = [
  {
    name: "Blind boxes",
    colour: "yellow",
    mark: "?",
    Icon: Gift,
    reveal: "A sealed little mystery, ready to make your day.",
  },
  {
    name: "Cute trinkets",
    colour: "lilac",
    mark: "!",
    Icon: Sparkle,
    reveal: "Pocket-sized joy for keys, bags and desks.",
  },
  {
    name: "Little gifts",
    colour: "coral",
    mark: "9",
    Icon: Heart,
    reveal: "A thoughtful extra for your favourite person.",
  },
];

export function ClubPage() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<ClubCategory>("all");
  const [openBox, setOpenBox] = useState(0);
  const ActiveBoxIcon = boxes[openBox].Icon;

  const visibleProducts = featureProducts.filter((product) => {
    if (filter === "all") return true;
    if (filter === "milk") return product.category === "bubble-tea";
    if (filter === "fruit") return product.category === "fruit-tea";
    return product.category === "cafe-treats";
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".club-hero-word", {
          yPercent: 105,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
        });
        gsap.from(".club-hero-photo", {
          y: 60,
          opacity: 0,
          rotate: 4,
          duration: 1,
          stagger: 0.14,
          ease: "power3.out",
        });
        gsap.utils.toArray<HTMLElement>(".club-reveal").forEach((element) => {
          gsap.from(element, {
            y: 35,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 90%", once: true },
          });
        });
        gsap.fromTo(
          ".club-story-line",
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: ".club-story-title",
              start: "top 78%",
              end: "bottom 45%",
              scrub: 0.7,
            },
          },
        );
        gsap.utils
          .toArray<HTMLElement>(".club-collage-frame")
          .forEach((element, index) => {
            gsap.fromTo(
              element,
              { scale: 0.84, y: 60 },
              {
                scale: 1,
                y: index % 2 ? -15 : 15,
                ease: "none",
                scrollTrigger: {
                  trigger: ".club-story",
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );
          });
      });
      mm.add(
        "(min-width: 940px) and (prefers-reduced-motion: no-preference)",
        () => {
          const copy =
            root.current?.querySelector<HTMLElement>(".club-merch-copy");
          const shelf =
            root.current?.querySelector<HTMLElement>(".club-box-stage");
          if (!copy || !shelf) return;
          ScrollTrigger.create({
            trigger: copy,
            start: "top 100px",
            end: () =>
              `+=${Math.max(40, shelf.offsetHeight - copy.offsetHeight)}`,
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

  return (
    <IconContext.Provider value={{ "aria-hidden": true }}>
      <div className="club" ref={root}>
        <a className="club-skip" href="#club-main">
          Skip to content
        </a>
        <header className="club-header" id="club-home">
          <ClubLogo />
          <nav aria-label="Social Club navigation" className="club-nav">
            <a href="#club-menu">Menu</a>
            <a href="#club-story">Our story</a>
            <a href="#club-merch">Little finds</a>
            <a href="#club-find">Find us</a>
          </nav>
          <ClubOrder>Order now</ClubOrder>
          <button
            className="club-menu-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={28} weight="bold" />
            ) : (
              <List size={28} weight="bold" />
            )}
          </button>
          {menuOpen && (
            <nav
              className="club-mobile-nav"
              aria-label="Mobile Social Club navigation"
            >
              {[
                ["Menu", "club-menu"],
                ["Our story", "club-story"],
                ["Little finds", "club-merch"],
                ["Find us", "club-find"],
              ].map(([label, id]) => (
                <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                  {label}
                  <ArrowRight size={20} />
                </a>
              ))}
              <ClubOrder />
            </nav>
          )}
        </header>

        <main id="club-main">
          <section className="club-hero" aria-labelledby="club-hero-title">
            <div className="club-hero-blue" />
            <div className="club-hero-yellow" />
            <div className="club-hero-copy">
              <p className="club-kicker">
                WOLVERHAMPTON’S BUBBLE TEA SOCIAL CLUB
              </p>
              <h1 id="club-hero-title">
                <span className="club-line">
                  <span className="club-hero-word">Meet me</span>
                </span>{" "}
                <span className="club-line">
                  <span className="club-hero-word">at No.9</span>
                </span>
              </h1>
              <p className="club-hero-lede">
                Bold bubble tea. Cafe treats.
                <br />
                Tiny finds. Good people.
              </p>
              <div className="club-hero-actions">
                <ClubOrder />
                <a href="#club-menu" className="club-ink-link">
                  Explore the menu <ArrowDownRight size={21} weight="bold" />
                </a>
              </div>
              <address>
                <MapPin size={21} weight="fill" />
                50 Lichfield Street, Wolverhampton WV1 1DG
              </address>
            </div>
            <div
              className="club-hero-visual"
              aria-label="Three popular No.9 bubble teas"
            >
              <div className="club-hero-photo photo-taro">
                <Image
                  src="/images/taro-milk-tea.jpg"
                  alt="No.9 taro milk tea"
                  fill
                  priority
                  sizes="260px"
                />
              </div>
              <div className="club-hero-photo photo-brown">
                <Image
                  src="/images/brown-sugar.jpg"
                  alt="No.9 brown sugar milk tea"
                  fill
                  priority
                  sizes="320px"
                />
              </div>
              <div className="club-hero-photo photo-strawberry">
                <Image
                  src="/images/strawberry-fruit-tea.jpg"
                  alt="No.9 strawberry fruit tea"
                  fill
                  priority
                  sizes="250px"
                />
              </div>
              <span className="club-ray ray-one" />
              <span className="club-ray ray-two" />
              <span className="club-squiggle">
                No.9
                <br />
                social club
              </span>
            </div>
          </section>

          <div
            className="club-ticker"
            aria-label="Good days, good people, great bubbles"
          >
            <div>
              {[0, 1, 2, 3].map((i) => (
                <span key={i}>
                  GOOD DAYS <i /> GOOD PEOPLE <i /> GREAT BUBBLES <i />
                </span>
              ))}
            </div>
          </div>

          <section
            className="club-menu-section"
            id="club-menu"
            aria-labelledby="club-menu-title"
          >
            <div className="club-section-head club-reveal">
              <div>
                <span className="club-pink-mark">♡</span>
                <h2 id="club-menu-title">Pick your mood</h2>
                <p>Iconic flavours for whatever kind of day you’re having.</p>
              </div>
              <div
                className="club-filters"
                role="group"
                aria-label="Filter the social club menu"
              >
                {clubFilters.map((item) => (
                  <button
                    key={item.id}
                    className={filter === item.id ? "active" : ""}
                    aria-pressed={filter === item.id}
                    onClick={() => setFilter(item.id)}
                  >
                    <span>{item.mark}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div
              className={`club-menu-grid club-count-${visibleProducts.length}`}
              key={filter}
            >
              {visibleProducts.map((product, index) => (
                <MenuTile key={product.id} product={product} index={index} />
              ))}
            </div>
            <div className="club-menu-note">
              <span>
                <Check size={18} weight="bold" />
                Drink prices are current delivery-menu guides. We’ll confirm in
                your chat.
              </span>
              <a
                href={shop.menuSource}
                target="_blank"
                rel="noopener noreferrer"
              >
                See full delivery menu <ArrowUpRight size={17} />
              </a>
            </div>
          </section>

          <section
            className="club-merch"
            id="club-merch"
            aria-labelledby="club-merch-title"
          >
            <div className="club-merch-copy">
              <p>THE LITTLE FINDS SHELF</p>
              <h2 id="club-merch-title">Pick a little mystery</h2>
              <p className="club-merch-lede">
                Bubble tea in one hand. A new little obsession in the other. Tap
                a box for a preview of the unboxing feeling.
              </p>
              <ClubOrder message="Hi No.9! What blind boxes and cute merchandise do you have in store at the moment?">
                What’s in store?
              </ClubOrder>
            </div>
            <div className="club-box-stage">
              <div className="club-record record-left" />
              <div className="club-record record-right" />
              <div
                className="club-boxes"
                role="group"
                aria-label="Explore little finds"
              >
                {boxes.map(({ name, colour, mark, Icon }, index) => (
                  <button
                    key={name}
                    className={`club-box ${colour} ${openBox === index ? "open" : ""}`}
                    onClick={() => setOpenBox(index)}
                    aria-pressed={openBox === index}
                  >
                    <span className="club-box-top">
                      <span>No.9</span>
                      <Icon size={23} weight="bold" />
                    </span>
                    <span className="club-box-mark">{mark}</span>
                    <span className="club-box-name">{name}</span>
                  </button>
                ))}
              </div>
              <div className="club-open-box" aria-live="polite">
                <span className="open-flap left" />
                <span className="open-flap right" />
                <span className="open-surprise">
                  <ActiveBoxIcon size={68} weight="duotone" />
                </span>
                <div>
                  <span className="open-mark">{boxes[openBox].mark}</span>
                  <p>{boxes[openBox].reveal}</p>
                </div>
              </div>
              <p className="club-merch-disclaimer">
                A playful preview. Visit or message us for the real collection
                and current stock.
              </p>
            </div>
          </section>

          <section
            className="club-story"
            id="club-story"
            aria-labelledby="club-story-title"
          >
            <div className="club-story-copy club-reveal">
              <ClubLogo compact />
              <h2 className="club-story-title" id="club-story-title">
                <span className="club-story-line">Good drinks.</span>
                <span className="club-story-line">Better days.</span>
              </h2>
              <p>
                No.9 is your welcoming Wolverhampton spot for proper bubble tea,
                cafe treats and little joyful finds.
              </p>
              <strong>
                Come as you are.
                <br />
                Stay for a while.
              </strong>
            </div>
            <div className="club-collage">
              <div className="club-collage-frame frame-one">
                <Image
                  src="/images/mango-milk-tea.jpg"
                  alt="Mango milk tea from No.9"
                  fill
                  sizes="360px"
                />
              </div>
              <div className="club-collage-frame frame-two">
                <Image
                  src="/images/brown-sugar.jpg"
                  alt="Brown sugar milk tea from No.9"
                  fill
                  sizes="340px"
                />
              </div>
              <div className="club-collage-frame frame-three">
                <Image
                  src="/images/peach-lychee.jpg"
                  alt="Peach and lychee tea from No.9"
                  fill
                  sizes="300px"
                />
              </div>
              <span className="club-collage-note">
                GOOD PEOPLE.
                <br />
                GREAT BUBBLES.
              </span>
            </div>
          </section>

          <section
            className="club-find"
            id="club-find"
            aria-labelledby="club-find-title"
          >
            <div className="club-location-panel">
              <span className="club-heart-mark">♡</span>
              <h2 id="club-find-title">No.9</h2>
              <address>
                50 Lichfield Street
                <br />
                Wolverhampton
                <br />
                WV1 1DG
              </address>
              <div
                className="club-map"
                role="img"
                aria-label="Decorative street illustration showing No.9 on Lichfield Street. Use the directions button for accurate navigation."
              >
                <i className="map-line a" />
                <i className="map-line b" />
                <i className="map-line c" />
                <i className="map-line d" />
                <span>LICHFIELD ST</span>
                <b>
                  <MapPin size={32} weight="fill" />
                  NO.9
                </b>
              </div>
              <a
                className="club-directions"
                href={shop.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin size={20} weight="fill" />
                Get directions <ArrowUpRight size={17} weight="bold" />
              </a>
            </div>
            <div className="club-cta-panel">
              <span className="club-spark">✦</span>
              <h2>Your next sip starts here.</h2>
              <p>
                Your usual or something new. Your order opens pre-filled and
                ready to check with the team.
              </p>
              <ClubOrder cream />
              <a href={`tel:+${shop.phone}`} className="club-phone">
                {shop.displayPhone}
              </a>
              <span className="club-chat-note">
                <ChatCircleDots size={21} weight="bold" />
                Tap to chat. Send when you’re ready.
              </span>
            </div>
          </section>
        </main>

        <footer className="club-footer">
          <ClubLogo compact />
          <span>GOOD DAYS. GOOD PEOPLE. GREAT BUBBLES.</span>
          <div>
            <a href="#club-menu">Menu</a>
            <a href="#club-story">Story</a>
            <a href="#club-find">Visit</a>
            <Link href="/">View first concept</Link>
          </div>
          <span>© {new Date().getFullYear()} No.9 Bubble Tea</span>
        </footer>
      </div>
    </IconContext.Provider>
  );
}
