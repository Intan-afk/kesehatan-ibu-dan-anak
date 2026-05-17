"use client";
import React from "react";

type Variant = "primary" | "ghost" | "danger" | "glow";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<Variant, React.CSSProperties & { "--hover-bg"?: string }> = {
  primary: {
    background: "linear-gradient(135deg, #9b5de5 0%, #ff4d8d 100%)",
    color: "#fff",
    border: "none",
    boxShadow: "0 4px 24px rgba(155,93,229,0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
  },
  ghost: {
    background: "rgba(255,255,255,0.06)",
    color: "rgba(248,240,255,0.9)",
    border: "1px solid rgba(255,255,255,0.14)",
    backdropFilter: "blur(12px)",
  },
  danger: {
    background: "linear-gradient(135deg, #ff4d8d 0%, #ff006e 100%)",
    color: "#fff",
    border: "none",
    boxShadow: "0 4px 20px rgba(255,77,141,0.4)",
  },
  glow: {
    background: "transparent",
    color: "#00f5d4",
    border: "1px solid rgba(0,245,212,0.4)",
    boxShadow: "0 0 20px rgba(0,245,212,0.2), inset 0 0 20px rgba(0,245,212,0.05)",
  },
};

const sizeStyles: Record<Size, React.CSSProperties> = {
  sm: { padding: "8px 18px",  fontSize: 12, borderRadius: 10 },
  md: { padding: "12px 26px", fontSize: 14, borderRadius: 14 },
  lg: { padding: "16px 36px", fontSize: 16, borderRadius: 18 },
};

export function Button({ variant = "primary", size = "md", loading, icon, children, style, ...props }: ButtonProps) {
  const [pressed, setPressed] = React.useState(false);

  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        letterSpacing: "0.02em",
        cursor: props.disabled || loading ? "not-allowed" : "pointer",
        transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        transform: pressed ? "scale(0.96)" : "scale(1)",
        opacity: props.disabled ? 0.45 : 1,
        outline: "none",
        userSelect: "none",
        whiteSpace: "nowrap",
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...style,
      }}
    >
      {loading ? (
        <span style={{
          width: 14, height: 14,
          border: "2px solid rgba(255,255,255,0.3)",
          borderTopColor: "white",
          borderRadius: "50%",
          animation: "spin-slow 0.7s linear infinite",
          display: "inline-block",
        }} />
      ) : icon}
      {children}
    </button>
  );
}

export default Button;