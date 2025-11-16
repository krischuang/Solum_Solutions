# Solum Solutions

This repository contains solutions to practical programming questions organized into three folders: A, B, and C.

## Repository Structure

```
Solum_Solutions/
├── A/              # Mystic Wave (Python)
├── B/              # Cargo Craft Fleet (Python)
└── C/              # Login Page (React + Vite)
```

## Folder A - Mystic Wave

### Description
A Python solution for the Mystic Wave problem that calculates the final energy state after alternating wave patterns.

### Prerequisites
- Python

### Run Instructions

```bash
cd A
python3 mystic_wave.py
```

### Input Format
- First line(t): Number of test cases 
- Two integers (x n) where:
  - x = magical energy value
  - n = number of waves

### Example
```
Input:
2
5 3
10 4

Output:
5
0
```

## Folder B - Cargo Craft Fleet

### Description
A Python solution for the Cargo Craft Fleet problem that determines the minimum and maximum number of crafts that can be built given propulsion units.

### Prerequisites
- Python

### Run Instructions

```bash
cd B
python3 cargo_craft.py
```

### Input Format
- First line(t): Number of test cases 
- One integer (n) representing total propulsion units

### Example
```
Input:
3
12
2
15

Output:
2 3
-1
-1
```

---

## Folder C - Login Page

### Description
A React-based login page application built with Vite. Features a modern, responsive user interface for user authentication.

### Prerequisites
- Node.js
- npm

### Setup

1. Navigate to the C folder:
```bash
cd C
```

2. Install dependencies:
```bash
npm install
```

### Run Instructions

#### Development Mode
Run the application in development mode with hot reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

#### Build for Production
Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` folder.

### Project Structure
```
C/
├── public/         # Static assets
├── src/           # Source code
│   ├── App.jsx    # Main application component
│   └── ...
├── index.html     # HTML entry point
├── package.json   # Dependencies and scripts
└── vite.config.js # Vite configuration
```