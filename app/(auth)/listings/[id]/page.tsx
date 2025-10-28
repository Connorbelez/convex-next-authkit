import { notFound } from "next/navigation";
import { Metadata } from "next";
import { generateListing, generatePayments, generateComparables } from "@/lib/mock-data/listings";
import {
	ImageCarousel,
	PropertyMap,
	PropertyInfo,
	FinancialMetrics,
	PaymentHistory,
	AppraisalData,
	ComparableProperties,
} from "@/components/listing-detail";

interface ListingDetailPageProps {
	params: Promise<{
		id: string;
	}>;
}

export async function generateMetadata({ params }: ListingDetailPageProps): Promise<Metadata> {
	const { id } = await params;

	try {
		// Generate mock listing data based on ID
		const listing = generateListing(id);

		return {
			title: `${listing.title} - Investment Property`,
			description:
				listing.investorBrief ||
				`Property located at ${listing.address.street}, ${listing.address.city}, ${listing.address.state}`,
			openGraph: {
				title: listing.title,
				description: listing.investorBrief,
				images: listing.images.length > 0 ? [listing.images[0].url] : [],
			},
		};
	} catch (error) {
		return {
			title: "Listing Details",
		};
	}
}

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
	const { id } = await params;

	// Generate mock data based on ID (consistent across page loads)
	const listing = generateListing(id);
	const payments = generatePayments(id, 12);
	const comparables = generateComparables(id, 6);

	return (
		<div className="container mx-auto max-w-7xl px-4 py-8">
			{/* Property Info */}
			<div className="mb-8">
				<PropertyInfo
					title={listing.title}
					address={listing.address}
					investorBrief={listing.investorBrief}
					status={listing.status}
				/>
			</div>

			{/* Image Carousel and Map Grid */}
			<div className="mb-12 grid gap-6 lg:grid-cols-2">
				<ImageCarousel images={listing.images} propertyTitle={listing.title} />
				<PropertyMap location={listing.location} address={listing.address} />
			</div>

			{/* Financial Metrics */}
			<div className="mb-12">
				<FinancialMetrics financials={listing.financials} />
			</div>

			{/* Payment History */}
			<div className="mb-12">
				<PaymentHistory payments={payments} />
			</div>

			{/* Appraisal Data (only if available) */}
			{listing.appraisal && (
				<div className="mb-12">
					<AppraisalData appraisal={listing.appraisal} currentValue={listing.financials.currentValue} />
				</div>
			)}

			{/* Comparable Properties */}
			{comparables.length > 0 && (
				<div className="mb-12">
					<ComparableProperties comparables={comparables} />
				</div>
			)}
		</div>
	);
}
