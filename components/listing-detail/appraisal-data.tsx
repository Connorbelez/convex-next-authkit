import { Card, CardContent } from "@heroui/react";
import { Icon } from "@iconify/react";
import { format, parseISO } from "date-fns";

interface AppraisalDataProps {
	appraisal: {
		value: number;
		date: string;
		appraiser: string;
		method: string;
	};
	currentValue: number;
}

function formatCurrency(amount: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
}

const methodLabels: Record<string, string> = {
	comparative: "Comparative Market Analysis",
	income: "Income Approach",
	cost: "Cost Approach",
};

export function AppraisalData({ appraisal, currentValue }: AppraisalDataProps) {
	// Handle case where appraisal is undefined
	if (!appraisal) {
		return (
			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<Icon icon="lucide:file-x" className="h-6 w-6 text-gray-400" />
					<h2 className="text-2xl font-bold text-gray-500">
						No Appraisal Data Available
					</h2>
				</div>
				<Card.Root>
					<CardContent className="p-8 text-center">
						<p className="text-gray-500">
							No appraisal information available for this property.
						</p>
						<div className="mt-4 text-sm text-gray-400">
							Current Value: {formatCurrency(currentValue)}
						</div>
					</CardContent>
				</Card.Root>
			</div>
		);
	}

	const appraisalDate = parseISO(appraisal.date);
	const valueChange = currentValue - appraisal.value;
	const valueChangePercent = (valueChange / appraisal.value) * 100;
	const isPositiveChange = valueChange >= 0;

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<Icon icon="lucide:file-check" className="h-6 w-6 text-primary" />
				<h2 className="text-2xl font-bold">Appraisal Data</h2>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				{/* Appraised Value Card */}
				<Card.Root>
					<CardContent className="p-4">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30">
								<Icon icon="lucide:clipboard-check" className="h-5 w-5" />
							</div>
							<div className="flex-1">
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Appraised Value
								</p>
								<p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
									{formatCurrency(appraisal.value)}
								</p>
								<p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
									As of {format(appraisalDate, "MMMM d, yyyy")}
								</p>
							</div>
						</div>
					</CardContent>
				</Card.Root>

				{/* Value Change Card */}
				<Card.Root>
					<CardContent className="p-4">
						<div className="flex items-start gap-3">
							<div
								className={`rounded-lg p-2 ${isPositiveChange ? "bg-green-100 text-green-600 dark:bg-green-900/30" : "bg-red-100 text-red-600 dark:bg-red-900/30"}`}
							>
								<Icon
									icon={
										isPositiveChange
											? "lucide:trending-up"
											: "lucide:trending-down"
									}
									className="h-5 w-5"
								/>
							</div>
							<div className="flex-1">
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Value Change
								</p>
								<p
									className={`mt-1 text-3xl font-bold ${isPositiveChange ? "text-green-600" : "text-red-600"}`}
								>
									{isPositiveChange ? "+" : ""}
									{formatCurrency(valueChange)}
								</p>
								<p className="mt-2 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
									<Icon
										icon={
											isPositiveChange ? "lucide:arrow-up" : "lucide:arrow-down"
										}
										className="h-3 w-3"
									/>
									{isPositiveChange ? "+" : ""}
									{valueChangePercent.toFixed(1)}% from appraisal
								</p>
							</div>
						</div>
					</CardContent>
				</Card.Root>

				{/* Appraisal Details Card - Spans full width */}
				<Card.Root className="md:col-span-2">
					<CardContent className="p-4">
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="flex items-start gap-3">
								<Icon
									icon="lucide:user"
									className="mt-0.5 h-5 w-5 text-gray-500"
								/>
								<div>
									<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
										Appraiser
									</p>
									<p className="mt-1 text-gray-900 dark:text-white">
										{appraisal.appraiser}
									</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<Icon
									icon="lucide:clipboard-list"
									className="mt-0.5 h-5 w-5 text-gray-500"
								/>
								<div>
									<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
										Method
									</p>
									<p className="mt-1 text-gray-900 dark:text-white">
										{methodLabels[appraisal.method] || appraisal.method}
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card.Root>
			</div>
		</div>
	);
}
