/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			green: {
  				'50': '#edf5ed',
  				'100': '#c8dec6',
  				'200': '#aecfaa',
  				'300': '#88b984',
  				'400': '#71ab6c',
  				'500': '#4e9647',
  				'600': '#478941',
  				'700': '#376b32',
  				'800': '#2b5327',
          		'900': '#213f1e'
  			},
  			deepGreen: {
  				'50': '#e6eae6',
  				'100': '#b0beb0',
  				'200': '#8a9f8a',
  				'300': '#547354',
  				'400': '#335833',
  				'500': '#002e00',
  				'600': '#002a00',
  				'700': '#002100',
  				'800': '#001900',
  				'900': '#001300'
  			},
  			blue: {
  				'50': '#e6f4fc',
  				'100': '#b0dcf5',
  				'200': '#8acbf1',
  				'300': '#54b4ea',
  				'400': '#33a5e6',
  				'500': '#008fe0',
  				'600': '#0082cc',
  				'700': '#00669f',
  				'800': '#004f7b',
  				'900': '#003c5e'
  			},
  			warning: {
  				'50': '#fff1e8',
  				'100': '#fdd4b8',
  				'200': '#fdbf95',
  				'300': '#fca165',
  				'400': '#fb8f47',
  				'500': '#fa7319',
  				'600': '#e46917',
  				'700': '#b25212',
  				'800': '#8a3f0e',
  				'900': '#69300b'
  			},
  			error: {
  				'50': '#ffebed',
  				'100': '#fec1c6',
  				'200': '#fda3ab',
  				'300': '#fc7984',
  				'400': '#fc5f6d',
  				'500': '#fb3748',
  				'600': '#e43242',
  				'700': '#b22733',
  				'800': '#8a1e28',
  				'900': '#69171e'
  			},
  			success: {
  				'50': '#e9f9f0',
  				'100': '#baecd1',
  				'200': '#98e2bb',
  				'300': '#69d59c',
  				'400': '#4ccd89',
  				'500': '#1fc16b',
  				'600': '#1cb061',
  				'700': '#16894c',
  				'800': '#116a3b',
  				'900': '#0d512d'
  			},
			bg: {
				'50': '#fefdfb',
				'100': '#fcf9f3',
				'200': '#fbf7ee',
				'300': '#f9f3e6',
				'400': '#f8f1e1',
				'500': '#f6edd9',
				'600': '#e0d8c5',
				'700': '#afa89a',
				'800': '#878277',
				'900': '#67645b'
			},
			alpha: {
				'50': '#fefffd',
				'100': '#fbfef9',
				'200': '#f9fef7',
				'300': '#f6fef3',
				'400': '#f4fdf1',
				'500': '#f1fded',
				'600': '#dbe6d8',
				'700': '#abb4a8',
				'800': '#858b82',
				'900': '#656a64'
			},
			neutral: {
				'0' : '#ffffff',
				'50': '#F7F7F7',
				'200': '#EBEBEB',
				'300': '#D1D1D1',
				'400': '#A3A3A3',
				'600': '#5C5C5C',
				'800': '#262626',
				'950': '#171717'
			},
  			background: 'hsl(var(--background))',
  			text: {
  				primary: '#111827',
  				secondary: '#4b5563',
  				white: '#ffffff'
  			},
  			border: 'hsl(var(--border))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		gridTemplateColumns: {
  			auto: 'repeat(auto-fit, minmax(200px, 1fr))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
