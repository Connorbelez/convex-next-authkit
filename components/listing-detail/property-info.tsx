import { Card, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";

interface PropertyInfoProps {
	title: string;
	address: {
		street: string;
		city: string;
		state: string;
		zip: string;
		country: string;
	};
	investorBrief?: string;
	status: string;
}

const statusConfig: Record<
	string,
	{ label: string; color: "success" | "warning" | "default"; icon: string }
> = {
	active: {
		label: "Active",
		color: "success",
		icon: "lucide:circle-check",
	},
	funded: {
		label: "Funded",
		color: "warning",
		icon: "lucide:circle-dollar-sign",
	},
	closed: {
		label: "Closed",
		color: "default",
		icon: "lucide:circle-x",
	},
};

export function PropertyInfo({ title, address, investorBrief, status }: PropertyInfoProps) {
	const statusInfo = statusConfig[status] || statusConfig.active;

	return (
		<div className="space-y-6">
			{/* Header with title and status */}
			<div>
				<div className="mb-3 flex items-start justify-between gap-4">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
						{title}
					</h1>
					<Chip
						color={statusInfo.color}
						variant="flat"
						startContent={<Icon icon={statusInfo.icon} className="h-4 w-4" />}
						className="flex-shrink-0"
					>
						{statusInfo.label}
					</Chip>
				</div>

				{/* Address */}
				<div className="flex items-start gap-2 text-lg text-gray-600 dark:text-gray-400">
					<Icon icon="lucide:map-pin" className="mt-0.5 h-5 w-5 flex-shrink-0" />
					<address className="not-italic">
						{address.street}, {address.city}, {address.state} {address.zip}
					</address>
				</div>
			</div>

			{/* Investor Brief */}
			{investorBrief && (
				<Card.Root>
					<Card.Body>
						<div className="space-y-3">
							<div className="flex items-center gap-2">
								<Icon icon="lucide:file-text" className="h-5 w-5 text-primary" />
								<h2 className="text-lg font-semibold">Investor Brief</h2>
							</div>
							<div className="prose prose-sm max-w-none dark:prose-invert">
								<p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">{investorBrief}</p>
							</div>
						</div>
					</Card.Body>
				</Card.Root>
			)}
		</div>
	);
}
