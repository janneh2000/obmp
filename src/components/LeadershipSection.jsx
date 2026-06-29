import { useEffect, useState } from "react";
import { fetchTeam, urlFor } from "../lib/sanity";

/**
 * LeadershipSection — Executive Leadership.
 * Pulls from Sanity (type "teamMember"); falls back to FALLBACK_LEADERS.
 * A photo is shown when present, otherwise an initials monogram.
 */
const FALLBACK_LEADERS = [{ name: "Mohamed Janneh", role: "Chief Executive Officer", photo: "/team/ceo.jpg" }];

function initials(name) {
  return (name || "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

export default function LeadershipSection() {
  const [leaders, setLeaders] = useState(FALLBACK_LEADERS);

  useEffect(() => {
    let active = true;
    fetchTeam().then((data) => {
      if (!active || !data || !data.length) return;
      setLeaders(
        data.map((m) => ({
          name: m.name,
          role: m.role,
          photo: m.photo ? urlFor(m.photo)?.width(600).height(800).fit("crop").url() || "" : "",
        }))
      );
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative bg-abyssal-deep pb-24 pt-20 lg:pb-32 lg:pt-24">
      <div className="container-kinetic">
        <div className="text-center">
          <p className="eyebrow mb-4">Leadership</p>
          <h2 className="font-heading text-fluid-2xl font-bold uppercase text-quartz">Executive Leadership</h2>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-10">
          {leaders.map((leader) => (
            <article key={leader.name} className="w-72 text-center">
              <div className="relative mx-auto aspect-[3/4] w-full overflow-hidden rounded-sm bg-abyssal-800 ring-1 ring-quartz/10">
                <span className="absolute inset-0 flex items-center justify-center font-barlow text-7xl font-extrabold text-gold/20">
                  {initials(leader.name)}
                </span>
                {leader.photo && (
                  <div className="absolute inset-0 bg-cover bg-top" style={{ backgroundImage: `url(${leader.photo})` }} />
                )}
                <span className="absolute inset-x-0 bottom-0 h-1 bg-gold" />
              </div>
              <h3 className="mt-5 font-barlow text-2xl font-bold uppercase text-quartz">{leader.name}</h3>
              <p className="mt-1 text-quartz/60">{leader.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
