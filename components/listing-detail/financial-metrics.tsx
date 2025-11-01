import { Card, CardContent } from "@heroui/react";
import { Icon } from "@iconify/react";
import { differenceInDays, format, parseISO } from "date-fns";

interface FinancialMetricsProps {
	financials: {
		purchasePrice: number;
		currentValue: number;
		monthlyPayment: number;
		interestRate: number;
		loanTerm: number; // in months
		maturityDate: string; // ISO date string
	};
}

function formatCurrency(amount: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
}

function formatPercentage(rate: number): string {
	return `${rate.toFixed(2)}%`;
}

interface MetricCardProps {
	icon: string;
	label: string;
	value: string;
	sublabel?: string;
	colorClass?: string;
}

function MetricCard({
	icon,
	label,
	value,
	sublabel,
	colorClass = "text-primary",
}: MetricCardProps) {
	return (
		<Card.Root>
			<CardContent className="p-4">
				<div className="flex items-start gap-3">
					<div className={`rounded-lg bg-primary/10 p-2 ${colorClass}`}>
						<Icon icon={icon} className="h-5 w-5" />
					</div>
					<div className="flex-1">
						<p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
						<p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
							{value}
						</p>
						{sublabel && (
							<p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
								{sublabel}
							</p>
						)}
					</div>
				</div>
			</CardContent>
		</Card.Root>
	);
}

export function FinancialMetrics({ financials }: FinancialMetricsProps) {
	const maturityDate = parseISO(financials.maturityDate);
	const daysUntilMaturity = differenceInDays(maturityDate, new Date());
	const yearsRemaining = Math.floor(daysUntilMaturity / 365);
	const monthsRemaining = Math.floor((daysUntilMaturity % 365) / 30);

	const valueChange = financials.currentValue - financials.purchasePrice;
	const valueChangePercent = (valueChange / financials.purchasePrice) * 100;

	const loanTermYears = Math.floor(financials.loanTerm / 12);
	const loanTermMonths = financials.loanTerm % 12;
	const loanTermText =
		loanTermMonths > 0
			? `${loanTermYears}y ${loanTermMonths}m`
			: `${loanTermYears} years`;

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2">
				<Icon icon="lucide:trending-up" className="h-6 w-6 text-primary" />
				<h2 className="text-2xl font-bold">Key Financials</h2>
			</div>

			{/* Metrics Grid */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				<MetricCard
					icon="lucide:dollar-sign"
					label="Purchase Price"
					value={formatCurrency(financials.purchasePrice)}
				/>

				<MetricCard
					icon="lucide:trending-up"
					label="Current Value"
					value={formatCurrency(financials.currentValue)}
					sublabel={`${valueChangePercent >= 0 ? "+" : ""}${valueChangePercent.toFixed(1)}% from purchase`}
					colorClass={valueChange >= 0 ? "text-green-600" : "text-red-600"}
				/>

				<MetricCard
					icon="lucide:calendar-days"
					label="Monthly Payment"
					value={formatCurrency(financials.monthlyPayment)}
				/>

				<MetricCard
					icon="lucide:percent"
					label="Interest Rate"
					value={formatPercentage(financials.interestRate)}
				/>

				<MetricCard
					icon="lucide:clock"
					label="Loan Term"
					value={loanTermText}
				/>

				{/* Maturity Date - Takes 2 columns on larger screens */}
				<Card.Root className="sm:col-span-2 lg:col-span-3 xl:col-span-3">
					<CardContent className="p-4">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-orange-100 p-2 text-orange-600 dark:bg-orange-900/30">
								<Icon icon="lucide:calendar-check" className="h-5 w-5" />
							</div>
							<div className="flex-1">
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Maturity Date
								</p>
								<p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
									{format(maturityDate, "MMMM d, yyyy")}
								</p>
								<div className="mt-2 flex items-center gap-2">
									<Icon icon="lucide:timer" className="h-4 w-4 text-gray-500" />
									<p className="text-sm text-gray-600 dark:text-gray-400">
										{daysUntilMaturity > 0 ? (
											<>
												{yearsRemaining > 0 && (
													<span>{yearsRemaining} years </span>
												)}
												{monthsRemaining > 0 && (
													<span>{monthsRemaining} months </span>
												)}
												remaining
											</>
										) : (
											<span className="text-red-600">Matured</span>
										)}
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
