import { useEffect, useId, useRef, useState } from "react";
import type { ServiceScene } from "@/lib/service-pages";

interface OctopusSystemIllustrationProps {
  scene: ServiceScene;
  title: string;
  description: string;
  className?: string;
}

const armPaths: Record<ServiceScene, string[]> = {
  mobile: [
    "M270 255 C205 250 184 192 134 174",
    "M279 273 C208 285 172 250 112 258",
    "M298 287 C255 335 202 333 164 372",
    "M326 291 C316 352 286 372 278 418",
    "M354 286 C400 333 449 337 486 372",
    "M371 269 C431 287 474 260 526 263",
    "M368 244 C422 230 451 187 506 174",
    "M345 224 C365 174 398 151 412 111",
  ],
  software: [
    "M269 250 C208 243 186 197 135 183",
    "M276 273 C215 289 176 268 121 286",
    "M300 287 C259 331 207 340 173 379",
    "M329 292 C323 348 290 375 287 418",
    "M355 284 C401 324 440 345 478 385",
    "M373 269 C430 288 474 274 527 287",
    "M371 244 C423 232 458 199 512 188",
    "M346 224 C374 179 399 148 419 112",
  ],
  erp: [
    "M270 248 C211 230 184 193 130 183",
    "M275 271 C214 280 174 260 118 268",
    "M296 287 C254 323 214 343 170 374",
    "M325 293 C318 347 289 377 284 420",
    "M354 288 C397 324 437 350 474 386",
    "M371 271 C426 285 471 272 526 275",
    "M371 246 C423 230 457 201 510 188",
    "M346 224 C371 178 400 151 419 112",
  ],
  automation: [
    "M270 252 C210 247 186 217 130 208",
    "M277 274 C216 286 172 278 118 296",
    "M299 289 C253 329 208 347 163 377",
    "M325 292 C318 348 292 375 286 419",
    "M355 286 C399 326 438 349 482 379",
    "M372 269 C428 287 470 273 526 291",
    "M371 245 C424 233 459 210 515 204",
    "M346 223 C371 182 399 155 420 115",
  ],
  systems: [
    "M270 250 C210 235 182 195 128 174",
    "M276 272 C213 281 171 258 116 265",
    "M298 288 C253 328 207 344 162 379",
    "M326 292 C316 348 286 375 278 418",
    "M354 287 C399 331 444 347 483 385",
    "M371 269 C430 286 475 266 531 273",
    "M370 244 C423 228 458 195 514 177",
    "M346 223 C369 178 400 149 419 108",
  ],
  web: [
    "M270 250 C212 242 184 198 135 184",
    "M277 273 C215 286 176 265 120 281",
    "M299 289 C256 329 211 346 169 379",
    "M327 292 C320 348 292 374 286 418",
    "M355 287 C399 325 441 347 482 382",
    "M373 269 C429 285 473 270 527 281",
    "M371 244 C422 233 458 201 510 184",
    "M346 223 C370 179 399 150 418 112",
  ],
  marketing: [
    "M270 250 C208 238 183 192 130 169",
    "M277 272 C216 286 173 261 116 270",
    "M298 288 C253 326 208 342 161 376",
    "M326 292 C319 347 289 376 281 418",
    "M355 287 C402 327 442 345 487 379",
    "M372 269 C430 287 474 268 530 276",
    "M371 245 C423 230 457 196 514 176",
    "M346 223 C372 178 401 149 420 108",
  ],
  production: [
    "M270 250 C209 240 184 197 131 178",
    "M276 272 C214 285 172 261 117 274",
    "M298 288 C253 328 206 345 161 381",
    "M326 292 C318 348 289 376 281 419",
    "M355 286 C399 326 441 347 485 382",
    "M372 269 C429 287 474 270 530 280",
    "M371 244 C424 230 459 199 515 181",
    "M346 223 C372 178 401 149 421 108",
  ],
  consulting: [
    "M270 250 C210 239 182 193 128 174",
    "M276 272 C214 285 172 262 115 271",
    "M298 288 C252 328 208 344 161 378",
    "M326 292 C318 348 289 376 281 419",
    "M355 286 C400 326 441 348 486 382",
    "M372 269 C429 287 474 270 530 280",
    "M371 244 C424 230 459 198 515 179",
    "M346 223 C371 177 401 149 421 107",
  ],
};

function SceneObjects({ scene }: { scene: ServiceScene }) {
  const common = "fill-white stroke-[#25272b] stroke-[2.4]";
  if (scene === "mobile")
    return (
      <g className="octopus-scene">
        <rect x="88" y="102" width="86" height="142" rx="18" className={common} />
        <rect x="466" y="100" width="88" height="146" rx="20" className={common} />
        <rect x="101" y="124" width="60" height="83" rx="8" fill="#eceef1" />
        <path
          d="M111 151h38M111 166h28M111 181h34"
          stroke="#601ce6"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <rect x="480" y="123" width="60" height="84" rx="9" fill="#eceef1" />
        <circle cx="510" cy="149" r="10" fill="#601ce6" />
        <path d="M491 177h38M491 191h25" stroke="#25272b" strokeWidth="4" strokeLinecap="round" />
        <circle cx="131" cy="224" r="5" fill="#25272b" />
        <path d="M500 112h20" stroke="#25272b" strokeWidth="4" strokeLinecap="round" />
      </g>
    );
  if (scene === "software")
    return (
      <g className="octopus-scene">
        <path d="M88 118h116v104H88zM436 105h118v118H436z" className={common} />
        <path
          d="M112 145h66M112 164h43M112 183h58"
          stroke="#601ce6"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path d="M458 136h34v34h34v31h-68z" fill="#e4e6ea" stroke="#25272b" strokeWidth="2" />
        <path d="M248 93h41v34h32V93h42v80H248z" fill="#601ce6" opacity=".85" />
      </g>
    );
  if (scene === "erp")
    return (
      <g className="octopus-scene">
        {[
          [75, 118, "S"],
          [77, 264, "I"],
          [155, 383, "F"],
          [446, 383, "P"],
          [522, 264, "O"],
          [516, 118, "R"],
        ].map(([x, y, t]) => (
          <g key={String(t)}>
            <rect x={Number(x)} y={Number(y)} width="64" height="54" rx="12" className={common} />
            <text
              x={Number(x) + 32}
              y={Number(y) + 35}
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="#601ce6"
            >
              {t}
            </text>
          </g>
        ))}
        <circle cx="320" cy="236" r="37" fill="#25272b" />
        <circle cx="320" cy="236" r="12" fill="white" />
      </g>
    );
  if (scene === "automation")
    return (
      <g className="octopus-scene">
        <path d="M72 325h496" stroke="#25272b" strokeWidth="10" strokeLinecap="round" />
        <circle cx="151" cy="325" r="16" fill="#d9dce1" stroke="#25272b" strokeWidth="3" />
        <circle cx="487" cy="325" r="16" fill="#d9dce1" stroke="#25272b" strokeWidth="3" />
        <rect x="96" y="255" width="70" height="50" rx="8" className={common} />
        <path d="M108 271h44M108 285h28" stroke="#601ce6" strokeWidth="4" />
        <rect x="471" y="245" width="74" height="60" rx="12" className={common} />
        <path d="m490 275 10 10 25-27" fill="none" stroke="#601ce6" strokeWidth="6" />
        <path
          d="M221 303a33 33 0 1 1 66 0M353 303a33 33 0 1 1 66 0"
          fill="none"
          stroke="#8b8e96"
          strokeWidth="12"
        />
      </g>
    );
  if (scene === "systems")
    return (
      <g className="octopus-scene">
        <path
          d="M105 137 320 233 535 137M105 305l215-72 215 72M177 403l143-170 143 170"
          stroke="#a6a9b0"
          strokeWidth="3"
          strokeDasharray="7 8"
        />
        <circle cx="105" cy="137" r="24" className={common} />
        <circle cx="535" cy="137" r="24" className={common} />
        <circle cx="105" cy="305" r="24" className={common} />
        <circle cx="535" cy="305" r="24" className={common} />
        <circle cx="177" cy="403" r="24" className={common} />
        <circle cx="463" cy="403" r="24" className={common} />
        <circle cx="320" cy="233" r="37" fill="#601ce6" />
        <circle cx="320" cy="233" r="11" fill="white" />
      </g>
    );
  if (scene === "web")
    return (
      <g className="octopus-scene">
        <rect x="82" y="95" width="476" height="250" rx="18" className={common} />
        <path d="M82 135h476" stroke="#25272b" strokeWidth="3" />
        <circle cx="108" cy="115" r="5" fill="#601ce6" />
        <circle cx="126" cy="115" r="5" fill="#b8bbc1" />
        <rect x="112" y="167" width="170" height="126" rx="12" fill="#e5e7eb" />
        <path
          d="M310 177h194M310 201h144M310 245h194M310 269h118"
          stroke="#8c9098"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <rect
          x="430"
          y="293"
          width="72"
          height="122"
          rx="14"
          fill="white"
          stroke="#25272b"
          strokeWidth="3"
        />
        <rect
          x="335"
          y="321"
          width="82"
          height="64"
          rx="9"
          fill="white"
          stroke="#25272b"
          strokeWidth="3"
        />
      </g>
    );
  if (scene === "marketing")
    return (
      <g className="octopus-scene">
        <rect x="89" y="111" width="124" height="99" rx="12" className={common} />
        <path d="M110 183l24-33 19 19 20-29 20 43" fill="none" stroke="#601ce6" strokeWidth="6" />
        <path d="m471 128 54-24v83l-54-24z" fill="#601ce6" />
        <path d="M464 164h-18v-36h18" fill="#d9dce1" stroke="#25272b" strokeWidth="3" />
        <path
          d="M120 327 96 391M96 391l23-13M503 312l31 75M534 387l-24-9"
          stroke="#25272b"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <circle cx="319" cy="112" r="31" fill="#e1e3e7" stroke="#25272b" strokeWidth="3" />
        <path d="M307 119c11-23 21-23 29 0" fill="none" stroke="#601ce6" strokeWidth="6" />
      </g>
    );
  if (scene === "production")
    return (
      <g className="octopus-scene">
        <rect x="78" y="134" width="145" height="97" rx="16" fill="#25272b" />
        <circle cx="151" cy="182" r="32" fill="#dfe2e7" stroke="white" strokeWidth="6" />
        <circle cx="151" cy="182" r="13" fill="#601ce6" />
        <rect x="457" y="111" width="98" height="118" rx="10" className={common} />
        <path d="m469 131 74 78M543 131l-74 78" stroke="#601ce6" strokeWidth="5" />
        <path d="M95 323h122v65H95z" className={common} />
        <path d="m95 323 18-27h122l-18 27z" fill="#25272b" />
        <path d="m118 296 20 27m15-27 20 27m15-27 20 27" stroke="white" strokeWidth="5" />
        <circle cx="497" cy="352" r="42" fill="#e1e3e7" stroke="#25272b" strokeWidth="3" />
        <path d="M497 310v84M455 352h84" stroke="white" strokeWidth="4" />
      </g>
    );
  return (
    <g className="octopus-scene">
      <rect x="92" y="105" width="170" height="120" rx="14" className={common} />
      <path
        d="M118 187c28-41 55-24 74-54 13-21 31-18 44-7"
        fill="none"
        stroke="#601ce6"
        strokeWidth="6"
      />
      <circle cx="506" cy="165" r="57" fill="none" stroke="#25272b" strokeWidth="9" />
      <path d="m547 207 34 34" stroke="#25272b" strokeWidth="12" strokeLinecap="round" />
      <path
        d="M411 317h132M411 343h103M411 369h76"
        stroke="#8c9098"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path d="M102 343h224v70H102z" fill="#e2e4e8" stroke="#25272b" strokeWidth="3" />
      <path d="M127 365h174M127 389h116" stroke="#601ce6" strokeWidth="5" />
    </g>
  );
}

export function OctopusSystemIllustration({
  scene,
  title,
  description,
  className = "",
}: OctopusSystemIllustrationProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 640 480"
      role="img"
      aria-labelledby={`${uid}-title ${uid}-desc`}
      className={`octopus-illustration ${visible ? "is-visible" : ""} ${className}`}
    >
      <title id={`${uid}-title`}>{title}</title>
      <desc id={`${uid}-desc`}>{description}</desc>
      <defs>
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f8f9fa" />
          <stop offset=".52" stopColor="#c9ccd2" />
          <stop offset="1" stopColor="#8e929a" />
        </linearGradient>
        <linearGradient id={`${uid}-arm`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f5f6f8" />
          <stop offset="1" stopColor="#a9adb5" />
        </linearGradient>
        <filter id={`${uid}-shadow`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#15171b" floodOpacity=".18" />
        </filter>
      </defs>
      <SceneObjects scene={scene} />
      <g filter={`url(#${uid}-shadow)`}>
        {armPaths[scene].map((path, index) => (
          <path
            key={path}
            d={path}
            fill="none"
            stroke={`url(#${uid}-arm)`}
            strokeWidth="29"
            strokeLinecap="round"
            className="octopus-arm"
            style={{
              transformOrigin: `${320 + (index - 3.5) * 8}px 260px`,
              animationDelay: `${index * 90}ms`,
            }}
          />
        ))}
        <path
          d="M256 231c0-69 28-121 64-121s64 52 64 121v54c0 30-26 54-58 54h-12c-32 0-58-24-58-54z"
          fill={`url(#${uid}-body)`}
          stroke="#25272b"
          strokeWidth="3"
        />
        <path
          d="M273 186c16-48 71-61 96-10"
          fill="none"
          stroke="white"
          strokeWidth="10"
          strokeLinecap="round"
          opacity=".72"
          className="octopus-shimmer"
        />
        <ellipse cx="299" cy="235" rx="10" ry="14" fill="#25272b" />
        <ellipse cx="343" cy="235" rx="10" ry="14" fill="#25272b" />
        <circle cx="296" cy="231" r="3" fill="white" />
        <circle cx="340" cy="231" r="3" fill="white" />
        <path
          d="M305 276c10 9 22 9 32 0"
          fill="none"
          stroke="#25272b"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
