/**
 * Shared styling for the row-action buttons (View, Edit, Delete, Download,
 * Back, Send Notification).
 *
 * Each of those six components previously carried its own copy of the same
 * inline style object, with the colour written as a literal rgba() string —
 * so the palette lived in six places and had already drifted (#009547 in the
 * stylesheets, #009548 here). Colours now come from tokens.css.
 */

const base = {
  color: "var(--color-text-invert)",
  padding: "6px 12px",
  borderRadius: "var(--radius-sm)",
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  textTransform: "none",
  cursor: "pointer",
};

export const actionButtonVariants = {
  /* Primary, brand-green. Uses the solid step so the white label clears
     4.5:1 — it is 3.9:1 on the literal brand green. */
  primary: {
    ...base,
    backgroundColor: "var(--color-brand-solid)",
  },
  /* Neutral navy, for non-destructive secondary actions. */
  secondary: {
    ...base,
    backgroundColor: "var(--color-secondary)",
  },
  /* Destructive. */
  danger: {
    ...base,
    backgroundColor: "var(--color-danger)",
  },
};

/**
 * @param {"primary"|"secondary"|"danger"} variant
 * @param {object} [overrides] per-button extras such as width or margin
 */
export const actionButtonStyle = (variant, overrides = {}) => ({
  ...actionButtonVariants[variant],
  ...overrides,
});

export default actionButtonStyle;
