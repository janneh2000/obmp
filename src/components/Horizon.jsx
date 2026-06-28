import { motion } from "framer-motion";

/**
 * Horizon
 * --------
 * The persistent 1px gold line that anchors the Kinetic Legacy system —
 * a static hairline of gold with a slow traveling glint, like first light
 * breaking on the sea horizon. Drop it under the navbar, footer, or any
 * section edge that needs the signature gold seam.
 */
export default function Horizon({ className = "" }) {
  return (
    <div className={`relative h-px w-full overflow-hidden ${className}`}>
      {/* persistent hairline */}
      <div className="absolute inset-0 bg-horizon-line" />
      {/* traveling glint */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-gold to-transparent"
        initial={{ x: "-110%" }}
        animate={{ x: "440%" }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 1.5,
        }}
      />
    </div>
  );
}
