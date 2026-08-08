import { clsx, type ClassValue } from "clsx"

/*
 * Every call site in this codebase composes non-conflicting classes (ternary
 * branches that swap a value, or additions that touch different CSS
 * properties) — nothing depends on tailwind-merge's runtime resolution of
 * two classes fighting over the same property. Plain `clsx` produces the
 * same output without the ~20KB of parsing logic tailwind-merge ships on
 * every page to solve a problem this codebase doesn't have.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
