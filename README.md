# Security System Builder

A React implementation of the provided Figma design for building a customizable home security system.

## Tech Stack

- React 19
- TypeScript
- Vite
- Zustand
- Tailwind CSS v4

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## Project Structure

```
src/
├── app/            # Router and page layout
├── catalog/        # DOMAIN layer: product data, rules and pricing
├── components/ui/  # Shared UI components
├── features/
│   ├── builder/    # The wizard: store, components, types
│   └── review/     # The summary panel: hooks, components, types
├── lib/            # Generic helpers (localStorage, currency)
├── types/          # Shared shapes (Product, Step)
└── assets/         # Self-hosted fonts
```

The project is organized by feature, while the catalog is separated from the UI and contains product-related logic and data.

Each feature owns its own state, hooks, components and types.

---

## Catalog

The catalog acts as the source of truth for products.

It is responsible for:

- Loading product data
- Looking up products by id
- Calculating prices and order totals
- Deriving the sets the rules depend on: plans, required products, builder steps

This keeps business logic outside React components and avoids repeating the same logic across the application. The catalog contains no React code.

Review items are built by the review feature's hooks, which resolve each selection against the catalog.

---

## State Management

Zustand is used because both the builder and the review panel depend on the same state.

The store contains:

- Current builder step
- Selected products
- Active variants
- Builder actions

The review panel reads directly from the store instead of keeping its own state.

---

## Product Selections

Selections only store the minimum required information:

- Product id
- Variant id (if applicable)
- Quantity

Any additional product information is retrieved from the catalog when needed.

---

## Variants

Each variant keeps its own quantity.

Changing the selected variant only changes which quantity the stepper controls.

---

## Plans

Plans are treated differently from quantity-based products.

A plan is mandatory and only one can be selected at a time, so selecting another plan replaces the current one. There is no deselect, and the button on the selected plan is disabled instead.

---

## Required Products

Some products are marked as required and cannot be removed. Their quantity stops at 1 instead of dropping to zero.

Every other product leaves the order once its quantity reaches zero, so a zero-quantity line never exists.

---

## Shipping

Fast shipping is included with every order, so it is never shown as a selectable product.

It is read from the catalog and rendered as its own row in the summary, above the total.

---

## Review Ordering

The review panel groups selections by category in its own order, which is not the order of the wizard.

The wizard asks for the plan third, while the review panel lists it last. Empty categories are not rendered.

---

## Data

Products and builder steps are loaded from local JSON files in `src/catalog/`, making the UI fully data-driven.

---

## Persistence

The **Save my system for later** action stores the current selections in `localStorage`.

When the page is opened again the saved selections are restored, after being validated against the catalog. Entries with an unknown product, an invalid quantity or a variant that no longer exists are dropped, and if the remaining order has no plan the whole save is discarded, since a plan is mandatory.

The current step is not stored, and active variants are derived from the restored selections.

---

## Default System

A first visit starts on a seeded starter system rather than an empty builder. A saved system takes precedence when one exists.

---

## Notes

- Checkout is a placeholder.
- No backend was implemented since it was optional for the task.
- Not all font weights are used as the font package I found didn't contain "semibold"
- Lighthouse gives a warning about image sizes, in a real case scenario, I'd use different images for thumbnails or Next/Image.
