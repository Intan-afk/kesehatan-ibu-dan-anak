"use client";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  multiline?: boolean;
  rows?: number;
  accent?: "violet" | "rose" | "sky" | "mint";
}

const accentColors: Record<string, string> = {
  violet: "#9b5de5",
  rose:   "#ff4d8d",
  sky:    "#00b4d8",
  mint:   "#00f5d4",
};

export function Input({ label, icon, error, multiline, rows = 3, accent = "violet", style, ...props }: InputProps) {
  const [focused, setFocused] = React.useState(false);
  const color = accentColors[accent];

  const sharedStyle: React.CSSProperties = {
    width: "100%",
    background: focused ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
    border: `1.5px solid ${focused ? color : error ? "#ff4d8d" : "rgba(255,255,255,0.12)"}`,
    borderRadius: 14,
    padding: icon ? "12px 16px 12px 44px" : "12px 16px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 400,
    color: "#f8f0ff",
    outline: "none",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    transition: "all 0.25s ease",
    boxShadow: focused ? `0 0 0 3px ${color}22, inset 0 1px 0 rgba(255,255,255,0.06)` : "inset 0 1px 0 rgba(255,255,255,0.06)",
    boxSizing: "border-box",
    ...style,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, position: "relative" }}>
      {label && (
        <label style={{
          fontSize: 11,
          fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: focused ? color : "rgba(248,240,255,0.5)",
          transition: "color 0.2s",
        }}>
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        {icon && (
          <span style={{
            position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
            color: focused ? color : "rgba(248,240,255,0.4)",
            transition: "color 0.2s",
            fontSize: 16, lineHeight: 1,
            pointerEvents: "none",
          }}>
            {icon}
          </span>
        )}
        {multiline ? (
          <textarea
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            rows={rows}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{ ...sharedStyle, resize: "vertical", lineHeight: 1.6 }}
          />
        ) : (
          <input
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={sharedStyle}
          />
        )}
      </div>
      {error && (
        <span style={{ fontSize: 11, color: "#ff4d8d", fontFamily: "'DM Sans', sans-serif" }}>
          ⚠ {error}
        </span>
      )}
    </div>
  );
}

export default Input;