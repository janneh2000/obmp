import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAbout, fetchValues, urlFor } from "../lib/sanity";

/**
 * AboutSection — Our Story, Mission & Vision, Core Values.
 * Pulls from Sanity (aboutPage + value docs); falls back to the content below.
 */
const FALLBACK_STORY = {
  title: "Built on the shores of Africa",
  paragraphs: [
    "Ocean-Bay Marine & Petroleum Company (OBMP) was founded with a singular vision: to build an indigenous African petroleum company capable of competing on the world stage while serving the communities at home. Headquartered in Freetown, Sierra Leone 🇸🇱, OBMP has grown from a focused trading house into a fully-integrated petroleum enterprise with plans to serve Africa as a whole.",
    "Over the years, we have forged partnerships with international energy majors, national oil companies, and regional governments to deliver fuel, drive exploration, and build energy security across eight African nations.",
    "Today, OBMP stands as a symbol of African energy ambition — operationally excellent, financially disciplined, and deeply committed to the continent's development.",
  ],
  images: ["/about/story-1.jpg", "/about/story-2.jpg", "/about/story-3.jpg", "/about/story-4.jpg"],
};

const FALLBACK_MISSION =
  "To deliver safe, reliable, and competitively priced petroleum products and services that power Africa's economies — while creating lasting value for our shareholders, employees, and the communities we serve.";
const FALLBACK_VISION =
  "To be the most trusted and capable indigenous petroleum company in Africa — recognized globally for operational excellence, ethical conduct, and our transformative impact on African energy security.";

const FALLBACK_VALUES = [
  { title: "Integrity", text: "We operate with transparency and honesty in every engagement — with clients, partners, and communities." },
  { title: "Excellence", text: "World-class standards in operations, safety, and service delivery across the entire value chain." },
  { title: "Community", text: "We invest in the people and places where we operate, driving sustainable socioeconomic development." },
  { title: "Innovation", text: "Embracing technology and modern practices to deliver smarter, safer energy solutions." },
];

const VALUE_ICONS = [ShieldIcon, AwardIcon, UsersIcon, BulbIcon];

export default function AboutSection() {
  const [story, setStory] = useState(FALLBACK_STORY);
  const [mission, setMission] = useState(FALLBACK_MISSION);
  const [vision, setVision] = useState(FALLBACK_VISION);
  const [values, setValues] = useState(FALLBACK_VALUES);

  useEffect(() => {
    let active = true;
    fetchAbout().then((data) => {
      if (!active || !data) return;
      setStory({
        title: data.storyTitle || FALLBACK_STORY.title,
        paragraphs: data.storyParagraphs?.length ? data.storyParagraphs : FALLBACK_STORY.paragraphs,
        images: data.storyImages?.length
          ? data.storyImages.map((img) => urlFor(img)?.width(800).height(1000).fit("crop").url() || "")
          : FALLBACK_STORY.images,
      });
      if (data.mission) setMission(data.mission);
      if (data.vision) setVision(data.vision);
    });
    fetchValues().then((data) => {
      if (active && data && data.length) setValues(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const [img0, img1, img2, img3] = story.images;

  return (
    <section id="about" className="relative bg-abyssal pb-24 pt-28 lg:pb-32 lg:pt-36">
      {/* -------- Our Story -------- */}
      <div className="container-kinetic grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow mb-4">Our Story</p>
          <h2 className="font-heading text-fluid-2xl font-bold uppercase leading-[0.95] text-quartz">{story.title}</h2>
          <div className="mt-6 space-y-5 text-fluid-base text-quartz/75">
            {story.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* image grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            {img0 && <ImgCard src={img0} />}
            {img2 && <ImgCard src={img2} />}
          </div>
          <div className="space-y-4 lg:translate-y-10">
            {img1 && <ImgCard src={img1} />}
            {img3 && <ImgCard src={img3} />}
          </div>
        </div>
      </div>

      {/* -------- Mission & Vision -------- */}
      <div className="container-kinetic mt-20 grid gap-6 md:grid-cols-2 lg:mt-28">
        <article className="rounded-sm border border-quartz/10 bg-abyssal-800 p-8 lg:p-10">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold">
            <TargetIcon />
          </span>
          <h3 className="mt-6 font-heading text-fluid-lg font-bold uppercase text-gold">Our Mission</h3>
          <p className="mt-3 text-fluid-base text-quartz/75">{mission}</p>
        </article>
        <article className="rounded-sm border border-quartz/10 bg-abyssal-800 p-8 lg:p-10">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold">
            <CompassIcon />
          </span>
          <h3 className="mt-6 font-heading text-fluid-lg font-bold uppercase text-gold">Our Vision</h3>
          <p className="mt-3 text-fluid-base text-quartz/75">{vision}</p>
        </article>
      </div>

      {/* -------- Core Values -------- */}
      <div className="container-kinetic mt-20 lg:mt-28">
        <div className="text-center">
          <p className="eyebrow mb-4">Core Values</p>
          <h2 className="font-heading text-fluid-2xl font-bold uppercase text-quartz">What drives us</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
            return (
              <article key={v.title} className="rounded-sm border border-quartz/10 bg-abyssal-800/60 p-7 transition-colors duration-300 hover:border-gold/40">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold">
                  <Icon />
                </span>
                <h3 className="mt-5 font-heading text-xl font-bold uppercase text-quartz">{v.title}</h3>
                <p className="mt-2 text-fluid-sm text-quartz/65">{v.text}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link to="/contact" className="btn-gold hover:shadow-[0_0_20px_rgba(212,157,53,0.45)]">
            Partner With Us
          </Link>
        </div>
      </div>
    </section>
  );
}

function ImgCard({ src }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-abyssal-800 ring-1 ring-quartz/10">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${src})` }} />
    </div>
  );
}

/* ---- inline gold line icons ---- */
function svgProps() {
  return {
    width: 22, height: 22, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round",
  };
}
function TargetIcon() {
  return (<svg {...svgProps()}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></svg>);
}
function CompassIcon() {
  return (<svg {...svgProps()}><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></svg>);
}
function ShieldIcon() {
  return (<svg {...svgProps()}><path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>);
}
function AwardIcon() {
  return (<svg {...svgProps()}><circle cx="12" cy="9" r="5" /><path d="m8.5 13-1.5 8 5-3 5 3-1.5-8" /></svg>);
}
function UsersIcon() {
  return (<svg {...svgProps()}><circle cx="9" cy="8" r="3.2" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 5.5a3.2 3.2 0 0 1 0 6M18 20a6.5 6.5 0 0 0-3-5.5" /></svg>);
}
function BulbIcon() {
  return (<svg {...svgProps()}><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 1 4 10.5c-.7.6-1 1.2-1 2.5H9c0-1.3-.3-1.9-1-2.5A6 6 0 0 1 12 3Z" /></svg>);
}
