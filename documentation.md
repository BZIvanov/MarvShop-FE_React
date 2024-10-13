# Documentation

## Components

### 3-rd party components

The folder `src/components/ui` contains the Shadcn generated components.

## Styling

### z-index

The base is the Header component with z-index of 2000. The Shop Sidebar should be displayed above the Header (z-index 2001) and the Dashboard Sidebar should be displayed below the Header (z-index 1999). Consider using css variables or setting up Tailwind in a way so we don't have hardcoded z-index values.
