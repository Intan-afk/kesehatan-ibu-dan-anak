"use client";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glow?: "violet" | "rose" | "sky" | "mint" | "gold" | "none";
  onClick?: () => void;
  padding?: string | number;
  radius?: string | number;
  hover?: boolean;
}

const glowColors: Record<string, string> = {
  violet: "rgba(155,93,229,0.3)",
  rose:   "rgba(255,77,141,0.3)",
  sky:    "rgba(0,180,216,0.3)",
  mint:   "rgba(0,245,212,0.25)",
  gold:   "rgba(255,214,10,0.25)",
  none:   "transparent",
};

export function Card({ children, style, glow = "none", onClick, padding = "24px", radius = 24, hover = true }: CardProps) {
  const [hovered, setHovered] = React.useState(false);
  const glowColor = glowColors[glow] ?? "transparent";

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered && hover ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${hovered && hover ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.1)"}`,
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        borderRadius: radius,
        padding,
        boxShadow: `0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)${hovered && hover && glow !== "none" ? `, 0 0 48px ${glowColor}` : ""}`,
        transition: "all 0.3s ease",
        transform: hovered && hover && onClick ? "translateY(-2px)" : "none",
        cursor: onClick ? "pointer" : "default",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Inner shimmer line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
        pointerEvents: "none",
      }} />
      {children}
    </div>
  );
}

export default Card;