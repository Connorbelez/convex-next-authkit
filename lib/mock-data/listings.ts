/**
 * Mock data generators for listing detail pages
 * Provides procedurally generated test data without database dependencies
 */

export interface MockListing {
	_id: string;
	_creationTime: number;
	title: string;
	address: {
		street: string;
		city: string;
		state: string;
		zip: string;
		country: string;
	};
	location: {
		lat: number;
		lng: number;
	};
	investorBrief?: string;
	images: Array<{
		url: string;
		alt?: string;
		order: number;
	}>;
	financials: {
		purchasePrice: number;
		currentValue: number;
		monthlyPayment: number;
		interestRate: number;
		loanTerm: number; // months
		maturityDate: string; // ISO date
	};
	appraisal?: {
		value: number;
		date: string;
		appraiser: string;
		method: "comparative" | "income" | "cost";
	};
	status: "active" | "funded" | "closed";
	viewCount?: number;
	createdAt: string;
	updatedAt: string;
}

export interface MockPayment {
	_id: string;
	_creationTime: number;
	listingId: string;
	amount: number;
	date: string; // ISO date
	status: "paid" | "pending" | "late";
	type: "principal" | "interest" | "escrow";
}

// Seed data for consistent generation
const PROPERTY_TITLES = [
	"Luxury Oceanfront Villa",
	"Modern Downtown Loft",
	"Historic Victorian Mansion",
	"Beachside Bungalow",
	"Mountain View Estate",
	"Urban Penthouse Suite",
	"Coastal Retreat Home",
	"Suburban Family Residence",
	"Lakefront Cabin",
	"Contemporary City Apartment",
];

const CITIES = [
	// Toronto and surrounding areas
	{ name: "Downtown Toronto", state: "ON", lat: 43.6532, lng: -79.3832 },
	{ name: "North York", state: "ON", lat: 43.7615, lng: -79.4111 },
	{ name: "Scarborough", state: "ON", lat: 43.7731, lng: -79.2578 },
	{ name: "Etobicoke", state: "ON", lat: 43.6205, lng: -79.5132 },
	{ name: "Mississauga", state: "ON", lat: 43.589, lng: -79.6441 },
	{ name: "Markham", state: "ON", lat: 43.8561, lng: -79.337 },
	{ name: "Vaughan", state: "ON", lat: 43.8361, lng: -79.4983 },
	{ name: "Richmond Hill", state: "ON", lat: 43.8828, lng: -79.4403 },
	{ name: "Oakville", state: "ON", lat: 43.4675, lng: -79.6877 },
	{ name: "Burlington", state: "ON", lat: 43.3255, lng: -79.799 },
];

const STREETS = [
	"Yonge Street",
	"Bay Street",
	"King Street",
	"Queen Street",
	"Bloor Street",
	"Dundas Street",
	"College Street",
	"Spadina Avenue",
	"Avenue Road",
	"St. Clair Avenue",
];

const APPRAISER_NAMES = [
	"Smith & Associates Appraisals",
	"Premier Property Valuations",
	"Accurate Home Appraisers",
	"Coastal Property Assessment",
	"Metropolitan Valuation Group",
];

const INVESTOR_BRIEFS = [
	"Prime investment opportunity in a high-growth area. Property features excellent rental potential with strong historical appreciation rates. Located in a desirable neighborhood with proximity to schools, shopping, and transportation.",
	"Exceptional property with recent upgrades and modern amenities. Strong cash flow potential with established tenant base. Well-maintained building in an area experiencing significant development and infrastructure improvements.",
	"Strategically located in an emerging market with robust economic fundamentals. Property offers value-add opportunities through selective renovations. Excellent long-term hold for portfolio diversification.",
	"Premium location with consistent demand and limited supply. Property benefits from strong local employment growth and demographic trends. Ideal for investors seeking stable returns in a competitive market.",
];

// Seeded random number generator for consistent results
function seededRandom(seed: string): number {
	let hash = 0;
	for (let i = 0; i < seed.length; i++) {
		hash = (hash << 5) - hash + seed.charCodeAt(i);
		hash = hash & hash;
	}
	const x = Math.sin(hash++) * 10000;
	return x - Math.floor(x);
}

function randomChoice<T>(arr: T[], seed: string): T {
	const index = Math.floor(seededRandom(seed) * arr.length);
	return arr[index];
}

function randomInt(min: number, max: number, seed: string): number {
	return Math.floor(seededRandom(seed) * (max - min + 1)) + min;
}

function randomFloat(
	min: number,
	max: number,
	seed: string,
	decimals = 2
): number {
	const value = seededRandom(seed) * (max - min) + min;
	return Number(value.toFixed(decimals));
}

/**
 * Generate a mock listing based on ID
 * Uses ID as seed for consistent generation
 */
export function generateListing(id: string): MockListing {
	const cityData = randomChoice(CITIES, id);
	const streetNumber = randomInt(100, 9999, `${id}-street`);
	const streetName = randomChoice(STREETS, `${id}-name`);
	const purchasePrice = randomInt(500000, 5000000, `${id}-purchase`);
	const appreciationRate = randomFloat(0.95, 1.15, `${id}-appreciation`);
	const currentValue = Math.round(purchasePrice * appreciationRate);
	const loanTermMonths = randomChoice([180, 240, 300, 360], `${id}-term`);
	const interestRate = randomFloat(4.5, 8.5, `${id}-rate`);
	const hasAppraisal = seededRandom(`${id}-appraisal`) > 0.3; // 70% have appraisal

	// Calculate monthly payment using mortgage formula
	const monthlyRate = interestRate / 100 / 12;
	const monthlyPayment = Math.round(
		(purchasePrice * monthlyRate * (1 + monthlyRate) ** loanTermMonths) /
			((1 + monthlyRate) ** loanTermMonths - 1)
	);

	// Generate 3-7 images
	const imageCount = randomInt(3, 7, `${id}-imgcount`);
	const images = Array.from({ length: imageCount }, (_, i) => ({
		url: `https://picsum.photos/seed/${id}-${i}/800/600`,
		alt: `Property view ${i + 1}`,
		order: i,
	}));

	// Maturity date is loanTermMonths from now
	const maturityDate = new Date();
	maturityDate.setMonth(maturityDate.getMonth() + loanTermMonths);

	const listing: MockListing = {
		_id: id,
		_creationTime:
			Date.now() - randomInt(0, 365 * 24 * 60 * 60 * 1000, `${id}-created`),
		title: randomChoice(PROPERTY_TITLES, id),
		address: {
			street: `${streetNumber} ${streetName}`,
			city: cityData.name,
			state: cityData.state,
			zip: `M${randomInt(1, 9, `${id}-zip1`)}${String.fromCharCode(65 + randomInt(0, 25, `${id}-zip2`))} ${randomInt(1, 9, `${id}-zip3`)}${String.fromCharCode(65 + randomInt(0, 25, `${id}-zip4`))}${randomInt(0, 9, `${id}-zip5`)}`,
			country: "Canada",
		},
		location: {
			// Add slight random offset to base coordinates
			lat: cityData.lat + randomFloat(-0.05, 0.05, `${id}-lat`, 4),
			lng: cityData.lng + randomFloat(-0.05, 0.05, `${id}-lng`, 4),
		},
		investorBrief: randomChoice(INVESTOR_BRIEFS, `${id}-brief`),
		images,
		financials: {
			purchasePrice,
			currentValue,
			monthlyPayment,
			interestRate,
			loanTerm: loanTermMonths,
			maturityDate: maturityDate.toISOString(),
		},
		status: randomChoice(
			["active", "active", "funded", "closed"] as const,
			`${id}-status`
		), // More likely to be active
		viewCount: randomInt(0, 500, `${id}-views`),
		createdAt: new Date(
			Date.now() - randomInt(0, 365 * 24 * 60 * 60 * 1000, `${id}-created2`)
		).toISOString(),
		updatedAt: new Date().toISOString(),
	};

	// Add appraisal if applicable
	if (hasAppraisal) {
		const appraisalDate = new Date();
		appraisalDate.setMonth(
			appraisalDate.getMonth() - randomInt(1, 12, `${id}-appraisaldate`)
		);

		listing.appraisal = {
			value: Math.round(
				purchasePrice * randomFloat(0.98, 1.12, `${id}-appraisalval`)
			),
			date: appraisalDate.toISOString(),
			appraiser: randomChoice(APPRAISER_NAMES, `${id}-appraiser`),
			method: randomChoice(
				["comparative", "income", "cost"] as const,
				`${id}-method`
			),
		};
	}

	return listing;
}

/**
 * Generate mock payment history for a listing
 * Creates a realistic payment timeline
 */
export function generatePayments(listingId: string, count = 12): MockPayment[] {
	const payments: MockPayment[] = [];
	const now = new Date();

	for (let i = 0; i < count; i++) {
		const paymentDate = new Date(now);
		paymentDate.setMonth(paymentDate.getMonth() - i);

		// Determine status (most are paid, some pending, few late)
		const statusRand = seededRandom(`${listingId}-status-${i}`);
		let status: "paid" | "pending" | "late";
		if (statusRand < 0.8) {
			status = "paid";
		} else if (statusRand < 0.95) {
			status = "pending";
		} else {
			status = "late";
		}

		// Payment types cycle through principal, interest, escrow
		const typeOptions: Array<"principal" | "interest" | "escrow"> = [
			"principal",
			"interest",
			"escrow",
		];
		const type = typeOptions[i % 3];

		// Amount varies by type
		let amount: number;
		if (type === "principal") {
			amount = randomInt(8000, 15000, `${listingId}-amt-${i}`);
		} else if (type === "interest") {
			amount = randomInt(3000, 8000, `${listingId}-amt-${i}`);
		} else {
			amount = randomInt(500, 2000, `${listingId}-amt-${i}`);
		}

		payments.push({
			_id: `payment_${listingId}_${i}`,
			_creationTime: paymentDate.getTime(),
			listingId,
			amount,
			date: paymentDate.toISOString(),
			status,
			type,
		});
	}

	return payments;
}

/**
 * Generate comparable properties based on a reference listing
 * Returns properties within similar price range and location
 */
export function generateComparables(
	referenceId: string,
	limit = 6
): Array<MockListing & { distance: number }> {
	const reference = generateListing(referenceId);
	const comparables: Array<MockListing & { distance: number }> = [];

	// Generate comparable listings with sequential IDs
	for (let i = 1; i <= limit; i++) {
		const compId = `comp_${referenceId}_${i}`;
		const listing = generateListing(compId);

		// Adjust price to be within 20% of reference
		const priceVariation = randomFloat(0.85, 1.15, `${compId}-pricevar`);
		listing.financials.currentValue = Math.round(
			reference.financials.currentValue * priceVariation
		);
		listing.financials.purchasePrice = Math.round(
			reference.financials.purchasePrice * priceVariation
		);

		// Adjust location to be nearby (within ~5 miles)
		listing.location = {
			lat:
				reference.location.lat + randomFloat(-0.05, 0.05, `${compId}-lat2`, 4),
			lng:
				reference.location.lng + randomFloat(-0.05, 0.05, `${compId}-lng2`, 4),
		};

		// Use same city for comparables
		listing.address.city = reference.address.city;
		listing.address.state = reference.address.state;

		// Calculate approximate distance in miles (rough estimate)
		const latDiff = listing.location.lat - reference.location.lat;
		const lngDiff = listing.location.lng - reference.location.lng;
		const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 69; // ~69 miles per degree

		comparables.push({
			...listing,
			distance: Number(distance.toFixed(1)),
		});
	}

	// Sort by distance
	return comparables.sort((a, b) => a.distance - b.distance);
}
