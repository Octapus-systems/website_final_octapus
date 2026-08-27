import React from "react";
import { cn } from "@/lib/utils";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * 1. BUILD ICON
 * Concept: 2-3 simple 3D geometric blocks being assembled into a clean structure.
 */
export function BuildIcon({ className, ...props }: IconProps) {
  const id = React.useId();
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        {/* Top glow gradient */}
        <linearGradient id={`${id}-top-bright`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e9d5ff" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>

        {/* Medium purple gradient */}
        <linearGradient id={`${id}-purple-mid`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>

        {/* Deep side gradient */}
        <linearGradient id={`${id}-side-dark`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#581c87" />
          <stop offset="100%" stopColor="#2e1065" />
        </linearGradient>

        {/* Graphite dark face */}
        <linearGradient id={`${id}-graphite`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2e2a3b" />
          <stop offset="100%" stopColor="#181524" />
        </linearGradient>

        {/* Ambient shadow */}
        <radialGradient id={`${id}-shadow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ground Shadow */}
      <ellipse cx="32" cy="54" rx="22" ry="5" fill={`url(#${id}-shadow)`} />

      {/* BOTTOM LEFT BLOCK */}
      <g>
        {/* Top Face */}
        <path
          d="M 18 36 L 27 31.5 L 36 36 L 27 40.5 Z"
          fill={`url(#${id}-purple-mid)`}
        />
        {/* Left Face */}
        <path
          d="M 18 36 L 27 40.5 L 27 47 L 18 42.5 Z"
          fill={`url(#${id}-graphite)`}
        />
        {/* Right Face */}
        <path
          d="M 27 40.5 L 36 36 L 36 42.5 L 27 47 Z"
          fill={`url(#${id}-side-dark)`}
        />
      </g>

      {/* BOTTOM RIGHT BLOCK */}
      <g>
        {/* Top Face */}
        <path
          d="M 28 36 L 37 31.5 L 46 36 L 37 40.5 Z"
          fill={`url(#${id}-purple-mid)`}
        />
        {/* Left Face */}
        <path
          d="M 28 36 L 37 40.5 L 37 47 L 28 42.5 Z"
          fill={`url(#${id}-side-dark)`}
        />
        {/* Right Face */}
        <path
          d="M 37 40.5 L 46 36 L 46 42.5 L 37 47 Z"
          fill={`url(#${id}-graphite)`}
        />
      </g>

      {/* TOP HOVERING / ASSEMBLING BLOCK */}
      <g transform="translate(0, -6)">
        {/* Connector Glow Beam */}
        <path
          d="M 32 30 L 32 37"
          stroke="#c084fc"
          strokeWidth="2"
          strokeDasharray="2 2"
          opacity="0.8"
        />

        {/* Top Face - Glowing */}
        <path
          d="M 23 21 L 32 16.5 L 41 21 L 32 25.5 Z"
          fill={`url(#${id}-top-bright)`}
        />
        {/* Left Face - Rich Lavender */}
        <path
          d="M 23 21 L 32 25.5 L 32 32 L 23 27.5 Z"
          fill={`url(#${id}-purple-mid)`}
        />
        {/* Right Face - Deep Purple */}
        <path
          d="M 32 25.5 L 41 21 L 41 27.5 L 32 32 Z"
          fill={`url(#${id}-side-dark)`}
        />

        {/* Top Bevel Highlight */}
        <path
          d="M 23 21 L 32 16.5 L 41 21"
          stroke="#ffffff"
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}

/**
 * 2. OPERATE ICON
 * Concept: Minimal interconnected-system — simple connected nodes, layers, or geometric components working together.
 */
export function OperateIcon({ className, ...props }: IconProps) {
  const id = React.useId();
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id={`${id}-bright`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e9d5ff" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>

        <linearGradient id={`${id}-purple`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>

        <linearGradient id={`${id}-dark`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2e263d" />
          <stop offset="100%" stopColor="#161320" />
        </linearGradient>

        <radialGradient id={`${id}-shadow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="32" cy="53" rx="20" ry="5" fill={`url(#${id}-shadow)`} />

      {/* Connecting 3D Pipe Pathways */}
      <path
        d="M 32 20 L 19 40 M 32 20 L 45 40 M 19 40 L 45 40"
        stroke={`url(#${id}-dark)`}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 32 20 L 19 40 M 32 20 L 45 40 M 19 40 L 45 40"
        stroke={`url(#${id}-purple)`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Central Nexus Glow */}
      <circle cx="32" cy="33" r="3" fill="#e9d5ff" opacity="0.9" />
      <circle cx="32" cy="33" r="6" stroke="#c084fc" strokeWidth="1" opacity="0.5" />

      {/* NODE 1: TOP CENTER */}
      <g transform="translate(32, 18)">
        {/* Base shadow cylinder */}
        <path d="M -9 0 C -9 3 9 3 9 0 L 9 5 C 9 8 -9 8 -9 5 Z" fill={`url(#${id}-dark)`} />
        {/* Top glowing disc */}
        <ellipse cx="0" cy="0" rx="9" ry="4.5" fill={`url(#${id}-bright)`} />
        <ellipse cx="0" cy="0" rx="4" ry="2" fill="#ffffff" opacity="0.7" />
      </g>

      {/* NODE 2: BOTTOM LEFT */}
      <g transform="translate(19, 40)">
        <path d="M -8 0 C -8 3 8 3 8 0 L 8 5 C 8 8 -8 8 -8 5 Z" fill={`url(#${id}-dark)`} />
        <ellipse cx="0" cy="0" rx="8" ry="4" fill={`url(#${id}-purple)`} />
        <ellipse cx="0" cy="0" rx="3.5" ry="1.8" fill="#e9d5ff" />
      </g>

      {/* NODE 3: BOTTOM RIGHT */}
      <g transform="translate(45, 40)">
        <path d="M -8 0 C -8 3 8 3 8 0 L 8 5 C 8 8 -8 8 -8 5 Z" fill={`url(#${id}-dark)`} />
        <ellipse cx="0" cy="0" rx="8" ry="4" fill={`url(#${id}-purple)`} />
        <ellipse cx="0" cy="0" rx="3.5" ry="1.8" fill="#e9d5ff" />
      </g>
    </svg>
  );
}

/**
 * 3. AUTOMATE ICON
 * Concept: Minimal flow/automation — smooth circular loop, connected pathway, or repeating geometric motion.
 */
export function AutomateIcon({ className, ...props }: IconProps) {
  const id = React.useId();
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id={`${id}-loop-front`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f3e8ff" />
          <stop offset="40%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>

        <linearGradient id={`${id}-loop-back`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4c1d95" />
          <stop offset="100%" stopColor="#1e1b2e" />
        </linearGradient>

        <radialGradient id={`${id}-shadow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="32" cy="52" rx="20" ry="5" fill={`url(#${id}-shadow)`} />

      {/* BACK LOOP SEGMENT (Depth) */}
      <path
        d="M 20 32 C 12 24 20 16 32 20 C 44 24 52 32 44 40"
        stroke={`url(#${id}-loop-back)`}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* FRONT LOOP SEGMENT (Vivid Overlapping 3D Flow) */}
      <path
        d="M 44 40 C 36 48 24 44 20 36 C 16 28 28 20 32 22 C 38 25 48 26 44 34"
        stroke={`url(#${id}-loop-front)`}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Inner Glowing Pathway Line */}
      <path
        d="M 18 34 C 14 26 22 18 32 21 C 42 24 48 32 44 38 C 38 46 24 43 20 35"
        stroke="#ffffff"
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.7"
      />

      {/* Gliding Glowing Motion Node */}
      <g transform="translate(42, 26)">
        <circle cx="0" cy="0" r="4" fill="#ffffff" />
        <circle cx="0" cy="0" r="6" stroke="#c084fc" strokeWidth="1.5" opacity="0.8" />
      </g>
    </svg>
  );
}

/**
 * 4. UNDERSTAND ICON
 * Concept: Minimal data/insight — a few clean geometric bars, dots, or layers forming a simple upward/insight pattern.
 */
export function UnderstandIcon({ className, ...props }: IconProps) {
  const id = React.useId();
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id={`${id}-top-high`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f3e8ff" />
          <stop offset="100%" stopColor="#d8b4fe" />
        </linearGradient>
        <linearGradient id={`${id}-top-mid`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id={`${id}-side-purple`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id={`${id}-side-dark`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2e273d" />
          <stop offset="100%" stopColor="#171424" />
        </linearGradient>
        <radialGradient id={`${id}-shadow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="32" cy="53" rx="20" ry="5" fill={`url(#${id}-shadow)`} />

      {/* BAR 1 (Shortest - Left) */}
      <g>
        <path d="M 16 38 L 23 34.5 L 30 38 L 23 41.5 Z" fill={`url(#${id}-top-mid)`} />
        <path d="M 16 38 L 23 41.5 L 23 47 L 16 43.5 Z" fill={`url(#${id}-side-dark)`} />
        <path d="M 23 41.5 L 30 38 L 30 43.5 L 23 47 Z" fill={`url(#${id}-side-purple)`} />
      </g>

      {/* BAR 2 (Medium - Center) */}
      <g>
        <path d="M 25 30 L 32 26.5 L 39 30 L 32 33.5 Z" fill={`url(#${id}-top-high)`} />
        <path d="M 25 30 L 32 33.5 L 32 47 L 25 43.5 Z" fill={`url(#${id}-side-purple)`} />
        <path d="M 32 33.5 L 39 30 L 39 43.5 L 32 47 Z" fill={`url(#${id}-side-dark)`} />
      </g>

      {/* BAR 3 (Tallest - Right) */}
      <g>
        <path d="M 34 21 L 41 17.5 L 48 21 L 41 24.5 Z" fill="#ffffff" />
        <path d="M 34 21 L 41 24.5 L 41 47 L 34 43.5 Z" fill={`url(#${id}-top-mid)`} />
        <path d="M 41 24.5 L 48 21 L 48 43.5 L 41 47 Z" fill={`url(#${id}-side-purple)`} />
      </g>

      {/* Ascending Insight Line / Trend Arc */}
      <path
        d="M 20 32 Q 32 25 44 14"
        stroke="#e9d5ff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />
      <circle cx="44" cy="14" r="3" fill="#ffffff" />
    </svg>
  );
}

/**
 * 5. GROW ICON
 * Concept: Minimal growth — simple ascending geometric form, upward path, or expanding connected structure.
 */
export function GrowIcon({ className, ...props }: IconProps) {
  const id = React.useId();
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-12 h-12", className)}
      {...props}
    >
      <defs>
        <linearGradient id={`${id}-top-bright`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e9d5ff" />
        </linearGradient>
        <linearGradient id={`${id}-purple-mid`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id={`${id}-purple-dark`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6d28d9" />
          <stop offset="100%" stopColor="#3b0764" />
        </linearGradient>
        <linearGradient id={`${id}-graphite`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2c243b" />
          <stop offset="100%" stopColor="#151221" />
        </linearGradient>
        <radialGradient id={`${id}-shadow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="32" cy="53" rx="21" ry="5" fill={`url(#${id}-shadow)`} />

      {/* STEP 1 (BASE / BOTTOM LEFT) */}
      <g>
        <path d="M 15 41 L 23 37 L 31 41 L 23 45 Z" fill={`url(#${id}-graphite)`} />
        <path d="M 15 41 L 23 45 L 23 48 L 15 44 Z" fill={`url(#${id}-graphite)`} opacity="0.8" />
        <path d="M 23 45 L 31 41 L 31 44 L 23 48 Z" fill={`url(#${id}-purple-dark)`} />
      </g>

      {/* STEP 2 (MIDDLE) */}
      <g>
        <path d="M 23 31 L 32 26.5 L 41 31 L 32 35.5 Z" fill={`url(#${id}-purple-mid)`} />
        <path d="M 23 31 L 32 35.5 L 32 40 L 23 35.5 Z" fill={`url(#${id}-purple-dark)`} />
        <path d="M 32 35.5 L 41 31 L 41 35.5 L 32 40 Z" fill={`url(#${id}-graphite)`} />
      </g>

      {/* STEP 3 (TOP ASCENDING CHEVRON / HIGHLIGHT) */}
      <g>
        {/* Top Facet */}
        <path d="M 31 20 L 41 14.5 L 51 20 L 41 25.5 Z" fill={`url(#${id}-top-bright)`} />
        {/* Left Side */}
        <path d="M 31 20 L 41 25.5 L 41 30.5 L 31 25 Z" fill={`url(#${id}-purple-mid)`} />
        {/* Right Side */}
        <path d="M 41 25.5 L 51 20 L 51 25 L 41 30.5 Z" fill={`url(#${id}-purple-dark)`} />

        {/* Upward Energy Arrow Vector */}
        <path
          d="M 41 18 L 41 10 M 41 10 L 37 14 M 41 10 L 45 14"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export const CapabilityIcons = {
  Build: BuildIcon,
  Operate: OperateIcon,
  Automate: AutomateIcon,
  Understand: UnderstandIcon,
  Grow: GrowIcon,
} as const;
