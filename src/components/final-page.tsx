"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Cake,
  Check,
  Gift,
  Heart,
  IconContext,
  List,
  MapPin,
  Sparkle,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import { shop, whatsappUrl } from "@/lib/shop";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const drinkChoices = [
  {
    id: "taro",
    name: "Taro cloud",
    note: "Creamy, nutty, soft purple",
    price: 6.5,
    position: "taro",
  },
  {
    id: "mango",
    name: "Mango glow",
    note: "Bright, tropical, sunshine sweet",
    price: 6.5,
    position: "mango",
  },
  {
    id: "brown-sugar",
    name: "Brown sugar boba",
    note: "Rich caramel and chewy pearls",
    price: 6.5,
    position: "brown",
  },
  {
    id: "matcha",
    name: "Matcha cream",
    note: "Green tea, creamy finish",
    price: 6.5,
    position: "matcha",
  },
  {
    id: "strawberry",
    name: "Strawberry pop",
    note: "Berry bright and joyfully pink",
    price: 6.5,
    position: "strawberry",
  },
] as const;

const finds = [
  {
    name: "Blind boxes",
    detail: "A mystery until the moment it opens.",
    colour: "sun",
    mark: "?",
    Icon: Gift,
  },
  {
    name: "Tiny trinkets",
    detail: "Little companions for bags, keys and desks.",
    colour: "sky",
    mark: "+",
    Icon: Sparkle,
  },
  {
    name: "Just-because gifts",
    detail: "For your favourite person, including you.",
    colour: "pink",
    mark: "9",
    Icon: Heart,
  },
];

function FinalLogo({ small = false }: { small?: boolean }) {
  return (
    <a
      href="#final-home"
      className={`final-logo ${small ? "small" : ""}`}
      aria-label="No.9 Bubble Tea home"
    >
      <Image
        src="/images/no9-logo.jpg"
        width={90}
        height={90}
        alt="No.9 Bubble Tea, established 2023"
        priority={!small}
      />
    </a>
  );
}

function WhatsAppButton({
  children = "Order on WhatsApp",
  message,
  light = false,
}: {
  children?: React.ReactNode;
  message?: string;
  light?: boolean;
}) {
  return (
    <a
      className={`final-button ${light ? "light" : ""}`}
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsappLogo size={21} weight="fill" />
      {children}
      <ArrowUpRight size={18} weight="bold" />
    </a>
  );
}

function DrinkCutout({ position, label }: { position: string; label: string }) {
  return (
    <div
      className={`drink-cutout cut-${position}`}
      role="img"
      aria-label={label}
    >
      <Image
        src="/images/no9-banner.png"
        alt=""
        width={2172}
        height={724}
        aria-hidden="true"
      />
    </div>
  );
}

export function FinalPage() {
  const root = useRef<HTMLDivElement>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [menuMode, setMenuMode] = useState<"drinks" | "treats">("drinks");
  const [activeDrink, setActiveDrink] = useState(2);
  const [activeFind, setActiveFind] = useState(0);
  const drink = drinkChoices[activeDrink];
  const ActiveFindIcon = finds[activeFind].Icon;
  const drinkMessage = `Hi No.9! I'd like to order 1 x ${drink.name}. Could you confirm availability, options, price and collection time? Thank you!`;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".final-hero-copy > *", {
          y: 25,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
        });
        gsap.from(".final-banner", {
          x: 90,
          opacity: 0,
          scale: 0.94,
          duration: 1.15,
          ease: "power3.out",
        });
        gsap.utils.toArray<HTMLElement>(".final-reveal").forEach((element) => {
          gsap.from(element, {
            y: 38,
            opacity: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 90%", once: true },
          });
        });
        gsap.fromTo(
          ".story-token",
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.07,
            ease: "none",
            scrollTrigger: {
              trigger: ".final-story-title",
              start: "top 82%",
              end: "bottom 52%",
              scrub: 0.6,
            },
          },
        );
      });
      mm.add(
        "(min-width: 960px) and (prefers-reduced-motion: no-preference)",
        () => {
          ScrollTrigger.create({
            trigger: ".final-menu",
            start: "top top",
            end: "bottom bottom",
            pin: ".final-menu-intro",
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
      <div className="final-site" ref={root}>
        <a href="#final-main" className="final-skip">
          Skip to content
        </a>
        <header className="final-header" id="final-home">
          <FinalLogo />
          <nav className="final-nav" aria-label="Main navigation">
            <a href="#final-menu">Menu</a>
            <a href="#final-finds">Little finds</a>
            <a href="#final-story">Our story</a>
            <a href="#final-visit">Visit</a>
          </nav>
          <WhatsAppButton>Start an order</WhatsAppButton>
          <button
            className="final-menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label={mobileMenu ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenu}
          >
            {mobileMenu ? (
              <X size={26} weight="bold" />
            ) : (
              <List size={26} weight="bold" />
            )}
          </button>
          {mobileMenu && (
            <nav className="final-mobile-nav" aria-label="Mobile navigation">
              {[
                ["Menu", "final-menu"],
                ["Little finds", "final-finds"],
                ["Our story", "final-story"],
                ["Visit", "final-visit"],
              ].map(([name, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMobileMenu(false)}
                >
                  {name}
                  <ArrowRight size={18} weight="bold" />
                </a>
              ))}
              <WhatsAppButton />
            </nav>
          )}
        </header>

        <main id="final-main">
          <section className="final-hero" aria-labelledby="final-hero-title">
            <div className="final-hero-copy">
              <p className="final-kicker">
                <span />
                50 LICHFIELD STREET · WOLVERHAMPTON
              </p>
              <h1 id="final-hero-title">
                Boba made
                <br />
                <em>bright.</em>
              </h1>
              <p className="final-lede">
                Proper bubble tea, cafe treats and tiny finds for very good
                days.
              </p>
              <div className="final-hero-actions">
                <WhatsAppButton />
                <a href="#final-menu" className="final-text-link">
                  Pick your flavour <ArrowDown size={18} weight="bold" />
                </a>
              </div>
              <span className="final-hero-note">
                <Check size={16} weight="bold" />
                Open a pre-filled chat. Send when you’re ready.
              </span>
            </div>
            <div className="final-banner-wrap">
              <Image
                className="final-banner"
                src="/images/no9-banner.png"
                alt="A colourful line-up of six No.9 bubble teas with fruit, ice and tapioca pearls"
                width={2172}
                height={724}
                priority
                sizes="(max-width: 740px) 155vw, 100vw"
              />
            </div>
            <span className="final-sun" aria-hidden="true" />
            <span className="final-crown" aria-hidden="true">
              ♕
            </span>
          </section>

          <div
            className="final-ribbon"
            aria-label="Sip bright. Stay curious. Find your flavour."
          >
            <div>
              {[0, 1, 2, 3].map((index) => (
                <span key={index}>
                  SIP BRIGHT <i /> STAY CURIOUS <i /> FIND YOUR FLAVOUR <i />
                </span>
              ))}
            </div>
          </div>

          <section
            className="final-menu"
            id="final-menu"
            aria-labelledby="final-menu-title"
          >
            <div className="final-menu-intro final-reveal">
              <p className="final-kicker">CHOOSE YOUR HAPPY</p>
              <h2 id="final-menu-title">
                What are
                <br />
                we feeling?
              </h2>
              <p>
                One mood at a time. Tap through the line-up, then send your
                favourite straight to WhatsApp.
              </p>
              <div
                className="final-mode-switch"
                role="group"
                aria-label="Choose menu category"
              >
                <button
                  className={menuMode === "drinks" ? "active" : ""}
                  aria-pressed={menuMode === "drinks"}
                  onClick={() => setMenuMode("drinks")}
                >
                  Bubble teas
                </button>
                <button
                  className={menuMode === "treats" ? "active" : ""}
                  aria-pressed={menuMode === "treats"}
                  onClick={() => setMenuMode("treats")}
                >
                  Cafe treats
                </button>
              </div>
            </div>
            <div className="final-menu-stage">
              {menuMode === "drinks" ? (
                <>
                  <div
                    className={`final-drink-stage stage-${drink.position}`}
                    key={drink.id}
                  >
                    <span className="stage-number">0{activeDrink + 1}</span>
                    <span className="stage-word">
                      {drink.name.split(" ")[0]}
                    </span>
                    <DrinkCutout
                      position={drink.position}
                      label={`${drink.name}, a transparent-background No.9 bubble tea`}
                    />
                    <div className="stage-copy">
                      <h3>{drink.name}</h3>
                      <p>{drink.note}</p>
                      <strong>£{drink.price.toFixed(2)}</strong>
                    </div>
                  </div>
                  <div
                    className="final-drink-list"
                    role="group"
                    aria-label="Choose a bubble tea"
                  >
                    {drinkChoices.map((choice, index) => (
                      <button
                        key={choice.id}
                        className={activeDrink === index ? "active" : ""}
                        aria-pressed={activeDrink === index}
                        onClick={() => setActiveDrink(index)}
                      >
                        <span>0{index + 1}</span>
                        <span>
                          {choice.name}
                          <small>{choice.note}</small>
                        </span>
                        <ArrowRight size={21} weight="bold" />
                      </button>
                    ))}
                  </div>
                  <WhatsAppButton message={drinkMessage}>
                    Order {drink.name}
                  </WhatsAppButton>
                </>
              ) : (
                <div className="final-treats">
                  <div className="treat-art">
                    <Cake size={150} weight="duotone" />
                    <span>something sweet</span>
                  </div>
                  <div>
                    <p className="final-kicker">TODAY’S LITTLE REWARD</p>
                    <h3>
                      Tiramisu or
                      <br />
                      chocolate lava cake?
                    </h3>
                    <p>
                      Ask what’s on the counter today, then save room for one
                      more spoon.
                    </p>
                    <WhatsAppButton message="Hi No.9! What cafe treats do you have today, and how much are they?">
                      Ask about today’s treats
                    </WhatsAppButton>
                  </div>
                </div>
              )}
              <p className="final-price-note">
                £6.50 drink prices are delivery-menu guides. We’ll confirm
                today’s price and options in the chat.
              </p>
            </div>
          </section>

          <section
            className="final-finds"
            id="final-finds"
            aria-labelledby="final-finds-title"
          >
            <div className="final-finds-head final-reveal">
              <p className="final-kicker">THE OTHER REASON TO POP IN</p>
              <h2 id="final-finds-title">
                Tiny shelf.
                <br />
                Major joy.
              </h2>
              <p>
                Collectible blind boxes, cheerful little trinkets and gifts for
                no particular reason.
              </p>
            </div>
            <div className="finds-stage">
              <div
                className="finds-tabs"
                role="group"
                aria-label="Explore merchandise categories"
              >
                {finds.map((find, index) => (
                  <button
                    key={find.name}
                    onClick={() => setActiveFind(index)}
                    aria-pressed={activeFind === index}
                    className={activeFind === index ? "active" : ""}
                  >
                    <span>{index + 1}</span>
                    {find.name}
                  </button>
                ))}
              </div>
              <div
                className={`find-reveal ${finds[activeFind].colour}`}
                aria-live="polite"
              >
                <span className="find-orbit" />
                <span className="find-spark one">✦</span>
                <span className="find-spark two">✦</span>
                <div className="find-box">
                  <span className="find-lid">NO.9 LITTLE FINDS</span>
                  <ActiveFindIcon size={30} weight="fill" />
                  <strong>{finds[activeFind].mark}</strong>
                  <small>{finds[activeFind].name}</small>
                </div>
                <div className="find-copy">
                  <span>0{activeFind + 1}</span>
                  <h3>{finds[activeFind].name}</h3>
                  <p>{finds[activeFind].detail}</p>
                  <WhatsAppButton message="Hi No.9! What blind boxes, trinkets and little gifts are in store right now?">
                    See what’s in store
                  </WhatsAppButton>
                </div>
              </div>
              <p className="finds-note">
                An illustrative preview of the unboxing feeling. Message or
                visit for current stock.
              </p>
            </div>
          </section>

          <section
            className="final-story"
            id="final-story"
            aria-labelledby="final-story-title"
          >
            <div className="final-story-top">
              <FinalLogo small />
              <span>EST. 2023 · WOLVERHAMPTON</span>
            </div>
            <h2 className="final-story-title" id="final-story-title">
              {"A good drink can turn the whole day around."
                .split(" ")
                .map((word, index) => (
                  <span className="story-token" key={index}>
                    {word}{" "}
                  </span>
                ))}
            </h2>
            <div className="final-story-bottom">
              <strong>That’s the No.9 feeling.</strong>
              <div>
                <p>
                  We’re a welcoming little stop in the heart of Wolverhampton
                  for traditional bubble tea, cafe-style treats and a shelf full
                  of unexpected joy.
                </p>
                <p>
                  Come with friends. Come for five minutes. Stay for the whole
                  catch-up.
                </p>
              </div>
            </div>
          </section>

          <section
            className="final-visit"
            id="final-visit"
            aria-labelledby="final-visit-title"
          >
            <div className="final-address-panel">
              <p className="final-kicker">COME FIND YOUR NEW USUAL</p>
              <h2 id="final-visit-title">
                Meet us
                <br />
                at No.9.
              </h2>
              <address>
                50 Lichfield Street
                <br />
                Wolverhampton, WV1 1DG
                <br />
                United Kingdom
              </address>
              <a
                href={shop.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="final-map-link"
              >
                <MapPin size={20} weight="fill" />
                Get directions <ArrowUpRight size={18} weight="bold" />
              </a>
              <p className="hours-note">
                Planning a visit?{" "}
                <a
                  href={whatsappUrl(
                    "Hi No.9! What are your current opening hours? I'd love to visit.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check today’s hours with us.
                </a>
              </p>
            </div>
            <div
              className="final-map-art"
              role="img"
              aria-label="Decorative map showing No.9 on Lichfield Street. Use Get directions for accurate navigation."
            >
              <span className="map-grid" />
              <i className="street main" />
              <i className="street cross" />
              <i className="street small" />
              <span className="street-name">LICHFIELD STREET</span>
              <span className="map-nine">9</span>
              <b>
                YOU’RE
                <br />
                ALMOST THERE
              </b>
            </div>
          </section>

          <section className="final-cta" aria-labelledby="final-cta-title">
            <div>
              <p className="final-kicker">ONE MESSAGE. ONE VERY GOOD IDEA.</p>
              <h2 id="final-cta-title">
                Your next
                <br />
                sip starts here.
              </h2>
              <p>Pick a favourite. Open WhatsApp. We’ll take it from there.</p>
              <WhatsAppButton light />
              <span>{shop.displayPhone}</span>
            </div>
            <Image
              src="/images/no9-banner.png"
              alt="No.9 bubble tea line-up"
              width={2172}
              height={724}
              sizes="55vw"
            />
          </section>
        </main>

        <footer className="final-footer">
          <FinalLogo small />
          <p>A little brighter with boba.</p>
          <div>
            <a href="#final-menu">Menu</a>
            <a href="#final-finds">Little finds</a>
            <a href="#final-visit">Visit</a>
            <Link href="/">Concept one</Link>
            <Link href="/club">Concept two</Link>
          </div>
          <span>© {new Date().getFullYear()} No.9 Bubble Tea</span>
        </footer>
      </div>
    </IconContext.Provider>
  );
}
